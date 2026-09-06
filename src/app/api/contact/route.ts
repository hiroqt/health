import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      contactNumber,
      inquiryType,
      message,
    } = body;

    // Basic Validation
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields (Name, Email, Message)." },
        { status: 400 }
      );
    }

    // Google Apps Script webhook integration (if configured in .env.local)
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_WEBHOOK_URL;
    let cloudResponse: { status: string; detail?: string } = { status: "received" };

    if (googleScriptUrl) {
      try {
        const payload = {
          type: "contact_inquiry",
          timestamp: new Date().toISOString(),
          fullName,
          email,
          contactNumber: contactNumber || "Not provided",
          inquiryType: inquiryType || "General Inquiry",
          message,
        };

        const gRes = await fetch(googleScriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const textRes = await gRes.text();
        cloudResponse = { status: "forwarded", detail: textRes };
      } catch (cloudErr) {
        console.warn("Could not forward contact message to Google Apps Script webhook:", cloudErr);
        cloudResponse = { status: "local_logged_only" };
      }
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry received successfully. Our team will get back to you within 15-30 minutes.",
      cloudResponse,
    });
  } catch (error: unknown) {
    console.error("Error processing contact inquiry:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred. Please try again or reach us directly.",
      },
      { status: 500 }
    );
  }
}
