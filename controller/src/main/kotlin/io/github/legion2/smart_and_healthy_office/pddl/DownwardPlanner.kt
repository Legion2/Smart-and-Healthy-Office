package io.github.legion2.smart_and_healthy_office.pddl

import org.eclipse.microprofile.config.inject.ConfigProperty
import java.io.IOException
import java.nio.charset.StandardCharsets
import java.nio.file.Files
import java.nio.file.Path
import java.util.concurrent.TimeUnit
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class DownwardPlanner {

    @ConfigProperty(name = "downward.planner.path")
    lateinit var plannerPath: String

    @ConfigProperty(name = "downward.planner.options")
    lateinit var plannerOptions: List<String>

    @ConfigProperty(name = "downward.planner.timeout", defaultValue = "10")
    var timeout: Long = 0

    fun generatePlan(domain: String, problem: String): String {
        val tempPath = Files.createTempDirectory("downward-working")
        val domainPath = tempPath.resolve("domain.pddl")
        val problemPath = tempPath.resolve("problem.pddl")
        val planPath = tempPath.resolve("plan.sas")
        Files.writeString(domainPath, domain)
        Files.writeString(problemPath, problem)

        val processBuilder = ProcessBuilder(listOf(Path.of(plannerPath, "fast-downward.py").toAbsolutePath().toString(),
                "--plan-file", planPath.toAbsolutePath().toString(),
                domainPath.toAbsolutePath().toString(),
                problemPath.toAbsolutePath().toString()) + plannerOptions).redirectErrorStream(true)

        processBuilder.directory(tempPath.toFile())
        val process = processBuilder.start()

        if (!process.waitFor(timeout, TimeUnit.SECONDS)) {
            process.destroy()
            val processOutput = process.inputStream.readAllBytes().toString(StandardCharsets.UTF_8)
            throw RuntimeException("execution timed out:\n$processOutput")
        }
        if (process.exitValue() != 0) {
            val processOutput = process.inputStream.readAllBytes().toString(StandardCharsets.UTF_8)
            throw RuntimeException("execution failed with code ${process.exitValue()}:\n$processOutput")
        }
        val plan = Files.readString(planPath)
        try {
            Files.walk(tempPath)
                    .sorted(Comparator.reverseOrder())
                    .forEach { Files.delete(it) }
        } catch (e: IOException) {
            throw IllegalStateException("Could not delete temp files", e)
        }

        return plan
    }
}