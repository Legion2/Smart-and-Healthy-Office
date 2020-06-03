package io.github.legion2

data class Room(var id: String = "", var name: String = "", var temperature: Float = 0f, val humidity: Float = 0f, val brightness: Float = 0f, val loudness: Float = 0f, val presence: Int = 0)