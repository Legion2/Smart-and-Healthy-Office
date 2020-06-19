import paho.mqtt.client as mqtt
import os
import json
import time
import random

mqtt_host = os.getenv("MQTT_HOST", "localhost")
mqtt_port = os.getenv("MQTT_PORT", 1883)
room_id = os.getenv("ROOM_ID", "test")
base_topic = "test/"

# The callback for when the client receives a CONNACK response from the server.


def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))


client = mqtt.Client()
client.on_connect = on_connect

client.connect(mqtt_host, mqtt_port, 60)

client.loop_start()


class GaussDistribution:
    def __init__(self, avg, min, max, variation):
        self.current = avg
        self.avg = avg
        self.min = min
        self.max = max
        self.variation = variation

    # in degree celsius
    def read_value(self):
        self.current += random.gauss(0.0, self.variation)
        self.current = max(self.min, self.current)
        self.current = min(self.max, self.current)
        return self.current


class UniformDistribution:
    def __init__(self, avg, min, max, variation):
        self.current = avg
        self.avg = avg
        self.min = min
        self.max = max
        self.variation = variation
    # in degree celsius

    def read_value(self):
        return random.uniform(self.min, self.max)


def get_timestamp():
    return int(round(time.time() * 1000))


thermometer = GaussDistribution(23, 16, 28, 0.1)
humiditySensor = GaussDistribution(50, 35, 70, 0.1)
brightnessSensor = GaussDistribution(350, 250, 750, 1)
loudnessSensor = GaussDistribution(60, 55, 75, 0.01)

def simulate_temperature():
    temperature = thermometer.read_value()
    json_string = json.dumps({"name": "temperature",
                              "fields": {
                                  "temperature": temperature
                              }, "tags": {
                                  "room": room_id
                              },
                              "timestamp": get_timestamp()})
    client.publish(base_topic + "temperature", json_string)


def simulate_humidity():
    humidity = humiditySensor.read_value()
    json_string = json.dumps({"name": "humidity",
                              "fields": {
                                  "humidity": humidity
                              }, "tags": {
                                  "room": room_id
                              },
                              "timestamp": get_timestamp()})
    client.publish(base_topic + "humidity", json_string)


def simulate_brightness():
    brightness = brightnessSensor.read_value()
    json_string = json.dumps({"name": "brightness",
                              "fields": {
                                  "brightness": brightness
                              }, "tags": {
                                  "room": room_id
                              },
                              "timestamp": get_timestamp()})
    client.publish(base_topic + "brightness", json_string)


def simulate_loudness():
    loudness = loudnessSensor.read_value()
    json_string = json.dumps({"name": "loudness",
                              "fields": {
                                  "loudness": loudness
                              }, "tags": {
                                  "room": room_id
                              },
                              "timestamp": get_timestamp()})
    client.publish(base_topic + "loudness", json_string)


while True:
    simulate_temperature()
    simulate_humidity()
    simulate_brightness()
    simulate_loudness()
    time.sleep(10)
