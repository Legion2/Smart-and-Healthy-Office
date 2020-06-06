package io.github.legion2.smart_and_healthy_office.mqtt

import com.beust.klaxon.Klaxon
import io.github.legion2.smart_and_healthy_office.mqtt.message.*
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
            log.error("Runtime Exception while processing temperature", e)
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
            log.error("Runtime Exception while processing temperature", e)
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
            log.error("Runtime Exception while processing temperature", e)
        }
    }

    private fun parseMessage(payload: ByteArray): Message {
        val jsonString = String(payload)
        return Klaxon().parse<Message>(jsonString)
                ?: throw IllegalArgumentException("Can't parse MQTT message: $jsonString")
    }
}
