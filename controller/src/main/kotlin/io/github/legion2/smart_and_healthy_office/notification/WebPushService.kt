package io.github.legion2.smart_and_healthy_office.notification

import com.beust.klaxon.Klaxon
import nl.martijndwars.webpush.Notification
import nl.martijndwars.webpush.PushService
import nl.martijndwars.webpush.Utils
import nl.martijndwars.webpush.Utils.ALGORITHM
import nl.martijndwars.webpush.Utils.CURVE
import org.apache.http.HttpResponse
import org.bouncycastle.jce.ECNamedCurveTable
import org.bouncycastle.jce.interfaces.ECPrivateKey
import org.bouncycastle.jce.interfaces.ECPublicKey
import org.bouncycastle.jce.provider.BouncyCastleProvider
import org.bouncycastle.jce.provider.BouncyCastleProvider.PROVIDER_NAME
import org.bouncycastle.jce.spec.ECNamedCurveParameterSpec
import org.jose4j.lang.JoseException
import java.io.IOException
import java.security.*
import java.util.*
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.Future
import javax.annotation.PostConstruct
import javax.enterprise.context.ApplicationScoped


@ApplicationScoped
class WebPushService {

    private val subscriptions: MutableMap<String, Subscription> = ConcurrentHashMap()
    private val subscriptionsPerUser: MutableMap<String, List<String>> = ConcurrentHashMap()
    private lateinit var pushService: PushService
    private lateinit var publicVAPIDKey: String

    @PostConstruct
    private fun setup() {
        Security.addProvider(BouncyCastleProvider())
        val (publicKey, privateKey) = generateKeyPair()
        publicVAPIDKey = publicKey
        pushService = PushService(publicKey, privateKey)
    }

    fun getPublicVAPIDKey(): String {
        return publicVAPIDKey
    }

    fun subscribe(subscription: Subscription, user: String): String {
        val id = UUID.randomUUID().toString()
        subscriptions[id] = subscription
        subscriptionsPerUser.compute(user) { _, subscriptionList -> subscriptionList.orEmpty() + id }
        return id
    }

    fun unsubscribe(id: String) {
        subscriptions.remove(id) ?: throw NoSuchElementException(id)
    }

    /**
     * @param user the id of the user to send the notification to
     * @param notification the notification send to the client
     */
    fun <T : Any> sendPushNotification(user: String, notification: io.github.legion2.smart_and_healthy_office.notification.Notification<T>) {
        val payload = Klaxon().toJsonString(notification).toByteArray()
        subscriptionsPerUser[user].orEmpty()
                .map { subscriptions.getValue(it) }
                .forEach { subscription -> sendPushMessage(subscription, payload) }
    }

    /**
     * Generate an EC key pair on the prime256v1 curve.
     *
     * @return the generated key pair
     * @throws InvalidAlgorithmParameterException
     * @throws NoSuchProviderException
     * @throws NoSuchAlgorithmException
     */
    @Throws(InvalidAlgorithmParameterException::class, NoSuchProviderException::class, NoSuchAlgorithmException::class)
    private fun generateKeyPair(): Pair<String, String> {
        val parameterSpec: ECNamedCurveParameterSpec = ECNamedCurveTable.getParameterSpec(CURVE)
        val keyPairGenerator: KeyPairGenerator = KeyPairGenerator.getInstance(ALGORITHM, PROVIDER_NAME)
        keyPairGenerator.initialize(parameterSpec)
        val keyPair = keyPairGenerator.generateKeyPair()


        val publicKey: String = Base64.getUrlEncoder().encodeToString(Utils.encode(keyPair.public as ECPublicKey))
        val privateKey: String = Base64.getUrlEncoder().encodeToString(Utils.encode(keyPair.private as ECPrivateKey))
        return publicKey to privateKey
    }

    private fun sendPushMessage(sub: Subscription, payload: ByteArray): Future<HttpResponse> {
        return try {
            val notification = Notification(sub.endpoint, sub.p256dh, sub.auth, payload)
            pushService.sendAsync(notification)
        } catch (e: GeneralSecurityException) {
            throw IllegalStateException(e)
        } catch (e: IOException) {
            throw IllegalStateException(e)
        } catch (e: JoseException) {
            throw IllegalStateException(e)
        }
    }
}