import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { theme } from '../styles/theme';
import { storage } from '../services/storage';
import { googleSheets } from '../services/googleSheets';
import { imageUpload } from '../services/imageUpload';

export default function MainScreen() {
    const [userName, setUserName] = useState('');
    const [workUpdate, setWorkUpdate] = useState('');
    const [time, setTime] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUserData();
        updateTime();
    }, []);

    const loadUserData = async () => {
        const savedName = await storage.getUserName();
        if (savedName) {
            setUserName(savedName);
        }
    };

    const updateTime = () => {
        const now = new Date();
        const currentHour = now.getHours();
        const nextHour = (currentHour + 1) % 24;

        const formatHour = (hour: number) => {
            const period = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour % 12 || 12;
            return `${displayHour}:00 ${period}`;
        };

        setTime(`${formatHour(currentHour)} - ${formatHour(nextHour)}`);
    };

    const handleTakePhoto = async () => {
        const uri = await imageUpload.takePhoto();
        if (uri) {
            setImageUri(uri);
        }
    };

    const handlePickImage = async () => {
        const uri = await imageUpload.pickImage();
        if (uri) {
            setImageUri(uri);
        }
    };

    const handleSave = async () => {
        // Validation
        if (!userName.trim()) {
            Alert.alert('Missing Information', 'Please enter your name');
            return;
        }

        if (!workUpdate.trim()) {
            Alert.alert('Missing Information', 'Please enter your work update');
            return;
        }

        setLoading(true);

        try {
            // Save user name for future use
            await storage.setUserName(userName);

            // Get current date and day
            const now = new Date();
            const date = now.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
            const day = now.toLocaleDateString('en-IN', { weekday: 'long' });

            // Upload image if selected
            let imageUrl = '';
            if (imageUri) {
                const uploadedUrl = await imageUpload.uploadImage(imageUri);
                imageUrl = uploadedUrl || '';
            }

            // Get Google Sheet URL
            const sheetUrl = await storage.getGoogleSheetUrl();

            if (!sheetUrl) {
                Alert.alert(
                    'Google Sheet Not Connected',
                    'Please connect your Google Sheet in Settings first.',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                // Cache the update locally
                                storage.addCachedUpdate({
                                    date,
                                    day,
                                    time,
                                    userName,
                                    workUpdate,
                                    imageUrl,
                                });
                            },
                        },
                    ]
                );
                setLoading(false);
                return;
            }

            // Save to Google Sheets
            await googleSheets.saveUpdate(sheetUrl, {
                date,
                day,
                time,
                userName,
                workUpdate,
                imageUrl,
            });

            Alert.alert('Success', 'Work update saved successfully! ✅');

            // Clear form
            setWorkUpdate('');
            setImageUri(null);
            updateTime();
        } catch (error: any) {
            console.error('Save error:', error);

            // Cache locally on error
            const now = new Date();
            const date = now.toLocaleDateString('en-IN');
            const day = now.toLocaleDateString('en-IN', { weekday: 'long' });

            await storage.addCachedUpdate({
                date,
                day,
                time,
                userName,
                workUpdate,
                imageUrl: imageUri || '',
            });

            Alert.alert(
                'Save Failed',
                'Could not save to Google Sheets. Update saved locally and will sync later.',
                [{ text: 'OK' }]
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Work Update</Text>
                <Text style={styles.headerSubtitle}>Record your progress</Text>
            </View>

            <View style={styles.form}>
                {/* User Name Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Your Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        value={userName}
                        onChangeText={setUserName}
                        placeholderTextColor={theme.colors.textSecondary}
                    />
                </View>

                {/* Work Update Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Work Update</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="What have you been working on?"
                        value={workUpdate}
                        onChangeText={setWorkUpdate}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        placeholderTextColor={theme.colors.textSecondary}
                    />
                </View>

                {/* Time Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Time</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Time"
                        value={time}
                        onChangeText={setTime}
                        placeholderTextColor={theme.colors.textSecondary}
                    />
                </View>

                {/* Image Upload */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Image (Optional)</Text>
                    <View style={styles.imageButtonsRow}>
                        <TouchableOpacity style={styles.imageButton} onPress={handleTakePhoto}>
                            <Text style={styles.imageButtonText}>📷 Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
                            <Text style={styles.imageButtonText}>🖼️ Gallery</Text>
                        </TouchableOpacity>
                    </View>
                    {imageUri && (
                        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                    )}
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={[styles.saveButton, loading && styles.saveButtonDisabled]}
                    onPress={handleSave}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.saveButtonText}>💾 Save Update</Text>
                    )}
                </TouchableOpacity>
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
        paddingBottom: 100, // Space for bottom navigation
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
    form: {
        padding: theme.spacing.lg,
    },
    inputGroup: {
        marginBottom: theme.spacing.lg,
    },
    label: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    input: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        fontSize: theme.fontSize.md,
        color: theme.colors.text,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
    },
    textArea: {
        minHeight: 100,
        paddingTop: theme.spacing.md,
    },
    imageButtonsRow: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    imageButton: {
        flex: 1,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderStyle: 'dashed',
        alignItems: 'center',
        ...theme.shadows.small,
    },
    imageButtonText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.primary,
        fontWeight: theme.fontWeight.medium,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: theme.borderRadius.md,
        marginTop: theme.spacing.md,
        resizeMode: 'cover',
    },
    saveButton: {
        backgroundColor: theme.colors.secondary,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.lg,
        alignItems: 'center',
        marginTop: theme.spacing.md,
        ...theme.shadows.medium,
    },
    saveButtonDisabled: {
        opacity: 0.6,
    },
    saveButtonText: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: '#FFFFFF',
    },
});
