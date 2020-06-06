package io.github.legion2

import io.github.legion2.smart_and_healthy_office.model.Room
import io.quarkus.test.junit.QuarkusTest
import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import org.hamcrest.CoreMatchers.`is`
import org.junit.jupiter.api.Test

@QuarkusTest
class ExampleResourceTest {

    @Test
    fun testHelloEndpoint() {
        given()
                .`when`().get("/rooms")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("$", `is`(emptyList<Room>()))
    }

}