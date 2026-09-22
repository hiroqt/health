/**
 * ============================================================================
 * TEARSIZE HEALTH — FULL GOOGLE APPS SCRIPT ORDER, RECEIPT & STATUS EMAIL ENGINE
 * ============================================================================
 * 
 * FEATURES:
 * 1. doPost: Receives order from website, writes to Google Sheet IMMEDIATELY with SpreadsheetApp.flush(),
 *    saves receipt screenshot in Google Drive, updates the sheet with the Drive link,
 *    sends Order Confirmation email to patient, and sends NEW ORDER ALERT to ADMIN (bypeptidet@gmail.com).
 * 2. onEdit / handleSheetEdit: When you change "Payment Status" in Google Sheets to "Success" or "Reject",
 *    it AUTOMATICALLY sends an updated status email to the patient with reply-to bypeptidet@gmail.com!
 * 3. authorizePermissions / testSendEmail: 1-click authorization helper.
 * 
 * ----------------------------------------------------------------------------
 * 1-MINUTE SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet > "Extensions" > "Apps Script".
 * 2. Replace all code with THIS ENTIRE FILE.
 * 3. Click "Save" 💾.
 * 4. In the top toolbar dropdown (next to "Debug"), select "authorizePermissions" and click "Run" (▶️).
 *    -> Google will ask for permission ("Authorization Required").
 *    -> Click "Review permissions" > Select your Google Account > "Advanced" > "Go to ... (unsafe)" > "Allow".
 * 5. In the top toolbar dropdown, select "installTriggers" and click "Run" (▶️).
 *    -> This activates automatic emails when you change Status to Success or Reject!
 * 6. Click "Deploy" (blue button, top right) > "Manage deployments" > ✏️ Edit > Version: "New version" > "Deploy".
 * ============================================================================
 */

// ─── CONSTANTS & CONFIGURATION ───────────────────────────────────────────────
var PRIMARY_GMAIL = "tearsize@gmail.com";
var ADMIN_EMAIL = "bypeptidet@gmail.com";
var NOTIFICATION_RECIPIENTS = "bypeptidet@gmail.com, tearsize@gmail.com";
var BRAND_NAME = "by tearsize";

// ─── HELPER: EMAIL SENDER WITH FALLBACK ─────────────────────────────────────
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

// ─── 1. WEBHOOK HANDLERS (doGet & doPost) ───────────────────────────────────

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    service: "Tearsize Order Webhook & Email Engine",
    adminEmail: ADMIN_EMAIL,
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  var hasLock = false;
  try {
    hasLock = lock.tryLock(30000); // 30s wait for lock
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

    // 1. Format items summary & array
    var itemsSummary = "";
    var itemsArray = [];
    if (Array.isArray(data.selectedItems)) {
      itemsArray = data.selectedItems;
      itemsSummary = data.selectedItems.map(function(item) {
        var qty = item.quantity || 1;
        var subtotal = (item.price || 0) * qty;
        return item.name + " (" + item.dosage + ") x" + qty + " [₱" + subtotal.toLocaleString() + "]";
      }).join("; ");
    } else if (typeof data.selectedItems === "string") {
      itemsSummary = data.selectedItems;
    }

    // 2. Access Google Sheet Deterministically (Target Orders tab or first sheet)
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Orders") || ss.getSheetByName("Sheet1") || ss.getSheets()[0];

    // Initialize headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Order Ref",
        "Full Name",
        "Contact Number",
        "Email Address",
        "Complete Address",
        "Ordered Items",
        "Delivery Courier",
        "Payment Channel",
        "Total Amount (PHP)",
        "Proof of Payment (Google Drive Link)",
        "Payment Status"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#FFF0F0");
      sheet.setFrozenRows(1);
      SpreadsheetApp.flush();
    }

    // 3. Format Date & Amount
    var dateFormatted = Utilities.formatDate(new Date(), "Asia/Manila", "yyyy-MM-dd HH:mm:ss");
    var totalFormatted = "₱" + Number(data.totalAmount || 0).toLocaleString();

    // 4. CRITICAL FIX: Append Order Row IMMEDIATELY so order is NEVER lost even if upload is slow
    var row = [
      dateFormatted,
      data.orderRef || "TSZ-N/A",
      data.fullName || "",
      data.contactNumber || "",
      data.email || "",
      data.completeAddress || "",
      itemsSummary,
      data.deliveryMode || "",
      (data.paymentMethod || "").toUpperCase(),
      totalFormatted,
      "Processing receipt...", // Temporary placeholder
      "Pending" // Default status
    ];

    sheet.appendRow(row);
    var lastRow = sheet.getLastRow();

    // Set Interactive Dropdown for Payment Status (Pending, Success, Reject)
    var statusCell = sheet.getRange(lastRow, 12);
    var dropdownRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Pending", "Success", "Reject"], true)
      .setAllowInvalid(false)
      .build();
    statusCell.setDataValidation(dropdownRule);
    statusCell.setValue("Pending");

    // CRITICAL: Flush to persist row to Google Sheet immediately
    SpreadsheetApp.flush();

    // 5. Save Receipt Screenshot in Google Drive: [Client Name]_[Payment Method]_[Order Ref]
    var receiptUrl = "No Receipt Attached";
    if (data.fileBase64 && data.fileBase64.length > 0) {
      try {
        var folderName = "Tearsize Receipts";
        var folders = DriveApp.getFoldersByName(folderName);
        var targetFolder;
        if (folders.hasNext()) {
          targetFolder = folders.next();
        } else {
          targetFolder = DriveApp.createFolder(folderName);
        }

        var base64Data = data.fileBase64;
        if (base64Data.indexOf("base64,") !== -1) {
          base64Data = base64Data.split("base64,")[1];
        }

        var decodedBytes = Utilities.base64Decode(base64Data);
        var mimeType = data.fileType || "image/jpeg";
        var fileName = data.fileName || ((data.fullName || "Client") + "_" + (data.paymentMethod || "PAYMENT") + "_" + (data.orderRef || "TSZ") + ".jpg");

        var blob = Utilities.newBlob(decodedBytes, mimeType, fileName);
        var createdFile = targetFolder.createFile(blob);

        createdFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        receiptUrl = createdFile.getUrl();
      } catch (fileErr) {
        receiptUrl = "Upload Error: " + fileErr.toString();
        Logger.log("Drive upload error: " + fileErr.toString());
      }
    }

    // 6. Update row Column 11 with the finalized Google Drive Link & flush
    sheet.getRange(lastRow, 11).setValue(receiptUrl);
    SpreadsheetApp.flush();

    // 7. Send Immediate Order Confirmation Email to Patient
    var recipientEmail = (data.email || "").trim();
    var emailSentStatus = false;

    if (recipientEmail && recipientEmail.indexOf("@") !== -1) {
      try {
        var emailHtml = generateOrderConfirmationEmailHtml(data, itemsArray);
        var emailSubject = "Order Confirmation #" + data.orderRef + " — " + BRAND_NAME;

        emailSentStatus = sendEmailWithFallback({
          to: recipientEmail,
          subject: emailSubject,
          htmlBody: emailHtml,
          replyTo: PRIMARY_GMAIL,
          name: BRAND_NAME
        });
      } catch (emailErr) {
        Logger.log("Patient confirmation email error: " + emailErr.toString());
      }
    }

    // 8. CRITICAL FEATURE: Send Immediate Alert Email to ADMIN (bypeptidet@gmail.com & tearsize@gmail.com)
    var adminEmailStatus = false;
    try {
      var adminEmailHtml = generateAdminOrderNotificationEmailHtml(data, itemsArray, receiptUrl, ss.getUrl());
      var adminSubject = "🚨 New Order #" + data.orderRef + " (" + totalFormatted + ") — " + (data.fullName || "Patient");

      adminEmailStatus = sendEmailWithFallback({
        to: NOTIFICATION_RECIPIENTS,
        subject: adminSubject,
        htmlBody: adminEmailHtml,
        replyTo: recipientEmail || PRIMARY_GMAIL,
        name: "Tearsize Order Alert"
      });
      Logger.log("Admin notification dispatched to " + NOTIFICATION_RECIPIENTS + ": " + adminEmailStatus);
    } catch (adminErr) {
      Logger.log("Admin email notification error: " + adminErr.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      orderRef: data.orderRef,
      receiptUrl: receiptUrl,
      paymentStatus: "Pending",
      emailSentTo: recipientEmail,
      emailSent: emailSentStatus,
      adminNotified: adminEmailStatus
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("doPost critical error: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    if (hasLock) {
      try {
        lock.releaseLock();
      } catch (lErr) {
        Logger.log("Lock release notice: " + lErr.toString());
      }
    }
  }
}


// ─── 2. SPREADSHEET EDIT TRIGGER (AUTO-EMAIL ON SUCCESS / REJECT) ────────────

/**
 * Triggered automatically whenever you edit a cell in Google Sheets.
 * When column 12 (Payment Status) is changed to "Success" or "Reject",
 * this sends the appropriate notification email to the patient!
 */
function handleSheetEdit(e) {
  if (!e || !e.range) return;

  var sheet = e.range.getSheet();
  var editedRow = e.range.getRow();
  var editedCol = e.range.getColumn();

  // Row 1 is headers; column 12 is Payment Status
  if (editedRow <= 1 || editedCol !== 12) return;

  var newStatus = String(e.value || "").trim();
  if (newStatus !== "Success" && newStatus !== "Reject") return;

  // Retrieve patient details from the row
  var rowData = sheet.getRange(editedRow, 1, 1, 12).getValues()[0];
  var orderRef = rowData[1];
  var fullName = rowData[2];
  var email = String(rowData[4] || "").trim();
  var itemsSummary = rowData[6];
  var totalAmount = rowData[9];

  if (!email || email.indexOf("@") === -1) {
    Logger.log("No valid email in row " + editedRow);
    return;
  }

  try {
    if (newStatus === "Success") {
      var successHtml = generatePaymentSuccessEmailHtml(fullName, orderRef, totalAmount, itemsSummary);
      sendEmailWithFallback({
        to: email,
        subject: "Payment Verified! Your Order #" + orderRef + " is Being Prepared 📦 — " + BRAND_NAME,
        htmlBody: successHtml,
        replyTo: PRIMARY_GMAIL,
        name: BRAND_NAME
      });
      Logger.log("Success email sent to " + email);
    } else if (newStatus === "Reject") {
      var rejectHtml = generatePaymentRejectEmailHtml(fullName, orderRef, totalAmount);
      sendEmailWithFallback({
        to: email,
        subject: "Action Required: Payment Update for Order #" + orderRef + " — " + BRAND_NAME,
        htmlBody: rejectHtml,
        replyTo: PRIMARY_GMAIL,
        name: BRAND_NAME
      });
      Logger.log("Reject notice sent to " + email);
    }
  } catch (err) {
    Logger.log("Error sending status change email: " + err.toString());
  }
}

/**
 * 1-Click Trigger Installer: Installs the onEdit trigger with proper authorization permissions.
 */
function installTriggers() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var triggers = ScriptApp.getProjectTriggers();
  
  // Remove existing duplicate edit triggers
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "handleSheetEdit") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // Create new installable edit trigger
  ScriptApp.newTrigger("handleSheetEdit")
    .forSpreadsheet(ss)
    .onEdit()
    .create();

  Logger.log("✅ Edit trigger installed successfully! Status change emails are now active.");
}

/**
 * 1-Click Permission Authorizer & Test Email
 */
function authorizePermissions() {
  var activeUserEmail = Session.getActiveUser().getEmail();
  Logger.log("Authorizing permissions for active account: " + activeUserEmail);
  Logger.log("Admin alert target: " + ADMIN_EMAIL);
  
  var testHtml = "<div style='font-family: sans-serif; padding: 24px; color: #2B2B2B; max-width: 500px; border: 1px solid #FFE8EA; border-radius: 16px;'>" +
    "<h2 style='color: #FF5A5F; margin-top: 0;'>Tearsize Order Engine Connected! 💓</h2>" +
    "<p>Your Google account has authorized the order webhook, automatic sheet logging, and email notifications.</p>" +
    "<p><strong>Configured Admin Email:</strong> " + ADMIN_EMAIL + "</p>" +
    "<p style='font-size: 12px; color: #888;'>Ready to accept live orders immediately.</p>" +
    "</div>";

  // Send to active executor
  if (activeUserEmail) {
    sendEmailWithFallback({
      to: activeUserEmail,
      subject: "✅ Tearsize Email System Authorized",
      htmlBody: testHtml,
      name: BRAND_NAME
    });
  }

  // Also send test notification to ADMIN_EMAIL if distinct
  if (activeUserEmail !== ADMIN_EMAIL) {
    sendEmailWithFallback({
      to: ADMIN_EMAIL,
      subject: "✅ Tearsize Admin Order Alerts Connected",
      htmlBody: testHtml,
      name: BRAND_NAME
    });
  }

  Logger.log("✅ Test emails sent successfully!");
}


// ─── 3. EMAIL HTML TEMPLATES ────────────────────────────────────────────────

/**
 * 1. ADMIN NOTIFICATION EMAIL (Sent to bypeptidet@gmail.com on New Order)
 */
function generateAdminOrderNotificationEmailHtml(data, items, receiptUrl, sheetUrl) {
  var formattedTotal = Number(data.totalAmount || 0).toLocaleString();

  var itemsHtml = "";
  if (items && items.length > 0) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var qty = item.quantity || 1;
      var subtotal = (item.price || 0) * qty;
      itemsHtml += '<tr>' +
        '<td style="padding: 12px 14px; border-bottom: 1px solid #EEEEEE; font-size: 13.5px; color: #111111;">' +
          '<strong>' + item.name + '</strong>' +
          '<div style="font-size: 12px; color: #777777; margin-top: 2px;">Dosage: ' + item.dosage + '</div>' +
        '</td>' +
        '<td align="center" style="padding: 12px 14px; border-bottom: 1px solid #EEEEEE; font-size: 13.5px; font-weight: bold; color: #444444;">' + qty + '</td>' +
        '<td align="right" style="padding: 12px 14px; border-bottom: 1px solid #EEEEEE; font-size: 13.5px; font-weight: bold; color: #111111;">₱' + subtotal.toLocaleString() + '</td>' +
      '</tr>';
    }
  }

  var isDriveReceipt = receiptUrl && receiptUrl.indexOf("http") !== -1;

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>' +
  '<body style="margin: 0; padding: 0; background-color: #F4F6F8; font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif; color: #1E293B;">' +
    '<center style="width: 100%; table-layout: fixed; background-color: #F4F6F8; padding: 30px 10px;">' +
      '<div style="max-width: 620px; margin: 0 auto; background-color: #FFFFFF; border-radius: 20px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); text-align: left;">' +
        
        '<!-- Admin Header -->' +
        '<div style="background-color: #0F172A; padding: 24px 28px; color: #FFFFFF;">' +
          '<div style="font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #38BDF8; margin-bottom: 4px;">' +
            'ADMIN INTAKE ALERT · TEARSIZE HEALTH' +
          '</div>' +
          '<div style="font-size: 22px; font-weight: 800; color: #FFFFFF;">' +
            'New Prescription Order #' + data.orderRef +
          '</div>' +
        '</div>' +

        '<!-- Body Content -->' +
        '<div style="padding: 28px;">' +
          '<!-- Key Financial & Status Strip -->' +
          '<div style="background-color: #FFF0F0; border-left: 4px solid #FF5A5F; padding: 14px 18px; border-radius: 8px; margin-bottom: 24px;">' +
            '<div style="font-size: 12px; font-weight: 700; color: #7A5555; text-transform: uppercase;">Amount Paid via ' + (data.paymentMethod || "Payment") + '</div>' +
            '<div style="font-size: 24px; font-weight: 900; color: #FF5A5F;">₱' + formattedTotal + '</div>' +
            '<div style="font-size: 12px; color: #64748B; margin-top: 2px;">Default Sheet Status: <strong>Pending Verification</strong></div>' +
          '</div>' +

          '<!-- Patient Details -->' +
          '<div style="margin-bottom: 24px;">' +
            '<div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 10px;">' +
              'Patient & Shipping Information' +
            '</div>' +
            '<table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13.5px; border-collapse: collapse; background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; overflow: hidden;">' +
              '<tr><td style="padding: 10px 14px; font-weight: 600; color: #64748B; width: 130px; border-bottom: 1px solid #E2E8F0;">Full Name:</td><td style="padding: 10px 14px; font-weight: 700; color: #0F172A; border-bottom: 1px solid #E2E8F0;">' + (data.fullName || "") + '</td></tr>' +
              '<tr><td style="padding: 10px 14px; font-weight: 600; color: #64748B; border-bottom: 1px solid #E2E8F0;">Contact:</td><td style="padding: 10px 14px; color: #0F172A; border-bottom: 1px solid #E2E8F0;">' + (data.contactNumber || "") + '</td></tr>' +
              '<tr><td style="padding: 10px 14px; font-weight: 600; color: #64748B; border-bottom: 1px solid #E2E8F0;">Email:</td><td style="padding: 10px 14px; color: #0F172A; border-bottom: 1px solid #E2E8F0;"><a href="mailto:' + (data.email || "") + '" style="color: #0284C7; text-decoration: none;">' + (data.email || "") + '</a></td></tr>' +
              '<tr><td style="padding: 10px 14px; font-weight: 600; color: #64748B; border-bottom: 1px solid #E2E8F0;">Courier:</td><td style="padding: 10px 14px; font-weight: 600; color: #0F172A; border-bottom: 1px solid #E2E8F0;">' + (data.deliveryMode || "") + '</td></tr>' +
              '<tr><td style="padding: 10px 14px; font-weight: 600; color: #64748B; vertical-align: top;">Delivery Address:</td><td style="padding: 10px 14px; font-weight: 600; color: #0F172A; line-height: 1.5;">' + (data.completeAddress || "") + '</td></tr>' +
            '</table>' +
          '</div>' +

          '<!-- Ordered Formulations -->' +
          '<div style="margin-bottom: 24px;">' +
            '<div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 10px;">' +
              'Ordered Formulations' +
            '</div>' +
            '<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #E2E8F0; border-radius: 10px; overflow: hidden;">' +
              '<thead><tr style="background-color: #F1F5F9;"><th align="left" style="padding: 10px 14px; font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase;">Item</th><th align="center" style="padding: 10px 14px; font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase;">Qty</th><th align="right" style="padding: 10px 14px; font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase;">Subtotal</th></tr></thead>' +
              '<tbody>' + itemsHtml + '</tbody>' +
            '</table>' +
          '</div>' +

          '<!-- Actions Bar: View Receipt & Open Sheet -->' +
          '<div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 10px;">' +
            '<div style="font-size: 13px; font-weight: 700; color: #0F172A; margin-bottom: 14px;">' +
              'Admin Quick Actions' +
            '</div>' +
            '<div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">' +
              (isDriveReceipt ?
                '<a href="' + receiptUrl + '" target="_blank" style="display: inline-block; background-color: #0F172A; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 11px 22px; border-radius: 8px; margin: 4px;">🖼️ View Payment Receipt</a>' :
                '<span style="font-size: 13px; color: #94A3B8; padding: 11px 22px;">No Receipt Attached</span>'
              ) +
              (sheetUrl ?
                '<a href="' + sheetUrl + '" target="_blank" style="display: inline-block; background-color: #10B981; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 11px 22px; border-radius: 8px; margin: 4px;">📊 Open Google Sheet</a>' :
                ''
              ) +
            '</div>' +
          '</div>' +

        '</div>' +

        '<!-- Footer -->' +
        '<div style="background-color: #F1F5F9; border-top: 1px solid #E2E8F0; padding: 14px 28px; font-size: 12px; color: #64748B; text-align: center;">' +
          'To update patient status, open Google Sheets and change Payment Status to <strong>Success</strong> or <strong>Reject</strong>.' +
        '</div>' +

      '</div>' +
    '</center>' +
  '</body></html>';
}

/**
 * 2. Initial Order Confirmation Email (Sent to Patient)
 */
function generateOrderConfirmationEmailHtml(data, items) {
  var firstName = data.fullName ? data.fullName.split(" ")[0] : "Valued Patient";
  var formattedTotal = Number(data.totalAmount || 0).toLocaleString();

  var itemsHtml = "";
  if (items && items.length > 0) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var qty = item.quantity || 1;
      var subtotal = (item.price || 0) * qty;
      itemsHtml += '<tr>' +
        '<td style="padding: 14px 16px; border-bottom: 1px solid #FFE8EA; font-family: sans-serif; font-size: 14px; color: #0F0F0F;">' +
          '<div style="font-weight: 700; color: #0F0F0F;">' + item.name + '</div>' +
          '<div style="font-size: 12px; color: #7A5555; margin-top: 2px;">Dosage: <span style="background-color: #FFF0F0; color: #FF5A5F; padding: 2px 6px; border-radius: 4px; font-weight: 600;">' + item.dosage + '</span></div>' +
        '</td>' +
        '<td align="center" style="padding: 14px 16px; border-bottom: 1px solid #FFE8EA; font-family: sans-serif; font-size: 14px; font-weight: 600; color: #4A3333;">' + qty + '</td>' +
        '<td align="right" style="padding: 14px 16px; border-bottom: 1px solid #FFE8EA; font-family: sans-serif; font-size: 14px; font-weight: 700; color: #0F0F0F;">₱' + subtotal.toLocaleString() + '</td>' +
      '</tr>';
    }
  }

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>' +
  '<body style="margin: 0; padding: 0; background-color: #FFF8F7; font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #2B2B2B;">' +
    '<center style="width: 100%; table-layout: fixed; background-color: #FFF8F7; padding: 40px 10px;">' +
      '<div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 24px; border: 1px solid #FFE8EA; overflow: hidden; box-shadow: 0 10px 30px rgba(255, 90, 95, 0.05);">' +
        '<div style="background: linear-gradient(135deg, #FF5A5F 0%, #E04A4F 100%); padding: 36px 30px; text-align: center; color: #FFFFFF;">' +
          '<div style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 4px; text-transform: lowercase;">bytearsze</div>' +
          '<div style="font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #FFE8EA;">Clinical Prescription Order Confirmation</div>' +
        '</div>' +
        '<div style="padding: 32px 30px; text-align: left;">' +
          '<h1 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 700; color: #0F0F0F;">Thank you for your order, ' + firstName + '! 💓</h1>' +
          '<p style="margin: 0 0 24px 0; font-size: 14.5px; line-height: 1.6; color: #6E6E6E;">We have received your intake request and payment submission. Our medical team is now reviewing your protocol details to ensure seamless dispensing and express dispatch.</p>' +
          '<div style="background-color: #FFF8F7; border: 1px solid #FFE8EA; border-radius: 16px; padding: 18px 20px; margin-bottom: 28px; text-align: center;">' +
            '<div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #7A5555; margin-bottom: 4px;">Order Reference Number</div>' +
            '<div style="font-size: 24px; font-weight: 900; color: #FF5A5F; font-family: monospace;">' + data.orderRef + '</div>' +
          '</div>' +
          '<div style="margin-bottom: 28px;">' +
            '<div style="font-size: 14px; font-weight: 700; color: #0F0F0F; text-transform: uppercase; margin-bottom: 12px;">Prescription Formulations</div>' +
            '<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #FFE8EA; border-radius: 12px; overflow: hidden;">' +
              '<thead><tr style="background-color: #FFF0F0;"><th align="left" style="padding: 10px 16px; font-size: 11px; font-weight: 700; color: #7A5555; text-transform: uppercase;">Item</th><th align="center" style="padding: 10px 16px; font-size: 11px; font-weight: 700; color: #7A5555; text-transform: uppercase;">Qty</th><th align="right" style="padding: 10px 16px; font-size: 11px; font-weight: 700; color: #7A5555; text-transform: uppercase;">Subtotal</th></tr></thead>' +
              '<tbody>' + itemsHtml + '</tbody>' +
            '</table>' +
          '</div>' +
          '<div style="background-color: #FFF8F7; border: 1px solid #FFE8EA; border-radius: 16px; padding: 20px; margin-bottom: 28px;">' +
            '<table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13.5px; color: #6E6E6E;">' +
              '<tr><td style="padding: 4px 0;">Cold-Chain Packaging</td><td align="right" style="font-weight: 600; color: #2E7D32;">FREE (Included)</td></tr>' +
              '<tr><td style="padding: 4px 0;">Courier Method</td><td align="right" style="font-weight: 600; color: #0F0F0F;">' + (data.deliveryMode || "Express") + '</td></tr>' +
              '<tr><td style="padding: 4px 0;">Payment Method</td><td align="right" style="font-weight: 600; color: #0F0F0F;">' + (data.paymentMethod || "Direct") + '</td></tr>' +
              '<tr><td colspan="2" style="padding-top: 10px; border-top: 1px solid #FFE8EA;"></td></tr>' +
              '<tr><td style="font-size: 16px; font-weight: 700; color: #0F0F0F;">Total Amount Paid</td><td align="right" style="font-size: 20px; font-weight: 900; color: #FF5A5F;">₱' + formattedTotal + '</td></tr>' +
            '</table>' +
          '</div>' +
          '<div style="border: 1px solid #FFE8EA; border-radius: 16px; padding: 20px; margin-bottom: 24px; font-size: 13px; color: #4A3333; line-height: 1.6;">' +
            '<div style="font-weight: 700; color: #0F0F0F; text-transform: uppercase; margin-bottom: 8px;">Delivery Details</div>' +
            '<div><strong>Recipient:</strong> ' + data.fullName + '</div>' +
            '<div><strong>Contact:</strong> ' + data.contactNumber + '</div>' +
            '<div><strong>Address:</strong> ' + data.completeAddress + '</div>' +
          '</div>' +
          '<div style="text-align: center; padding-top: 10px;">' +
            '<a href="mailto:' + ADMIN_EMAIL + '" style="display: inline-block; background-color: #FF5A5F; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 50px;">Contact Patient Support</a>' +
          '</div>' +
        '</div>' +
        '<div style="background-color: #FFF0F0; border-top: 1px solid #FFE8EA; padding: 18px 24px; text-align: center; font-size: 11.5px; color: #7A5555;">' +
          '<strong>' + BRAND_NAME + '</strong> · Doctor-Prescribed Weight Loss & Longevity · Available Nationwide' +
        '</div>' +
      '</div>' +
    '</center>' +
  '</body></html>';
}

/**
 * 3. Payment Verified & Order Dispensing Email (Status -> Success)
 */
function generatePaymentSuccessEmailHtml(fullName, orderRef, totalAmount, itemsSummary) {
  var firstName = fullName ? fullName.split(" ")[0] : "Valued Patient";

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>' +
  '<body style="margin: 0; padding: 0; background-color: #F6FFF8; font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #2B2B2B;">' +
    '<center style="width: 100%; table-layout: fixed; background-color: #F6FFF8; padding: 40px 10px;">' +
      '<div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 24px; border: 1px solid #C8E6C9; overflow: hidden; box-shadow: 0 10px 30px rgba(46, 125, 50, 0.08);">' +
        '<div style="background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%); padding: 36px 30px; text-align: center; color: #FFFFFF;">' +
          '<div style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 4px; text-transform: lowercase;">bytearsze</div>' +
          '<div style="font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #E8F5E9;">✅ Payment Verified · Order in Preparation</div>' +
        '</div>' +
        '<div style="padding: 32px 30px; text-align: left;">' +
          '<h1 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 700; color: #1B5E20;">Great news, ' + firstName + '! 🎉</h1>' +
          '<p style="margin: 0 0 24px 0; font-size: 14.5px; line-height: 1.6; color: #4E5D52;">Your payment has been successfully verified by our administrative team. Your prescription protocol is now being prepared in cold-chain insulated packaging for courier dispatch.</p>' +
          '<div style="background-color: #E8F5E9; border: 1px solid #A5D6A7; border-radius: 16px; padding: 18px 20px; margin-bottom: 24px; text-align: center;">' +
            '<div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #2E7D32; margin-bottom: 4px;">Verified Order Reference</div>' +
            '<div style="font-size: 24px; font-weight: 900; color: #1B5E20; font-family: monospace;">' + orderRef + '</div>' +
            '<div style="font-size: 13px; font-weight: 600; color: #2E7D32; margin-top: 4px;">Total Paid: ' + totalAmount + '</div>' +
          '</div>' +
          '<div style="border: 1px solid #E0E0E0; border-radius: 16px; padding: 20px; margin-bottom: 24px; font-size: 13.5px; line-height: 1.6; color: #333333;">' +
            '<div style="font-weight: 700; color: #0F0F0F; text-transform: uppercase; margin-bottom: 8px;">Protocol Summary</div>' +
            '<div>' + (itemsSummary || "Prescription formulations confirmed.") + '</div>' +
          '</div>' +
          '<div style="background-color: #F1F8E9; border-radius: 16px; padding: 18px 20px; margin-bottom: 24px; font-size: 13px; color: #33691E; line-height: 1.6;">' +
            '<strong>🚚 Shipping Notice:</strong> You will receive an SMS and email notification with your live courier tracking link as soon as your package is on the way.' +
          '</div>' +
          '<div style="text-align: center;">' +
            '<a href="mailto:' + ADMIN_EMAIL + '" style="display: inline-block; background-color: #2E7D32; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 50px;">Contact Patient Support</a>' +
          '</div>' +
        '</div>' +
        '<div style="background-color: #E8F5E9; border-top: 1px solid #C8E6C9; padding: 18px 24px; text-align: center; font-size: 11.5px; color: #2E7D32;">' +
          '<strong>' + BRAND_NAME + '</strong> · Doctor-Prescribed Weight Loss & Longevity · Available Nationwide' +
        '</div>' +
      '</div>' +
    '</center>' +
  '</body></html>';
}

/**
 * 4. Payment Update Required Email (Status -> Reject)
 */
function generatePaymentRejectEmailHtml(fullName, orderRef, totalAmount) {
  var firstName = fullName ? fullName.split(" ")[0] : "Valued Patient";

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>' +
  '<body style="margin: 0; padding: 0; background-color: #FFF5F5; font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #2B2B2B;">' +
    '<center style="width: 100%; table-layout: fixed; background-color: #FFF5F5; padding: 40px 10px;">' +
      '<div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 24px; border: 1px solid #FFCDD2; overflow: hidden; box-shadow: 0 10px 30px rgba(198, 40, 40, 0.08);">' +
        '<div style="background: linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%); padding: 36px 30px; text-align: center; color: #FFFFFF;">' +
          '<div style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 4px; text-transform: lowercase;">bytearsze</div>' +
          '<div style="font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #FFEBEE;">⚠️ Action Required: Payment Update</div>' +
        '</div>' +
        '<div style="padding: 32px 30px; text-align: left;">' +
          '<h1 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 700; color: #C62828;">Hello ' + firstName + ',</h1>' +
          '<p style="margin: 0 0 24px 0; font-size: 14.5px; line-height: 1.6; color: #6E6E6E;">We reviewed your uploaded proof of payment for Order <strong>#' + orderRef + '</strong>, but we were unable to confirm the transaction. This may be due to an unclear receipt, mismatched reference number, or incomplete transfer.</p>' +
          '<div style="background-color: #FFEBEE; border: 1px solid #FFCDD2; border-radius: 16px; padding: 18px 20px; margin-bottom: 24px; text-align: center;">' +
            '<div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #C62828; margin-bottom: 4px;">Pending Order Reference</div>' +
            '<div style="font-size: 24px; font-weight: 900; color: #B71C1C; font-family: monospace;">' + orderRef + '</div>' +
            '<div style="font-size: 13px; font-weight: 600; color: #C62828; margin-top: 4px;">Pending Total: ' + totalAmount + '</div>' +
          '</div>' +
          '<div style="background-color: #FFF8F7; border: 1px solid #FFE8EA; border-radius: 16px; padding: 20px; margin-bottom: 24px; font-size: 13.5px; color: #4A3333; line-height: 1.6;">' +
            '<strong>How to resolve this quickly:</strong><br>' +
            '1. Reply directly to this email with your updated transaction screenshot.<br>' +
            '2. Or contact our customer support team directly at <a href="mailto:' + ADMIN_EMAIL + '" style="color: #D32F2F; font-weight: 700;">' + ADMIN_EMAIL + '</a>.<br><br>' +
            'We will immediately verify your updated receipt and dispatch your order!' +
          '</div>' +
          '<div style="text-align: center;">' +
            '<a href="mailto:' + ADMIN_EMAIL + '?subject=Payment%20Receipt%20Update%20for%20' + orderRef + '" style="display: inline-block; background-color: #D32F2F; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 50px;">Reply with Updated Receipt</a>' +
          '</div>' +
        '</div>' +
        '<div style="background-color: #FFEBEE; border-top: 1px solid #FFCDD2; padding: 18px 24px; text-align: center; font-size: 11.5px; color: #C62828;">' +
          '<strong>' + BRAND_NAME + '</strong> · Doctor-Prescribed Weight Loss & Longevity · Available Nationwide' +
        '</div>' +
      '</div>' +
    '</center>' +
  '</body></html>';
}
