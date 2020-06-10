package io.github.legion2.smart_and_healthy_office.model

sealed class Location {
    data class Room(val room: String): Location()
    object Unknown: Location()
}