import serial 
import time
import requests
import json
import threading
import dateutil.parser
from datetime import datetime, timezone
from enum import Enum


class eventType(Enum):
    water = 1
    light = 2

class scheduledEvent:
    def __init__(self, start_time, amount, id, type):
        self.type = type
        self.id = id
        self.startTime = dateutil.parser.isoparse(start_time)
        self.amount = amount


def printEvent(scheduledEvent):
    if scheduledEvent.type == eventType.water:
        print("water Event")
    elif scheduledEvent.type == eventType.light:
        print("light Event")
    print(event.startTime)
    print(event.amount)
    print(event.id)
    print("...............................")


def checkWatering():
    currentTime = datetime.now(timezone.utc)
    #there is some schedule and pump is not on
    global pumpStatus
    if len(waterQueue) > 0 and pumpStatus == False:
        waterEvent = waterQueue[0]
        if currentTime >= waterEvent.startTime:
            print('event id: ',waterEvent.id, ' currentTime: ',currentTime, ' waterScheduleTime: ', waterEvent.startTime)
            print('should start now')
            pumpStatus = True
            startEvent(waterEvent)



def checkLighting():
    currentTime = datetime.now(timezone.utc)
    #there is some schedule and light is not on
    global lightStatus
    if len(lightQueue) > 0 and lightStatus == False:
        lightEvent = lightQueue[0]
        if currentTime >= lightEvent.startTime:
            print('event id: ',lightEvent.id, ' currentTime: ',currentTime, ' lightScheduleTime: ', lightEvent.startTime)
            print('should start now')
            lightStatus = True
            startEvent(lightEvent)
            #timer takes in second
            timer = threading.Timer(lightEvent.amount * 60, finishEvent, [lightEvent])
            #timer = threading.Timer(10, dummy)
            timer.start()

def dummy():
    print("done")
    global lightStatus
    lightStatus = False

def startEvent(event):
    if event.type == eventType.water:
        print("start watering")
        #adruino.write("this is a test".encode())

    elif event.type == eventType.light:
        print("start lighting")
        # adruino.write("this is a test".encode())

def finishEvent(event, url = 'https://leafme.jj.ai', eventUrl = '/plant/1/events'):
    if event.type == eventType.water:
        evenTypeUrl = '/water/'
        print("finish watering")
        eventId = str(event.id)
        req = requests.post((url + eventUrl + evenTypeUrl + eventId))
        print('server response')
        print(req)
        global pumpStatus
        pumpStatus = False
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
        waterQueue.pop(0)
        if len(lightQueue) > 0:
            lightQueue.pop(0)
        else:
            print("error in threading, no light event to pop")


def getRequest(url = 'https://leafme.jj.ai', event = '/plant/1/events'):
    response = requests.get((url + event))
    if response.status_code == 200:
        print('success')
        data = response.json()
        print(data)

        for nextEvent in data["watering_events"]:
            if nextEvent["finished"] == False:
                event = scheduledEvent(nextEvent["start_time"], nextEvent["amount"], nextEvent["id"], eventType.water)
                waterQueue.append(event)

        for nextEvent in data["lighting_events"]:
            if nextEvent["finished"] == False:
                event = scheduledEvent(nextEvent["start_time"], nextEvent["length"], nextEvent["id"], eventType.light)
                lightQueue.append(event)

    else:
        print('get request for events failed')


def postSensorReading(soilMoisture, brightness, ambientTemp, ambientHumidity, url = 'https://leafme.jj.ai', sensorUrl = '/plant/1/sensors'):

    payload = [{"type": "SOIL_MOISTURE", "value": soilMoisture},
               {"type": "BRIGHTNESS", "value": brightness},
               {"type": "AMBIENT_TEMPERATURE", "value": ambientTemp},
               {"type": "AMBIENT_HUMIDITY", "value": ambientHumidity}
               ]

    req = requests.post((url + sensorUrl), data=payload)
    print('server response')
    print(req)


# the port that connects adruino with
#adruino = serial.Serial('/dev/ttyACM0', 9600)
url = 'https://leafme.jj.ai'
eventUrl = '/plant/1/events'
#initialize the event queue for lighting and watering
waterQueue = []
lightQueue = []
pumpStatus = False
lightStatus = False
getRequest()

'''
print("this is water queue")
print(len(waterQueue))
for item in waterQueue:
    printEvent(item, eventType.water)

print("this is light queue")
print(len(lightQueue))
for item in lightQueue:
    printEvent(item, eventType.light)
'''
while True:
    checkLighting()
    time.sleep(1)




#postSensorReading(23.1, 1002.1, 25.0, 50.0)
'''
while (true):
    data = adruino.readline()
    time.sleep(1)
    data = arduino.readline()
    pieces = data.split("\t")
    temp = pieces[0]
    humidity = pieces[1]
    print temp
    print humidity
    adruino.write("this is a test".encode())

'''

