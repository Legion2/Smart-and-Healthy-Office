package io.github.legion2.smart_and_healthy_office.repository

import com.beust.klaxon.Klaxon
import io.github.legion2.smart_and_healthy_office.model.Room
import org.eclipse.microprofile.config.inject.ConfigProperty
import java.nio.file.Files
import java.nio.file.Path
import java.util.concurrent.ConcurrentHashMap
import javax.annotation.PostConstruct
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class RoomRepository {

    @ConfigProperty(name = "room.config.file")
    lateinit var configFilePath: String
    lateinit var rooms: MutableMap<String, Room>

    @PostConstruct
    private fun setup() {
        val configFile = Files.readString(Path.of(configFilePath))
        val roomsConfig = Klaxon().parse<RoomConfig>(configFile)
                ?: throw IllegalArgumentException("Can not load config file")

        rooms = ConcurrentHashMap(roomsConfig.rooms.map { roomMetadata ->
            roomMetadata.id to Room(roomMetadata.id, roomMetadata.name, roomMetadata.size, roomMetadata.workspaces)
        }.toMap())
    }

    fun getAll(): List<Room> {
        return rooms.values.toList()
    }

    fun get(id: String): Room? {
        return rooms[id]
    }

    fun update(id: String, update: (Room) -> Room) {
        rooms.computeIfPresent(id) { _, oldValue ->
            update.invoke(oldValue)
        }
    }
}