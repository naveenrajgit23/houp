# Houp - Work Update Tracker

A productivity mobile app that helps you record work updates throughout the day and automatically saves them to Google Sheets with 90-minute reminder notifications.

## Features

- 📝 Simple work update entry
- ⏰ 90-minute interval reminders (9 AM - 7 PM)
- 📊 Automatic Google Sheets integration
- 📷 Image upload support
- 💾 Offline caching
- 🔔 Customizable notifications

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the App

```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios
```

### 3. Configure Google Sheets Integration

1. Follow the instructions in [GOOGLE_SHEETS_SCRIPT.md](./GOOGLE_SHEETS_SCRIPT.md)
2. Deploy the Google Apps Script
3. Copy the Web App URL
4. Open Houp app → Settings → Paste the URL → Save

### 4. Enable Notifications

1. Open Settings in the app
2. Toggle "Enable Reminders"
3. Grant notification permissions when prompted
4. Test notifications using the "Test Notification" button

## Building for Production

### Android APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build APK
eas build --platform android --profile preview
```

### iOS (requires macOS and Apple Developer account)

```bash
eas build --platform ios
```

## Project Structure

```
houp-app/
├── App.tsx                 # Main app entry point
├── screens/
│   ├── WelcomeScreen.tsx   # Welcome screen
│   ├── MainScreen.tsx      # Work update screen
│   └── SettingsScreen.tsx  # Settings screen
├── components/
│   └── BottomNav.tsx       # Bottom navigation
├── services/
│   ├── storage.ts          # Local storage
│   ├── googleSheets.ts     # Google Sheets API
│   ├── notifications.ts    # Notification service
│   └── imageUpload.ts      # Image upload service
└── styles/
    └── theme.ts            # Design system
```

## Configuration

### Image Upload (Optional)

To enable cloud image upload:

1. Sign up for a free ImgBB account: https://api.imgbb.com/
2. Get your API key
3. Open `services/imageUpload.ts`
4. Replace `YOUR_IMGBB_API_KEY` with your actual API key

Without an API key, images will be stored locally only.

## Troubleshooting

### Notifications not working

- Ensure notification permissions are granted in device settings
- Check that notifications are enabled in app Settings
- Try the "Test Notification" button

### Google Sheets not saving

- Verify the Web App URL is correct (should contain `script.google.com` and `/exec`)
- Ensure the Google Apps Script is deployed as a Web App
- Check that the script has proper permissions

### App won't start

```bash
# Clear cache and restart
npx expo start --clear
```

## Developer

Created by **Naveenraj**

## License

ISC
