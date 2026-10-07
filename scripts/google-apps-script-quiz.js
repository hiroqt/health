/**
 * ============================================================================
 * TEARSIZE HEALTH — DEDICATED QUIZ & CLINICAL ASSESSMENT GOOGLE APPS SCRIPT
 * ============================================================================
 * 
 * PURPOSE:
 * Dedicated Google Apps Script Webhook specifically for tracking Quiz Attempts
 * and Quiz Completions in its own Google Spreadsheet, WITH AUTOMATIC EMAIL ALERTS.
 * 
 * FEATURES:
 * 1. Tracks every attempt: when a patient begins or answers questions ("In Progress").
 * 2. Updates smoothly: finds existing Session ID and updates the same row instead
 *    of duplicating rows for every answered question.
 * 3. Records full completion: when patient completes the assessment ("Completed")
 *    with 100% progress, Name, and Email Address.
 * 4. Also records early exits / drop-offs ("Abandoned").
 * 5. AUTOMATIC EMAIL NOTIFICATIONS:
 *    - Sends instant alert to ADMIN (bypeptidet@gmail.com, tearsize@gmail.com) with
 *      the patient's complete responses and a 1-click link to the Google Sheet.
 *    - Sends a professional confirmation email to the PATIENT acknowledging receipt.
 *    - Includes duplicate-guard to ensure emails are only sent once per session.
 * 6. Visual status pill coloring: Green = Completed, Yellow = In Progress, Red = Abandoned.
 * 
 * ----------------------------------------------------------------------------
 * 1-MINUTE SETUP INSTRUCTIONS:
 * 1. Open your dedicated Quiz Google Sheet.
 * 2. Go to "Extensions" > "Apps Script".
 * 3. Replace all code in Code.gs with THIS ENTIRE FILE.
 * 4. Click "Save" 💾.
 * 5. In the toolbar function dropdown (next to "Debug"), select "authorizePermissions"
 *    and click "Run" (▶️) to grant email & sheet permissions.
 * 6. Click "Deploy" > "Manage deployments" > ✏️ Edit > Version: "New version" > "Deploy".
 * ============================================================================
 */

// ─── CONFIGURATION & RECIPIENTS ─────────────────────────────────────────────
var PRIMARY_GMAIL = "tearsize@gmail.com";
var ADMIN_EMAIL = "tearsize@gmail.com";
var NOTIFICATION_RECIPIENTS = "tearsize@gmail.com";
var BRAND_NAME = "by tearsize";
var WEBSITE_URL = "https://tearsize.com";

// ─── EMAIL SENDER WITH FALLBACK ─────────────────────────────────────────────
function sendEmailWithFallback(options) {
  try {
    MailApp.sendEmail({
      to: options.to,
      subject: options.subject,
      htmlBody: options.htmlBody,
      name: options.name || BRAND_NAME,
      replyTo: options.replyTo || PRIMARY_GMAIL
    });
    return true;
  } catch (mailErr) {
    Logger.log("MailApp failed, trying GmailApp fallback: " + mailErr.toString());
    try {
      GmailApp.sendEmail(options.to, options.subject, "", {
        htmlBody: options.htmlBody,
        name: options.name || BRAND_NAME,
        replyTo: options.replyTo || PRIMARY_GMAIL
      });
      return true;
    } catch (gmailErr) {
      Logger.log("GmailApp also failed: " + gmailErr.toString());
      return false;
    }
  }
}

// ─── WEBHOOK HANDLERS (doGet & doPost) ───────────────────────────────────────
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    service: "Tearsize Dedicated Quiz Assessment Webhook with Email Alerts",
    adminRecipients: NOTIFICATION_RECIPIENTS,
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
 * Core handler to record or update quiz answers in the dedicated sheet and dispatch emails.
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
    "Previous Treatments",
    "Email Alert"
  ];

  // Clean up any legacy JSON column if present
  if (sheet.getLastColumn() >= 14) {
    try {
      var col14Header = String(sheet.getRange(1, 14).getValue());
      if (col14Header.indexOf("JSON") !== -1) {
        sheet.deleteColumn(14);
      }
    } catch (colErr) {
      Logger.log("Column cleanup note: " + colErr.toString());
    }
  }

  // Initialize headers if empty or missing Email Alert
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold")
      .setBackground("#2E1010")
      .setFontColor("#FFFFFF")
      .setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    SpreadsheetApp.flush();
  } else if (sheet.getLastColumn() === 13) {
    // Add Email Alert header to column 14 if missing
    sheet.getRange(1, 14).setValue("Email Alert")
      .setFontWeight("bold")
      .setBackground("#2E1010")
      .setFontColor("#FFFFFF")
      .setHorizontalAlignment("center");
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

  // Search if row already exists for this Session ID
  var existingRow = -1;
  var existingEmailAlert = "";
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    var idValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var i = 0; i < idValues.length; i++) {
      if (String(idValues[i][0]).trim() === String(sessionId).trim()) {
        existingRow = i + 2; // +2 offset for 1-based index and header row
        try {
          existingEmailAlert = String(sheet.getRange(existingRow, 14).getValue() || "").trim();
        } catch (e) {}
        break;
      }
    }
  }

  var emailAlertStatus = existingEmailAlert || "Pending Completion";

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
    previousTreatments,
    emailAlertStatus
  ];

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

  // ─── EMAIL NOTIFICATIONS (Triggered on Completed Response) ───────────────────
  var adminNotified = false;
  var patientNotified = false;

  // Only dispatch email if quiz is Completed and alert hasn't already been sent for this session
  if (status === "Completed" && existingEmailAlert.indexOf("Sent") === -1) {
    var alertTimestamp = Utilities.formatDate(new Date(), "Asia/Manila", "yyyy-MM-dd HH:mm");

    // 1. Send Alert Email to ADMIN (bypeptidet@gmail.com, tearsize@gmail.com)
    try {
      var adminSubject = "🩺 New Quiz Response: " + (firstName || "Patient") + " — " + (goal || "Clinical Intake");
      var adminHtml = generateAdminQuizEmailHtml(rowData, headers, ss.getUrl());

      adminNotified = sendEmailWithFallback({
        to: NOTIFICATION_RECIPIENTS,
        subject: adminSubject,
        htmlBody: adminHtml,
        replyTo: (email && email.indexOf("@") !== -1) ? email : PRIMARY_GMAIL,
        name: BRAND_NAME + " Assessment Alerts"
      });
      Logger.log("Quiz Admin alert dispatched: " + adminNotified);
    } catch (adminErr) {
      Logger.log("Quiz Admin notification error: " + adminErr.toString());
    }

    // 2. Send Confirmation Email to PATIENT (if valid email provided)
    if (email && email.indexOf("@") !== -1) {
      try {
        var patientSubject = "Your Clinical Assessment Has Been Received — " + BRAND_NAME;
        var patientHtml = generatePatientQuizEmailHtml(firstName, goal, gender, age, conditions, sessionId);

        patientNotified = sendEmailWithFallback({
          to: email,
          subject: patientSubject,
          htmlBody: patientHtml,
          replyTo: PRIMARY_GMAIL,
          name: BRAND_NAME
        });
        Logger.log("Quiz Patient confirmation dispatched to " + email + ": " + patientNotified);
      } catch (patErr) {
        Logger.log("Quiz Patient confirmation error: " + patErr.toString());
      }
    }

    // Update Email Alert status in Column 14
    var alertSummary = "Sent (" + alertTimestamp + ")";
    if (adminNotified && patientNotified) {
      alertSummary = "Sent to Admin & Patient (" + alertTimestamp + ")";
    } else if (adminNotified) {
      alertSummary = "Sent to Admin (" + alertTimestamp + ")";
    }

    try {
      sheet.getRange(existingRow, 14).setValue(alertSummary);
      SpreadsheetApp.flush();
    } catch (updErr) {
      Logger.log("Error updating alert status cell: " + updErr.toString());
    }
  }

  return {
    success: true,
    sessionId: sessionId,
    status: status,
    progress: progress,
    row: existingRow,
    adminNotified: adminNotified,
    patientNotified: patientNotified
  };
}

// ─── EMAIL TEMPLATE: ADMIN QUIZ NOTIFICATION ────────────────────────────────
function generateAdminQuizEmailHtml(rowData, headers, sheetUrl) {
  var sessionId = rowData[0] || "N/A";
  var status = rowData[1] || "Completed";
  var progress = rowData[2] || "Completed (100%)";
  var timestamp = rowData[4] || Utilities.formatDate(new Date(), "Asia/Manila", "yyyy-MM-dd HH:mm:ss");
  var firstName = rowData[5] || "Not provided";
  var email = rowData[6] || "Not provided";
  var goal = rowData[7] || "Not provided";
  var gender = rowData[8] || "Not provided";
  var age = rowData[9] || "Not provided";
  var weightHistory = rowData[10] || "Not provided";
  var conditions = rowData[11] || "None declared";
  var previousTreatments = rowData[12] || "None";

  var items = [
    { label: "Patient Name", value: firstName, highlight: true },
    { label: "Email Address", value: email, highlight: true },
    { label: "Primary Health Goal", value: goal },
    { label: "Biological Sex / Gender", value: gender },
    { label: "Age Group", value: age },
    { label: "Weight Goal Duration", value: weightHistory },
    { label: "Diagnosed Conditions", value: conditions },
    { label: "Previous Treatments Tried", value: previousTreatments },
    { label: "Session ID", value: sessionId },
    { label: "Submitted Timestamp", value: timestamp }
  ];

  var rowsHtml = items.map(function(item) {
    var valStyle = item.highlight ? "font-weight: 700; color: #1A0A0A; font-size: 14.5px;" : "color: #333333; font-size: 13.5px;";
    return '<tr>' +
      '<td style="padding: 10px 14px; border-bottom: 1px solid #FFEAEB; font-weight: 600; color: #7A4545; width: 38%; font-size: 13px;">' + item.label + '</td>' +
      '<td style="padding: 10px 14px; border-bottom: 1px solid #FFEAEB; ' + valStyle + '">' + item.value + '</td>' +
    '</tr>';
  }).join("");

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>' +
  '<body style="margin: 0; padding: 0; background-color: #FFF5F5; font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #2B2B2B;">' +
    '<center style="width: 100%; table-layout: fixed; background-color: #FFF5F5; padding: 36px 10px;">' +
      '<div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 24px; border: 1px solid #FFD8D8; overflow: hidden; box-shadow: 0 10px 30px rgba(240, 112, 112, 0.08);">' +
        
        // Header
        '<div style="background: linear-gradient(135deg, #2E1010 0%, #1A0808 100%); padding: 32px 24px; text-align: center; color: #FFFFFF;">' +
          '<div style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 4px; text-transform: lowercase;">bytearsze</div>' +
          '<div style="font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #F07070;">🩺 New Clinical Assessment Intake</div>' +
        '</div>' +

        // Body
        '<div style="padding: 28px 26px; text-align: left;">' +
          '<div style="background-color: #FFF0F0; border: 1px solid #FFDADA; border-radius: 14px; padding: 14px 18px; margin-bottom: 22px;">' +
            '<div style="font-size: 15px; font-weight: 700; color: #D94040;">A patient has completed their clinical assessment.</div>' +
            '<div style="font-size: 12.5px; color: #7A4545; margin-top: 3px;">Review the patient history below or open the response sheet.</div>' +
          '</div>' +

          // Answers Table
          '<table style="width: 100%; border-collapse: collapse; margin-bottom: 26px; background-color: #FFFAFA; border-radius: 12px; overflow: hidden; border: 1px solid #FFE0E0;">' +
            '<tbody>' + rowsHtml + '</tbody>' +
          '</table>' +

          // Action Button
          '<div style="text-align: center; margin-bottom: 12px;">' +
            '<a href="' + sheetUrl + '" style="display: inline-block; background-color: #F07070; color: #FFFFFF; font-size: 13.5px; font-weight: 700; text-decoration: none; padding: 13px 32px; border-radius: 50px; box-shadow: 0 4px 14px rgba(240, 112, 112, 0.35);">View in Google Sheets →</a>' +
          '</div>' +
        '</div>' +

        // Footer
        '<div style="background-color: #FFF0F0; border-top: 1px solid #FFDADA; padding: 16px 20px; text-align: center; font-size: 11.5px; color: #7A4545;">' +
          '<strong>' + BRAND_NAME + '</strong> · Automated Clinical Alert Dispatcher' +
        '</div>' +
      '</div>' +
    '</center>' +
  '</body></html>';
}

// ─── EMAIL TEMPLATE: PATIENT CONFIRMATION ───────────────────────────────────
function generatePatientQuizEmailHtml(firstName, goal, gender, age, conditions, sessionId) {
  var name = firstName ? firstName : "Valued Patient";

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>' +
  '<body style="margin: 0; padding: 0; background-color: #FFF8F7; font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #2B2B2B;">' +
    '<center style="width: 100%; table-layout: fixed; background-color: #FFF8F7; padding: 36px 10px;">' +
      '<div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 24px; border: 1px solid #FFE8EA; overflow: hidden; box-shadow: 0 10px 30px rgba(255, 90, 95, 0.05);">' +
        
        // Header
        '<div style="background: linear-gradient(135deg, #2E1010 0%, #1A0808 100%); padding: 36px 26px; text-align: center; color: #FFFFFF;">' +
          '<div style="font-size: 26px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 4px; text-transform: lowercase;">bytearsze</div>' +
          '<div style="font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #F07070;">Clinical Assessment Received</div>' +
        '</div>' +

        // Body
        '<div style="padding: 32px 28px; text-align: left;">' +
          '<h1 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 700; color: #1A0A0A;">Hello ' + name + ',</h1>' +
          '<p style="margin: 0 0 20px 0; font-size: 14.5px; line-height: 1.6; color: #6E4A4A;">Thank you for completing your clinical intake assessment with <strong>' + BRAND_NAME + '</strong>. Our licensed medical providers are reviewing your health background and primary goals to tailor your doctor-prescribed treatment protocol.</p>' +

          // Summary Card
          '<div style="background-color: #FFF5F5; border: 1px solid #FFDADA; border-radius: 16px; padding: 18px 20px; margin-bottom: 24px;">' +
            '<div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #D94040; margin-bottom: 8px;">Your Intake Summary</div>' +
            '<div style="font-size: 13.5px; color: #333333; line-height: 1.7;">' +
              '<strong>Primary Goal:</strong> ' + (goal || "Personalized Health Goal") + '<br>' +
              '<strong>Clinical Protocol:</strong> Doctor-Supervised GLP-1 / Peptide Therapy<br>' +
              '<strong>Assessment Ref:</strong> <span style="font-family: monospace; font-weight: 700; color: #D94040;">' + sessionId + '</span>' +
            '</div>' +
          '</div>' +

          // Next steps
          '<div style="background-color: #FAF6F6; border-radius: 14px; padding: 18px 20px; margin-bottom: 26px; font-size: 13px; color: #4A3333; line-height: 1.6;">' +
            '<strong>What happens next?</strong><br>' +
            '1. <strong>Physician Evaluation:</strong> A licensed doctor confirms proper dosing and contraindication safety.<br>' +
            '2. <strong>Seamless Ordering:</strong> You can browse approved treatments and place your medication intake anytime at our portal.' +
          '</div>' +

          // CTA
          '<div style="text-align: center;">' +
            '<a href="' + WEBSITE_URL + '/order" style="display: inline-block; background-color: #F07070; color: #FFFFFF; font-size: 13.5px; font-weight: 700; text-decoration: none; padding: 13px 34px; border-radius: 50px; box-shadow: 0 4px 14px rgba(240, 112, 112, 0.35);">Continue to Order & Prescriptions →</a>' +
          '</div>' +
        '</div>' +

        // Footer
        '<div style="background-color: #FFF0F0; border-top: 1px solid #FFDADA; padding: 18px 24px; text-align: center; font-size: 11.5px; color: #7A4545;">' +
          '<strong>' + BRAND_NAME + '</strong> · Doctor-Prescribed Weight Loss & Longevity · Available Nationwide<br>' +
          'Questions? Contact patient support at <a href="mailto:' + ADMIN_EMAIL + '" style="color: #D94040; font-weight: 600;">' + ADMIN_EMAIL + '</a>' +
        '</div>' +
      '</div>' +
    '</center>' +
  '</body></html>';
}

/**
 * Authorization helper to grant permissions in 1 click.
 */
function authorizePermissions() {
  Logger.log("Testing email permissions...");
  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: "Tearsize Quiz Script Authorization Test",
    body: "Tearsize Dedicated Quiz Script is authorized to send emails and write to Google Sheets."
  });
  Logger.log("Test authorization email sent successfully.");
}
