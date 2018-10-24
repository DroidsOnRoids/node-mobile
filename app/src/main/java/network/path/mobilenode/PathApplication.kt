package network.path.mobilenode

import android.app.Application
import com.crashlytics.android.Crashlytics
import io.fabric.sdk.android.Fabric
import network.path.mobilenode.di.appModule
import network.path.mobilenode.service.startPathService
import network.path.mobilenode.data.storage.Storage
import org.koin.android.ext.android.inject
import org.koin.android.ext.android.startKoin
import timber.log.Timber

class PathApplication : Application() {

    private val storage by inject<Storage>()

    override fun onCreate() {
        super.onCreate()
        initLogging()
        startKoin(this, listOf(appModule))
        startJobProcessingIfActivated()
    }

    private fun initLogging() {
        if (BuildConfig.DEBUG) {
            Timber.plant(Timber.DebugTree())
        } else {
            Fabric.with(this, Crashlytics())
        }
    }

    private fun startJobProcessingIfActivated() {
        if (storage.isJobProcessingActivated) {
            startPathService()
        }
    }
}