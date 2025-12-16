# HOUP App - Notification Troubleshooting Guide 🔔

## Current Status

Based on the code review, the notification system has been properly configured with:
- ✅ Expo SDK 54 with expo-notifications 0.32.15
- ✅ Proper Android permissions (POST_NOTIFICATIONS, SCHEDULE_EXACT_ALARM, USE_EXACT_ALARM)
- ✅ Calendar-based daily repeating notifications
- ✅ Smart fallback counting logic
- ✅ Error handling and logging

---

## Common Issues & Solutions

### Issue 1: Notifications Not Appearing

#### Possible Causes:
1. **Permissions Not Granted**
2. **Battery Optimization Blocking Notifications**
3. **Do Not Disturb Mode Enabled**
4. **App Not Running in Background**
5. **Notification Channel Disabled**

#### Solutions:

##### A. Check & Grant Permissions
```
Settings → Apps → HOUP → Permissions → Notifications → Allow
```

##### B. Disable Battery Optimization
```
Settings → Apps → HOUP → Battery → Unrestricted
```
OR
```
Settings → Battery → Battery Optimization → HOUP → Don't optimize
```

##### C. Check Do Not Disturb
```
Settings → Sound & Vibration → Do Not Disturb → OFF
```
OR ensure HOUP is in the exception list

##### D. Check Notification Channel
```
Settings → Apps → HOUP → Notifications → Work Update Reminders → Enabled
```

---

### Issue 2: Test Notification Works, But Scheduled Notifications Don't

This usually indicates an **exact alarm permission** issue on Android 12+.

#### Solution:
```
Settings → Apps → HOUP → Alarms & Reminders → Allow
```

On some devices:
```
Settings → Apps → Special Access → Alarms & Reminders → HOUP → Allow
```

---

### Issue 3: Shows "0 Reminders Scheduled"

This is a **known Android limitation** with calendar-based triggers. The app has fallback logic, but if you're still seeing 0:

#### Debug Steps:
1. Toggle notifications OFF then ON again
2. Check console logs (if running in development)
3. Restart the app
4. Reinstall the app (clean install)

---

## Verification Checklist

Use this checklist to ensure notifications are properly set up:

### In the App:
- [ ] Open Settings tab
- [ ] Toggle "Enable Reminders" ON
- [ ] See alert: "Notifications Enabled - 7 reminders scheduled for today"
- [ ] See text: "✅ 7 reminders scheduled"
- [ ] Tap "Test Notification"
- [ ] Receive test notification within 2 seconds

### On Device:
- [ ] Notification permission granted
- [ ] Battery optimization disabled
- [ ] Exact alarm permission granted (Android 12+)
- [ ] Do Not Disturb is OFF or HOUP is excepted
- [ ] Notification channel "Work Update Reminders" is enabled

---

## Testing Notifications

### Method 1: Immediate Test
1. Open HOUP app
2. Go to Settings
3. Tap "Test Notification"
4. You should receive notification immediately

### Method 2: Wait for Scheduled Time
Notifications are scheduled at:
- **9:00 AM** - "🌅 Good morning! Start tracking your work updates with Houp"
- **10:30 AM** - "⏰ Time for your work update!"
- **12:00 PM** - "⏰ Time for your work update!"
- **1:30 PM** - "⏰ Time for your work update!"
- **3:00 PM** - "⏰ Time for your work update!"
- **4:30 PM** - "⏰ Time for your work update!"
- **6:00 PM** - "⏰ Time for your work update!"

Wait until one of these times to verify.

### Method 3: Check Scheduled Notifications (Development Mode)
If running in development with `expo start`:
1. Check console logs for:
   ```
   ✅ Scheduled notification [ID] for [TIME]
   ✅ Successfully scheduled 7/7 daily repeating notifications
   ```

---

## Advanced Debugging

### Check Notification Permissions Programmatically

The app requests permissions in `App.tsx` on startup and in `SettingsScreen.tsx` when toggling notifications.

### Verify Notification Handler

The notification handler is configured in `services/notifications.ts`:
```typescript
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});
```

### Check Android Notification Channel

The app creates a notification channel on Android:
- **Name**: Work Update Reminders
- **Importance**: HIGH
- **Vibration**: Enabled
- **LED Color**: #4A90E2

---

## Device-Specific Issues

### Samsung Devices
Samsung has aggressive battery optimization. Additional steps:
1. Settings → Device Care → Battery → App Power Management
2. Add HOUP to "Apps that won't be put to sleep"
3. Disable "Put unused apps to sleep"

### Xiaomi/MIUI Devices
1. Settings → Apps → Manage Apps → HOUP
2. Autostart → Enable
3. Battery Saver → No restrictions
4. Permissions → Autostart → Allow

### OnePlus/OxygenOS
1. Settings → Battery → Battery Optimization
2. HOUP → Don't optimize
3. Settings → Apps → HOUP → Battery → Unrestricted

### Huawei/EMUI
1. Settings → Apps → HOUP
2. Battery → App Launch → Manual
3. Enable all three options (Auto-launch, Secondary launch, Run in background)

---

## If Notifications Still Don't Work

### Option 1: Rebuild the App
If you made changes or the app was built before the notification fixes:
```bash
eas build --platform android --profile preview --clear-cache
```

### Option 2: Clean Install
1. Uninstall HOUP completely
2. Restart device
3. Install fresh APK
4. Grant all permissions when prompted
5. Enable notifications in Settings

### Option 3: Check Android Version
Notifications work best on:
- Android 12+ (with exact alarm permissions)
- Android 8+ (with notification channels)

If on Android 7 or below, some features may not work.

---

## Expected Behavior

### When Notifications Are Working:
1. **App Start**: If notifications enabled, schedules 7 daily reminders
2. **Settings Toggle ON**: Shows "7 reminders scheduled for today"
3. **Settings Screen**: Displays "✅ 7 reminders scheduled"
4. **Test Button**: Sends immediate notification
5. **Scheduled Times**: Receives notifications at 7 times throughout the day
6. **Daily Repeat**: Notifications repeat every day at the same times

---

## Code Reference

### Key Files:
- `services/notifications.ts` - Notification scheduling logic
- `App.tsx` - Initial notification setup on app start
- `screens/SettingsScreen.tsx` - Notification toggle and test
- `app.json` - Android permissions configuration

### Permissions in app.json:
```json
"permissions": [
  "android.permission.POST_NOTIFICATIONS",
  "android.permission.SCHEDULE_EXACT_ALARM",
  "android.permission.USE_EXACT_ALARM"
]
```

---

## Still Having Issues?

If you've tried all the above and notifications still don't work:

1. **Check Device Logs**: Use `adb logcat` to see system-level errors
2. **Verify Build**: Ensure you're using the latest build with version code 8
3. **Test on Different Device**: Try on another Android device to rule out device-specific issues
4. **Development Mode**: Run with `expo start` and check console logs for errors

---

## Summary

The notification system is **fully implemented and configured**. Most issues are related to:
1. **Device permissions** (notification, exact alarm, battery optimization)
2. **Manufacturer-specific battery saving** (Samsung, Xiaomi, etc.)
3. **System settings** (Do Not Disturb, notification channels)

Follow the checklist above to ensure all permissions and settings are correct! 🎉
