import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
    USER_NAME: '@houp_user_name',
    GOOGLE_SHEET_URL: '@houp_google_sheet_url',
    NOTIFICATIONS_ENABLED: '@houp_notifications_enabled',
    CACHED_UPDATES: '@houp_cached_updates',
};

export const storage = {
    // User Name
    async getUserName(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(KEYS.USER_NAME);
        } catch (error) {
            console.error('Error getting user name:', error);
            return null;
        }
    },

    async setUserName(name: string): Promise<void> {
        try {
            await AsyncStorage.setItem(KEYS.USER_NAME, name);
        } catch (error) {
            console.error('Error setting user name:', error);
        }
    },

    // Google Sheet URL
    async getGoogleSheetUrl(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(KEYS.GOOGLE_SHEET_URL);
        } catch (error) {
            console.error('Error getting Google Sheet URL:', error);
            return null;
        }
    },

    async setGoogleSheetUrl(url: string): Promise<void> {
        try {
            await AsyncStorage.setItem(KEYS.GOOGLE_SHEET_URL, url);
        } catch (error) {
            console.error('Error setting Google Sheet URL:', error);
        }
    },

    // Notifications Enabled
    async getNotificationsEnabled(): Promise<boolean> {
        try {
            const value = await AsyncStorage.getItem(KEYS.NOTIFICATIONS_ENABLED);
            return value === 'true';
        } catch (error) {
            console.error('Error getting notifications enabled:', error);
            return true; // Default to enabled
        }
    },

    async setNotificationsEnabled(enabled: boolean): Promise<void> {
        try {
            await AsyncStorage.setItem(KEYS.NOTIFICATIONS_ENABLED, enabled.toString());
        } catch (error) {
            console.error('Error setting notifications enabled:', error);
        }
    },

    // Cached Updates (for offline support)
    async getCachedUpdates(): Promise<any[]> {
        try {
            const value = await AsyncStorage.getItem(KEYS.CACHED_UPDATES);
            return value ? JSON.parse(value) : [];
        } catch (error) {
            console.error('Error getting cached updates:', error);
            return [];
        }
    },

    async addCachedUpdate(update: any): Promise<void> {
        try {
            const cached = await this.getCachedUpdates();
            cached.push(update);
            await AsyncStorage.setItem(KEYS.CACHED_UPDATES, JSON.stringify(cached));
        } catch (error) {
            console.error('Error adding cached update:', error);
        }
    },

    async clearCachedUpdates(): Promise<void> {
        try {
            await AsyncStorage.setItem(KEYS.CACHED_UPDATES, JSON.stringify([]));
        } catch (error) {
            console.error('Error clearing cached updates:', error);
        }
    },
};
