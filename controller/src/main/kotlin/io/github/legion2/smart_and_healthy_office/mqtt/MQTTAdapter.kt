package io.github.legion2.smart_and_healthy_office.mqtt

import com.beust.klaxon.Klaxon
import io.github.legion2.smart_and_healthy_office.model.Location
import io.github.legion2.smart_and_healthy_office.mqtt.message.*
import io.github.legion2.smart_and_healthy_office.repository.LocalizationRepository
import io.github.legion2.smart_and_healthy_office.repository.RoomRepository
import org.eclipse.microprofile.reactive.messaging.Incoming
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import javax.enterprise.context.ApplicationScoped
import javax.inject.Inject

@ApplicationScoped
class MQTTAdapter {

    private val log: Logger = LoggerFactory.getLogger(MQTTAdapter::class.java)

    @Inject
    lateinit var roomRepository: RoomRepository
    @Inject
    lateinit var localizationRepository: LocalizationRepository

    @Incoming("temperature")
    fun processTemperature(payload: ByteArray) {
        try {
            val message = TemperatureMessage.from(parseMessage(payload))
            roomRepository.update(message.room) {
                it.copy(temperature = message.temperature.toFloat())
            }
        } catch (e: RuntimeException) {
            log.error("Runtime Exception while processing temperature", e)
        }
    }

    @Incoming("humidity")
    fun processHumidity(payload: ByteArray) {
        try {
            val message = HumidityMessage.from(parseMessage(payload))
            roomRepository.update(message.room) {
                it.copy(humidity = message.humidity.toFloat())
            }
        } catch (e: RuntimeException) {
            log.error("Runtime Exception while processing humidity", e)
        }
    }

    @Incoming("loudness")
    fun processLoudness(payload: ByteArray) {
        try {
            val message = LoudnessMessage.from(parseMessage(payload))
            roomRepository.update(message.room) {
                it.copy(loudness = message.loudness.toFloat())
            }
        } catch (e: RuntimeException) {
            log.error("Runtime Exception while processing loudness", e)
        }
    }

    @Incoming("brightness")
    fun processBrightness(payload: ByteArray) {
        try {
            val message = BrightnessMessage.from(parseMessage(payload))
            roomRepository.update(message.room) {
                it.copy(brightness = message.brightness.toFloat())
            }
        } catch (e: RuntimeException) {
            log.error("Runtime Exception while processing brightness", e)
        }
    }

    @Incoming("presence")
    fun processPresence(payload: ByteArray) {
        try {
            val message = PresenceMessage.from(parseMessage(payload))
            roomRepository.update(message.room) {
                it.copy(presence = message.presence)
            }
        } catch (e: RuntimeException) {
            log.error("Runtime Exception while processing presence", e)
        }
    }

    @Incoming("location")
    fun processLocation(payload: ByteArray) {
        try {
            val message = LocationMessage.from(parseMessage(payload))
            localizationRepository.setMacLocation(message.mac, Location.Room(message.room))
        } catch (e: RuntimeException) {
            log.error("Runtime Exception while processing location", e)
        }
    }

    private fun parseMessage(payload: ByteArray): Message {
        val jsonString = String(payload)
        return Klaxon().parse<Message>(jsonString)
                ?: throw IllegalArgumentException("Can't parse MQTT message: $jsonString")
    }
}
