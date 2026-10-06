/**
 * ============================================================================
 * TEARSIZE HEALTH — DEDICATED QUIZ & CLINICAL ASSESSMENT GOOGLE APPS SCRIPT
 * ============================================================================
 * 
 * PURPOSE:
 * Dedicated Google Apps Script Webhook specifically for tracking Quiz Attempts
 * and Quiz Completions in its own Google Spreadsheet.
 * 
 * FEATURES:
 * 1. Tracks every attempt: when a patient begins or answers questions ("In Progress").
 * 2. Updates smoothly: finds existing Session ID and updates the same row instead
 *    of duplicating rows for every answered question.
 * 3. Records full completion: when patient completes the assessment ("Completed")
 *    with 100% progress, Name, and Email Address.
 * 4. Also records early exits / drop-offs ("Abandoned").
 * 5. Automatic visual formatting: color-coded Status pills (Green = Completed,
 *    Yellow/Orange = In Progress, Red = Abandoned).
 * 
 * ----------------------------------------------------------------------------
 * 1-MINUTE SETUP INSTRUCTIONS:
 * 1. Create a NEW Google Sheet (e.g. named "Tearsize - Quiz Responses").
 * 2. Go to "Extensions" > "Apps Script".
 * 3. Delete any default code in Code.gs and PASTE THIS ENTIRE FILE.
 * 4. Click "Save" 💾.
 * 5. Click "Deploy" (top right blue button) > "New deployment".
 * 6. Under "Select type" (gear icon), select "Web app".
 * 7. Set:
 *    - Description: "Tearsize Quiz Webhook"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone"
 * 8. Click "Deploy" > "Authorize access" (log in and click Advanced > Go to ... (unsafe) > Allow).
 * 9. Copy the generated "Web app URL" (starts with https://script.google.com/macros/s/...).
 * 10. Add this URL to your project's .env.local file:
 *     GOOGLE_QUIZ_SCRIPT_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
 * ============================================================================
 */

var BRAND_NAME = "by tearsize";
var ADMIN_EMAIL = "bypeptidet@gmail.com";

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    service: "Tearsize Dedicated Quiz Assessment Webhook",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  var hasLock = false;
  try {
    hasLock = lock.tryLock(25000); // Wait up to 25s for lock
  } catch (lockErr) {
    Logger.log("Lock acquisition note: " + lockErr.toString());
  }

  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var result = handleQuizRecord(data);

    if (hasLock) {
      try { lock.releaseLock(); } catch (relErr) {}
    }

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    if (hasLock) {
      try { lock.releaseLock(); } catch (relErr) {}
    }
    Logger.log("Error handling quiz record: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Core handler to record or update quiz answers in the dedicated sheet.
 */
function handleQuizRecord(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Quiz Answers") || ss.getSheetByName("Quiz Responses") || ss.getSheets()[0];

  // If the first sheet has a default name and is empty, rename it
  if (sheet.getName() === "Sheet1" || sheet.getName() === "Sheet 1") {
    try { sheet.setName("Quiz Answers"); } catch (e) {}
  }

  var headers = [
    "Session ID",
    "Status",
    "Progress",
    "Started At",
    "Last Updated",
    "First Name",
    "Email Address",
    "Primary Goal",
    "Biological Sex / Gender",
    "Age Range",
    "Goal Weight Duration",
    "Diagnosed Conditions",
    "Previous Treatments"
  ];

  // Remove old JSON column if it exists from previous version
  if (sheet.getLastColumn() >= 14) {
    try {
      if (String(sheet.getRange(1, 14).getValue()).indexOf("JSON") !== -1) {
        sheet.deleteColumn(14);
      }
    } catch (colErr) {
      Logger.log("Column cleanup note: " + colErr.toString());
    }
  }

  // Initialize headers if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold")
      .setBackground("#2E1010")
      .setFontColor("#FFFFFF")
      .setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    SpreadsheetApp.flush();
  }

  var sessionId = data.sessionId || ("QZ-" + Utilities.formatDate(new Date(), "Asia/Manila", "yyyyMMdd-HHmmss"));
  var nowFormatted = Utilities.formatDate(new Date(), "Asia/Manila", "yyyy-MM-dd HH:mm:ss");
  
  var startedAtFormatted = nowFormatted;
  if (data.startedAt) {
    try {
      startedAtFormatted = Utilities.formatDate(new Date(data.startedAt), "Asia/Manila", "yyyy-MM-dd HH:mm:ss");
    } catch (dErr) {
      startedAtFormatted = nowFormatted;
    }
  }

  var status = data.status || "In Progress";
  var progress = data.progress || (data.step ? ("Step " + data.step + " of " + (data.totalSteps || 8)) : "In Progress");

  var formatted = data.formattedAnswers || {};
  var raw = data.answers || {};

  var firstName = String(formatted.name || raw.name || "").trim();
  var email = String(formatted.email || raw.email || "").trim();
  var goal = String(formatted.goal || raw.goal || "").trim();
  var gender = String(formatted.gender || raw.gender || "").trim();
  var age = String(formatted.age || raw.age || "").trim();
  var weightHistory = String(formatted.weightHistory || raw.weight_history || "").trim();
  var conditions = String(formatted.conditions || (Array.isArray(raw.conditions) ? raw.conditions.join(", ") : (raw.conditions || ""))).trim();
  var previousTreatments = String(formatted.previousTreatments || (Array.isArray(raw.previous_treatments) ? raw.previous_treatments.join(", ") : (raw.previous_treatments || ""))).trim();

  var rowData = [
    sessionId,
    status,
    progress,
    startedAtFormatted,
    nowFormatted,
    firstName,
    email,
    goal,
    gender,
    age,
    weightHistory,
    conditions,
    previousTreatments
  ];

  // Search if row already exists for this Session ID
  var existingRow = -1;
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    var idValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var i = 0; i < idValues.length; i++) {
      if (String(idValues[i][0]).trim() === String(sessionId).trim()) {
        existingRow = i + 2; // +2 offset for 1-based index and header row
        break;
      }
    }
  }

  if (existingRow > 0) {
    // Retain initial Started At timestamp from column 4 if already recorded
    var existingStartedAt = sheet.getRange(existingRow, 4).getValue();
    if (existingStartedAt) {
      rowData[3] = existingStartedAt;
    }
    sheet.getRange(existingRow, 1, 1, rowData.length).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
    existingRow = sheet.getLastRow();
  }

  // Visual status pill coloring for Column B (Status)
  try {
    var statusCell = sheet.getRange(existingRow, 2);
    if (status === "Completed") {
      statusCell.setBackground("#E6F4EA").setFontColor("#137333").setFontWeight("bold");
    } else if (status === "In Progress") {
      statusCell.setBackground("#FEF7E0").setFontColor("#B06000").setFontWeight("bold");
    } else if (status === "Abandoned") {
      statusCell.setBackground("#FCE8E6").setFontColor("#C5221F").setFontWeight("bold");
    }
  } catch (styleErr) {
    Logger.log("Status cell style note: " + styleErr.toString());
  }

  SpreadsheetApp.flush();

  return {
    success: true,
    sessionId: sessionId,
    status: status,
    progress: progress,
    row: existingRow
  };
}

/**
 * Authorization helper to grant permissions in 1 click.
 */
function authorizePermissions() {
  Logger.log("Permissions authorized for dedicated quiz script.");
}
