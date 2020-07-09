package io.github.legion2.smart_and_healthy_office.notification

import io.github.legion2.smart_and_healthy_office.model.Room

fun changeRoomNotification(newRoom: Room, currentRoom: Room): Notification {
    return Notification(title = "Move to ${newRoom.name} to lower your stress level",
            body = "Your stress level in the current room is ${currentRoom.stress}")
}
