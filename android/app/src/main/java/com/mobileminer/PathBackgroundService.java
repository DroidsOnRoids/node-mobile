package com.mobileminer;

import android.app.Notification;
import android.app.PendingIntent;

import android.content.Intent;
import android.support.annotation.Nullable;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.mobileminer.PathHeadlessTask;

public class PathBackgroundService implements HeadlessJsTaskEventListener {

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
    startTask(taskConfig);
     //Intent notificationIntent = new Intent(this, PathBackgroundService.class);
     Intent notificationIntent = new Intent(this, MainApplication.class);
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

    return START_STICKY;
   }

  @Override
  public void onHeadlessJsTaskFinish(int taskId) {
    Intent intent = new Intent("com.mobileminer.RESTART_SERVICE");
    sendBroadcast(intent);
  }
}
