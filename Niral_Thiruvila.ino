#include <DHT.h>

#include<WiFi.h>
#include<Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

#define WIFI_SSID "<<3"
#define WIFI_PASSWORD "Boobathi"
#define API_KEY "AIzaSyB-uqD8irbeVh9HJMpefA8HfiYaPY5iPec"
#define DATABASE_URL "https://trail-638316-default-rtdb.firebaseio.com"


FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

#define DHTPIN 13        // Digital pin connected to the DHT sensor
#define DHTTYPE DHT22   // Change to DHT22 if you're using that model

DHT dht(DHTPIN, DHTTYPE);

const int sensorPin = 34;  // GPIO34 on ESP32

// Define threshold values for each gas type (adjust as needed)
const int propaneThreshold = 300;
const int butaneThreshold = 600;
const int lpgThreshold = 1000;

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(sensorPin, INPUT);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while(WiFi.status() != WL_CONNECTED){
  Serial.print("."); 
  delay (300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("signUp OK");
    signupOK = true;
  } else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }
  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}


void loop() {
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 5000 || sendDataPrevMillis== 0)){

    sendDataPrevMillis = millis();

    int sensorValue = analogRead(sensorPin);

    // Read temperature as Celsius (the default)
    float temperature = dht.readTemperature();
    // Read temperature as Fahrenheit (isFahrenheit = true)
    // float temperature = dht.readTemperature(true);

    // Read humidity
    float humidity = dht.readHumidity();

    // Check if any reads failed and exit early (to try again).
    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }

    // Display temperature and humidity on the serial monitor
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" °C");

    Serial.print("Humidity: ");
    Serial.print(humidity);
    Serial.println(" %");

    // Determine the gas type based on sensor value
    if (sensorValue > lpgThreshold) {
      Serial.println("LPG detected!");
    } else if (sensorValue > butaneThreshold) {
      Serial.println("Butane detected!");
    } else if (sensorValue > propaneThreshold) {
      Serial.println("Propane detected!");
    } else {
      Serial.println("No specific gas detected.");
    }  

    // Print the sensor value to the serial monitor
    Serial.print("Gas Level: ");
    Serial.print(sensorValue);
    Serial.println(" ppm");

    Serial.println();

    if (Firebase.RTDB.setFloat(&fbdo, "Sensor/Temperature", temperature)) {
    Serial.print("Temperature successfully saved to: ");
    Serial.println(fbdo.dataPath());
    // Serial.println(" (" + fbdo.dataType() + ")");
    } else {
      Serial.println("Failed to save temperature data: " + fbdo.errorReason());
    }

    // Send humidity data to Firebase
    if (Firebase.RTDB.setFloat(&fbdo, "Sensor/Humidity", humidity)) {
      Serial.print("Humidity successfully saved to: ");
      Serial.println(fbdo.dataPath());
      // Serial.println(" (" + fbdo.dataType() + ")");
    } else {
      Serial.println("Failed to save humidity data: " + fbdo.errorReason());
    }

    // Send gas sensor value to Firebase
    if (Firebase.RTDB.setInt(&fbdo, "Sensor/GasLevel", sensorValue)) {
      Serial.print("Gas level successfully saved to: ");
      Serial.println(fbdo.dataPath());
      // Serial.println(" (" + fbdo.dataType() + ")");
    } else {
      Serial.println("Failed to save gas level data: " + fbdo.errorReason());
    }

    // Wait for a second before the next reading
    delay(2000);
  }    
} 