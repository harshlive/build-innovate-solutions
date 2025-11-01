# Google Sheets Integration Setup

To connect your contact form to Google Sheets, follow these steps:

## Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Divya Singham Contact Form Submissions"
4. Add headers in the first row: `Name`, `Phone`, `Email`, `Query`, `Timestamp`

## Step 2: Create Google Apps Script
1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any code in the editor
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append the data as a new row
    sheet.appendRow([
      data.name,
      data.phone,
      data.email,
      data.query,
      data.timestamp
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data added successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (disk icon)

## Step 3: Deploy as Web App
1. Click **Deploy** > **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Select **Web app**
4. Configure:
   - **Description**: Contact Form Handler
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access** and grant permissions
7. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/...../exec`)

## Step 4: Update the Contact Form
1. Open `src/components/ContactForm.tsx`
2. Find the line: `const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";`
3. Replace it with your Web app URL

Example:
```typescript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
```

## Testing
1. Submit a test form on your website
2. Check your Google Sheet to verify the data appears

## Troubleshooting
- If data doesn't appear, check the Apps Script execution logs
- Ensure the deployment is set to "Anyone" for access
- Make sure you authorized the script with proper permissions
