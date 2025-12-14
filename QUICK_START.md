# 📄 HOUP - Quick Start Guide

## Welcome to Houp! 🎉
**Your Simple Work Update Tracker**

---

## ⚡ 5-Minute Setup

### STEP 1: Install App
1. Download **Houp.apk**
2. Tap to install
3. Enable "Install from unknown sources" if asked
4. Open Houp

### STEP 2: Enter Your Name
1. Type your name
2. Tap "Get Started"
3. Allow notifications

### STEP 3: Setup Google Sheet

#### A. Create Sheet
1. Go to **sheets.google.com**
2. Create new blank sheet
3. Name it: **"Houp Work Updates"**
4. Add headers in Row 1:

```
Date | Day | Time | Name | Work Update | Image URL
```

#### B. Add Script
1. Click **Extensions** → **Apps Script**
2. Delete existing code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.date,
      data.day,
      data.time,
      data.userName,
      data.workUpdate,
      data.imageUrl || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save**

#### C. Deploy
1. Click **Deploy** → **New deployment**
2. Choose **Web app**
3. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Click **Authorize** → **Allow**
6. **COPY the Web App URL**

#### D. Connect to App
1. Open Houp → **Settings**
2. Paste URL in "Google Sheet URL"
3. Tap **Save URL**

### STEP 4: Test It! ✅
1. Go to **Home**
2. Enter a work update
3. Tap **Save**
4. Check your Google Sheet - data appears!

---

## 🎯 Daily Usage

```
Open Houp → Enter Update → Save → Done!
```

**That's it! Your updates save automatically to Google Sheets.**

---

## 🔔 Notifications

Get reminders every 90 minutes:
- **9:00 AM** - Good morning!
- **10:30 AM** - Time for update
- **12:00 PM** - Time for update
- **1:30 PM** - Time for update
- **3:00 PM** - Time for update
- **4:30 PM** - Time for update
- **6:00 PM** - Time for update

Stops at 7:00 PM

---

## ❓ Troubleshooting

**Data not saving?**
- Check URL ends with `/exec`
- Verify script deployed as "Anyone"
- Check sheet has correct headers

**No notifications?**
- Go to Settings
- Toggle "Enable Reminders" ON
- Allow permission

**Can't install APK?**
- Settings → Security
- Enable "Install from unknown sources"

---

## 📊 Features

✅ Simple work updates
✅ Auto Google Sheets sync
✅ 90-minute reminders
✅ Image upload support
✅ Offline caching
✅ View saved updates
✅ Clean, minimal design

---

## 🔒 Privacy

- Your data = Your Google Sheet
- No central server
- Completely private
- Only you have access

---

## 📞 Support

Need help? Contact: **Naveenraj**

---

**Developed by Naveenraj | Version 1.0.0**

**Track your work. Boost your productivity. Stay organized.**

---

## 📱 QR Code for Download

[QR Code Here - Generate and insert]

Scan to download Houp APK

---

*This is a one-page quick reference guide. For detailed instructions, see FIRST_TIME_SETUP_GUIDE.md*
