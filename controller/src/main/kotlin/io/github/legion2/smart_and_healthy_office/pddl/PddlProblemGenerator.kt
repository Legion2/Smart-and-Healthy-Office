package io.github.legion2.smart_and_healthy_office.pddl

import com.github.mustachejava.DefaultMustacheFactory
import com.github.mustachejava.Mustache
import com.github.mustachejava.MustacheFactory
import io.github.legion2.smart_and_healthy_office.model.Location
import java.io.StringWriter
import javax.annotation.PostConstruct
import javax.enterprise.context.ApplicationScoped
import io.github.legion2.smart_and_healthy_office.model.Room as RoomModel

@ApplicationScoped
class PddlProblemGenerator {

    private val domainTemplateName = "domain.pddl"
    private val problemTemplateName = "problem.pddl"

    lateinit var domainTemplate: Mustache
    lateinit var problemTemplate: Mustache

    @PostConstruct
    private fun setup() {
        val mf: MustacheFactory = DefaultMustacheFactory("io/github/legion2/smart_and_healthy_office/pddl")
        domainTemplate = mf.compile(domainTemplateName)
        problemTemplate = mf.compile(problemTemplateName)
    }

    internal val RoomModel.stress: Int
        get() {
            return temperature.toInt()
        }

    internal fun preprocess(context: List<RoomModel>, users: Map<String, Location>): ContextModel {
        return ContextModel(context.map { Room(it.id.roomId, it.stress) } + Room("UNKNOWN", 0), users.map {
            User(it.key.userId, when (val location = it.value) {
                is Location.Unknown -> "UNKNOWN"
                is Location.Room -> location.room.roomId
            })
        })
    }

    fun generateProblem(context: List<RoomModel>, users: Map<String, Location>): Pair<String, String> {
        val scopes = preprocess(context, users)
        val domainWriter = StringWriter()
        domainTemplate.execute(domainWriter, scopes).flush()
        val domain = domainWriter.toString()
        val problemWriter = StringWriter()
        problemTemplate.execute(problemWriter, scopes).flush()
        val problem = problemWriter.toString()
        return domain to problem
    }
}

data class ContextModel(val rooms: List<Room>, val users: List<User>)

data class Room(val roomId: String, val stress: Int) {
    val stressPlusChangingRoom get() = stress + 10
}

data class User(val userId: String, val currentRoom: String)

val String.roomId get() = "room-$this"
val String.userId get() = "user-$this"
