package io.github.legion2.smart_and_healthy_office.mqtt.message

data class HumidityMessage(val room: String, val humidity: Double, val timestamp: Long) {
    companion object {
        fun from(message: Message): HumidityMessage {
            return HumidityMessage(message.tags.getOrElse("room") { throw IllegalArgumentException("Invalid message, missing tag room: $message") }
                    , (message.fields.getOrElse("humidity") { throw IllegalArgumentException("Invalid message, missing field humidity: $message") } as? Double
                    ?: throw IllegalArgumentException("Invalid message, humidity field must be of type double: $message")), message.timestamp)
        }
    }
}
