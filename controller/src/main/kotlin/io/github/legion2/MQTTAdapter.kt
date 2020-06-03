package io.github.legion2

import org.eclipse.microprofile.reactive.messaging.Incoming
import javax.enterprise.context.ApplicationScoped
import javax.inject.Inject
import javax.json.bind.JsonbBuilder

@ApplicationScoped
class MQTTAdapter {

    @Inject
    lateinit var roomRepository: RoomRepository

    @Incoming("temperature")
    fun getTemperature(payload: ByteArray) {
        val jsonString = String(payload)
        val jsonb = JsonbBuilder.create()
        val message = jsonb.fromJson(jsonString, Message::class.java)
        val room = roomRepository.get(message.tags.room) ?: return
        room.temperature = message.fields.temperature

        println("Updated room: ${room.name}")
    }
}
