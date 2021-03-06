package io.github.legion2.smart_and_healthy_office.ai

import io.github.legion2.smart_and_healthy_office.pddl.Action
import io.github.legion2.smart_and_healthy_office.pddl.DownwardPlanner
import io.github.legion2.smart_and_healthy_office.pddl.Orchestrator
import io.github.legion2.smart_and_healthy_office.pddl.PddlProblemGenerator
import io.github.legion2.smart_and_healthy_office.repository.LocalizationRepository
import io.github.legion2.smart_and_healthy_office.repository.RoomRepository
import io.quarkus.scheduler.Scheduled
import org.eclipse.microprofile.config.inject.ConfigProperty
import javax.enterprise.context.ApplicationScoped
import javax.inject.Inject


@ApplicationScoped
class AIService {

    @Inject
    lateinit var downwardPlanner: DownwardPlanner

    @Inject
    lateinit var pddlProblemGenerator: PddlProblemGenerator

    @Inject
    lateinit var orchestrator: Orchestrator

    @Inject
    lateinit var roomRepository: RoomRepository

    @Inject
    lateinit var localizationRepository: LocalizationRepository

    @Volatile
    private var history = emptyList<Action>()

    @ConfigProperty(name = "ai.enabled")
    var isAIEnabled: Boolean = false

    @Scheduled(every = "{ai.interval}")
    fun doPlanning() {
        if (!isAIEnabled) {
            return
        }

        val rooms = roomRepository.getAll()
        val users = localizationRepository.getAllLocalizedUsers()

        val (domain, problem) = pddlProblemGenerator.generateProblem(rooms, users, history)
        val plan = downwardPlanner.generatePlan(domain, problem)
        val actions = orchestrator.execute(plan, rooms, users)
        println(actions)
        history = history + actions
    }

    @Deprecated("only for demo")
    fun resetHistory() {
        history = emptyList()
    }
}