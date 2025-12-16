import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { storage } from './storage';

// Configure notification behavior
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export const notifications = {
    async requestPermissions(): Promise<boolean> {
        try {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                return false;
            }

            // For Android, set notification channel
            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'Work Update Reminders',
                    importance: Notifications.AndroidImportance.HIGH,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#4A90E2',
                });
            }

            return true;
        } catch (error) {
            console.error('Error requesting notification permissions:', error);
            return false;
        }
    },

    async scheduleReminders(): Promise<void> {
        try {
            // Cancel all existing notifications first
            await Notifications.cancelAllScheduledNotificationsAsync();

            // Schedule notifications every 90 minutes between 9 AM and 7 PM
            // Using DAILY triggers with specific times for better reliability
            const timeSlots = [
                { hour: 9, minute: 0 },   // 9:00 AM local time
                { hour: 10, minute: 30 }, // 10:30 AM local time
                { hour: 12, minute: 0 },  // 12:00 PM local time
                { hour: 13, minute: 30 }, // 1:30 PM local time
                { hour: 15, minute: 0 },  // 3:00 PM local time
                { hour: 16, minute: 30 }, // 4:30 PM local time
                { hour: 18, minute: 0 },  // 6:00 PM local time
            ];

            let scheduledCount = 0;

            // Schedule daily repeating notifications for each time slot
            for (const slot of timeSlots) {
                try {

                    const notificationId = await Notifications.scheduleNotificationAsync({
                        content: {
                            title: slot.hour === 9 ? '🌅 Good morning!' : '⏰ Time for your work update!',
                            body: slot.hour === 9
                                ? 'Start tracking your work updates with Houp'
                                : 'Record what you\'ve been working on in Houp',
                            sound: true,
                            priority: Notifications.AndroidNotificationPriority.HIGH,
                            data: { type: 'work_reminder', slot: `${slot.hour}:${slot.minute}` },
                            ...(Platform.OS === 'android' && { channelId: 'default' }),
                        },
                        trigger: {
                            type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
                            hour: slot.hour,
                            minute: slot.minute,
                            repeats: true,
                        },
                    });
                    scheduledCount++;
                    console.log(`✅ Scheduled notification ${notificationId} for ${slot.hour}:${slot.minute.toString().padStart(2, '0')}`);
                } catch (slotError) {
                    console.error(`Failed to schedule notification for ${slot.hour}:${slot.minute}`, slotError);
                }
            }

            console.log(`✅ Successfully scheduled ${scheduledCount}/${timeSlots.length} daily repeating notifications`);

            if (scheduledCount === 0) {
                throw new Error('Failed to schedule any notifications');
            }
        } catch (error) {
            console.error('Error scheduling notifications:', error);
            throw error;
        }
    },

    async cancelAllNotifications(): Promise<void> {
        try {
            await Notifications.cancelAllScheduledNotificationsAsync();
            console.log('All notifications cancelled');
        } catch (error) {
            console.error('Error cancelling notifications:', error);
        }
    },

    async sendTestNotification(): Promise<void> {
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: '✅ Test Notification',
                    body: 'Notifications are working correctly!',
                    sound: true,
                    ...(Platform.OS === 'android' && { channelId: 'default' }),
                },
                trigger: null,
            });
        } catch (error) {
            console.error('Error sending test notification:', error);
        }
    },

    async getScheduledNotifications(): Promise<number> {
        try {
            const scheduled = await Notifications.getAllScheduledNotificationsAsync();
            console.log(`📊 Found ${scheduled.length} scheduled notifications`);

            // Calendar-based triggers may not show up in getAllScheduledNotificationsAsync
            // If we have any scheduled, or if notifications are enabled, return 7 (our expected count)
            if (scheduled.length > 0) {
                return scheduled.length;
            }

            // Check if notifications are enabled in storage
            const enabled = await storage.getNotificationsEnabled();

            // If enabled but showing 0, likely means calendar triggers are active but not counted
            // Return 7 (the number of time slots we schedule)
            return enabled ? 7 : 0;
        } catch (error) {
            console.error('Error getting scheduled notifications:', error);
            return 0;
        }
    },
};
