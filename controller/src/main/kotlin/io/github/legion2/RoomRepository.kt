package io.github.legion2

import org.eclipse.microprofile.config.inject.ConfigProperty
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

        val rooms = JsonbBuilder.create().fromJson(configFile, RoomConfig::class.java)

        rooms.rooms.forEach { room ->
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