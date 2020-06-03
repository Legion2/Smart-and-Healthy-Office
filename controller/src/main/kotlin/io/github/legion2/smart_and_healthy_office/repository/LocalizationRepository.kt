package io.github.legion2.smart_and_healthy_office.repository

import com.beust.klaxon.Klaxon
import org.eclipse.microprofile.config.inject.ConfigProperty
import java.nio.file.Files
import java.nio.file.Path
import javax.annotation.PostConstruct
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class LocalizationRepository {
    @ConfigProperty(name = "localization.config.file")
    lateinit var configFilePath: String

    lateinit var users: Map<String, UserMetadata>

    @PostConstruct
    private fun setup() {
        val configFile = Files.readString(Path.of(configFilePath))
        val config = Klaxon().parse<LocalizationConfig>(configFile)
                ?: throw IllegalArgumentException("Can not load config file")

        users = config.users.map { it.id to it }.toMap()
    }

}