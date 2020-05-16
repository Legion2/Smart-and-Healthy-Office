## Create new MQTT user

On windows:
```
docker run --rm -v "%cd%:/data" -w /data eclipse-mosquitto mosquitto_passwd -b passwordfile <user> <password>
```
On linux:
```
docker run --rm -v "${PWD}:/data" -w /data eclipse-mosquitto mosquitto_passwd -b passwordfile <user> <password>
```