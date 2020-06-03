package io.github.legion2.smart_and_healthy_office.mqtt

import com.beust.klaxon.Klaxon
import io.github.legion2.smart_and_healthy_office.repository.RoomRepository
import org.eclipse.microprofile.reactive.messaging.Incoming
import javax.enterprise.context.ApplicationScoped
import javax.inject.Inject

@ApplicationScoped
class MQTTAdapter {

    @Inject
    lateinit var roomRepository: RoomRepository

    @Incoming("temperature")
    fun getTemperature(payload: ByteArray) {
        val jsonString = String(payload)
        val message = Klaxon().parse<Message>(jsonString) ?: return
        val room = roomRepository.get(message.tags.room) ?: return
        room.temperature = message.fields.temperature

        println("Updated room: ${room.name}")
    }
}
