package io.github.legion2

import org.eclipse.microprofile.reactive.messaging.Incoming
import javax.enterprise.context.ApplicationScoped
import javax.json.bind.JsonbBuilder


@ApplicationScoped
class MQTTAdapter {
    @Incoming("temperature")
    fun getTemperature(payload: ByteArray) {
        val jsonString = String(payload)
        val jsonb = JsonbBuilder.create()
        val message = jsonb.fromJson(jsonString, TemperatureMessage::class.java)
        println(message)
    }
}