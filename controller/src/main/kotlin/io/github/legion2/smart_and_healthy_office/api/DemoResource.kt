package io.github.legion2.smart_and_healthy_office.api

import io.github.legion2.smart_and_healthy_office.ai.AIService
import io.github.legion2.smart_and_healthy_office.model.Location
import io.github.legion2.smart_and_healthy_office.notification.WebPushService
import io.github.legion2.smart_and_healthy_office.notification.changeRoomNotification
import io.github.legion2.smart_and_healthy_office.pddl.getRoom
import io.github.legion2.smart_and_healthy_office.repository.LocalizationRepository
import io.github.legion2.smart_and_healthy_office.repository.RoomRepository
import javax.inject.Inject
import javax.ws.rs.*
import javax.ws.rs.core.MediaType

@Path("/demo")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class DemoResource {
    @Inject
    lateinit var aiService: AIService

    @Inject
    lateinit var webPushService: WebPushService

    @Inject
    lateinit var roomRepository: RoomRepository

    @Inject
    lateinit var localizationRepository: LocalizationRepository

    @POST
    @Path("reset-action-history")
    fun resetActionHistory() {
        aiService.resetHistory()
    }

    @POST
    @Path("send-notification/{user}")
    @Consumes(MediaType.TEXT_PLAIN)
    fun sendNotification(@PathParam("user") user: String, roomId: String) {
        val location = localizationRepository.getLocation(user) ?: throw WebApplicationException("User not Found", 404)
        if (location is Location.Room) {
            val rooms = roomRepository.getAll()
            val currentRoom = rooms.getRoom(location.room)
            val newRoom = rooms.getRoom(roomId)

            webPushService.sendPushNotification(user, changeRoomNotification(newRoom, currentRoom))
        } else {
            throw WebApplicationException("Unsupported user location", 500)
        }
    }
}