package io.github.legion2.smart_and_healthy_office.notification

data class Notification(val actions: List<NotificationAction> = emptyList(),
                        val badge: String? = null,
                        val body: String? = null,
                        val data: Any? = null,
                        val dir: String? = "auto",
                        val icon: String? = null,
                        val lang: String? = null,
                        val renotify: Boolean? = null,
                        val requireInteraction: Boolean? = null,
                        val silent: Boolean? = null,
                        val tag: String? = null,
                        val timestamp: Long? = null,
                        val title: String,
                        val vibrate: List<Int>? = null
)

data class NotificationAction(val action: String, val title: String, val icon: String?)
