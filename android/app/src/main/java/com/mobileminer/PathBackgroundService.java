package com.mobileminer;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.facebook.react.HeadlessJsTaskService;

public class PathBackgroundService extends HeadlessJsTaskService {

  @Override
  protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
    Bundle extras = intent.getExtras();
    WritableMap data = extras != null ? Arguments.fromBundle(extras) : null;

    return new HeadlessJsTaskConfig(
        "PathBackgroundService",
        data,
        0, // timeout for the task
        true // optional: defines whether or not  the task is allowed in foreground. Default is false
      );
  }
}
