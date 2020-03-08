import serial
import sys
import time
import requests
import json
import threading
import dateutil.parser
from datetime import datetime, timezone, timedelta
# from pytz import timezone
from enum import Enum
import operator


class eventType(Enum):
    water = 1
    light = 2


class scheduledEvent:
    def __init__(self, start_time, amount, id, type):
        self.type = type
        self.id = id
        self.startTime = dateutil.parser.isoparse(start_time)
        self.amount = amount

    def __eq__(self, other):
        if isinstance(other, scheduledEvent):
            return other.id == self.id
        return self.id == other


def printEvent(scheduledEvent):
    if scheduledEvent.type == eventType.water:
        print("water Event")
    elif scheduledEvent.type == eventType.light:
        print("light Event")
    print(scheduledEvent.startTime)
    print(scheduledEvent.amount)
    print(scheduledEvent.id)
    print("...............................")


def checkWatering():
    # tz = timezone('EST')
    # currentTime = datetime.now(timezone.utc)
    #currentTime = datetime.now()
    #currentTime = currentTime.replace(tzinfo=timezone.utc)
    currentTime = datetime.utcnow()
    # there is some schedule and pump is not on
    global pumpStatus
    if len(waterQueue) > 0 and pumpStatus == False:
        waterEvent = waterQueue[0]
        waterTime = waterEvent.startTime.replace(tzinfo=None)
        if currentTime >= waterTime:
            global waterTimer
            print('event id: ', waterEvent.id, ' currentTime: ', currentTime, ' waterScheduleTime: ',
                  waterTime)
            print('should start now')
            pumpStatus = True
            startEvent(waterEvent)
            waterTimer = threading.Timer(waterEvent.amount/10, finishEvent, [waterEvent])
            waterTimer.start()


def convertWaterAmount(amount, speed):
    # some kind of formula for controlling water amount by time and speed
    return amount * speed / 60


def checkLighting():
    #tz = timezone('UTC')
    # currentTime = datetime.now(tz)
    currentTime = datetime.utcnow()
    # there is some schedule and light is not on
    global lightStatus
    global lightTimer
    if len(lightQueue) > 0 and lightStatus == False:
        lightEvent = lightQueue[0]
        lightTime = lightEvent.startTime.replace(tzinfo=None)
        if currentTime >= lightTime:
            print('event id: ', lightEvent.id, ' currentTime: ', currentTime, ' lightScheduleTime: ',
                  lightTime)
            print('should start now')
            lightStatus = True
            startEvent(lightEvent)
            # timer takes in second
            elapsed = currentTime - lightTime
            print(elapsed)
            print(elapsed.seconds)
            print('elapsed in min: ', elapsed.seconds / 60)
            duration = lightEvent.amount * 60 - elapsed.seconds
            print('duration: ', duration)
            if duration > 0:
                lightTimer = threading.Timer(lightEvent.amount * 60, finishEvent, [lightEvent])
                lightTimer.start()
            else:
                finishEvent(lightEvent)


def arduinoLight(light):
    global ser
    print("send command to adruino, light:", light)
    if ser != None:
        sendStr = "light " + str(int(light)) + "."
        ser.write(sendStr.encode('utf-8')) 


def arduinoPump(pump):
    global ser
    print("send command to adruino, pump:", pump)
    if ser != None:
        sendStr = "water " + str(int(pump)) + "."
        ser.write(sendStr.encode('utf-8'))


def startEvent(event):
    if event.type == eventType.water:
        print("start watering")
        arduinoPump(1)

    elif event.type == eventType.light:
        print("start lighting")
        arduinoLight(1)


def finishEvent(event, url='https://leafme.jj.ai', eventUrl='/plant/1/events'):
    if event.type == eventType.water:

        evenTypeUrl = '/water/'
        print("finish watering")
        eventId = str(event.id)
        req = requests.post((url + eventUrl + evenTypeUrl + eventId))
        print('server response')
        print(req)

        global pumpStatus
        pumpStatus = False
        arduinoPump(0)
        if len(waterQueue) > 0:
            waterQueue.pop(0)
        else:
            print("error in threading, no water event to pop")

    elif event.type == eventType.light:
        evenTypeUrl = '/light/'
        print("finish lighting")
        eventId = str(event.id)
        req = requests.post((url + eventUrl + evenTypeUrl + eventId))
        print('server response')
        print(req)
        global lightStatus
        lightStatus = False
        arduinoLight(0)
        if len(lightQueue) > 0:
            lightQueue.pop(0)
        else:
            print("error in threading, no light event to pop")


def getRequest(url='https://leafme.jj.ai', event='/plant/1/events'):
    response = requests.get((url + event))
    if response.status_code == 200:
        print('success')
        data = response.json()
        # print(data)

        for nextEvent in data["watering_events"]:
            if nextEvent["finished"] == False:
                event = scheduledEvent(nextEvent["start_time"], nextEvent["amount"], nextEvent["id"], eventType.water)
                if event not in waterQueue:
                    waterQueue.append(event)

        for nextEvent in data["lighting_events"]:
            if nextEvent["finished"] == False:
                event = scheduledEvent(nextEvent["start_time"], nextEvent["length"], nextEvent["id"], eventType.light)
                if not event in lightQueue:
                    lightQueue.append(event)

        waterQueue.sort(key=operator.attrgetter('startTime'))
        lightQueue.sort(key=operator.attrgetter('startTime'))

    else:
        print(response.status_code)
        print('get request for events failed')


def getMode(url='https://leafme.jj.ai', plantStatus='/plant/1'):
    global manualMode
    global lightTimer
    global waterTimer
    global lightStatus
    global pumpStatus
    response = requests.get((url + plantStatus))
    if response.status_code == 200:
        print('success')
        data = response.json()
        print(data)

        manualMode = data["manual_mode"]
        if manualMode == True:
            print("manualMode: ", manualMode)

            # kill all auto events, reset status so auto can run once mode is back in
            if lightTimer != None:
                if lightTimer.is_alive():
                    lightTimer.cancel()
                    lightStatus = False
                    print('light callback cancelled')
            if waterTimer != None:
                if waterTimer.is_alive():
                    waterTimer.cancel()
                    pumpStatus = False
                    print('pump callback cancelled')

            # getting data from get results
            lightRequest = data["manual_light"]

            pumpRequest = False
            if data["manual_water"] > 0:
                pumpRequest = True
                amount = data["manual_water"]
                # need water
                payload = [{"amount": -amount}]
                req = requests.post(url + plantStatus + 'manual/water', data=json.dumps(payload))
                print('manual watering post server response')
                print(req)
                if req.status_code == 200:
                    print('post manual watering success')

            # send new command to arduino according to get data
            arduinoLight(lightRequest)
            arduinoPump(pumpRequest)

        print("ManualMode: ", manualMode)



def postSensorReading(soilMoisture, soilTemp,  brightness, ambientTemp, ambientHumidity, pumpStatus, lightStatus, refillTank, url='https://leafme.jj.ai',
                      sensorUrl='/plant/1/sensors'):
    
    payload = [
        {"type": "SOIL_TEMPERATURE", "value": soilTemp},
        {"type": "BRIGHTNESS", "value": brightness},
        {"type": "AMBIENT_TEMPERATURE", "value": ambientTemp},
        {"type": "AMBIENT_HUMIDITY", "value": ambientHumidity},
        {"type": "PUMP_STATUS", "value": pumpStatus},
        {"type": "LIGHT_STATUS", "value": lightStatus},
        {"type": "TANK_LEVEL", "value": refillTank}
    ]
    
    if int(soilMoisture) != 5:
        payload.append({"type": "SOIL_MOISTURE", "value": soilMoisture})
        
    req = requests.post((url + sensorUrl), data=json.dumps(payload))
    print('sensor reading post server response')
    print(req)
    if req.status_code == 200:
        print('post sensor data success')


def testQueue():
    tz = timezone('EST')
    event = scheduledEvent((datetime.now(tz) + timedelta(0, 0)).isoformat(), 1, 1, eventType.light)
    lightQueue.append(event)

    event = scheduledEvent((datetime.now(tz) + timedelta(0, 120)).isoformat(), 1, 2, eventType.light)
    lightQueue.append(event)

    event = scheduledEvent((datetime.now(tz) + timedelta(0, 240)).isoformat(), 1, 3, eventType.light)
    lightQueue.append(event)

    event = scheduledEvent((datetime.now(tz) + timedelta(0, 360)).isoformat(), 1, 4, eventType.light)
    lightQueue.append(event)

    event = scheduledEvent((datetime.now(tz) + timedelta(0, 480)).isoformat(), 1, 5, eventType.light)
    lightQueue.append(event)


# the port that connects adruino with
# adruino = serial.Serial('/dev/ttyACM0', 9600)
url = 'https://leafme.jj.ai'
eventUrl = '/plant/1/events'

# initialize the event queue for lighting and watering
waterQueue = []
lightQueue = []
pumpStatus = False
lightStatus = False
manualMode = False
lightTimer = None
waterTimer = None
ser = None

# testQueue()

'''
while True:
    getRequest()

    print("this is light queue")
    print(len(lightQueue))
    for item in lightQueue:
        printEvent(item)

    getMode()
    if not manualMode:
        checkLighting()

    time.sleep(10)
'''

try:
    ser = serial.Serial('/dev/ttyACM0', 9600)
    print(ser.name)
    ser.flush()
except:
    print("cannot open serial port")
    sys.exit()

time.sleep(10)
#reset buffer first
ser.reset_input_buffer()
ser.reset_output_buffer()

getRequest()
print("this is light queue")
print(len(lightQueue))
for item in lightQueue:
    printEvent(item)

arduinoPump(1)
arduinoLight(1)
time.sleep(5)
arduinoPump(0)
arduinoLight(0)
time.sleep(5)

start = time.time()

while True:

    if ser.in_waiting > 0:
        data = ser.readline().decode('utf-8')
        pieces = data.split()
        try:
            soilMoistureLevel = float(pieces[0])
            soilTemp = float(pieces[1])
            ambientLight = float(pieces[2])
            ambientTemp = float(pieces[3])
            ambientHumidity = float(pieces[4])
            remotePumpStatus = float(pieces[5])
            remoteLightStatus = float(pieces[6])
            refillTank = float(pieces[7])
        except ValueError:
            print("not sensor data, probably startup info")

    if time.time() - start > 60:
        print("post sensor reading from arduino")
        print('post sensor reading... soilMoistureLevel: ', soilMoistureLevel, ' soilTemp: ', soilTemp, ' ambientLightLevel: ', ambientLight,' ambientTemp: ',ambientTemp, ' ambientHumidity: ', ambientHumidity)
        print('ardruinoPumpStatus: ', remotePumpStatus, ' adruinoLight: ', remoteLightStatus, ' refillTank: ', refillTank)
        postSensorReading(soilMoistureLevel, soilTemp,  ambientLight, ambientTemp,
        ambientHumidity, remotePumpStatus, remoteLightStatus, refillTank)
        getRequest()
        
        print("this is light queue")
        print(len(lightQueue))
        for item in lightQueue:
            printEvent(item)
            
        start = time.time()
        time.sleep(10)

    checkLighting()
    checkWatering()
    time.sleep(4)







