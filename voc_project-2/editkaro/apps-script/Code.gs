/**
 * EDITKARO.IN — form-to-sheet backend
 *
 * Deploy this as a Web App (see apps-script/README.md). It accepts POSTs
 * from the newsletter form and the contact form on the website and appends
 * each submission as a new row in its own sheet tab, creating the tabs and
 * header rows automatically the first time it runs.
 */

function doPost(e) {
  try {
    var params = e.parameter;
    var formType = params.formType || "unknown";
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (formType === "newsletter") {
      appendRow(ss, "Newsletter", ["Timestamp", "Email", "Source Page"], [
        new Date(),
        params.email || "",
        params.sourcePage || ""
      ]);
    } else if (formType === "contact") {
      appendRow(ss, "Contact", ["Timestamp", "Name", "Email", "Phone", "Message", "Source Page"], [
        new Date(),
        params.name || "",
        params.email || "",
        params.phone || "",
        params.message || "",
        params.sourcePage || ""
      ]);
    } else {
      appendRow(ss, "Other", ["Timestamp", "Raw Payload"], [new Date(), JSON.stringify(params)]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function appendRow(spreadsheet, sheetName, headers, row) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  sheet.appendRow(row);
}

// Optional: quick manual test from the Apps Script editor (Run > testDoPost)
function testDoPost() {
  var fakeEvent = {
    parameter: {
      formType: "contact",
      name: "Test User",
      email: "test@example.com",
      phone: "9999999999",
      message: "This is a test submission.",
      sourcePage: "manual-test"
    }
  };
  Logger.log(doPost(fakeEvent).getContent());
}
