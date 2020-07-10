package io.github.legion2.smart_and_healthy_office.api

import io.github.legion2.smart_and_healthy_office.repository.RoomRepository
import org.eclipse.microprofile.openapi.annotations.media.Schema
import javax.inject.Inject
import javax.ws.rs.*
import javax.ws.rs.core.MediaType.APPLICATION_JSON
import io.github.legion2.smart_and_healthy_office.model.Room as RoomModel

@Path("/rooms")
@Produces(APPLICATION_JSON)
@Consumes(APPLICATION_JSON)
class RoomResource {

    @Inject
    lateinit var repository: RoomRepository

    @GET
    fun getAll(): List<Room> {
        return repository.getAll().map { Room.from(it) }
    }

    @GET
    @Path("{id}")
    fun get(@PathParam("id") id: String): Room {
        return Room.from(repository.get(id) ?: throw NoSuchElementException("No room found with id: $id"))
    }
}

@Schema(readOnly = true)
data class Room(@field:Schema(required = true) val id: String,
                @field:Schema(required = true) val name: String,
                @field:Schema(required = true) val size: Float,
                @field:Schema(required = true) val desks: Int,
                @field:Schema(required = true) val temperature: Float,
                @field:Schema(required = true) val humidity: Float,
                @field:Schema(required = true) val brightness: Float,
                @field:Schema(required = true) val loudness: Float,
                @field:Schema(required = true) val presence: Int,
                @field:Schema(required = true) val stress: Int) {
    companion object {
        fun from(model: RoomModel): Room {
            return model.run { Room(id, name, size, desks, temperature, humidity, brightness, loudness, presence, stress) }
        }
    }
}