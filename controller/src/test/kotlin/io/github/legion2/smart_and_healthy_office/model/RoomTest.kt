package io.github.legion2.smart_and_healthy_office.model

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

internal class RoomTest {
    @Test
    fun testRangeToStress() {
        Assertions.assertEquals(10, rangeToStress(10f, 30f, 12f))
        Assertions.assertEquals(0, rangeToStress(10f, 30f, 10f))
        Assertions.assertEquals(100, rangeToStress(10f, 30f, 30f))
        Assertions.assertEquals(50, rangeToStress(10f, 30f, 20f))
        Assertions.assertEquals(66, rangeToStress(-10f, 5f, 0f))
        Assertions.assertEquals(20, rangeToStress(10f, 0f, 8f))
    }
}