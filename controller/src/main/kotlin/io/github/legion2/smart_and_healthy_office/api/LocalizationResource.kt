package io.github.legion2.smart_and_healthy_office.api

import io.github.legion2.smart_and_healthy_office.model.Location
import io.github.legion2.smart_and_healthy_office.repository.LocalizationRepository
import javax.inject.Inject
import javax.ws.rs.*
import javax.ws.rs.core.MediaType

@Path("/location")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class LocalizationResource {
    @Inject
    lateinit var localizationRepository: LocalizationRepository

    @GET
    @Path("{user}")
    fun getLocation(@PathParam("user") user: String): String {
        return when (val location = localizationRepository.getLocation(user)) {
            is Location.Room -> location.room
            Location.Unknown -> "Location.Unknown"
            null -> throw IllegalArgumentException("Unknown user: $user")
        }
    }

    @POST
    @Path("{user}")
    fun setLocation(@PathParam("user") user: String, body: UserLocationBody) {
        localizationRepository.setLocation(user, Location.Room(body.location))
    }
}

class UserLocationBody(var location: String = "")