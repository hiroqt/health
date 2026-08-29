/**
 * ============================================================================
 * TEARSIZE HEALTH — FULL GOOGLE APPS SCRIPT ORDER, RECEIPT & STATUS EMAIL ENGINE
 * ============================================================================
 * 
 * FEATURES:
 * 1. doPost: Receives order from website, adds row to Google Sheet, saves receipt screenshot in Google Drive, sends initial Order Confirmation email to patient.
 * 2. onEdit / handleSheetEdit: When you change "Payment Status" in Google Sheets to "Success" or "Reject", it AUTOMATICALLY sends an updated status email to the patient!
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

// ─── 1. WEBHOOK HANDLERS (doGet & doPost) ───────────────────────────────────

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    service: "Tearsize Order Webhook & Email Engine",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

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

    // 1. Get or Create Google Drive folder: "Tearsize Receipts"
    var folderName = "Tearsize Receipts";
    var folders = DriveApp.getFoldersByName(folderName);
    var targetFolder;
    if (folders.hasNext()) {
      targetFolder = folders.next();
    } else {
      targetFolder = DriveApp.createFolder(folderName);
    }

    // 2. Save Receipt Screenshot in Google Drive: [Client Name]_[Payment Method]_[Order Ref]
    var receiptUrl = "No Receipt Attached";
    if (data.fileBase64 && data.fileBase64.length > 0) {
      try {
        var base64Data = data.fileBase64;
        if (base64Data.indexOf("base64,") !== -1) {
          base64Data = base64Data.split("base64,")[1];
        }

        var decodedBytes = Utilities.base64Decode(base64Data);
        var mimeType = data.fileType || "image/jpeg";
        var fileName = data.fileName || (data.fullName + "_" + data.paymentMethod + "_" + data.orderRef + ".jpg");

        var blob = Utilities.newBlob(decodedBytes, mimeType, fileName);
        var createdFile = targetFolder.createFile(blob);

        createdFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        receiptUrl = createdFile.getUrl();
      } catch (fileErr) {
        receiptUrl = "Upload Error: " + fileErr.toString();
      }
    }

    // 3. Format items summary
    var itemsSummary = "";
    var itemsArray = [];
    if (Array.isArray(data.selectedItems)) {
      itemsArray = data.selectedItems;
      itemsSummary = data.selectedItems.map(function(item) {
        return item.name + " (" + item.dosage + ") x" + (item.quantity || 1) + " [₱" + (item.price * (item.quantity || 1)) + "]";
      }).join("; ");
    } else if (typeof data.selectedItems === "string") {
      itemsSummary = data.selectedItems;
    }

    // 4. Access Active Google Sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

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
    }

    // 5. Append Order Row
    var dateFormatted = Utilities.formatDate(new Date(), "Asia/Manila", "yyyy-MM-dd HH:mm:ss");
    var totalFormatted = "₱" + Number(data.totalAmount || 0).toLocaleString();

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
      receiptUrl,
      "Pending" // Default status
    ];

    sheet.appendRow(row);

    // 6. Interactive Dropdown for Payment Status (Pending, Success, Reject)
    var lastRow = sheet.getLastRow();
    var statusCell = sheet.getRange(lastRow, 12);
    var dropdownRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Pending", "Success", "Reject"], true)
      .setAllowInvalid(false)
      .build();
    statusCell.setDataValidation(dropdownRule);
    statusCell.setValue("Pending");

    // 7. Send Immediate Order Confirmation Email to Patient
    var recipientEmail = (data.email || "").trim();
    var emailSentStatus = false;
    var emailErrorMessage = "";

    if (recipientEmail && recipientEmail.indexOf("@") !== -1) {
      try {
        var emailHtml = generateOrderConfirmationEmailHtml(data, itemsArray);
        var emailSubject = "Order Confirmation #" + data.orderRef + " — by tearsize";

        try {
          MailApp.sendEmail(recipientEmail, emailSubject, "", {
            htmlBody: emailHtml,
            name: "by tearsize",
            replyTo: "tearsize@gmail.com"
          });
          emailSentStatus = true;
        } catch (mailErr) {
          GmailApp.sendEmail(recipientEmail, emailSubject, "", {
            htmlBody: emailHtml,
            name: "by tearsize",
            replyTo: "tearsize@gmail.com"
          });
          emailSentStatus = true;
        }
      } catch (emailErr) {
        emailErrorMessage = emailErr.toString();
        Logger.log("Order email error: " + emailErrorMessage);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      orderRef: data.orderRef,
      receiptUrl: receiptUrl,
      paymentStatus: "Pending",
      emailSentTo: recipientEmail,
      emailSent: emailSentStatus
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
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
      MailApp.sendEmail({
        to: email,
        subject: "Payment Verified! Your Order #" + orderRef + " is Being Prepared 📦 — by tearsize",
        htmlBody: successHtml,
        name: "by tearsize",
        replyTo: "tearsize@gmail.com"
      });
      Logger.log("Success email sent to " + email);
    } else if (newStatus === "Reject") {
      var rejectHtml = generatePaymentRejectEmailHtml(fullName, orderRef, totalAmount);
      MailApp.sendEmail({
        to: email,
        subject: "Action Required: Payment Update for Order #" + orderRef + " — by tearsize",
        htmlBody: rejectHtml,
        name: "by tearsize",
        replyTo: "tearsize@gmail.com"
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
  var myEmail = Session.getActiveUser().getEmail();
  Logger.log("Authorizing permissions for: " + myEmail);
  
  MailApp.sendEmail({
    to: myEmail,
    subject: "✅ Tearsize Email System Authorized Successfully",
    htmlBody: "<div style='font-family: sans-serif; padding: 20px; color: #2B2B2B;'>" +
      "<h2 style='color: #FF5A5F;'>Tearsize Email System is Connected! 💓</h2>" +
      "<p>Your Google account has authorized email sending for new orders and status updates (Pending, Success, Reject).</p>" +
      "</div>",
    name: "by tearsize"
  });

  Logger.log("✅ Test email sent to " + myEmail);
}


// ─── 3. EMAIL HTML TEMPLATES ────────────────────────────────────────────────

/**
 * 1. Initial Order Confirmation Email (Upon Submission)
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
            '<a href="mailto:tearsize@gmail.com" style="display: inline-block; background-color: #FF5A5F; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 50px;">Contact Patient Support</a>' +
          '</div>' +
        '</div>' +
        '<div style="background-color: #FFF0F0; border-top: 1px solid #FFE8EA; padding: 18px 24px; text-align: center; font-size: 11.5px; color: #7A5555;">' +
          '<strong>by tearsize</strong> · Doctor-Prescribed Weight Loss & Longevity · Available Nationwide' +
        '</div>' +
      '</div>' +
    '</center>' +
  '</body></html>';
}

/**
 * 2. Payment Verified & Order Dispensing Email (Status -> Success)
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
            '<a href="mailto:tearsize@gmail.com" style="display: inline-block; background-color: #2E7D32; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 50px;">Contact Patient Support</a>' +
          '</div>' +
        '</div>' +
        '<div style="background-color: #E8F5E9; border-top: 1px solid #C8E6C9; padding: 18px 24px; text-align: center; font-size: 11.5px; color: #2E7D32;">' +
          '<strong>by tearsize</strong> · Doctor-Prescribed Weight Loss & Longevity · Available Nationwide' +
        '</div>' +
      '</div>' +
    '</center>' +
  '</body></html>';
}

/**
 * 3. Payment Update Required Email (Status -> Reject)
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
            '2. Or contact our customer support team directly at <a href="mailto:tearsize@gmail.com" style="color: #D32F2F; font-weight: 700;">tearsize@gmail.com</a> / <a href="tel:+639613236199" style="color: #D32F2F; font-weight: 700;">+63 961 323 6199</a>.<br><br>' +
            'We will immediately verify your updated receipt and dispatch your order!' +
          '</div>' +
          '<div style="text-align: center;">' +
            '<a href="mailto:tearsize@gmail.com?subject=Payment%20Receipt%20Update%20for%20' + orderRef + '" style="display: inline-block; background-color: #D32F2F; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 50px;">Reply with Updated Receipt</a>' +
          '</div>' +
        '</div>' +
        '<div style="background-color: #FFEBEE; border-top: 1px solid #FFCDD2; padding: 18px 24px; text-align: center; font-size: 11.5px; color: #C62828;">' +
          '<strong>by tearsize</strong> · Doctor-Prescribed Weight Loss & Longevity · Available Nationwide' +
        '</div>' +
      '</div>' +
    '</center>' +
  '</body></html>';
}
