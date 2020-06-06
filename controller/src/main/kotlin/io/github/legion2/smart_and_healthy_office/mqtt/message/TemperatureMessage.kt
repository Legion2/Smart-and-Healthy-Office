package io.github.legion2.smart_and_healthy_office.mqtt.message

data class TemperatureMessage(val room: String, val temperature: Double, val timestamp: Long) {
    companion object {
        fun from(message: Message): TemperatureMessage {
            return TemperatureMessage(message.tags.getOrElse("room") { throw IllegalArgumentException("Invalid message, missing tag room: $message") }
                    , (message.fields.getOrElse("temperature") { throw IllegalArgumentException("Invalid message, missing field temperature: $message") } as? Double
                    ?: throw IllegalArgumentException("Invalid message, temperature field must be of type double: $message")), message.timestamp)
        }
    }
}
