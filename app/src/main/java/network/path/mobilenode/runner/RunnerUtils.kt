package network.path.mobilenode.runner

import android.os.SystemClock
import com.crashlytics.android.Crashlytics
import network.path.mobilenode.Constants.DEFAULT_CRITICAL_TIMEOUT_MILLIS
import network.path.mobilenode.Constants.DEFAULT_DEGRADED_TIMEOUT_MILLIS
import network.path.mobilenode.Constants.TCP_UDP_PORT_RANGE
import network.path.mobilenode.json.Status
import network.path.mobilenode.message.JobRequest
import network.path.mobilenode.message.JobResult
import java.io.IOException

suspend fun computeJobResult(jobRequest: JobRequest, block: suspend (JobRequest) -> String): JobResult {
    var responseBody = ""
    var isResponseKnown = false

    val requestDurationMillis = measureRealtimeMillis {
        try {
            responseBody = block(jobRequest)
            isResponseKnown = true
        } catch (e: IOException) {
            responseBody = e.toString()
        } catch (e: Exception) {
            responseBody = e.toString()
            Crashlytics.logException(e)
        }
    }

    val status = when (isResponseKnown) {
        true -> calculateJobStatus(requestDurationMillis, jobRequest)
        false -> Status.UNKNOWN
    }

    return JobResult(
        jobUuid = jobRequest.jobUuid,
        responseTime = requestDurationMillis,
        responseBody = responseBody,
        status = status
    )
}

inline fun measureRealtimeMillis(block: () -> Unit): Long {
    val start = SystemClock.elapsedRealtime()
    block()
    return SystemClock.elapsedRealtime() - start
}

fun calculateJobStatus(requestDurationMillis: Long, jobRequest: JobRequest): String {
    val degradedAfterMillis = jobRequest.degradedAfter ?: DEFAULT_DEGRADED_TIMEOUT_MILLIS
    val criticalAfterMillis = jobRequest.criticalAfter ?: DEFAULT_CRITICAL_TIMEOUT_MILLIS

    return when {
        requestDurationMillis > degradedAfterMillis -> Status.DEGRADED
        requestDurationMillis > criticalAfterMillis -> Status.CRITICAL
        else -> Status.OK
    }
}

val JobRequest.endpointHost: String
    get() {
        endpointAddress ?: throw IOException("Missing endpoint address in $this")
        val regex = "^\\w+://".toRegex(RegexOption.IGNORE_CASE)
        return endpointAddress.replaceFirst(regex, "").replaceAfter('/', "")
    }

fun JobRequest.endpointPortOrDefault(default: Int): Int {
    return (endpointPort ?: default).coerceIn(TCP_UDP_PORT_RANGE)
}