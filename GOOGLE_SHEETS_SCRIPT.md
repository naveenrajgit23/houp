# Google Sheets Integration Guide

This guide explains how to set up Google Sheets integration for the Houp app.

## Overview

Houp uses Google Apps Script as a backend API to save work updates to your Google Sheet. This approach:
- Works on all mobile devices
- Doesn't require complex OAuth
- Is free and reliable
- Gives you full control of your data

## Step-by-Step Setup

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Houp Work Updates" (or any name you prefer)
4. Add the following headers in row 1:
   - A1: **Date**
   - B1: **Day**
   - C1: **Time**
   - D1: **Name**
   - E1: **Work Update**
   - F1: **Image URL**

### 2. Open Apps Script Editor

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste the script below

### 3. Google Apps Script Code

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

### 4. Deploy as Web App

1. Click the **Deploy** button (top right)
2. Select **New deployment**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **Web app**
5. Configure the deployment:
   - **Description**: "Houp Work Updates API"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
6. Click **Deploy**
7. **Important**: Copy the **Web App URL** (it will look like: `https://script.google.com/macros/s/XXXXX/exec`)
8. Click **Done**

### 5. Authorize the Script

1. You may see a warning "Google hasn't verified this app"
2. Click **Advanced**
3. Click **Go to [Your Project Name] (unsafe)**
4. Click **Allow**

This is safe because you created the script yourself.

### 6. Configure Houp App

1. Open the Houp app
2. Go to **Settings**
3. Paste the Web App URL in the "Google Sheet URL" field
4. Click **Save URL**
5. You should see "Google Sheet URL saved successfully! ✅"

## Testing

1. Go to the main screen in Houp
2. Enter your name and a test work update
3. Click **Save Update**
4. Check your Google Sheet - you should see a new row with your data!

## Troubleshooting

### "Invalid URL" error
- Make sure you copied the **Web App URL**, not the Google Sheet URL
- The URL should contain `script.google.com` and end with `/exec`

### Data not appearing in sheet
- Check that you authorized the script (step 5)
- Verify the script is deployed as "Anyone" can access
- Make sure the sheet has the correct headers in row 1

### Permission errors
- Re-deploy the script and ensure "Execute as" is set to "Me"
- Make sure "Who has access" is set to "Anyone"

## Updating the Script

If you need to modify the script:

1. Make your changes in the Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click the edit icon (pencil) next to your deployment
4. Select **New version**
5. Click **Deploy**
6. The Web App URL remains the same - no need to update the app!

## Privacy & Security

- Your data is stored in your own Google Sheet
- Only you have access to the spreadsheet
- The script runs under your Google account
- Houp app only sends data to your script, nowhere else

## Advanced: Custom Columns

You can modify the script to add more columns:

1. Add new headers in your Google Sheet
2. Update the `sheet.appendRow([...])` line in the script
3. Modify the Houp app code to send additional data

---

**Need help?** Contact the developer: Naveenraj
