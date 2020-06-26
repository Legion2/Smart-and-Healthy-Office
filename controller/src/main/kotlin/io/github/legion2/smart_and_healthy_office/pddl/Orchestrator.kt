package io.github.legion2.smart_and_healthy_office.pddl

import io.github.legion2.smart_and_healthy_office.model.Location
import io.github.legion2.smart_and_healthy_office.model.Room
import io.github.legion2.smart_and_healthy_office.notification.Notification
import io.github.legion2.smart_and_healthy_office.notification.WebPushService
import javax.enterprise.context.ApplicationScoped
import javax.inject.Inject

@ApplicationScoped
class Orchestrator {
    private val actionPattern = "^\\((\\S+)((\\s+\\S+)*)\\)$".toRegex()
    private val costPattern = "^; cost = (\\d+) \\(\\S+ cost\\)$".toRegex()

    @Inject
    private lateinit var webPushService: WebPushService


    fun execute(plan: String, context: List<Room>, users: Map<String, Location>) {
        try {
            plan.lineSequence().filter { it.isNotBlank() }.map { parseLine(it) }.forEach { line ->
                when (line) {
                    is Line.Action -> {
                        interpretAction(line)
                    }
                    is Line.Cost -> {
                        println("Plan cost: ${line.cost}")
                    }
                }
            }
        } catch (e: RuntimeException) {
            throw IllegalArgumentException("Could not execute plan: $plan", e)
        }
    }

    private fun parseLine(line: String): Line {
        return when {
            line.matches(actionPattern) -> parseAction(line)
            line.matches(costPattern) -> parseCost(line)
            else -> throw IllegalArgumentException("Can not parse line:$line")
        }
    }

    private fun parseAction(line: String): Line.Action {
        val match = actionPattern.matchEntire(line) ?: throw IllegalArgumentException()
        val values = match.groupValues
        val actionName = values[1]
        val parameters = values.getOrElse(2) { "" }.trim().split("\\s+".toRegex())
        return Line.Action(actionName, parameters)
    }

    private fun parseCost(line: String): Line.Cost {
        val match = costPattern.matchEntire(line) ?: throw IllegalArgumentException()
        return Line.Cost(match.groupValues[1].toInt())
    }

    private fun interpretAction(action: Line.Action) {
        when (action.name) {
            "change_room" -> {
                val user = action.parameters[0].removePrefix("user-")
                val newRoom = action.parameters[2].removePrefix("room-")
                webPushService.sendPushNotification(user, Notification("action-change-room", newRoom))
            }
            "not_change_room" -> Unit
            else -> throw IllegalArgumentException("Unknown action: $action")
        }
    }

}

sealed class Line {
    class Action(val name: String, val parameters: List<String>) : Line()
    class Cost(val cost: Int) : Line()
}
