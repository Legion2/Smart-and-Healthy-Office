package io.github.legion2.smart_and_healthy_office.model

data class Room(val id: String, val name: String, val temperature: Float = 0f, val humidity: Float = 0f, val brightness: Float = 0f, val loudness: Float = 0f, val presence: Int = 0)