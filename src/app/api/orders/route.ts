import { NextRequest, NextResponse } from "next/server";

// Configure maximum execution duration for serverless hosting (e.g. Vercel)
export const maxDuration = 60;

/**
 * Sends order payload to Google Apps Script Webhook with automatic retry on cold start or network hiccups.
 */
async function sendToGoogleScript(url: string, payload: unknown, maxAttempts = 2) {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 40000); // 40 seconds per attempt

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json().catch(() => ({ status: "ok" }));
        return { success: true, data };
      } else {
        const errorText = await res.text().catch(() => "");
        lastError = new Error(`Google Apps Script HTTP ${res.status}: ${errorText.slice(0, 200)}`);
        console.warn(`[Orders API] Attempt ${attempt} failed with status: ${res.status}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      lastError = new Error(msg);
      console.warn(`[Orders API] Attempt ${attempt} encountered error: ${msg}`);
    }

    if (attempt < maxAttempts) {
      // Brief backoff before retrying
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }

  return { success: false, error: lastError?.message || "Failed to reach Google Apps Script after retries." };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      orderRef,
      fullName,
      email,
      contactNumber,
      completeAddress,
      selectedItems,
      deliveryMode,
      paymentMethod,
      totalAmount,
      fileBase64,
      fileName,
      fileType,
    } = body;

    // Basic Validation
    if (!fullName || !contactNumber || !completeAddress) {
      return NextResponse.json(
        { success: false, error: "Missing required patient information (Name, Contact, Address)." },
        { status: 400 }
      );
    }

    if (!selectedItems || !Array.isArray(selectedItems) || selectedItems.length === 0) {
      return NextResponse.json(
        { success: false, error: "No products or formulations were selected." },
        { status: 400 }
      );
    }

    // Format file name: [Client Name]_[Payment Method]_[Order Ref]
    const sanitizedName = (fullName || "Client").replace(/[^a-zA-Z0-9]/g, "_");
    const sanitizedMethod = (paymentMethod || "PAYMENT").toUpperCase().replace(/[^a-zA-Z0-9]/g, "_");
    const sanitizedRef = (orderRef || "TSZ").replace(/[^a-zA-Z0-9-]/g, "_");
    const extension = fileName && fileName.includes(".") ? fileName.split(".").pop() : "jpg";
    const customFileName = `${sanitizedName}_${sanitizedMethod}_${sanitizedRef}.${extension}`;

    // Google Apps Script Webhook URL
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_WEBHOOK_URL;

    let cloudResponse: unknown = { status: "local_logged" };

    if (googleScriptUrl) {
      const payload = {
        timestamp: new Date().toISOString(),
        orderRef,
        fullName,
        email,
        contactNumber,
        completeAddress,
        selectedItems,
        deliveryMode,
        paymentMethod,
        totalAmount,
        fileName: customFileName,
        fileBase64: fileBase64 || "",
        fileType: fileType || "image/jpeg",
      };

      const result = await sendToGoogleScript(googleScriptUrl, payload, 2);

      if (!result.success) {
        console.error("Google Apps Script forward error:", result.error);
        return NextResponse.json(
          {
            success: false,
            error: "Unable to record order in Google Sheets. Please check your connection and retry.",
            detail: result.error,
            orderRef,
          },
          { status: 502 }
        );
      }

      cloudResponse = result.data;
    } else {
      console.log("ℹ️ [Orders API] GOOGLE_SCRIPT_WEBHOOK_URL not configured. Order recorded locally:", {
        orderRef,
        fullName,
        customFileName,
        totalAmount,
      });
    }

    return NextResponse.json({
      success: true,
      orderRef,
      customFileName,
      cloudResponse,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Failed to process order.";
    console.error("Orders API route critical error:", error);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
