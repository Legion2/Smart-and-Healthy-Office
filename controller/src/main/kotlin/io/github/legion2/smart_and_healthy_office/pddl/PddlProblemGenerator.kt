package io.github.legion2.smart_and_healthy_office.pddl

import com.github.mustachejava.DefaultMustacheFactory
import com.github.mustachejava.Mustache
import com.github.mustachejava.MustacheFactory
import io.github.legion2.smart_and_healthy_office.model.Location
import java.io.StringWriter
import java.time.Duration
import java.time.ZonedDateTime
import javax.annotation.PostConstruct
import javax.enterprise.context.ApplicationScoped
import kotlin.math.min
import kotlin.math.roundToInt
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


    internal fun preprocess(context: List<RoomModel>, users: Map<String, Location>, history: List<Action>): ContextModel {
        val time = ZonedDateTime.now()


        return ContextModel(context.map { Room(it.id.roomId, it.stress) }, users.filterValues { it is Location.Room }
                .map { (user, location) ->
                    User(user.userId,
                            (location as Location.Room).room.roomId,
                            history.lastRoomChange(user)?.let { changeRoomCoolDown(Duration.between(it.timestamp, time)) }
                                    ?: 0)
                })
    }

    fun generateProblem(context: List<RoomModel>, users: Map<String, Location>, history: List<Action>): Pair<String, String> {
        val scopes = preprocess(context, users, history)
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

data class User(val userId: String, val currentRoom: String, val changeRoomCoolDown: Int)

val String.roomId get() = "room-$this"
val String.userId get() = "user-$this"

internal fun List<Action>.lastRoomChange(user: String): Action? {
    return sortedByDescending { it.timestamp }.firstOrNull { it.name == "change_room" && it.parameters[0] == user }
}

internal fun changeRoomCoolDown(duration: Duration): Int {
    return ((1 - min(duration.seconds.toDouble() / Duration.ofMinutes(10).seconds, 1.0)) * 1000).roundToInt()
}
