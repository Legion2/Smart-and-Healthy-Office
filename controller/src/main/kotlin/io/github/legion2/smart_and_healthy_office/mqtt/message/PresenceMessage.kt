package io.github.legion2.smart_and_healthy_office.mqtt.message

data class PresenceMessage(val room: String, val presence: Int, val timestamp: Long) {
    companion object {
        fun from(message: Message): PresenceMessage {
            return PresenceMessage(message.tags.getValue("room"), ((message.fields.getValue("presence") as? Number
                    ?: throw IllegalArgumentException("Invalid message, loudness field must be of type integer: $message"))).toInt(), message.timestamp)
        }
    }
}