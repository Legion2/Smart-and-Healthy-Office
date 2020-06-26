package io.github.legion2.smart_and_healthy_office.notification

data class Notification<T: Any>(val type: String, val Content: T)