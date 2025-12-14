// ========================================
// HOUP - Google Apps Script
// ========================================
// 
// INSTRUCTIONS:
// 1. Open your Google Sheet
// 2. Add headers in Row 1: Date | Day | Time | Work Update | Image URL
// 3. Delete any existing code
// 4. Copy and paste this ENTIRE file
// 5. Click Save (💾)
// 6. Click Deploy → New deployment
// 7. Choose "Web app"
// 8. Set "Execute as" to "Me"
// 9. Set "Who has access" to "Anyone"
// 10. Click Deploy
// 11. Copy the Web App URL
// 12. Paste URL in Houp app Settings
//
// ========================================

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
            data.workUpdate,  // Column D: Work update text
            data.imageUrl || ''  // Column E: Image URL (if any)
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

// Test function - you can ignore this
function doGet(e) {
    return ContentService
        .createTextOutput('Houp Google Sheets API is running!')
        .setMimeType(ContentService.MimeType.TEXT);
}

// ========================================
// That's it! Save and deploy this script.
// ========================================
