import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { theme } from '../styles/theme';

interface BottomNavProps {
    navigation: any;
    currentRoute: string;
}

export default function BottomNav({ navigation, currentRoute }: BottomNavProps) {
    const navItems = [
        { name: 'Main', icon: '🏠', label: 'Home' },
        { name: 'Settings', icon: '⚙️', label: 'Settings' },
    ];

    return (
        <View style={styles.container}>
            {navItems.map((item) => (
                <TouchableOpacity
                    key={item.name}
                    style={styles.navItem}
                    onPress={() => navigation.navigate(item.name)}
                >
                    <Text style={styles.icon}>{item.icon}</Text>
                    <Text
                        style={[
                            styles.label,
                            currentRoute === item.name && styles.labelActive,
                        ]}
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingBottom: 20,
        paddingTop: 10,
        ...theme.shadows.medium,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: theme.spacing.sm,
    },
    icon: {
        fontSize: 24,
        marginBottom: 4,
    },
    label: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        fontWeight: theme.fontWeight.medium,
    },
    labelActive: {
        color: theme.colors.primary,
        fontWeight: theme.fontWeight.semibold,
    },
});
