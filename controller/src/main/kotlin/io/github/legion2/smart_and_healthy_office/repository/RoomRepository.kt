package io.github.legion2.smart_and_healthy_office.repository

import com.beust.klaxon.Klaxon
import io.github.legion2.smart_and_healthy_office.model.Room
import io.github.legion2.smart_and_healthy_office.mqtt.Message
import org.eclipse.microprofile.config.inject.ConfigProperty
import java.lang.IllegalArgumentException
import java.nio.file.Files
import java.nio.file.Path
import javax.annotation.PostConstruct
import javax.enterprise.context.ApplicationScoped
import javax.json.bind.JsonbBuilder

@ApplicationScoped
class RoomRepository {

    @ConfigProperty(name = "room.config.file")
    lateinit var configFilePath: String

    @PostConstruct
    private fun setup() {
        val configFile = Files.readString(Path.of(configFilePath))
        val rooms = Klaxon().parse<RoomConfig>(configFile) ?: throw IllegalArgumentException("Can not load config file")

        rooms.rooms.forEach { roomMetadata ->
            val room = Room()
            room.id = roomMetadata.id
            room.name = roomMetadata.name
            this.rooms[room.id] = room
        }
    }

    var rooms = mutableMapOf<String, Room>()

    fun getAll(): List<Room> {
        return rooms.values.toList()
    }

    fun get(id: String): Room? {
        return rooms[id]
    }
}