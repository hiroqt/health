export interface OrderEmailItem {
  name: string;
  dosage: string;
  quantity: number;
  price: number;
}

export interface OrderEmailData {
  orderRef: string;
  fullName: string;
  email: string;
  contactNumber: string;
  completeAddress: string;
  selectedItems: OrderEmailItem[];
  deliveryMode: string;
  paymentMethod: string;
  totalAmount: number;
  dateFormatted?: string;
}

/**
 * Generates a luxury, responsive HTML email template for order confirmations.
 * Compatible with Gmail, Apple Mail, Outlook, mobile & desktop clients.
 */
export function buildOrderEmailHtml(data: OrderEmailData): string {
  const itemsHtml = data.selectedItems
    .map(
      (item) => `
      <tr>
        <td style="padding: 14px 16px; border-bottom: 1px solid #FFE8EA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #0F0F0F;">
          <div style="font-weight: 700; color: #0F0F0F;">${item.name}</div>
          <div style="font-size: 12px; color: #7A5555; margin-top: 2px;">
            Dosage: <span style="background-color: #FFF0F0; color: #FF5A5F; padding: 2px 6px; border-radius: 4px; font-weight: 600;">${item.dosage}</span>
          </div>
        </td>
        <td align="center" style="padding: 14px 16px; border-bottom: 1px solid #FFE8EA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; color: #4A3333;">
          ${item.quantity}
        </td>
        <td align="right" style="padding: 14px 16px; border-bottom: 1px solid #FFE8EA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; color: #0F0F0F;">
          ₱${(item.price * item.quantity).toLocaleString()}
        </td>
      </tr>
    `
    )
    .join("");

  const formattedTotal = Number(data.totalAmount || 0).toLocaleString();
  const firstName = data.fullName ? data.fullName.split(" ")[0] : "Valued Patient";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - by tearsize</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FFF8F7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #2B2B2B;">
  <center style="width: 100%; table-layout: fixed; background-color: #FFF8F7; padding: 40px 10px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 24px; border: 1px solid #FFE8EA; overflow: hidden; box-shadow: 0 10px 30px rgba(255, 90, 95, 0.05);">
      
      <!-- Top Brand Header Banner -->
      <div style="background: linear-gradient(135deg, #FF5A5F 0%, #E04A4F 100%); padding: 36px 30px; text-align: center; color: #FFFFFF;">
        <div style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 4px; text-transform: lowercase;">
          bytears<span style="opacity: 0.85;">ze</span>
        </div>
        <div style="font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #FFE8EA;">
          Clinical Prescription Order Confirmation
        </div>
      </div>

      <!-- Main Body Container -->
      <div style="padding: 32px 30px;">
        
        <!-- Greeting -->
        <h1 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 700; color: #0F0F0F; line-height: 1.3;">
          Thank you for your order, ${firstName}! 💓
        </h1>
        <p style="margin: 0 0 24px 0; font-size: 14.5px; line-height: 1.6; color: #6E6E6E;">
          We have received your intake request and payment submission. Our medical team is now reviewing your protocol details to ensure seamless dispensing and express nationwide dispatch.
        </p>

        <!-- Order Reference Badge Box -->
        <div style="background-color: #FFF8F7; border: 1px solid #FFE8EA; border-radius: 16px; padding: 18px 20px; margin-bottom: 28px; text-align: center;">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #7A5555; margin-bottom: 4px;">
            Order Reference Number
          </div>
          <div style="font-size: 22px; font-weight: 900; color: #FF5A5F; font-family: monospace; letter-spacing: 1px;">
            ${data.orderRef}
          </div>
          <div style="font-size: 12px; color: #9A7878; margin-top: 4px;">
            Please keep this reference for your delivery tracking inquiries.
          </div>
        </div>

        <!-- Section: Itemized Order Summary -->
        <div style="margin-bottom: 28px;">
          <div style="font-size: 14px; font-weight: 700; color: #0F0F0F; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
            Prescription Formulation Breakdown
          </div>

          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #FFFFFF; border: 1px solid #FFE8EA; border-radius: 12px; overflow: hidden;">
            <thead>
              <tr style="background-color: #FFF0F0;">
                <th align="left" style="padding: 10px 16px; font-size: 11px; font-weight: 700; color: #7A5555; text-transform: uppercase; letter-spacing: 0.5px;">Item</th>
                <th align="center" style="padding: 10px 16px; font-size: 11px; font-weight: 700; color: #7A5555; text-transform: uppercase; letter-spacing: 0.5px;">Qty</th>
                <th align="right" style="padding: 10px 16px; font-size: 11px; font-weight: 700; color: #7A5555; text-transform: uppercase; letter-spacing: 0.5px;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </div>

        <!-- Financial Summary Breakdown -->
        <div style="background-color: #FFF8F7; border: 1px solid #FFE8EA; border-radius: 16px; padding: 20px; margin-bottom: 28px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13.5px; color: #6E6E6E;">
            <tr>
              <td style="padding: 4px 0;">Subtotal</td>
              <td align="right" style="font-weight: 600; color: #0F0F0F;">₱${formattedTotal}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0;">Cold-Chain Insulated Packaging</td>
              <td align="right" style="font-weight: 600; color: #2E7D32;">FREE (Included)</td>
            </tr>
            <tr>
              <td style="padding: 4px 0;">Delivery Courier</td>
              <td align="right" style="font-weight: 600; color: #0F0F0F;">${data.deliveryMode}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0;">Payment Method</td>
              <td align="right" style="font-weight: 600; color: #0F0F0F;">${data.paymentMethod}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding-top: 10px; border-top: 1px solid #FFE8EA;"></td>
            </tr>
            <tr>
              <td style="font-size: 16px; font-weight: 700; color: #0F0F0F;">Total Amount Paid</td>
              <td align="right" style="font-size: 20px; font-weight: 900; color: #FF5A5F;">₱${formattedTotal}</td>
            </tr>
          </table>
        </div>

        <!-- Section: Patient & Delivery Information -->
        <div style="border: 1px solid #FFE8EA; border-radius: 16px; padding: 20px; margin-bottom: 28px;">
          <div style="font-size: 13px; font-weight: 700; color: #0F0F0F; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
            Shipping & Patient Details
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; line-height: 1.6; color: #4A3333;">
            <tr>
              <td style="width: 130px; color: #7A5555; font-weight: 600;">Patient Name:</td>
              <td style="font-weight: 700; color: #0F0F0F;">${data.fullName}</td>
            </tr>
            <tr>
              <td style="color: #7A5555; font-weight: 600;">Contact Number:</td>
              <td>${data.contactNumber}</td>
            </tr>
            <tr>
              <td style="color: #7A5555; font-weight: 600;">Email Address:</td>
              <td>${data.email}</td>
            </tr>
            <tr>
              <td style="color: #7A5555; font-weight: 600; vertical-align: top;">Delivery Address:</td>
              <td style="font-weight: 500;">${data.completeAddress}</td>
            </tr>
          </table>
        </div>

        <!-- Next Steps Timeline -->
        <div style="background-color: #FAFAFA; border: 1px solid #EEEEEE; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
          <div style="font-size: 13px; font-weight: 700; color: #0F0F0F; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
            Next Steps in Your Care
          </div>
          <div style="font-size: 13px; color: #555555; line-height: 1.6;">
            <strong>1. Receipt & Intake Verification:</strong> Our administrative team verifies your uploaded proof of payment.<br>
            <strong>2. Clinical Review & Dispensing:</strong> Cold-chain formulations are prepared in temperature-monitored packaging.<br>
            <strong>3. Courier Dispatch & Tracking:</strong> You will receive SMS & email notifications with your tracking number once handed to the courier.
          </div>
        </div>

        <!-- Support CTA Footer -->
        <div style="text-align: center; padding-top: 10px;">
          <p style="font-size: 13px; color: #6E6E6E; margin: 0 0 12px 0;">
            Questions about your order or protocol? We're here to help anytime.
          </p>
          <a href="mailto:tearsize@gmail.com" style="display: inline-block; background-color: #FF5A5F; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 50px; box-shadow: 0 4px 12px rgba(255, 90, 95, 0.25);">
            Contact Patient Support
          </a>
        </div>

      </div>

      <!-- Bottom Footer -->
      <div style="background-color: #FFF0F0; border-top: 1px solid #FFE8EA; padding: 20px 30px; text-align: center; font-size: 11.5px; color: #7A5555; line-height: 1.6;">
        <strong>by tearsize</strong> · Modern Online Healthcare & Longevity Protocols<br>
        Email: <a href="mailto:tearsize@gmail.com" style="color: #FF5A5F; text-decoration: none;">tearsize@gmail.com</a> | Phone: <a href="tel:+639613236199" style="color: #FF5A5F; text-decoration: none;">+63 961 323 6199</a><br>
        Available Nationwide · Discreet Cold-Chain Delivery
      </div>

    </div>
  </center>
</body>
</html>
  `.trim();
}
