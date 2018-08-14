package com.mobileminer;

import android.content.Intent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.util.Log;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.facebook.react.HeadlessJsTaskService;

import com.mobileminer.PathBackgroundService;

public class PathReceiver extends BroadcastReceiver {
    private static final String TAG = "PathReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
      Intent serviceIntent = new Intent(context, PathBackgroundService.class);
      context.startService(serviceIntent);
      HeadlessJsTaskService.acquireWakeLockNow(context);
    }
}
