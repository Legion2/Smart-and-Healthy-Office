package io.github.legion2.smart_and_healthy_office.repository

import com.beust.klaxon.Klaxon
import io.github.legion2.smart_and_healthy_office.model.Location
import org.eclipse.microprofile.config.inject.ConfigProperty
import java.nio.file.Files
import java.nio.file.Path
import java.util.concurrent.ConcurrentHashMap
import javax.annotation.PostConstruct
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class LocalizationRepository {
    @ConfigProperty(name = "localization.config.file")
    lateinit var configFilePath: String

    lateinit var users: Map<String, UserMetadata>

    lateinit var locations: MutableMap<String, Location>

    @PostConstruct
    private fun setup() {
        val configFile = Files.readString(Path.of(configFilePath))
        val config = Klaxon().parse<LocalizationConfig>(configFile)
                ?: throw IllegalArgumentException("Can not load config file")

        users = config.users.map { it.id to it }.toMap()

        locations = ConcurrentHashMap(users.keys.map { it to Location.Unknown }.toMap())
    }

    fun getLocation(user: String): Location? {
        return locations[user]
    }

    fun setLocation(user: String, location: Location) {
        locations[user] = location
    }

    fun getAllLocalizedUsers(): Map<String, Location>{
        return locations.toMap()
    }

}