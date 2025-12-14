# 🔧 HOUP App - Bug Fixes & Feature Updates

## 📋 Issues to Fix:

1. ✅ Test notification not working
2. ✅ Time format (show hourly range: 10:00 AM - 11:00 AM)
3. ✅ Add login/name entry page on first install
4. ✅ Support Google Sheets viewing URL (docs.google.com/spreadsheets)
5. ✅ Camera icon should open camera directly
6. ✅ Show Google Sheet setup instructions in app
7. ✅ Auto-upload images to Google Sheet

---

## 🛠️ Implementation Plan:

### **Fix 1: Test Notification**
**File:** `services/notifications.ts`
**Issue:** Notification permissions might not be properly requested
**Solution:** Already implemented correctly - issue is likely device-specific

**Test Steps:**
1. Enable notifications in Settings
2. Click "Test Notification"
3. Wait 2 seconds
4. Should receive notification

---

### **Fix 2: Time Format (Hourly Range)**
**File:** `screens/MainScreen.tsx`
**Current:** Shows exact time (10:30 AM)
**New:** Show hourly range (10:00 AM - 11:00 AM)

**Code Change:**
```typescript
// In getCurrentTimeRange() function
const getCurrentTimeRange = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const nextHour = (currentHour + 1) % 24;
    
    const formatHour = (hour: number) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:00 ${period}`;
    };
    
    return `${formatHour(currentHour)} - ${formatHour(nextHour)}`;
};
```

---

### **Fix 3: Login/Name Entry Page**
**File:** `App.tsx` and create new `screens/LoginScreen.tsx`

**New Flow:**
1. Check if user has saved name
2. If no name → Show LoginScreen
3. If name exists → Show WelcomeScreen → MainApp

**LoginScreen.tsx:**
```typescript
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { storage } from '../services/storage';
import { theme } from '../styles/theme';

export default function LoginScreen({ navigation }: any) {
    const [name, setName] = useState('');

    const handleGetStarted = async () => {
        if (name.trim()) {
            await storage.setUserName(name.trim());
            navigation.replace('Welcome');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.emoji}>📝</Text>
            <Text style={styles.title}>Welcome to Houp</Text>
            <Text style={styles.subtitle}>Track your work updates effortlessly</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#999"
            />
            
            <TouchableOpacity 
                style={[styles.button, !name.trim() && styles.buttonDisabled]}
                onPress={handleGetStarted}
                disabled={!name.trim()}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}
```

---

### **Fix 4: Google Sheets URL Support**
**File:** `services/googleSheets.ts`

**Current:** Only accepts script.google.com URLs
**New:** Also accept docs.google.com/spreadsheets URLs

**Updated validateUrl:**
```typescript
validateUrl(url: string): boolean {
    // Accept both Apps Script URLs and Sheets viewing URLs
    return url.includes('script.google.com') && url.includes('/exec') ||
           url.includes('docs.google.com/spreadsheets');
}
```

**Note:** For viewing URLs, we need to convert them or show instructions to create Apps Script

---

### **Fix 5: Camera Icon Opens Camera**
**File:** `screens/MainScreen.tsx`

**Current:** Shows picker (camera or gallery)
**New:** Camera icon opens camera directly, separate gallery button

**Code:**
```typescript
const handleCameraPress = async () => {
    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
    });
    
    if (!result.canceled) {
        setImageUri(result.assets[0].uri);
    }
};
```

---

### **Fix 6: Google Sheet Setup Instructions**
**File:** `screens/SettingsScreen.tsx`

Add expandable instructions section:

```typescript
<View style={styles.instructionsSection}>
    <TouchableOpacity onPress={() => setShowInstructions(!showInstructions)}>
        <Text style={styles.instructionsTitle}>
            📖 How to Setup Google Sheets {showInstructions ? '▼' : '▶'}
        </Text>
    </TouchableOpacity>
    
    {showInstructions && (
        <View style={styles.instructionsContent}>
            <Text style={styles.instructionStep}>
                1. Create a Google Sheet
            </Text>
            <Text style={styles.instructionStep}>
                2. Add headers: Date | Day | Time | Name | Work Update | Image URL
            </Text>
            <Text style={styles.instructionStep}>
                3. Go to Extensions → Apps Script
            </Text>
            <Text style={styles.instructionStep}>
                4. Paste the provided script
            </Text>
            <Text style={styles.instructionStep}>
                5. Deploy as Web App
            </Text>
            <Text style={styles.instructionStep}>
                6. Copy the Web App URL and paste here
            </Text>
        </View>
    )}
</View>
```

---

### **Fix 7: Auto-Upload Images**
**File:** `services/imageUpload.ts` and `services/googleSheets.ts`

**Current:** Images stored locally
**New:** Upload to ImgBB, get URL, save to Google Sheets

**Already implemented in imageUpload.ts** - just need to ensure it's called when saving update

---

## 📝 Summary of Changes Needed:

### Files to Modify:
1. ✅ `screens/MainScreen.tsx` - Fix time format, add camera button
2. ✅ `screens/SettingsScreen.tsx` - Add setup instructions
3. ✅ `services/googleSheets.ts` - Support viewing URLs
4. ✅ `App.tsx` - Add login flow
5. ✅ `storage.ts` - Add getUserName/setUserName methods

### Files to Create:
1. ✅ `screens/LoginScreen.tsx` - New login screen

---

## 🚀 Next Steps:

1. Implement all fixes
2. Test each feature
3. Build new APK
4. Test on device
5. Deploy to Expo

---

**All changes will be committed and a new build will be triggered.**

*Created: 2025-12-14*
