package io.github.legion2.smart_and_healthy_office.api

import io.github.legion2.smart_and_healthy_office.notification.Subscription
import io.github.legion2.smart_and_healthy_office.notification.WebPushService
import org.eclipse.microprofile.openapi.annotations.media.Schema
import java.util.*
import javax.inject.Inject
import javax.ws.rs.*
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response


@Path("/subscriptions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class SubscriptionResource {

    @Inject
    lateinit var webPushService: WebPushService

    /**
     *
     * @return Base64 URL encoded public VAPID key
     */
    @GET
    @Path("key")
    @Produces(MediaType.TEXT_PLAIN)
    fun getPublicVAPIDKey(): String? {
        return this.webPushService.getPublicVAPIDKey()
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    fun subscribe(subscriptionBody: SubscriptionBody): String {
        return this.webPushService.subscribe(subscriptionBody.subscription.run { Subscription(endpoint, keys.auth, keys.p256dh) }, subscriptionBody.user)
    }

    @DELETE
    @Path("{id}")
    fun unsubscribe(@PathParam("id") id: String) {
        try {
            this.webPushService.unsubscribe(id)
        } catch (e: NoSuchElementException) {
            throw WebApplicationException(e, Response.Status.NOT_FOUND)
        }
    }
}

@Schema(name = "Subscription")
class SubscriptionBody {
    @Schema(required = true)
    lateinit var user: String

    @Schema(required = true)
    lateinit var subscription: ClientSubscription

    class ClientSubscription {
        @Schema(required = true)
        lateinit var endpoint: String

        @Schema(required = true)
        lateinit var keys: Keys

        class Keys {
            /**
             * Base64 URL encoded String
             */
            @Schema(required = true)
            lateinit var p256dh: String

            /**
             * Base64 URL encoded String
             */
            @Schema(required = true)
            lateinit var auth: String
        }
    }
}

