#include "Adafruit_seesaw.h"
#include <Wire.h>
#include <BH1750.h>
#include <dht11.h>

//calibrate moisture sensor reading 
const uint16_t soilLow = 0;
const uint16_t soilHigh = 750;

//between 0 - 1023 
//intensity lower than 150 lx, light low 
const int lightLow = 150; 
const int lightHigh = 900; 

int moistureLevel = 5; 
int intensityLevel = 1;
int ambientHumidity = 10;
float ambientTemp = 20.0; 
float intensity = 0;
float soilTemp = 20.0;
uint16_t soilCap = 0; 
int soilMoisture = 2; //enumeration dry = 0, relatively dry 1, normal 2, relatively wet 3, wet 4, out of range = 5
int refillTank = 0;  

int pumpStatus = 0;
int lightStatus = 0;
String info = "null";

int count = 0; 


Adafruit_seesaw soilSensor; //initialize soil moisture sensor class 
BH1750 lightSensor; //initialize light sensor class
dht11 DHT11; //initialize ambient sensor class
#define dhtpin 2 //using Digital pin 2 for ambient temperature reading
#define LEDPin 8 //using Digital pin 8 for controlling LED
#define PumpPin 9 //using Digital pin 9 for pump speed control
#define waterLevelPin 7

void setup(){
  Serial.begin (9600);
  //initialize I2C bus  
  I2CBegin();
  setupPin();
}

void loop() {
  // put your main code here, to run repeatedly:
  readAmbientTemp();
  readAmbientLight();
  readSoilMoisture();
  readWaterLevel();

  //every 1 second monitor command 

  //read possible water
  monitorCommand();
  //read possible light
  monitorCommand();

  count++; 
  
  if (count > 5){
    //every 5 second report to pi
    reportToPI();
    count = 0; 
  }
  
  delay(1000);
  
}



void reportToPI(){
  //soil moisture level, from 0-5 dry to wet 5 is invalid, sensor not pluged in 
  Serial.print(moistureLevel);
  Serial.print(" ");
  //soil temp 
  Serial.print(soilTemp);
  Serial.print(" ");
  Serial.print(intensityLevel);
  Serial.print(" ");
  Serial.print(ambientTemp);
  Serial.print(" ");
  Serial.print(ambientHumidity);
  Serial.print(" ");
  Serial.print(pumpStatus);
  Serial.print(" ");
  Serial.print(lightStatus);
  Serial.print(" ");
  Serial.println(refillTank);
  
}

void monitorCommand(){
  if (Serial.available() > 0){
    info = Serial.readStringUntil('.');
    //Serial.println(info);
    String command = info.substring(0,5);
    if (command == "water"){
      pumpStatus = info.substring(6).toInt();
      if (pumpStatus == 1)
        digitalWrite(PumpPin, LOW);
      else
        digitalWrite(PumpPin, HIGH);
    }
    else if (command == "light"){ 
      lightStatus = info.substring(6).toInt();
      if (lightStatus == 1)
        digitalWrite(LEDPin, LOW);
      else
        digitalWrite(LEDPin, HIGH);
    }
  }
}


void setupPin(){
  pinMode(PumpPin, OUTPUT);
  digitalWrite(PumpPin, HIGH);
  pinMode(LEDPin, OUTPUT);
  digitalWrite(LEDPin, HIGH); 
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
  //Serial.print("Soil temperature: ");
  //Serial.println(soilTemp);
  //Serial.print("Soil Moisture: ");
  soilMoisture = findMoistureLevel(soilCap, soilLow, soilHigh); 
}

int findMoistureLevel(uint16_t soilCap, uint16_t low, uint16_t high){
  uint16_t range = (uint16_t) (high - low)/4; 
  
  if (soilCap > 0 && soilCap <= (low + range)){
    //dry 
    moistureLevel = 1;
    //Serial.println("Dry"); 
  }
  else if (soilCap > (low + range) && soilCap <= (low + 2*range)){
    //relatively dry
    moistureLevel = 2;
    //Serial.println("Relatively Dry"); 
  }
  else if (soilCap > (low + 2*range) && soilCap <= (low + 3*range)){
    //relatively wet
    moistureLevel = 3;
    //Serial.println("Relatively Wet"); 
  }
  else if (soilCap > (low + 3*range) && soilCap <= high){
    // wet
    moistureLevel = 4;
   // Serial.println("Wet"); 
  } 
  else {
    //invalid, sensor not pluged in properly 
    moistureLevel = 5; 
    //Serial.println("Invalid Reading"); 
  }

  //Serial.print("Capacitive reading: ");
  //Serial.println(soilCap);
  
  return moistureLevel; 
}

void readAmbientTemp(){
  DHT11.read(dhtpin); 
  ambientHumidity = DHT11.humidity;
  ambientTemp = getTemp('C');
  //Serial.print(ambientTemp);
  //Serial.println("C ");
  //Serial.print("Humidity: ");
  //Serial.println(ambientHumidity);
}

void readAmbientLight(){
  intensity = lightSensor.readLightLevel();
  findIntensityLevel((uint16_t)  intensity, lightLow, lightHigh);
  //Serial.print("light: ");
  //Serial.print(intensity);
  //Serial.println(" lx"); 
}

void findIntensityLevel(uint16_t intensity, uint16_t low, uint16_t high){
  uint16_t range = (uint16_t) (high - low)/3; 
  int light = 1; 
  if (intensity >= 0 && intensity <= (low + range)){
    //LOW 
    intensityLevel = 1;
    //Serial.println("LOW"); 
  }
  else if (intensity > (low + range) && intensity <= (low + 2*range)){
    //relatively low
    intensityLevel = 2;
    //Serial.println("Relatively low"); 
  }
  else if (intensity > (low + 2*range) && intensity <= high){
    //relatively HIGH
    intensityLevel = 3;
    //Serial.println("Relatively Wet"); 
  }
  else {
    //HIGH
    intensityLevel = 4; 
    //Serial.println("HIGH"); 
  }
  //Serial.println(intensityLevel); 
}

void readWaterLevel(){
  bool val = digitalRead(waterLevelPin);
  if (val == true){
    //Serial.println("levelGood");
    refillTank = 0; 
  }
  else{
    //Serial.println("levelBad"); 
    refillTank = 1; 
  }
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