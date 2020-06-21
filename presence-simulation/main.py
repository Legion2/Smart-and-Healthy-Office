from typing import List, Set, Dict, Tuple, Optional
import paho.mqtt.client as mqtt
import os
import json
import time
import random

mqtt_host = os.getenv("MQTT_HOST", "localhost")
mqtt_port = os.getenv("MQTT_PORT", 1883)
rooms_config_path = os.getenv("ROOMS_CONFIG_FILE", "rooms.json")
localization_config_path = os.getenv("LOCALIZATION_CONFIG_FILE", "localization.json")
base_topic = "test/"


class User:
    def __init__(self, id: str, mac: str):
        self.id = id
        self.mac = mac
        self.room: Room = None


class Room:
    def __init__(self, id: str):
        self.id = id


rooms: List[Room] = []
users: List[User] = []


def get_timestamp():
    return int(round(time.time() * 1000))


def load_data():
    with open(rooms_config_path) as json_file:
        rooms_config = json.load(json_file)
        for room_config in rooms_config["rooms"]:
            rooms.append(Room(room_config["id"]))

    with open(localization_config_path) as json_file:
        users_config = json.load(json_file)
        for user_config in users_config["users"]:
            users.append(User(user_config["id"], user_config["mac"]))


def send_mqtt(room_id: str, presence: int):
    json_string = json.dumps({"name": "presence",
                              "fields": {
                                  "presence": presence
                              }, "tags": {
                                  "room": room_id
                              },
                              "timestamp": get_timestamp()})
    client.publish(base_topic + "presence", json_string)


def send_location(user: User):
    json_string = json.dumps({"name": "location",
                              "fields": {
                                  "mac": user.mac
                              }, "tags": {
                                  "room": user.room.id
                              },
                              "timestamp": get_timestamp()})
    client.publish(base_topic + "location", json_string)


load_data()


def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))


client = mqtt.Client()
client.on_connect = on_connect

client.connect(mqtt_host, mqtt_port, 60)

client.loop_start()

# assign random room to users
for user in users:
    room_index = random.randint(0, len(rooms) - 1)
    room = rooms[room_index]
    user.room = room


while True:
    for room in rooms:
        users_in_room = [user for user in users if user.room == room]
        send_mqtt(room.id, len(users_in_room))

    for user in users:
        send_location(user)
    time.sleep(10)
