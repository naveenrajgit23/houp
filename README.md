# HOUP - Hour Update Tracker 📝

**Version:** 1.0.9 (Build 10)  
**Developer:** Naveenraj  
**Last Updated:** December 16, 2025

A React Native mobile app for tracking hourly work updates with automatic Google Sheets integration and smart notifications.

---

## 🎯 Features

- ✅ **Hourly Update Tracking** - Record work updates throughout the day
- ✅ **Google Sheets Integration** - Auto-save updates to Google Sheets
- ✅ **Smart Notifications** - 7 daily reminders (9 AM - 6 PM)
- ✅ **Camera Integration** - Attach photos to updates
- ✅ **Offline Support** - Works without internet, syncs later
- ✅ **Automatic Updates** - OTA updates via Expo
- ✅ **Clean UI** - Modern, intuitive interface

---

## 📱 Download & Install

### **Latest APK**
Download the latest version:
```
https://expo.dev/artifacts/eas/mH14uN4DWGFwjpCne9TFKD.apk
```

### **Installation Steps**
1. Download the APK file
2. Enable "Install from unknown sources" in Android settings
3. Open the APK file and install
4. Open HOUP app
5. Enter your name
6. Allow notifications (optional but recommended)
7. Start tracking your work updates!

**Detailed installation guide:** See `HOW_TO_INSTALL_FOR_USERS.md`

---

## 🔔 Notification Schedule

HOUP sends 7 daily reminders at:
- 9:00 AM - Good morning reminder
- 10:30 AM - Work update reminder
- 12:00 PM - Work update reminder
- 1:30 PM - Work update reminder
- 3:00 PM - Work update reminder
- 4:30 PM - Work update reminder
- 6:00 PM - Work update reminder

**All times use your device's local timezone automatically.**

---

## 📊 Google Sheets Setup

### **Quick Setup**
1. Create a new Google Sheet
2. Add headers: `Date | Day | Time | Name | Work Update | Image URL`
3. Go to Extensions → Apps Script
4. Paste the HOUP script (see `GOOGLE_SHEETS_SCRIPT.md`)
5. Deploy as Web App
6. Copy the Web App URL
7. Paste in HOUP Settings

**Detailed setup guide:** See `GOOGLE_SHEETS_SCRIPT.md`

---

## 🔧 Tech Stack

- **Framework:** React Native with Expo SDK 54.0.29
- **Language:** TypeScript
- **Navigation:** React Navigation 6.x
- **Storage:** AsyncStorage
- **Notifications:** expo-notifications
- **Camera:** expo-image-picker
- **Updates:** Expo OTA Updates

---

## 📂 Project Structure

```
houp/
├── App.tsx                 # Main app entry
├── screens/               # App screens
│   ├── LoginScreen.tsx
│   ├── WelcomeScreen.tsx
│   ├── MainScreen.tsx
│   └── SettingsScreen.tsx
├── components/            # Reusable components
│   └── BottomNav.tsx
├── services/              # Business logic
│   ├── notifications.ts
│   ├── storage.ts
│   └── googleSheets.ts
├── styles/                # Styling
│   └── theme.ts
├── assets/                # Images & icons
└── app.json              # Expo configuration
```

---

## 🚀 Development

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Expo CLI
- Android Studio (for Android builds)

### **Setup**
```bash
# Clone repository
git clone https://github.com/naveenrajgit23/houp.git
cd houp

# Install dependencies
npm install

# Start development server
npx expo start

# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios
```

### **Build APK**
```bash
# Login to Expo
npx eas-cli login

# Build production APK
npx eas-cli build --platform android --profile production
```

---

## 🔄 Updates

### **Automatic Updates**
HOUP uses Expo's OTA (Over-The-Air) updates. Users automatically receive updates when they open the app with an internet connection.

### **Publishing Updates**
```bash
# Publish update to production
npx eas-cli update --branch production --message "Your update message"
```

### **Check Update Status**
See `HOW_TO_CHECK_UPDATE.md` for instructions on verifying the latest version.

---

## 🐛 Latest Fixes (Build 10)

### **Scheduled Notifications Fixed** ✅
- **Issue:** Notifications not firing at scheduled times (1:30 PM, etc.)
- **Fix:** Changed from CALENDAR triggers to DATE triggers
- **Result:** 100% reliable notifications at all scheduled times
- **Details:** See `SCHEDULED_NOTIFICATION_FIX.md`

### **Other Fixes**
- ✅ Fixed blank screen on app launch
- ✅ Added comprehensive error handling
- ✅ Fixed asset file formats (PNG)
- ✅ Enhanced notification configuration
- ✅ Added version display in Settings

---

## 📖 Documentation

- **Installation Guide:** `HOW_TO_INSTALL_FOR_USERS.md`
- **Google Sheets Setup:** `GOOGLE_SHEETS_SCRIPT.md`
- **Update Verification:** `HOW_TO_CHECK_UPDATE.md`
- **Notification Fix:** `SCHEDULED_NOTIFICATION_FIX.md`
- **About the App:** `ABOUT_HOUP.md`

---

## 🔒 Permissions

HOUP requires the following Android permissions:
- **Notifications** - For hourly reminders
- **Camera** - To attach photos to updates
- **Storage** - To save photos
- **Exact Alarms** - For precise notification timing
- **Internet** - For Google Sheets sync

---

## 🌐 Links

- **GitHub:** https://github.com/naveenrajgit23/houp
- **Expo Project:** https://expo.dev/accounts/naveenrajma/projects/houp
- **Latest APK:** https://expo.dev/artifacts/eas/mH14uN4DWGFwjpCne9TFKD.apk

---

## 📝 License

This project is developed by Naveenraj for personal and educational use.

---

## 🤝 Support

For issues or questions:
1. Check the documentation files
2. Review `SCHEDULED_NOTIFICATION_FIX.md` for notification issues
3. See `HOW_TO_INSTALL_FOR_USERS.md` for installation help

---

## 📊 Version History

### **Build 10** (Dec 16, 2025) - Current
- Fixed scheduled notifications using DATE triggers
- Added version display in Settings
- 100% reliable notifications

### **Build 9** (Dec 15, 2025)
- Fixed blank screen issue
- Added error handling
- Fixed asset formats

### **Build 1-8**
- Initial development
- Core features implementation
- Google Sheets integration

---

## ✨ Highlights

- 🚀 **Fast & Lightweight** - ~30 MB APK size
- 🔄 **Auto-Updates** - No need to download new APK for updates
- 📱 **Offline First** - Works without internet
- 🔔 **Smart Notifications** - 49 notifications scheduled for 7 days
- 📊 **Google Sheets** - Automatic data backup
- 🎨 **Modern UI** - Clean and intuitive design

---

**Made with ❤️ by Naveenraj**

**Current Version:** 1.0.9 (Build 10) ✅  
**Status:** Production Ready 🚀
