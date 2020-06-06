package io.github.legion2.smart_and_healthy_office.mqtt.message

data class Message(val fields: Map<String, Any>, val tags: Map<String, String>, val name: String, val timestamp: Long)
