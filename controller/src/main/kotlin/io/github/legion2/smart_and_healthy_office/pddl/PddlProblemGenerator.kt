package io.github.legion2.smart_and_healthy_office.pddl

import java.nio.charset.StandardCharsets
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class PddlProblemGenerator {

    private val domainTemplatePath = "domain.pddl"
    private val problemTemplatePath = "problem.pddl"

    fun generateProblem(): Pair<String, String> {
        val domainTemplate = this.javaClass.getResourceAsStream(domainTemplatePath)?.readAllBytes()?.toString(StandardCharsets.UTF_8)
                ?: throw IllegalStateException("Missing $domainTemplatePath")
        val problemTemplate = this.javaClass.getResourceAsStream(problemTemplatePath)?.readAllBytes()?.toString(StandardCharsets.UTF_8)
                ?: throw IllegalStateException("Missing $problemTemplatePath")

        return domainTemplate to problemTemplate
    }

}