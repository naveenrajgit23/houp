import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
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
        // Check if user has a saved name
        const userName = await storage.getUserName();

        // Set initial route based on whether user name exists
        if (userName) {
            setInitialRoute('Welcome');
        } else {
            setInitialRoute('Login');
        }

        // Request notification permissions on app start
        const notificationsEnabled = await storage.getNotificationsEnabled();
        if (notificationsEnabled) {
            const hasPermission = await notifications.requestPermissions();
            if (hasPermission) {
                await notifications.scheduleReminders();
            }
        }

        setIsReady(true);
    };

    if (!isReady) {
        return null; // Or a loading screen
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
