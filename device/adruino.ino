#include "Adafruit_seesaw.h"
#include <Wire.h>
#include <BH1750.h>
#include <dht11.h>

//calibrate moisture sensor reading 
const uint16_t soilLow = 0;
const uint16_t soilHigh = 750;

//between 0 - 1023
const int waterLow = 400;
const int waterLowLow = 200; 

int ambientHumidity = 10;
float ambientTemp = 20.0; 
float intensity = 0;
float soilTemp = 20.0;
uint16_t soilCap = 0; 
int soilMoisture = 2; //enumeration dry = 0, relatively dry 1, normal 2, relatively wet 3, wet 4, out of range = 5
int pumpSpeed = 0; 

Adafruit_seesaw soilSensor; //initialize soil moisture sensor class 
BH1750 lightSensor; //initialize light sensor class
dht11 DHT11; //initialize ambient sensor class
#define dhtpin 2 //using Digital pin 2 for ambient temperature reading
#define LEDpin 8 //using Digital pin 2 for controlling LED
#define PumpSpeedPin 9 //using Digital pin 9 for pump speed control
#define waterLevelPin A2

void setup(){
  Serial.begin (9600);
  //initialize I2C bus  
  //I2CBegin();
  setupPin();
}

void loop() {
  // put your main code here, to run repeatedly:
  //readAmbientTemp(); 
  //readAmbientLight(); 
  //readSoilMoisture(); 
  //readWaterLevel();
  //testLEDRelay(); 
  testPumpSpeed();
  delay(1000); 
}



void setupPin(){
  pinMode(LEDpin, OUTPUT);

  //motor Pins 
  pinMode(PumpSpeedPin, OUTPUT);
}

void I2CBegin(){
  //BH1750 light sensor address: 0x23
  //Adafruit soil moisture sensor address: 0x36
  //Initialize I2C
  Wire.begin();
  //scan available devices 
  scanI2C();
  //light sensor begin communicating 
  lightSensor.begin();
  //soil sensor begin communicating 
  soilSensorBegin();
}

void scanI2C(){
  byte error, address;
  int nDevices;
  Serial.println("Scanning...");
  nDevices = 0;
  for(address = 1; address < 127; address++ )
  {
    // The i2c_scanner uses the return value of
    // the Write.endTransmisstion to see if
    // a device did acknowledge to the address.
    Wire.beginTransmission(address);
    error = Wire.endTransmission();
    
    if (error == 0)
    {
      Serial.print("I2C device found at address 0x");
      if (address<16)
        Serial.print("0");
      Serial.print(address,HEX);
      Serial.println("  !");
      nDevices++;
    }
    else if (error==4)
    {
      Serial.print("Unknown error at address 0x");
      if (address<16)
        Serial.print("0");
      Serial.println(address,HEX);
    }    
  }
  if (nDevices == 0)
    Serial.println("No I2C devices found");
  else
    Serial.println("done");
}

void testPumpSpeed(){
  pumpSpeed = 255;
  Serial.print("Pump speed: ");
     Serial.println(pumpSpeed);
     analogWrite(PumpSpeedPin, pumpSpeed);
}

void testLEDRelay(){
  digitalWrite(LEDpin, HIGH);
  delay(5000);
  digitalWrite(LEDpin, LOW);
  delay(5000);
}

void soilSensorBegin(){
  if (!soilSensor.begin(0x36)) {
    Serial.println("ERROR! seesaw not found");
    while(1);
  } else {
    Serial.print("seesaw started! version: ");
    Serial.println(soilSensor.getVersion(), HEX);
  }  
}


void readSoilMoisture(){
  soilTemp = soilSensor.getTemp();
  soilCap = soilSensor.touchRead(0);
  Serial.print("Soil temperature: ");
  Serial.println(soilTemp);
  Serial.print("Soil Moisture: ");
  soilMoisture = findMoistureLevel(soilCap, soilLow, soilHigh); 
}

int findMoistureLevel(uint16_t soilCap, uint16_t low, uint16_t high){
  uint16_t range = (uint16_t) (high - low)/5; 
  int moistureLevel = 0; 
  if (soilCap > 0 && soilCap <= (low + range)){
    //dry 
    moistureLevel = 0;
    Serial.println("Dry"); 
  }
  else if (soilCap > (low + range) && soilCap <= (low + 2*range)){
    //relatively dry
    moistureLevel = 1;
    Serial.println("Relatively Dry"); 
  }
  else if (soilCap > (low + 2*range) && soilCap <= (low + 3*range)){
    //normal
    moistureLevel = 2;
    Serial.println("Normal"); 
  }
  else if (soilCap > (low + 3*range) && soilCap <= (low + 4*range)){
    //relatively wet
    moistureLevel = 3;
    Serial.println("Relatively Wet"); 
  }
  else if (soilCap > (low + 4*range) && soilCap <= high){
    //wet 
    moistureLevel = 4; 
    Serial.println("Wet"); 
  }
  else {
    //invalid
    moistureLevel = 5; 
    Serial.println("Invalid Reading"); 
  }

  Serial.print("Capacitive reading: ");
  Serial.println(soilCap);
  
  return moistureLevel; 
}

void readAmbientLight(){
  intensity = lightSensor.readLightLevel();
  Serial.print("light: ");
  Serial.print(intensity);
  Serial.println(" lx"); 
}

void readAmbientTemp(){
  DHT11.read(dhtpin); 
  ambientHumidity = DHT11.humidity;
  ambientTemp = getTemp('C');
  Serial.print(ambientTemp);
  Serial.println("C ");
  Serial.print("Humidity: ");
  Serial.println(ambientHumidity);
}

void readWaterLevel(){
  int val = analogRead(waterLevelPin);
  
  Serial.print("waterLevel: ");

  if (val > 1023 || val < 0){
    Serial.println("Invalid");
  }
  else{
    if (val < waterLowLow){
      Serial.println ("Low Low, refill");
    }
    else if (val > waterLowLow && val <= waterLow){
      Serial.println("Low");
    }
    else {
      Serial.println("Sufficient");
    }
  }
  
  Serial.print("Reading: ");
  Serial.println(val);
}

float getTemp(char type){
  float temp = (float)DHT11.temperature; 
  if (type == 'F')
  {
    return temp*1.8+32;
  }
  else
  {
    return temp;
  }
}
