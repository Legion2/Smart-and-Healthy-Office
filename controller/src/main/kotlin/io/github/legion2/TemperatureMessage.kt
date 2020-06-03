package io.github.legion2

data class TemperatureMessage(var fields : Map<String, String> = emptyMap(), var tags: Map<String, String> = emptyMap(), var name: String ="", var timestamp: Long = 0) {

//{"name": "temperature", "fields": {"temperature": 22.154903898884864}, "tags": {"host": "test"}, "timestamp": 1591182083603}    
}