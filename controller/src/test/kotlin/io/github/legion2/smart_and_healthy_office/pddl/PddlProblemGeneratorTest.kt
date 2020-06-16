package io.github.legion2.smart_and_healthy_office.pddl

import io.quarkus.test.junit.QuarkusTest
import org.junit.jupiter.api.Test
import javax.inject.Inject

@QuarkusTest
internal class PddlProblemGeneratorTest {

    @Inject
    lateinit var generator: PddlProblemGenerator

    @Test
    fun testLoadTemplates() {
        generator.generateProblem()
    }
}