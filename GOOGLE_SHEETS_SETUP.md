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
    
    // Send email notification
    sendNotificationEmail(data);
    
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

function sendNotificationEmail(data) {
  // Configuration - UPDATE THESE VALUES
  const NOTIFICATION_EMAIL = "your-email@example.com"; // Change this to your email
  const CC_EMAIL = ""; // Optional: Add CC email addresses separated by commas
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/1cF4N5IRI3Jpuvnxq2kODn_lfqOSsgUX2MDHlL6O15SM/edit?gid=0#gid=0"; // Your Google Sheet URL
  
  try {
    // Email subject
    const subject = `🔔 New Contact Form Submission - ${data.name}`;
    
    // Create HTML email body
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">New Contact Form Submission</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Divya Singham Consultancy</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e9ecef;">
          <h3 style="color: #495057; margin-top: 0;">Contact Details:</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #495057; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: #212529;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Phone:</td>
              <td style="padding: 8px 0; color: #212529;"><a href="tel:${data.phone}" style="color: #007bff; text-decoration: none;">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Email:</td>
              <td style="padding: 8px 0; color: #212529;"><a href="mailto:${data.email}" style="color: #007bff; text-decoration: none;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Submitted:</td>
              <td style="padding: 8px 0; color: #212529;">${new Date(data.timestamp).toLocaleString()}</td>
            </tr>
          </table>
          
          <h3 style="color: #495057; margin-bottom: 10px;">Query/Service Required:</h3>
          <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
            <p style="margin: 0; line-height: 1.6; color: #212529;">${data.query}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #d1ecf1; border-radius: 4px; border-left: 4px solid #bee5eb;">
            <p style="margin: 0; color: #0c5460;">
              <strong>Next Steps:</strong> Reply to this email or contact the client directly using the information above.
            </p>
          </div>
          
          <div style="margin-top: 20px; text-align: center;">
            <a href="${SHEET_URL}" style="display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              📊 View All Submissions in Google Sheet
            </a>
          </div>
        </div>
      </div>
    `;
    
    // Plain text version for email clients that don't support HTML
    const plainBody = `
New Contact Form Submission - Divya Singham Consultancy

Contact Details:
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Submitted: ${new Date(data.timestamp).toLocaleString()}

Query/Service Required:
${data.query}

Next Steps: Reply to this email or contact the client directly using the information above.

View all submissions: ${SHEET_URL}
    `;
    
    // Send the email
    const emailOptions = {
      to: NOTIFICATION_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      body: plainBody
    };
    
    // Add CC if specified
    if (CC_EMAIL && CC_EMAIL.trim() !== "") {
      emailOptions.cc = CC_EMAIL;
    }
    
    MailApp.sendEmail(emailOptions);
    
    console.log(`Email notification sent to ${NOTIFICATION_EMAIL}`);
    
  } catch (emailError) {
    console.error('Failed to send email notification:', emailError.toString());
    // Don't throw error here - we don't want email failure to break the form submission
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
3. Check your email inbox for the notification email

## Email Notification Setup

### Step 1: Configure Email Address and Sheet URL
In the `sendNotificationEmail` function, update these lines:
```javascript
const NOTIFICATION_EMAIL = "your-email@example.com"; // Change this to your email
const CC_EMAIL = ""; // Optional: Add CC email addresses separated by commas
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1cF4N5IRI3Jpuvnxq2kODn_lfqOSsgUX2MDHlL6O15SM/edit?gid=0#gid=0"; // Your Google Sheet URL
```

**Example:**
```javascript
const NOTIFICATION_EMAIL = "admin@divyasingham.com";
const CC_EMAIL = "manager@divyasingham.com, support@divyasingham.com";
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1cF4N5IRI3Jpuvnxq2kODn_lfqOSsgUX2MDHlL6O15SM/edit?gid=0#gid=0";
```

> **Note:** The sheet URL is already configured with your specific Google Sheet ID. You can leave it as is, or update it if you create a new sheet.

### Step 2: Grant Email Permissions
When you first run the script, Google will ask for permissions:
1. Click **Review permissions**
2. Choose your Google account
3. Click **Advanced** → **Go to [Your Project Name] (unsafe)**
4. Click **Allow** to grant email sending permissions

### Email Features
- ✅ **HTML formatted emails** with professional styling
- ✅ **Clickable phone numbers** and email addresses
- ✅ **Timestamp** showing when the form was submitted
- ✅ **Direct link to Google Sheet** - Click "📊 View All Submissions" button
- ✅ **CC support** for multiple recipients
- ✅ **Error handling** - email failures won't break form submissions
- ✅ **Responsive design** that looks good on mobile and desktop

## Troubleshooting
- If data doesn't appear, check the Apps Script execution logs
- Ensure the deployment is set to "Anyone" for access
- Make sure you authorized the script with proper permissions
- **For email issues**: Check the Apps Script execution logs for email-specific errors
- **Gmail limits**: Google Apps Script has daily email quotas (100 emails/day for free accounts)

## Advanced Email Customization

### Custom Email Templates
You can modify the HTML template in the `sendNotificationEmail` function to:
- Change colors and styling
- Add your company logo
- Include additional information
- Customize the email format

### Auto-Reply to Customer
To send an automatic reply to the customer, add this to the `doPost` function:
```javascript
// Send auto-reply to customer
sendCustomerAutoReply(data);
```

Then add this function:
```javascript
function sendCustomerAutoReply(data) {
  const subject = "Thank you for contacting Divya Singham Consultancy";
  const body = `
Dear ${data.name},

Thank you for reaching out to Divya Singham Consultancy. We have received your inquiry and will get back to you within 24 hours.

Your submitted information:
- Name: ${data.name}
- Phone: ${data.phone}
- Email: ${data.email}

Our team will review your requirements and contact you soon.

Best regards,
Divya Singham Consultancy Team
  `;
  
  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: body
  });
}
```
