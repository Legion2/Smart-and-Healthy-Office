package io.github.legion2.smart_and_healthy_office.mqtt.message

data class LocationMessage(val room: String, val mac: String, val timestamp: Long) {
    companion object {
        fun from(message: Message): LocationMessage {
            return LocationMessage(message.tags.getValue("room"), (message.fields.getValue("mac") as? String
                    ?: throw IllegalArgumentException("Invalid message, loudness field must be of type string: $message")), message.timestamp)
        }
    }
}