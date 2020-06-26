package io.github.legion2.smart_and_healthy_office.pddl

import io.github.legion2.smart_and_healthy_office.model.Location
import io.github.legion2.smart_and_healthy_office.model.Room
import io.github.legion2.smart_and_healthy_office.notification.Notification
import io.github.legion2.smart_and_healthy_office.notification.WebPushService
import java.time.ZonedDateTime
import javax.enterprise.context.ApplicationScoped
import javax.inject.Inject

@ApplicationScoped
class Orchestrator {
    private val actionPattern = "^\\((\\S+)((\\s+\\S+)*)\\)$".toRegex()
    private val costPattern = "^; cost = (\\d+) \\(\\S+ cost\\)$".toRegex()

    @Inject
    private lateinit var webPushService: WebPushService


    fun execute(plan: String, context: List<Room>, users: Map<String, Location>): List<Action> {
        try {
            return plan.lineSequence().filter { it.isNotBlank() }.map { parseLine(it) }.mapNotNull { line ->
                when (line) {
                    is Line.PlanAction -> {
                        interpretAction(line)
                    }
                    is Line.Cost -> {
                        println("Plan cost: ${line.cost}")
                        null
                    }
                }
            }.toList()
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

    private fun parseAction(line: String): Line.PlanAction {
        val match = actionPattern.matchEntire(line) ?: throw IllegalArgumentException()
        val values = match.groupValues
        val actionName = values[1]
        val parameters = values.getOrElse(2) { "" }.trim().split("\\s+".toRegex())
        return Line.PlanAction(actionName, parameters)
    }

    private fun parseCost(line: String): Line.Cost {
        val match = costPattern.matchEntire(line) ?: throw IllegalArgumentException()
        return Line.Cost(match.groupValues[1].toInt())
    }

    private fun interpretAction(action: Line.PlanAction): Action? {
        return when (action.name) {
            "change_room" -> {
                val user = action.parameters[0].removePrefix("user-")
                val oldRoom = action.parameters[1].removePrefix("room-")
                val newRoom = action.parameters[2].removePrefix("room-")
                webPushService.sendPushNotification(user, Notification(title = "action-change-room", body = newRoom))
                Action(action.name, listOf(user, oldRoom, newRoom), ZonedDateTime.now())
            }
            "not_change_room", "add_extra_cost_change_room_cool_down" -> null
            else -> throw IllegalArgumentException("Unknown action: $action")
        }
    }

}

sealed class Line {
    class PlanAction(val name: String, val parameters: List<String>) : Line()
    class Cost(val cost: Int) : Line()
}
