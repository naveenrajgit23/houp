# 🎬 HOUP - Video Tutorial Script

**Duration:** 5-7 minutes  
**Style:** Friendly, clear, step-by-step  
**Target:** First-time users

---

## 🎥 INTRO (0:00 - 0:20)

**[Show Houp app icon on screen]**

**Narrator:**
"Hi! Welcome to Houp - your simple work update tracker. In this video, I'll show you how to set up Houp in just 10 minutes. Let's get started!"

**[Show phone screen with APK file]**

---

## 📥 PART 1: INSTALLATION (0:20 - 1:00)

**[Screen recording: Installing APK]**

**Narrator:**
"First, download the Houp APK file to your Android phone. Tap on it to install."

**[Show 'Install blocked' message]**

"If you see 'Install blocked', go to Settings, then Security, and enable 'Install from unknown sources'."

**[Show installation progress]**

"Tap Install, and wait a few seconds. Once done, tap Open."

**[App opens to login screen]**

---

## 👤 PART 2: FIRST LAUNCH (1:00 - 1:30)

**[Screen recording: Login screen]**

**Narrator:**
"When you open Houp for the first time, you'll see this welcome screen. Enter your name - this will be saved permanently."

**[Type "Naveenraj" on screen]**

"Tap 'Get Started', and you'll see a quick welcome animation."

**[Show welcome screen → main screen transition]**

"Great! You're now on the main screen."

---

## 🔔 PART 3: NOTIFICATIONS (1:30 - 2:00)

**[Show notification permission popup]**

**Narrator:**
"Houp will ask for notification permission. Tap 'Allow' to get work reminders every 90 minutes from 9 AM to 7 PM."

**[Tap Allow]**

"Perfect! You'll now get automatic reminders throughout your workday."

---

## 📊 PART 4: GOOGLE SHEETS SETUP (2:00 - 5:30)

**[Switch to computer screen showing browser]**

**Narrator:**
"Now, the most important part - connecting Google Sheets. You can do this on your phone or computer. I'll show you on computer for clarity."

### 4A: Create Sheet (2:00 - 2:30)

**[Open sheets.google.com]**

"Go to sheets.google.com and create a new blank spreadsheet."

**[Click + Blank]**

"Name it 'Houp Work Updates'."

**[Type in cells]**

"In row 1, add these headers: Date, Day, Time, Name, Work Update, and Image URL."

**[Show completed header row]**

"Your sheet should look like this."

### 4B: Apps Script (2:30 - 3:30)

**[Click Extensions → Apps Script]**

**Narrator:**
"Now click Extensions, then Apps Script. A new tab will open."

**[Show code editor]**

"Delete any existing code, and paste this script."

**[Paste code - show it on screen with text overlay]**

```
CODE SHOWN ON SCREEN:
function doPost(e) {
  // Saves work updates to your sheet
  ...
}
```

**[Click Save]**

"Click Save and name it 'Houp API'."

### 4C: Deploy (3:30 - 4:30)

**[Click Deploy → New deployment]**

**Narrator:**
"Click Deploy, then New deployment. Click the gear icon and choose Web app."

**[Fill in settings]**

"Set Execute as to 'Me', and Who has access to 'Anyone'. Then click Deploy."

**[Authorization screen appears]**

"You'll see an authorization screen. Click Authorize access, choose your account."

**[Show warning screen]**

"Don't worry about this warning - this is YOUR script, so it's safe. Click Advanced, then 'Go to Houp API'."

**[Click Allow]**

"Click Allow to grant permissions."

### 4D: Copy URL (4:30 - 5:00)

**[Show Web App URL]**

**Narrator:**
"Perfect! Now you'll see your Web App URL. This is very important - copy this entire URL."

**[Highlight and copy URL]**

"Save it somewhere safe. You'll need it in the next step."

---

## 📲 PART 5: CONNECT TO APP (5:00 - 5:45)

**[Switch back to phone screen]**

**Narrator:**
"Now back to your phone. Open Houp and tap the Settings icon at the bottom."

**[Tap Settings icon]**

"Scroll to 'Google Sheet URL' and tap the text field."

**[Paste URL]**

"Paste the Web App URL you just copied, and tap Save URL."

**[Show success message]**

"You should see 'Google Sheet URL saved successfully!' Great job!"

---

## 🎉 PART 6: TEST IT (5:45 - 6:30)

**[Tap Home icon]**

**Narrator:**
"Let's test if everything works. Tap Home, and enter a test work update."

**[Type "Testing Houp - First entry!"]**

"The time is auto-filled, but you can change it if needed. Now tap Save Update."

**[Tap Save]**

"You should see 'Update saved successfully!'"

**[Switch to Google Sheet]**

"Now check your Google Sheet - and there it is! Your first work update is saved."

**[Show data in sheet]**

"Date, day, time, your name, and your update - all automatically saved!"

---

## 🎊 OUTRO (6:30 - 7:00)

**[Show app features montage]**

**Narrator:**
"That's it! You're all set up. From now on, just open Houp, enter your work update, and save. It's that simple!"

**[Show notification reminder]**

"You'll get reminders every 90 minutes to keep you on track."

**[Show Google Sheet with multiple entries]**

"All your updates are automatically saved to your Google Sheet, so you can review your progress anytime."

**[Show Houp logo]**

"Thanks for watching! Enjoy using Houp, and stay productive!"

**[End screen with text]**

```
HOUP
Track your work. Boost your productivity.

Developed by Naveenraj
Version 1.0.0

Questions? Contact: [your email]
```

---

## 📝 VIDEO PRODUCTION NOTES

### Equipment Needed:
- Screen recorder (OBS Studio, Camtasia, or phone screen recorder)
- Microphone for clear audio
- Video editing software (DaVinci Resolve, Premiere Pro, or CapCut)

### Recording Tips:
1. **Use clear, slow voice** - Speak clearly for non-native speakers
2. **Pause between steps** - Give viewers time to follow
3. **Highlight important parts** - Use arrows, circles, or zoom
4. **Add text overlays** - Show URLs, code snippets
5. **Use background music** - Soft, non-distracting
6. **Add chapters** - YouTube chapters for easy navigation

### Chapters for YouTube:
```
0:00 - Introduction
0:20 - Installing the APK
1:00 - First Launch & Login
1:30 - Enable Notifications
2:00 - Google Sheets Setup
2:30 - Apps Script Code
3:30 - Deploy Web App
4:30 - Copy Web App URL
5:00 - Connect to Houp App
5:45 - Test Your Setup
6:30 - Conclusion
```

### Video Description:
```
Learn how to set up Houp - the simple work update tracker - in just 10 minutes!

In this tutorial, you'll learn:
✅ How to install the Houp APK
✅ Setting up your first account
✅ Connecting Google Sheets
✅ Deploying Google Apps Script
✅ Testing your setup

📥 Download Houp: [link]
📄 Written Guide: [link to FIRST_TIME_SETUP_GUIDE.md]
💬 Support: [your contact]

Timestamps:
0:00 - Introduction
0:20 - Installing the APK
1:00 - First Launch & Login
1:30 - Enable Notifications
2:00 - Google Sheets Setup
5:00 - Connect to Houp App
5:45 - Test Your Setup
6:30 - Conclusion

#Houp #ProductivityApp #WorkTracker #GoogleSheets
```

---

## 🎨 Visual Elements to Add

1. **Arrows** pointing to important buttons
2. **Circles** highlighting clickable areas
3. **Text boxes** showing URLs or important info
4. **Zoom effects** on small text
5. **Transitions** between phone and computer screens
6. **Success checkmarks** ✅ when steps complete
7. **Background music** (royalty-free, soft)

---

## 🌍 Multi-Language Support

Consider creating versions in:
- English (primary)
- Hindi (for Indian users)
- Spanish
- Portuguese

Just re-record the narration, keep the same visuals!

---

**This script is ready to record! Good luck with your video! 🎬**
