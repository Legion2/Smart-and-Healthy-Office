package io.github.legion2.smart_and_healthy_office.pddl

import com.github.mustachejava.DefaultMustacheFactory
import com.github.mustachejava.Mustache
import com.github.mustachejava.MustacheFactory
import io.github.legion2.smart_and_healthy_office.model.Location
import java.io.StringWriter
import java.util.Collections.max
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

    /**
     * Calculate the stress level from a range of minimum and maximum value.
     * The minimum can be greater than the maximum, in this case the stress scale is inverted
     */
    fun rangeToStress(min: Float, max: Float, value: Float): Int {
        return (((value - min) / (max - min)) * 100).toInt()
    }

    internal val RoomModel.stress: Int
        get() {
            // Temperature Stress
            val temperatureStress = when (temperature) {
                in 19f..25f -> 0
                in 16f..19f -> rangeToStress(19f, 16f, temperature)
                in 25f..28f -> rangeToStress(25f, 28f, temperature)
                else -> 100
            }
            //Humidity Stress
            val humidityStress = when (humidity) {
                in 0.45f..0.60f -> 0
                in 0.60f..0.75f -> rangeToStress(0.60f, 0.75f, humidity)
                in 0.25f..0.45f -> rangeToStress(0.45f, 0.25f, humidity)
                else -> 100
            }
            //Loudness Stress
            val loudnessStress = when (loudness) {
                in 65f..75f -> 0
                in 50f..65f -> rangeToStress(65f, 50f, loudness)
                in 75f..85f -> rangeToStress(75f, 85f, loudness)
                else -> 100
            }
            //Presence Stress
            val presenceStress = when (val spacePerPerson = size / presence) {
                in 0f..3f -> 100
                in 3f..5f -> rangeToStress(5f, 3f, spacePerPerson)
                else -> 0
            }
            //brightness Stress
            val brightnessStress = when (brightness) {
                //for LUX sensors:
                in 300f..500f -> 0
                in 200f..300f -> rangeToStress(300f, 200f, brightness)
                in 500f..750f -> rangeToStress(500f, 750f, brightness)
                else -> 100
            }

            return max(listOf(temperatureStress, humidityStress, loudnessStress, brightnessStress, presenceStress))
        }

    internal fun preprocess(context: List<RoomModel>, users: Map<String, Location>): ContextModel {
        return ContextModel(context.map { Room(it.id.roomId, it.stress) }, users.filterValues { it is Location.Room }
                .map { (user, location) -> User(user.userId, (location as Location.Room).room.roomId) })
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
