import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { theme } from '../styles/theme';

interface WelcomeScreenProps {
    navigation: any;
}

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
    useEffect(() => {
        // Auto-navigate to main screen after 2 seconds
        const timer = setTimeout(() => {
            navigation.replace('MainApp');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>📝</Text>
                <Text style={styles.title}>Welcome to Houp</Text>
                <Text style={styles.subtitle}>Track your work updates effortlessly</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    emoji: {
        fontSize: 80,
        marginBottom: theme.spacing.lg,
    },
    title: {
        fontSize: theme.fontSize.xxl,
        fontWeight: theme.fontWeight.bold,
        color: '#FFFFFF',
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        fontSize: theme.fontSize.md,
        color: '#FFFFFF',
        opacity: 0.9,
    },
});
