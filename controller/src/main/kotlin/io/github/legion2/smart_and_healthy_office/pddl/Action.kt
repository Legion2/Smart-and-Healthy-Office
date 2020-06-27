package io.github.legion2.smart_and_healthy_office.pddl

import java.time.ZonedDateTime

data class Action(val name: String, val parameters: List<String>, val timestamp: ZonedDateTime)
