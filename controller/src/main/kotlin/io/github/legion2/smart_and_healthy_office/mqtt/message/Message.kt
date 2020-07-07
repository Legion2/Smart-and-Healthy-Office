package io.github.legion2.smart_and_healthy_office.mqtt.message

/**
 * @param fields The values of the measurement
 * @param name The name of the measurement
 * @param tags The metadata of the measurement
 * @param timestamp the timestamp in milliseconds since the Epoch
 */
data class Message(val fields: Map<String, Any>, val tags: Map<String, String>, val name: String, val timestamp: Long)
