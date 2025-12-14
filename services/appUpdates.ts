import * as Updates from 'expo-updates';
import { Alert } from 'react-native';

export const appUpdates = {
    // Check for updates
    async checkForUpdates(): Promise<boolean> {
        try {
            // Only check in production builds
            if (__DEV__) {
                console.log('Update check skipped in development mode');
                return false;
            }

            const update = await Updates.checkForUpdateAsync();

            if (update.isAvailable) {
                return true;
            }

            return false;
        } catch (error) {
            console.error('Error checking for updates:', error);
            return false;
        }
    },

    // Download and install update
    async downloadAndInstallUpdate(): Promise<void> {
        try {
            await Updates.fetchUpdateAsync();

            Alert.alert(
                '✅ Update Downloaded',
                'The app will restart to apply the update.',
                [
                    {
                        text: 'Restart Now',
                        onPress: async () => {
                            await Updates.reloadAsync();
                        },
                    },
                ]
            );
        } catch (error) {
            console.error('Error downloading update:', error);
            Alert.alert('Update Failed', 'Could not download the update. Please try again later.');
        }
    },

    // Check and prompt user for update
    async checkAndPromptUpdate(): Promise<void> {
        try {
            const hasUpdate = await this.checkForUpdates();

            if (hasUpdate) {
                Alert.alert(
                    '🎉 Update Available!',
                    'A new version of Houp is available. Would you like to update now?',
                    [
                        {
                            text: 'Later',
                            style: 'cancel',
                        },
                        {
                            text: 'Update Now',
                            onPress: async () => {
                                await this.downloadAndInstallUpdate();
                            },
                        },
                    ]
                );
            }
        } catch (error) {
            console.error('Error checking for updates:', error);
        }
    },

    // Get current app version
    getCurrentVersion(): string {
        return Updates.manifest?.version || '1.0.0';
    },

    // Check if running latest version
    async isLatestVersion(): Promise<boolean> {
        try {
            const update = await Updates.checkForUpdateAsync();
            return !update.isAvailable;
        } catch (error) {
            console.error('Error checking version:', error);
            return true;
        }
    },
};
