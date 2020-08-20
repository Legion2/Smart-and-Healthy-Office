FROM eclipse-mosquitto:1.6.12

COPY --chown=mosquitto:mosquitto mosquitto.conf /mosquitto/config/mosquitto.conf
COPY --chown=mosquitto:mosquitto passwordfile /mosquitto/config/passwordfile

EXPOSE 8883
