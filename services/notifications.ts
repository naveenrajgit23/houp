import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

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
            const startHour = 9; // 9 AM
            const endHour = 19; // 7 PM
            const intervalMinutes = 90;

            // Schedule repeating notifications for each time slot
            const timeSlots = [
                { hour: 9, minute: 0 },   // 9:00 AM
                { hour: 10, minute: 30 }, // 10:30 AM
                { hour: 12, minute: 0 },  // 12:00 PM
                { hour: 13, minute: 30 }, // 1:30 PM
                { hour: 15, minute: 0 },  // 3:00 PM
                { hour: 16, minute: 30 }, // 4:30 PM
                { hour: 18, minute: 0 },  // 6:00 PM
            ];

            // Schedule daily repeating notifications for each time slot
            for (const slot of timeSlots) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: slot.hour === 9 ? '🌅 Good morning!' : '⏰ Time for your work update!',
                        body: slot.hour === 9
                            ? 'Start tracking your work updates with Houp'
                            : 'Record what you\'ve been working on in Houp',
                        sound: true,
                        priority: Notifications.AndroidNotificationPriority.HIGH,
                    },
                    trigger: {
                        type: 'calendar' as const,
                        hour: slot.hour,
                        minute: slot.minute,
                        repeats: true,
                    },
                });
            }

            console.log(`Scheduled ${timeSlots.length} daily repeating notifications`);
        } catch (error) {
            console.error('Error scheduling notifications:', error);
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
                },
                trigger: {
                    type: 'timeInterval' as const,
                    seconds: 2,
                },
            });
        } catch (error) {
            console.error('Error sending test notification:', error);
        }
    },

    async getScheduledNotifications(): Promise<number> {
        try {
            const scheduled = await Notifications.getAllScheduledNotificationsAsync();
            return scheduled.length;
        } catch (error) {
            console.error('Error getting scheduled notifications:', error);
            return 0;
        }
    },
};
