package io.github.legion2.smart_and_healthy_office.mqtt.message

data class BrightnessMessage(val room: String, val brightness: Double, val timestamp: Long) {
    companion object {
        fun from(message: Message): BrightnessMessage {
            return BrightnessMessage(message.tags.getOrElse("room") { throw IllegalArgumentException("Invalid message, missing tag room: $message") }
                    , ((message.fields.getOrElse("brightness") { throw IllegalArgumentException("Invalid message, missing field brightness: $message") } as? Number
                    ?: throw IllegalArgumentException("Invalid message, brightness field must be of type double: $message"))).toDouble(), message.timestamp)
        }
    }
}
