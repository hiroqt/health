import { NextRequest, NextResponse } from "next/server";

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
        { success: false, error: "Missing required patient information." },
        { status: 400 }
      );
    }

    if (!selectedItems || selectedItems.length === 0) {
      return NextResponse.json(
        { success: false, error: "No products were selected." },
        { status: 400 }
      );
    }

    // Format file name based on user requirement: [Client Name]_[Payment Method]_[Order Ref]
    const sanitizedName = (fullName || "Client").replace(/[^a-zA-Z0-9]/g, "_");
    const sanitizedMethod = (paymentMethod || "PAYMENT").toUpperCase().replace(/[^a-zA-Z0-9]/g, "_");
    const sanitizedRef = (orderRef || "TSZ").replace(/[^a-zA-Z0-9-]/g, "_");
    const extension = fileName && fileName.includes(".") ? fileName.split(".").pop() : "jpg";
    const customFileName = `${sanitizedName}_${sanitizedMethod}_${sanitizedRef}.${extension}`;

    // Webhook URL from environment variables (or fallback)
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_WEBHOOK_URL;

    let cloudResponse: any = { status: "local_logged" };

    if (googleScriptUrl) {
      try {
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

        const res = await fetch(googleScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
          redirect: "follow",
        });

        if (res.ok) {
          const data = await res.json().catch(() => ({ status: "ok" }));
          cloudResponse = data;
        } else {
          console.warn("Google Apps Script returned non-200 status:", res.status);
        }
      } catch (scriptErr) {
        console.error("Error communicating with Google Apps Script:", scriptErr);
      }
    } else {
      console.log("ℹ️ [Orders API] GOOGLE_SCRIPT_WEBHOOK_URL is not set yet. Order recorded locally:", {
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
  } catch (error: any) {
    console.error("Orders API route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process order." },
      { status: 500 }
    );
  }
}
