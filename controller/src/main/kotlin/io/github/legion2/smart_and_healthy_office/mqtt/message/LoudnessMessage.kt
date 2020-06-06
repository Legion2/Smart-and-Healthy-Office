package io.github.legion2.smart_and_healthy_office.mqtt.message

data class LoudnessMessage(val room: String, val loudness: Double, val timestamp: Long) {
    companion object {
        fun from(message: Message): LoudnessMessage {
            return LoudnessMessage(message.tags.getOrElse("room") { throw IllegalArgumentException("Invalid message, missing tag room: $message") }
                    , (message.fields.getOrElse("loudness") { throw IllegalArgumentException("Invalid message, missing field loudness: $message") } as? Double
                    ?: throw IllegalArgumentException("Invalid message, loudness field must be of type double: $message")), message.timestamp)
        }
    }
}