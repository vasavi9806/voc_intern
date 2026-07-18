# Connecting the forms to Google Sheets

The newsletter form (Home page) and the contact form (Contact page) both post
to one Google Apps Script Web App, which writes each submission into its own
tab (`Newsletter`, `Contact`) of a Google Sheet. Setup takes about 5 minutes
and needs nothing beyond a free Google account.

## 1. Create the sheet
1. Go to [sheets.google.com](https://sheets.google.com) and create a new
   blank spreadsheet. Name it something like **Editkaro — Website Leads**.

## 2. Add the script
1. In the sheet, open **Extensions → Apps Script**.
2. Delete the placeholder code and paste in the contents of `Code.gs` from
   this folder.
3. Save the project (name it `Editkaro Forms Backend`).

## 3. Deploy as a Web App
1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, then authorize the script when Google prompts you
   (click through the "unverified app" warning — it's your own script).
5. Copy the **Web app URL** it gives you. It looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## 4. Wire it into the site
1. Open `js/forms.js`.
2. Replace the placeholder in this line with the URL you copied:
   ```js
   window.EK_SCRIPT_URL = "https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec";
   ```
3. Save, redeploy the site (or refresh locally). Submissions will now land
   in the **Newsletter** and **Contact** tabs of your sheet, created
   automatically the first time each form is used.

## Notes
- Because Apps Script Web Apps don't return CORS headers by default, the
  site posts with `mode: "no-cors"`. This means the browser can't read the
  actual response, so the form shows a success message optimistically once
  the request is sent. To verify delivery, check the sheet directly, or
  extend `Code.gs` to log failures to a separate tab.
- If you ever redeploy the script (as opposed to editing an existing
  deployment), you'll get a new URL — update `js/forms.js` again.
- To be notified by email on every new contact submission, add a
  `MailApp.sendEmail(...)` call inside the `contact` branch of `doPost`.
