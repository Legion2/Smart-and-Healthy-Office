package io.github.legion2.smart_and_healthy_office.pddl

import io.github.legion2.smart_and_healthy_office.model.Location
import io.github.legion2.smart_and_healthy_office.model.Room
import io.quarkus.test.junit.QuarkusTest
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import javax.inject.Inject

@QuarkusTest
internal class PddlProblemGeneratorTest {

    @Inject
    lateinit var generator: PddlProblemGenerator

    @Test
    fun testLoadTemplates() {
        val (domain, plan) = generator.generateProblem(listOf(Room("room1", "test", 50f)), mapOf("user1" to Location.Room("room1")))
        println(domain)
        println(plan)
    }

    @Test
    fun testRangeToStress() {
        Assertions.assertEquals(10, generator.rangeToStress(10f, 30f, 12f))
        Assertions.assertEquals(0, generator.rangeToStress(10f, 30f, 10f))
        Assertions.assertEquals(100, generator.rangeToStress(10f, 30f, 30f))
        Assertions.assertEquals(50, generator.rangeToStress(10f, 30f, 20f))
        Assertions.assertEquals(66, generator.rangeToStress(-10f, 5f, 0f))
        Assertions.assertEquals(20, generator.rangeToStress(10f, 0f, 8f))
    }
}