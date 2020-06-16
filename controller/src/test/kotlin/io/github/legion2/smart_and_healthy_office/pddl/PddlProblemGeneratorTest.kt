package io.github.legion2.smart_and_healthy_office.pddl

import io.github.legion2.smart_and_healthy_office.model.Location
import io.github.legion2.smart_and_healthy_office.model.Room
import io.quarkus.test.junit.QuarkusTest
import org.junit.jupiter.api.Test
import javax.inject.Inject

@QuarkusTest
internal class PddlProblemGeneratorTest {

    @Inject
    lateinit var generator: PddlProblemGenerator

    @Test
    fun testLoadTemplates() {
        val (domain, plan) = generator.generateProblem(listOf(Room("room1", "test")), mapOf("user1" to Location.Room("room1")))
        println(domain)
        println(plan)
    }
}