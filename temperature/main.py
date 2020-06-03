import paho.mqtt.client as mqtt
import os
import json
import time
import random

mqtt_host = os.getenv("MQTT_HOST", "localhost")
mqtt_port = os.getenv("MQTT_PORT", 1883)
tag_host = os.getenv("TAG_HOST", "test")

# The callback for when the client receives a CONNACK response from the server.


def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))


client = mqtt.Client()
client.on_connect = on_connect

client.connect(mqtt_host, mqtt_port, 60)

client.loop_start()

class GaussTemperature:
    def __init__(self, avg, min, max, variation):
        self.current = avg
        self.avg = avg
        self.min = min
        self.max = max
        self.variation = variation

    # in degree celsius
    def read_from_thermometer(self):
        self.current += random.gauss(0.0, self.variation)
        self.current = max(self.min, self.current)
        self.current = min(self.max, self.current)
        return self.current

class UniformTemperature:
    def __init__(self, avg, min, max, variation):
        self.current = avg
        self.avg = avg
        self.min = min
        self.max = max
        self.variation = variation
    # in degree celsius
    def read_from_thermometer(self):
        return random.uniform(self.min, self.max)


def get_timestamp():
    return int(round(time.time() * 1000))

thermometer = GaussTemperature(23, 19, 26, 0.1)

while True:
    temperature = thermometer.read_from_thermometer()
    json_string = json.dumps({"name": "temperature",
                              "fields": {
                                  "temperature": temperature
                              }, "tags": {
                                  "host": tag_host
                              },
                              "timestamp": get_timestamp()})
    client.publish("test/temperature", json_string)
    time.sleep(2)
