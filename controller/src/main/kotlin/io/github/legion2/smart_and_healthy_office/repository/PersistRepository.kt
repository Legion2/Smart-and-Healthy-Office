package io.github.legion2.smart_and_healthy_office.repository

import com.influxdb.client.InfluxDBClient
import com.influxdb.client.InfluxDBClientFactory
import com.influxdb.client.domain.WritePrecision
import io.quarkus.scheduler.Scheduled
import org.eclipse.microprofile.config.inject.ConfigProperty
import javax.annotation.PostConstruct
import javax.annotation.PreDestroy
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class PersistRepository {

    @ConfigProperty(name = "influxdb.url")
    lateinit var influxDBUrl: String

    @ConfigProperty(name = "influxdb.user")
    lateinit var influxDBUser: String

    @ConfigProperty(name = "influxdb.password")
    lateinit var influxDBPassword: String

    lateinit var influxDBClient: InfluxDBClient

    lateinit var roomRepository: RoomRepository

    @PostConstruct
    private fun setup() {
        influxDBClient = InfluxDBClientFactory
                .create(influxDBUrl, influxDBUser, influxDBPassword.toCharArray())
    }

    @PreDestroy
    private fun cleanup() {
        influxDBClient.close()
    }

    @Scheduled(every = "10s")
    fun writeMeasurements() {
        influxDBClient.writeApi.writeMeasurements(WritePrecision.S, roomRepository.getAll())
    }
}