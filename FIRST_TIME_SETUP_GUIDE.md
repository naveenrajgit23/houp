# 📱 HOUP - Complete Setup Guide for First Time Users

## Welcome to Houp! 🎉

This guide will help you set up Houp in **15 minutes**. Follow each step carefully.

---

## 📥 STEP 1: Install the App

1. Download the **Houp.apk** file to your Android phone
2. Tap on the APK file to install
3. If you see "Install blocked", go to:
   - **Settings** → **Security** → Enable **"Install from unknown sources"**
4. Tap **"Install"**
5. Tap **"Open"** when installation completes

---

## 👤 STEP 2: First Launch - Enter Your Name

When you open Houp for the first time:

1. You'll see a welcome screen
2. Enter your name (Example: "Naveenraj")
3. Tap **"Get Started 🚀"**
4. Wait 2 seconds for the welcome animation
5. You'll reach the main screen

**✅ Your name is now saved permanently!**

---

## 🔔 STEP 3: Enable Notifications

The app will ask for notification permission:

1. A popup appears: **"Allow Houp to send you notifications?"**
2. Tap **"Allow"**
3. You'll now get reminders every 90 minutes (9 AM - 7 PM)

**If you missed it:**
- Go to **⚙️ Settings** (bottom right)
- Toggle **"Enable Reminders"** ON
- Grant permission when asked

---

## 📊 STEP 4: Setup Google Sheets (IMPORTANT!)

This is the most important step. Follow carefully:

### 4A. Create Your Google Sheet

**On your phone or computer:**

1. Open browser and go to: **https://sheets.google.com**
2. Sign in with your Google account
3. Click **"+ Blank"** to create a new spreadsheet
4. Click on **"Untitled spreadsheet"** at the top
5. Rename it to: **"Houp Work Updates"**
6. In **Row 1**, add these exact headers:

**Type these in cells A1 to F1:**

| Cell | Header Text |
|------|-------------|
| A1   | Date        |
| B1   | Day         |
| C1   | Time        |
| D1   | Name        |
| E1   | Work Update |
| F1   | Image URL   |

**Your sheet should look like this:**

```
┌──────┬─────┬──────┬──────┬─────────────┬───────────┐
│ Date │ Day │ Time │ Name │ Work Update │ Image URL │
├──────┼─────┼──────┼──────┼─────────────┼───────────┤
│      │     │      │      │             │           │
└──────┴─────┴──────┴──────┴─────────────┴───────────┘
```

---

### 4B. Create Google Apps Script

**Still in your Google Sheet:**

1. Click **"Extensions"** in the menu bar
2. Click **"Apps Script"**
3. A new tab opens with code editor
4. **Delete** any existing code you see
5. **Copy the code below** and paste it:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Append a new row with the data
    sheet.appendRow([
      data.date,
      data.day,
      data.time,
      data.userName,
      data.workUpdate,
      data.imageUrl || ''
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
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

6. Click **"💾 Save"** icon (or Ctrl+S)
7. Give it a name: **"Houp API"**
8. Click **"OK"**

---

### 4C. Deploy the Script

**Very Important - Follow Exactly:**

1. Click **"Deploy"** button (top right, blue button)
2. Click **"New deployment"**
3. Click the **⚙️ gear icon** next to "Select type"
4. Choose **"Web app"**
5. Fill in the settings:

   **Description:** `Houp Work Updates API`
   
   **Execute as:** `Me (your email)`
   
   **Who has access:** `Anyone`

6. Click **"Deploy"**

---

### 4D. Authorize the Script

**You'll see a warning - This is normal!**

1. A popup says: **"Authorization required"**
2. Click **"Authorize access"**
3. Choose your Google account
4. You'll see: **"Google hasn't verified this app"**
   - This is YOUR script, so it's safe!
5. Click **"Advanced"** (bottom left)
6. Click **"Go to Houp API (unsafe)"**
7. Click **"Allow"**

---

### 4E. Copy the Web App URL

**MOST IMPORTANT STEP:**

1. After authorization, you'll see: **"Deployment successfully created"**
2. You'll see a **Web App URL** that looks like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
3. **COPY THIS ENTIRE URL** (click the copy icon 📋)
4. **Save it somewhere** (Notes app, WhatsApp message to yourself)
5. Click **"Done"**

**⚠️ IMPORTANT:** Keep this URL safe! You'll need it in the next step.

---

## 📲 STEP 5: Connect Google Sheet to Houp App

**Now go back to your Houp app:**

1. Open **Houp app** on your phone
2. Tap **⚙️ Settings** icon (bottom right)
3. Scroll to **"📊 Google Sheet URL"**
4. Tap on the text field
5. **Paste** the Web App URL you copied
6. Tap **"Save URL"** button
7. You should see: **"✅ Google Sheet URL saved successfully!"**

**✅ Setup Complete!**

---

## 🎉 STEP 6: Test Your Setup

**Let's make sure everything works:**

1. Tap **🏠 Home** icon (bottom left)
2. Your name should already be filled in
3. In **"Work Update"**, type: `Testing Houp app - First entry!`
4. The time is auto-filled (you can change it if needed)
5. Tap **"💾 Save Update"**
6. You should see: **"✅ Update saved successfully!"**

**Now check your Google Sheet:**

1. Open your browser
2. Go to your **"Houp Work Updates"** Google Sheet
3. You should see a new row with:
   - Today's date
   - Day of the week
   - Current time
   - Your name
   - Your work update
   - (Image URL will be empty if you didn't add an image)

**🎊 If you see your data in the sheet - CONGRATULATIONS! Everything is working!**

---

## 📸 OPTIONAL: Add Images to Updates

1. In the main screen, tap **"📷 Add Image"**
2. Choose a photo from your gallery
3. You'll see a preview
4. Enter your work update
5. Tap **"💾 Save Update"**
6. The image will be uploaded and the URL saved to your sheet

**Note:** For image upload to work, you need an ImgBB API key (free). See advanced setup guide.

---

## 🔔 How Notifications Work

Once you've allowed notifications:

**You'll get reminders:**
- **9:00 AM** - "Good morning! Start tracking your work updates"
- **10:30 AM** - "Time for your work update!"
- **12:00 PM** - "Time for your work update!"
- **1:30 PM** - "Time for your work update!"
- **3:00 PM** - "Time for your work update!"
- **4:30 PM** - "Time for your work update!"
- **6:00 PM** - "Time for your work update!"

**Notifications stop at 7:00 PM**

**To turn off notifications:**
1. Go to **⚙️ Settings**
2. Toggle **"Enable Reminders"** OFF

---

## 📊 View Your Saved Updates

1. Tap **📊 Sheet** icon (bottom center)
2. You'll see all your saved work updates
3. Shows last 10 updates with date, time, and details

---

## ⚙️ Settings Options

In Settings, you can:

- ✅ See your logged-in name
- ✅ Change Google Sheet URL
- ✅ Enable/Disable notifications
- ✅ Test notifications
- ✅ View app info
- ✅ Logout and change user

---

## 🚪 Change User / Logout

If you want to change your name:

1. Go to **⚙️ Settings**
2. Scroll down
3. Tap **"🚪 Change User / Logout"**
4. Confirm
5. App will restart
6. Enter new name

**⚠️ Note:** Your saved updates will remain in your Google Sheet!

---

## ❓ Troubleshooting

### Problem: "Google Sheet URL saved but data not appearing"

**Solution:**
1. Check the URL is correct (should end with `/exec`)
2. Make sure you deployed as **"Anyone"** can access
3. Check your Google Sheet has the correct headers
4. Try saving another update

---

### Problem: "Notifications not working"

**Solution:**
1. Go to phone **Settings** → **Apps** → **Houp**
2. Enable **Notifications**
3. In Houp app, go to **Settings**
4. Toggle **"Enable Reminders"** OFF then ON
5. Tap **"Test Notification"** to check

---

### Problem: "Can't install APK"

**Solution:**
1. Go to **Settings** → **Security**
2. Enable **"Install from unknown sources"** or **"Install unknown apps"**
3. Try installing again

---

### Problem: "Image upload not working"

**Solution:**
- Image upload requires ImgBB API key (optional feature)
- You can still use the app without images
- Images will be stored locally only

---

## 📞 Need Help?

If you have any issues:
1. Check this guide again
2. Make sure you followed each step exactly
3. Contact the developer: **Naveenraj**

---

## 🎯 Daily Usage (After Setup)

Once setup is complete, daily usage is super simple:

1. **Open Houp app**
2. **Enter your work update**
3. **Tap Save**
4. **Done!** ✅

Your update is automatically saved to your Google Sheet!

---

## 📝 Summary Checklist

- [ ] APK installed
- [ ] Name entered
- [ ] Notifications allowed
- [ ] Google Sheet created with headers
- [ ] Google Apps Script code pasted
- [ ] Script deployed as Web App
- [ ] Script authorized
- [ ] Web App URL copied
- [ ] URL pasted in Houp Settings
- [ ] Test update saved successfully
- [ ] Data appears in Google Sheet

**If all boxes are checked - You're all set! 🎉**

---

## 🌟 Tips for Best Experience

1. **Keep notifications ON** - Never miss an update reminder
2. **Check your Google Sheet** - See your progress over time
3. **Add images** - Visual context helps remember what you worked on
4. **Be consistent** - Update every 90 minutes for best tracking
5. **Review weekly** - Look at your Google Sheet to see your productivity

---

## 🔒 Privacy & Security

- ✅ Your data is stored in **YOUR** Google Sheet only
- ✅ Only you have access to your data
- ✅ Houp app doesn't store data on any server
- ✅ Your Google account credentials are never shared
- ✅ Completely private and secure

---

## 📱 App Features Summary

✅ Simple work update entry
✅ Auto-filled time (editable)
✅ Image upload support
✅ Google Sheets auto-sync
✅ 90-minute reminders (9 AM - 7 PM)
✅ Offline caching
✅ View saved updates
✅ Clean, minimal design
✅ Fast and easy to use

---

**Enjoy using Houp! 🚀**

**Track your work. Boost your productivity. Stay organized.**

---

*Developed by Naveenraj*
*Version 1.0.0*
