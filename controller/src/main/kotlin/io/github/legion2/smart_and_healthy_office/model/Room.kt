package io.github.legion2.smart_and_healthy_office.model

/**
 * @param size the size of the room in m^2
 * @param temperature temperature in degree celsius
 * @param humidity in the rage of 0-1
 * @param brightness in LUX
 * @param loudness in dB
 * @param presence is the number of people in the room
 */
data class Room(val id: String, val name: String, val size: Float,  val temperature: Float = 0f, val humidity: Float = 0f, val brightness: Float = 0f, val loudness: Float = 0f, val presence: Int = 0)