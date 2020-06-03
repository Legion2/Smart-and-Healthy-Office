package io.github.legion2

data class Message(var fields: Fields = Fields(), var tags: Tags = Tags(), var name: String = "", var timestamp: Long = 0)

data class Tags(var room: String = "")

data class Fields(var temperature: Float = 0f)