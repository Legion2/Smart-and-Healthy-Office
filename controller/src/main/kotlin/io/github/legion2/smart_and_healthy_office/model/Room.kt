package io.github.legion2.smart_and_healthy_office.model

import java.util.*

/**
 * @param size the size of the room in m^2
 * @param temperature temperature in degree celsius
 * @param humidity in the rage of 0-1
 * @param brightness in LUX
 * @param loudness in dB
 * @param presence is the number of people in the room
 */
data class Room(val id: String, val name: String, val size: Float, val workspaces: Int, val temperature: Float = 0f, val humidity: Float = 0f, val brightness: Float = 0f, val loudness: Float = 0f, val presence: Int = 0) {
    internal val stress: Int
        get() {
            // Temperature Stress
            val temperatureStress = when (temperature) {
                in 19f..25f -> 0
                in 16f..19f -> rangeToStress(19f, 16f, temperature)
                in 25f..28f -> rangeToStress(25f, 28f, temperature)
                else -> 100
            }
            //Humidity Stress
            val humidityStress = when (humidity) {
                in 0.45f..0.60f -> 0
                in 0.60f..0.75f -> rangeToStress(0.60f, 0.75f, humidity)
                in 0.25f..0.45f -> rangeToStress(0.45f, 0.25f, humidity)
                else -> 100
            }
            //Loudness Stress
            val loudnessStress = when (loudness) {
                in 65f..75f -> 0
                in 50f..65f -> rangeToStress(65f, 50f, loudness)
                in 75f..85f -> rangeToStress(75f, 85f, loudness)
                else -> 100
            }
            //Presence Stress
            val presenceStress = when (val spacePerPerson = size / presence) {
                in 0f..3f -> 100
                in 3f..5f -> rangeToStress(5f, 3f, spacePerPerson)
                else -> 0
            }
            //brightness Stress
            val brightnessStress = when (brightness) {
                //for LUX sensors:
                in 300f..500f -> 0
                in 200f..300f -> rangeToStress(300f, 200f, brightness)
                in 500f..750f -> rangeToStress(500f, 750f, brightness)
                else -> 100
            }

            return Collections.max(listOf(temperatureStress, humidityStress, loudnessStress, brightnessStress, presenceStress))
        }
}

/**
 * Calculate the stress level from a range of minimum and maximum value.
 * The minimum can be greater than the maximum, in this case the stress scale is inverted
 */
fun rangeToStress(min: Float, max: Float, value: Float): Int {
    return (((value - min) / (max - min)) * 100).toInt()
}
