import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
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
    useEffect(() => {
        initializeApp();
    }, []);

    const initializeApp = async () => {
        // Request notification permissions on app start
        const notificationsEnabled = await storage.getNotificationsEnabled();
        if (notificationsEnabled) {
            const hasPermission = await notifications.requestPermissions();
            if (hasPermission) {
                await notifications.scheduleReminders();
            }
        }
    };

    return (
        <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="MainApp" component={MainNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
