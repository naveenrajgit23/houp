# 📱 HOUP - Complete First-Time User Guide

## 🎯 What You'll Do:
1. Install Houp app
2. Enter your name
3. Setup Google Sheet
4. Add Google Apps Script code
5. Connect app to Google Sheet
6. Save your first work update
7. Data saves to both phone and Google Sheet!

---

## 📥 STEP 1: Install Houp App

**On Android Phone:**
1. Download `Houp.apk` file
2. Tap to install
3. If blocked, go to Settings → Security → Enable "Install from unknown sources"
4. Tap "Install"
5. Tap "Open"

---

## 👤 STEP 2: Enter Your Name (First Time Only)

**When app opens:**

```
┌─────────────────────────────┐
│  👋 Welcome to Houp!        │
│                             │
│  Let's get started by       │
│  knowing your name          │
│                             │
│  ┌───────────────────────┐  │
│  │ Enter your name       │  │
│  └───────────────────────┘  │
│                             │
│  [Get Started 🚀]           │
└─────────────────────────────┘
```

1. Type your name (Example: **"Naveenraj"**)
2. Tap **"Get Started 🚀"**
3. See welcome screen (2 seconds)
4. App opens to main screen

✅ **Your name is now saved permanently on your phone!**

---

## 📊 STEP 3: Create Google Sheet

**On Computer or Phone Browser:**

### 3A. Create New Sheet

1. Open browser
2. Go to: **https://sheets.google.com**
3. Sign in with your Google account
4. Click **"+ Blank"** to create new spreadsheet
5. Click "Untitled spreadsheet" at top
6. Rename to: **"Houp Work Updates"**

### 3B. Add Headers

In **Row 1**, type these headers:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| **Date** | **Day** | **Time** | **Name** | **Work Update** | **Image URL** |

**Your sheet should look like this:**

```
┌──────────┬──────┬──────────┬──────┬─────────────┬───────────┐
│ Date     │ Day  │ Time     │ Name │ Work Update │ Image URL │
├──────────┼──────┼──────────┼──────┼─────────────┼───────────┤
│          │      │          │      │             │           │
└──────────┴──────┴──────────┴──────┴─────────────┴───────────┘
```

---

## 💻 STEP 4: Add Google Apps Script

**Still in your Google Sheet:**

### 4A. Open Apps Script

1. Click **"Extensions"** in menu bar
2. Click **"Apps Script"**
3. New tab opens with code editor
4. You'll see some default code - **DELETE IT ALL**

### 4B. Paste This Code

**Copy and paste this ENTIRE code:**

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data from Houp app
    var data = JSON.parse(e.postData.contents);
    
    // Append a new row with the work update data
    sheet.appendRow([
      data.date,        // Column A: Date
      data.day,         // Column B: Day of week
      data.time,        // Column C: Time
      data.userName,    // Column D: User name
      data.workUpdate,  // Column E: Work update text
      data.imageUrl || ''  // Column F: Image URL (if any)
    ]);
    
    // Return success response to Houp app
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response if something goes wrong
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Houp Google Sheets API is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

### 4C. Save the Script

1. Click **"💾 Save"** icon (or press Ctrl+S)
2. Name it: **"Houp API"**
3. Click **"OK"**

---

## 🚀 STEP 5: Deploy the Script

**Very Important - Follow Exactly:**

### 5A. Start Deployment

1. Click **"Deploy"** button (top right, blue button)
2. Click **"New deployment"**

### 5B. Configure Deployment

1. Click the **⚙️ gear icon** next to "Select type"
2. Choose **"Web app"**
3. Fill in these settings:

**Description:** `Houp Work Updates API`

**Execute as:** `Me (your email)`

**Who has access:** `Anyone`

4. Click **"Deploy"**

---

## 🔐 STEP 6: Authorize the Script

**You'll see a warning - This is normal!**

### 6A. Grant Permissions

1. Popup says: **"Authorization required"**
2. Click **"Authorize access"**
3. Choose your Google account

### 6B. Handle Security Warning

You'll see: **"Google hasn't verified this app"**

**Don't worry! This is YOUR script, so it's safe.**

1. Click **"Advanced"** (bottom left)
2. Click **"Go to Houp API (unsafe)"**
3. Click **"Allow"**

---

## 📋 STEP 7: Copy Web App URL

**MOST IMPORTANT STEP!**

### 7A. Get the URL

After authorization, you'll see:

```
┌─────────────────────────────────────┐
│ ✅ Deployment successfully created  │
│                                     │
│ Web App URL:                        │
│ https://script.google.com/macros/   │
│ s/AKfycbx.../exec                   │
│                                     │
│ [📋 Copy]                           │
└─────────────────────────────────────┘
```

1. **COPY THIS ENTIRE URL** (click the copy icon 📋)
2. **Save it somewhere safe** (Notes app, WhatsApp to yourself)
3. Click **"Done"**

**⚠️ KEEP THIS URL SAFE! You need it in the next step.**

---

## 📱 STEP 8: Connect App to Google Sheet

**Now go back to your Houp app on phone:**

### 8A. Open Settings

1. Open Houp app
2. Tap **⚙️ Settings** icon (bottom right)

### 8B. Add Google Sheet URL

```
┌─────────────────────────────────────┐
│ 📊 Google Sheet URL                 │
│ ┌─────────────────────────────────┐ │
│ │ Paste your Google Apps Script   │ │
│ │ Web App URL here                │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [💾 Save URL]                       │
└─────────────────────────────────────┘
```

1. Tap the text field
2. **Paste** the Web App URL you copied
3. Tap **"💾 Save URL"**
4. You'll see: **"✅ Google Sheet URL saved successfully!"**

✅ **Setup Complete!**

---

## 🎉 STEP 9: Save Your First Work Update!

**Now test if everything works:**

### 9A. Go to Home Screen

1. Tap **🏠 Home** icon (bottom left)
2. You'll see:

```
┌─────────────────────────────────────┐
│ Work Update                         │
│ Hi Naveenraj 👋                     │
├─────────────────────────────────────┤
│ Work Update                         │
│ ┌─────────────────────────────────┐ │
│ │ What have you been working on?  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Time                                │
│ ┌──────────────┬────────────────┐  │
│ │              │ 🕐 Now         │  │
│ └──────────────┴────────────────┘  │
└─────────────────────────────────────┘
```

### 9B. Enter Your Update

1. Tap **"Work Update"** field
2. Type: `"Testing Houp app - First entry!"`
3. Tap **"🕐 Now"** button to fill time
4. (Optional) Tap **"📷 Add Image"** to add photo
5. Tap **"💾 Save Update"**

### 9C. See Success!

You'll see: **"✅ Update saved successfully!"**

---

## ✅ STEP 10: Verify Everything Worked!

### 10A. Check Your Phone

Your update is saved on your phone! To see it:

1. Tap **📊 Sheet** icon (bottom center)
2. You'll see all your saved updates!

### 10B. Check Your Google Sheet

**Open your browser:**

1. Go to your **"Houp Work Updates"** Google Sheet
2. You should see a new row with:
   - Today's date
   - Day of the week
   - Time (e.g., "11:00 PM - 12:00 AM")
   - Your name
   - Your work update
   - (Image URL if you added one)

**🎊 If you see your data - CONGRATULATIONS! Everything is working!**

---

## 📊 How Data is Saved

**Every time you save an update:**

```
Phone App
    ↓
Saves to Phone Storage (Local)
    ↓
Sends to Google Sheets (Cloud)
    ↓
Both Saved! ✅
```

**Benefits:**
- ✅ **Local backup** - Works offline
- ✅ **Cloud backup** - Never lose data
- ✅ **Automatic** - No manual work
- ✅ **Instant** - Syncs immediately

---

## 🔄 Daily Usage (After Setup)

**From now on, it's super simple:**

1. Open Houp app
2. Enter work update
3. Tap "🕐 Now" for time
4. Tap "💾 Save"
5. Done! ✅

**Data automatically saves to:**
- ✅ Your phone
- ✅ Your Google Sheet

---

## 🔔 Notifications (Automatic)

**You'll get reminders every 90 minutes:**

- **9:00 AM** - "Good morning! Start tracking"
- **10:30 AM** - "Time for your work update!"
- **12:00 PM** - "Time for your work update!"
- **1:30 PM** - "Time for your work update!"
- **3:00 PM** - "Time for your work update!"
- **4:30 PM** - "Time for your work update!"
- **6:00 PM** - "Time for your work update!"

**Stops at 7:00 PM**

---

## ❓ Troubleshooting

### Problem: "Data not appearing in Google Sheet"

**Solution:**
1. Check the URL is correct (ends with `/exec`)
2. Make sure you deployed as **"Anyone"** can access
3. Check your Google Sheet has the correct headers
4. Try saving another update

### Problem: "Can't save Google Sheet URL"

**Solution:**
1. Make sure URL includes `script.google.com`
2. Copy the ENTIRE URL
3. Paste carefully (no extra spaces)

### Problem: "App not sending notifications"

**Solution:**
1. Go to Settings
2. Enable notifications permission
3. Check phone's notification settings for Houp

---

## 📝 Summary Checklist

**Setup (One-Time):**
- [ ] Install Houp APK
- [ ] Enter your name
- [ ] Create Google Sheet with headers
- [ ] Add Google Apps Script code
- [ ] Deploy script as Web App
- [ ] Authorize the script
- [ ] Copy Web App URL
- [ ] Paste URL in Houp Settings
- [ ] Save first work update
- [ ] Verify data in Google Sheet

**Daily Use:**
- [ ] Open app
- [ ] Enter work update
- [ ] Tap "Now" for time
- [ ] Tap "Save"
- [ ] Done! ✅

---

## 🎯 What Happens Behind the Scenes

```
1. You enter work update in app
2. Tap "Save"
3. App saves to phone storage (instant)
4. App sends data to Google Apps Script URL
5. Google Apps Script receives data
6. Script adds new row to your Google Sheet
7. Both phone and cloud have your data! ✅
```

**All automatic! No manual work needed!**

---

## 🌟 Tips for Best Experience

1. **Keep notifications ON** - Never miss an update reminder
2. **Check Google Sheet weekly** - Review your productivity
3. **Add images** - Visual context helps remember tasks
4. **Be consistent** - Update every 90 minutes
5. **Backup URL** - Save your Google Apps Script URL somewhere safe

---

## 🔒 Privacy & Security

- ✅ Your data = Your Google Sheet only
- ✅ Only you have access
- ✅ No central server
- ✅ Your Google account credentials never shared
- ✅ Completely private and secure

---

## 🎊 You're All Set!

**From now on:**
- Just open app → Enter update → Save
- Data automatically saves to phone AND Google Sheet
- Get reminders every 90 minutes
- Review your productivity anytime in Google Sheet

**Enjoy using Houp! 🚀**

Track your work. Boost your productivity. Stay organized.

---

*Developed by Naveenraj | Version 1.0.0*
