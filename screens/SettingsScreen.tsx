import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Switch,
    Alert,
    Linking,
} from 'react-native';
import { theme } from '../styles/theme';
import { storage } from '../services/storage';
import { notifications } from '../services/notifications';
import { googleSheets } from '../services/googleSheets';

export default function SettingsScreen() {
    const [googleSheetUrl, setGoogleSheetUrl] = useState('');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [scheduledCount, setScheduledCount] = useState(0);
    const [showInstructions, setShowInstructions] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        const url = await storage.getGoogleSheetUrl();
        const enabled = await storage.getNotificationsEnabled();
        const count = await notifications.getScheduledNotifications();

        if (url) setGoogleSheetUrl(url);
        setNotificationsEnabled(enabled);
        setScheduledCount(count);
    };

    const handleSaveSheetUrl = async () => {
        if (!googleSheetUrl.trim()) {
            Alert.alert('Error', 'Please enter a Google Sheet URL');
            return;
        }

        if (!googleSheets.validateUrl(googleSheetUrl)) {
            Alert.alert(
                'Invalid URL',
                'Please enter a valid Google Apps Script Web App URL. It should contain "script.google.com" and "/exec".'
            );
            return;
        }

        await storage.setGoogleSheetUrl(googleSheetUrl);
        Alert.alert('Success', 'Google Sheet URL saved successfully! ✅');
    };

    const handleToggleNotifications = async (value: boolean) => {
        setNotificationsEnabled(value);
        await storage.setNotificationsEnabled(value);

        if (value) {
            const hasPermission = await notifications.requestPermissions();
            if (hasPermission) {
                await notifications.scheduleReminders();
                const count = await notifications.getScheduledNotifications();
                setScheduledCount(count);
                Alert.alert('Notifications Enabled', `${count} reminders scheduled for today`);
            } else {
                Alert.alert(
                    'Permission Denied',
                    'Please enable notifications in your device settings to receive reminders.'
                );
                setNotificationsEnabled(false);
                await storage.setNotificationsEnabled(false);
            }
        } else {
            await notifications.cancelAllNotifications();
            setScheduledCount(0);
            Alert.alert('Notifications Disabled', 'All reminders have been cancelled');
        }
    };

    const handleTestNotification = async () => {
        const hasPermission = await notifications.requestPermissions();
        if (hasPermission) {
            await notifications.sendTestNotification();
            Alert.alert('Test Sent', 'You should receive a notification in 2 seconds');
        } else {
            Alert.alert(
                'Permission Required',
                'Please enable notifications to test this feature'
            );
        }
    };

    const handleOpenSheet = async () => {
        const url = await storage.getGoogleSheetUrl();
        if (url) {
            // Extract sheet ID from Apps Script URL if possible
            // For now, just show a message
            Alert.alert(
                'Open Google Sheet',
                'To view your sheet, go to Google Sheets and open the sheet you connected to this app.',
                [{ text: 'OK' }]
            );
        } else {
            Alert.alert('No Sheet Connected', 'Please connect a Google Sheet first');
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
                <Text style={styles.headerSubtitle}>Configure your Houp app</Text>
            </View>

            <View style={styles.content}>
                {/* Google Sheet Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📊 Google Sheet Integration</Text>
                    <Text style={styles.sectionDescription}>
                        Connect your Google Apps Script Web App URL to save updates automatically
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="https://script.google.com/..."
                        value={googleSheetUrl}
                        onChangeText={setGoogleSheetUrl}
                        placeholderTextColor={theme.colors.textSecondary}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSaveSheetUrl}>
                        <Text style={styles.buttonText}>Save URL</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.linkButton} onPress={handleOpenSheet}>
                        <Text style={styles.linkButtonText}>📄 View My Sheet</Text>
                    </TouchableOpacity>

                    {/* Setup Instructions */}
                    <TouchableOpacity
                        style={styles.instructionsToggle}
                        onPress={() => setShowInstructions(!showInstructions)}
                    >
                        <Text style={styles.instructionsToggleText}>
                            📖 How to Setup Google Sheets {showInstructions ? '▼' : '▶'}
                        </Text>
                    </TouchableOpacity>

                    {showInstructions && (
                        <View style={styles.instructionsContent}>
                            <Text style={styles.instructionStep}>
                                <Text style={styles.stepNumber}>1.</Text> Create a new Google Sheet
                            </Text>
                            <Text style={styles.instructionStep}>
                                <Text style={styles.stepNumber}>2.</Text> Add headers: Date | Day | Time | Name | Work Update | Image URL
                            </Text>
                            <Text style={styles.instructionStep}>
                                <Text style={styles.stepNumber}>3.</Text> Go to Extensions → Apps Script
                            </Text>
                            <Text style={styles.instructionStep}>
                                <Text style={styles.stepNumber}>4.</Text> Delete default code and paste the HOUP script
                            </Text>
                            <Text style={styles.instructionStep}>
                                <Text style={styles.stepNumber}>5.</Text> Click Deploy → New deployment
                            </Text>
                            <Text style={styles.instructionStep}>
                                <Text style={styles.stepNumber}>6.</Text> Select "Web app" type
                            </Text>
                            <Text style={styles.instructionStep}>
                                <Text style={styles.stepNumber}>7.</Text> Set "Who has access" to "Anyone"
                            </Text>
                            <Text style={styles.instructionStep}>
                                <Text style={styles.stepNumber}>8.</Text> Click "Deploy" and copy the Web App URL
                            </Text>
                            <Text style={styles.instructionStep}>
                                <Text style={styles.stepNumber}>9.</Text> Paste the URL above and click "Save URL"
                            </Text>
                            <Text style={styles.instructionNote}>
                                💡 Note: You can also paste your Google Sheets viewing URL (docs.google.com/spreadsheets/...)
                            </Text>
                        </View>
                    )}
                </View>

                {/* Notifications Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🔔 Notifications</Text>
                    <Text style={styles.sectionDescription}>
                        Get reminders every 90 minutes (9 AM - 7 PM)
                    </Text>

                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>Enable Reminders</Text>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={handleToggleNotifications}
                            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                            thumbColor={notificationsEnabled ? theme.colors.secondary : '#f4f3f4'}
                        />
                    </View>

                    {notificationsEnabled && scheduledCount > 0 && (
                        <Text style={styles.infoText}>
                            ✅ {scheduledCount} reminders scheduled
                        </Text>
                    )}

                    <TouchableOpacity style={styles.secondaryButton} onPress={handleTestNotification}>
                        <Text style={styles.secondaryButtonText}>Test Notification</Text>
                    </TouchableOpacity>
                </View>

                {/* About Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ℹ️ About</Text>
                    <View style={styles.aboutContent}>
                        <Text style={styles.aboutText}>
                            <Text style={styles.aboutLabel}>App Name: </Text>
                            Houp
                        </Text>
                        <Text style={styles.aboutText}>
                            <Text style={styles.aboutLabel}>Version: </Text>
                            1.0.0
                        </Text>
                        <Text style={styles.aboutText}>
                            <Text style={styles.aboutLabel}>Developer: </Text>
                            Naveenraj
                        </Text>
                        <Text style={styles.aboutDescription}>
                            Houp helps you track work updates throughout the day and automatically saves them to Google Sheets.
                        </Text>
                    </View>
                </View>

                {/* Install App Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📱 Install App</Text>
                    <Text style={styles.sectionDescription}>
                        For the best experience, install Houp on your device. Build the APK using Expo EAS Build.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    contentContainer: {
        paddingBottom: 100,
    },
    header: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.xl,
        paddingTop: theme.spacing.xxl + 20,
    },
    headerTitle: {
        fontSize: theme.fontSize.xxl,
        fontWeight: theme.fontWeight.bold,
        color: '#FFFFFF',
        marginBottom: theme.spacing.xs,
    },
    headerSubtitle: {
        fontSize: theme.fontSize.md,
        color: '#FFFFFF',
        opacity: 0.9,
    },
    content: {
        padding: theme.spacing.lg,
    },
    section: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
        ...theme.shadows.small,
    },
    sectionTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    sectionDescription: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.md,
        lineHeight: 20,
    },
    input: {
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        fontSize: theme.fontSize.sm,
        color: theme.colors.text,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.md,
    },
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.semibold,
        color: '#FFFFFF',
    },
    linkButton: {
        marginTop: theme.spacing.sm,
        padding: theme.spacing.sm,
        alignItems: 'center',
    },
    linkButtonText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.primary,
        fontWeight: theme.fontWeight.medium,
    },
    secondaryButton: {
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    secondaryButtonText: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.primary,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    switchLabel: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text,
        fontWeight: theme.fontWeight.medium,
    },
    infoText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.success,
        marginBottom: theme.spacing.md,
    },
    aboutContent: {
        gap: theme.spacing.sm,
    },
    aboutText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text,
    },
    aboutLabel: {
        fontWeight: theme.fontWeight.semibold,
    },
    aboutDescription: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.sm,
        lineHeight: 20,
    },
    instructionsToggle: {
        marginTop: theme.spacing.md,
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    instructionsToggleText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.primary,
        fontWeight: theme.fontWeight.semibold,
    },
    instructionsContent: {
        marginTop: theme.spacing.md,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.md,
        gap: theme.spacing.sm,
    },
    instructionStep: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.text,
        lineHeight: 20,
    },
    stepNumber: {
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.primary,
    },
    instructionNote: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        fontStyle: 'italic',
        marginTop: theme.spacing.sm,
        lineHeight: 18,
    },
});
