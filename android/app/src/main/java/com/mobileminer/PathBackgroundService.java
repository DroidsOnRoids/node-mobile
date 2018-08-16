package com.mobileminer;

import android.content.Intent;
import android.support.annotation.Nullable;
import android.app.Notification;
import android.app.PendingIntent;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.jstasks.HeadlessJsTaskContext;
import com.facebook.react.modules.appregistry.AppRegistry;

//import java.util.Set;
//import java.util.concurrent.CopyOnWriteArraySet;

public class PathBackgroundService extends HeadlessJsTaskService {

    //private final Set<Integer> mActiveTasks = new CopyOnWriteArraySet<>();

    @Override
    protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        return new HeadlessJsTaskConfig(
                "PathBackgroundService",
                null,
                0, // timeout for the task
                true // optional: defines whether or not  the task is allowed in foreground. Default is false
        );
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        HeadlessJsTaskConfig taskConfig = getTaskConfig(intent);

        //Intent notificationIntent = new Intent(this, PathBackgroundService.class);
        Intent notificationIntent = new Intent(this, PathBackgroundService.class);
        notificationIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);

        PendingIntent pendingIntent =
                PendingIntent.getActivity(this, 0, notificationIntent, 0);

        Notification notification =
                new Notification.Builder(this)
                        .setPriority(Notification.PRIORITY_DEFAULT)
                        .setContentTitle("Path App")
                        .setContentText("Running in background")
                        .setSmallIcon(R.mipmap.ic_launcher)
                        .setContentIntent(pendingIntent)
                        .build();


        startForeground(10101, notification);

        if (taskConfig != null) {
            startTask(taskConfig);
            return START_REDELIVER_INTENT;
        }
        return START_NOT_STICKY;
    }

    /**
     * Start a task. This method handles starting a new React instance if required.
     *
     * Has to be called on the UI thread.
     *
     * @param taskConfig describes what task to start and the parameters to pass to it
     */
    protected void startTask(final HeadlessJsTaskConfig taskConfig) {
        UiThreadUtil.assertOnUiThread();
        acquireWakeLockNow(this);
        final ReactInstanceManager reactInstanceManager =
                getReactNativeHost().getReactInstanceManager();
        ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
        if (reactContext == null) {
            reactInstanceManager
                    .addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
                        @Override
                        public void onReactContextInitialized(ReactContext reactContext) {
                            invokeStartTask(reactContext, taskConfig);
                            reactInstanceManager.removeReactInstanceEventListener(this);
                        }
                    });
            if (!reactInstanceManager.hasStartedCreatingInitialContext()) {
                reactInstanceManager.createReactContextInBackground();
            }
        } else {
            invokeStartTask(reactContext, taskConfig);
        }
    }

    private void invokeStartTask(ReactContext reactContext, final HeadlessJsTaskConfig taskConfig) {
        final HeadlessJsTaskContext headlessJsTaskContext = HeadlessJsTaskContext.getInstance(reactContext);
        headlessJsTaskContext.addTaskEventListener(this);

        //int taskId = headlessJsTaskContext.startTask(taskConfig);
        //mActiveTasks.add(taskId);

        reactContext.getJSModule(AppRegistry.class)
                .startHeadlessTask(1, "PathBackgroundService", null);
    }
}