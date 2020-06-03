package io.github.legion2.smart_and_healthy_office.api

import io.github.legion2.smart_and_healthy_office.model.Room
import io.github.legion2.smart_and_healthy_office.repository.RoomRepository
import javax.inject.Inject
import javax.ws.rs.*
import javax.ws.rs.core.MediaType.APPLICATION_JSON

@Path("/rooms")
@Produces(APPLICATION_JSON)
@Consumes(APPLICATION_JSON)
class RoomResource {

    @Inject
    lateinit var repository: RoomRepository

    @GET
    fun getAll(): List<Room> {
        return repository.getAll()
    }

    @GET
    @Path("{id}")
    fun get(@PathParam("id") id: String): Room {
        return repository.get(id) ?: throw NoSuchElementException("No room found with id: $id")
    }
}