#include <AWS_IOT.h>
#include <WiFi.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include <WiFiClientSecure.h>
#include <MQTTClient.h>
#include "SPIFFS.h"
#include <base64.h>

AWS_IOT hornbill;

char WIFI_SSID[]=""; // your wifi ssid
char WIFI_PASSWORD[]=""; // your wifi password
char HOST_ADDRESS[]="xxxxxxxxxxxxxx-xxx.iot.ap-south-1.amazonaws.com";
char CLIENT_ID[]= "ESP-32-3";
char TOPIC_NAME[]= "ESP-32-thing-2";
char SHADOW_UPDATE[]= "$aws/things/ESP-32-thing-2/shadow/update";
char SHADOW_GET[]= "$aws/things/ESP-32-thing-2/shadow/get/accepted";
char SENT_GET[]= "$aws/things/ESP-32-thing-2/shadow/get";
char SHADOW_UPDATE_ACCEPTED[]= "$aws/things/ESP-32-thing-2/shadow/update/accepted";
char MY_TOPIC[]= "iot/topic";

int status = WL_IDLE_STATUS;
int tick=0,msgCount=1,msgReceived = 0;
char payload[26000];
char image_string[25000];
char rcvdPayload[512];
int hall_measurement = 0;
String toEncode = "";
String encoded = "";

struct DataFromServer{
          const char* yourString;
};

DataFromServer data1;

void mySubCallBackHandler (char *topicName, int payloadLen, char *payLoad)
{
    strncpy(rcvdPayload,payLoad,payloadLen);
    rcvdPayload[payloadLen] = 0;
    msgReceived = 1;
}

void updateShadow (DataFromServer &data1)
{ 
  Serial.println(data1.yourString);
//  sprintf(payload,"{\"state\": {\"reported\": {\"power\": \"\"}}}");     
  
  File file = SPIFFS.open("/cloud.png");
  if (!file){
    Serial.println("Failed to open file for reading!!");
    return;
    }
   else{
    
    Serial.println("file opened successfully"); 
    Serial.println("Read from file : ");
    while(file.available()){
      //Serial.write(file.read());
      toEncode = toEncode + file.read();
      }
      
    }

    encoded = base64::encode(toEncode);
    Serial.println(encoded);
    encoded.toCharArray(image_string,25000);
    sprintf(payload,"{\"image\": \"%s\"}",image_string);
    delay(3000);

    if(hornbill.publish(MY_TOPIC,payload)==0){
      Serial.println("Published Message: ");
      Serial.println(payload);
      }
    else{
      Serial.println("Publish failed!!");
      Serial.println(payload);
      }

    file.close();

    Serial.println("file Closed!!");

   // SPIFFS.end();
      
}

void setup() {
    Serial.begin(115200);
    delay(2000);

    while (status != WL_CONNECTED)
    {
        Serial.print("Attempting to connect to SSID: ");
        Serial.println(WIFI_SSID);
        // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
        status = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

        // wait 5 seconds for connection:
        delay(5000);
    }

    Serial.println("Connected to wifi");

    if(hornbill.connect(HOST_ADDRESS,CLIENT_ID)== 0)
    {
        Serial.println("Connected to AWS");
        delay(1000);

        if(0==hornbill.subscribe(SHADOW_UPDATE_ACCEPTED,mySubCallBackHandler))
        {
            Serial.println("Subscribe Successfully to shadow update accepted topic");
        }
        else
        {
            Serial.println("Subscribe Failed, Check the Thing Name and Certificates");
            while(1);
        }
    }
    else
    {
        Serial.println("AWS connection failed, Check the HOST Address");
        while(1);
    }

  delay(3000); /*Sent Empty string to fetch Shadow desired state*/ 
if(!SPIFFS.begin()){
  Serial.println("An error has occured while mounting SPIFFS");
  }

}

void loop() {

    if(msgReceived == 1)
    {
        msgReceived = 0;
        Serial.print("Received Message:");
        //char JSONmessage = rcvdPayload;
        Serial.println(rcvdPayload);
        StaticJsonDocument<256> doc;
        deserializeJson(doc, rcvdPayload);
        
        msgCount=0;
        
        data1.yourString = doc["state"]["desired"]["lat_long"]["S"]; 
        
        //Serial.println(data1.yourString);

        //Serial.println("printing msgCount inside if : ");
        //Serial.print(msgCount);
        
        updateShadow (data1); 
                        
    }

    
}
