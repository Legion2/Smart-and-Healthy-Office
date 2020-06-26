package io.github.legion2.smart_and_healthy_office.pddl

import io.github.legion2.smart_and_healthy_office.model.Location
import io.github.legion2.smart_and_healthy_office.model.Room
import io.quarkus.test.junit.QuarkusTest
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import java.time.Duration
import java.time.ZonedDateTime
import javax.inject.Inject

@QuarkusTest
internal class PddlProblemGeneratorTest {

    @Inject
    lateinit var generator: PddlProblemGenerator

    @Test
    fun testLoadTemplates() {
        val (domain, plan) = generator.generateProblem(
                listOf(Room("room1", "test", 50f)),
                mapOf("user1" to Location.Room("room1")),
                emptyList())
        println(domain)
        println(plan)
    }

    @Test
    fun testLastRoomChange() {
        val action = Action("change_room", listOf("user1", "room2"), ZonedDateTime.now())
        val history = listOf(Action("test", emptyList(), ZonedDateTime.now()),
                Action("change_room", listOf("user1", "room1"), action.timestamp.minusSeconds(100)),
                action)

        Assertions.assertEquals(action, history.lastRoomChange("user1"))
    }
    @Test
    fun testChangeRoomCoolDown()  {
        Assertions.assertEquals(0, changeRoomCoolDown(Duration.ofDays(1)))
        Assertions.assertEquals(0, changeRoomCoolDown(Duration.ofMinutes(11)))
        Assertions.assertEquals(0, changeRoomCoolDown(Duration.ofMinutes(10)))
        Assertions.assertEquals(500, changeRoomCoolDown(Duration.ofMinutes(5)))
        Assertions.assertEquals(1000, changeRoomCoolDown(Duration.ofMinutes(0)))
    }
}