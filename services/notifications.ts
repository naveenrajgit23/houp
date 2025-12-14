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

            // Calculate notification times
            const times: Date[] = [];
            const now = new Date();

            // Start from 9 AM today
            let currentTime = new Date();
            currentTime.setHours(startHour, 0, 0, 0);

            // Generate times for today
            while (currentTime.getHours() < endHour) {
                if (currentTime > now) {
                    times.push(new Date(currentTime));
                }
                currentTime = new Date(currentTime.getTime() + intervalMinutes * 60 * 1000);
            }

            // Schedule notifications
            for (const time of times) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: '⏰ Time for your work update!',
                        body: 'Record what you\'ve been working on in Houp',
                        sound: true,
                        priority: Notifications.AndroidNotificationPriority.HIGH,
                    },
                    trigger: {
                        type: 'date' as const,
                        date: time,
                    },
                });
            }

            // Schedule daily repeating notification at 9 AM
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: '🌅 Good morning!',
                    body: 'Start tracking your work updates with Houp',
                    sound: true,
                },
                trigger: {
                    type: 'calendar' as const,
                    hour: startHour,
                    minute: 0,
                    repeats: true,
                },
            });

            console.log(`Scheduled ${times.length} notifications for today`);
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
