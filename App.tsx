import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import BottomNav from './components/BottomNav';
import { notifications } from './services/notifications';
import { storage } from './services/storage';

const Stack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

function MainNavigator() {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={{ flex: 1 }}>
            <MainStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <MainStack.Screen name="Main" component={MainScreen} />
                <MainStack.Screen name="Settings" component={SettingsScreen} />
            </MainStack.Navigator>
            <BottomNav navigation={navigation} currentRoute={route.name} />
        </View>
    );
}

export default function App() {
    const [initialRoute, setInitialRoute] = useState<string>('Login');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        initializeApp();
    }, []);

    const initializeApp = async () => {
        try {
            console.log('🚀 Initializing app...');

            // Check if user has a saved name
            const userName = await storage.getUserName();
            console.log('👤 User name:', userName || 'Not set');

            // Set initial route based on whether user name exists
            if (userName) {
                setInitialRoute('Welcome');
                console.log('📍 Route: Welcome');
            } else {
                setInitialRoute('Login');
                console.log('📍 Route: Login');
            }

            // Request notification permissions on app start
            const notificationsEnabled = await storage.getNotificationsEnabled();
            console.log('🔔 Notifications enabled:', notificationsEnabled);

            if (notificationsEnabled) {
                const hasPermission = await notifications.requestPermissions();
                console.log('✅ Permission granted:', hasPermission);
                if (hasPermission) {
                    await notifications.scheduleReminders();
                    console.log('⏰ Reminders scheduled');
                }
            }

            console.log('✅ App initialized successfully');
            setIsReady(true);
        } catch (error) {
            console.error('❌ Error initializing app:', error);
            // Set ready anyway to prevent infinite loading
            setIsReady(true);
        }
    };

    if (!isReady) {
        return (
            <View style={styles.loadingContainer}>
                <StatusBar style="light" />
                <Image
                    source={require('./assets/icon.png')}
                    style={styles.loadingLogo}
                />
                <ActivityIndicator size="large" color="#4A90E2" style={styles.loadingIndicator} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
                initialRouteName={initialRoute}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="MainApp" component={MainNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingLogo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    loadingIndicator: {
        marginTop: 20,
    },
});

