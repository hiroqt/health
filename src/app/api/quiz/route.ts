import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

const GOAL_MAP: Record<string, string> = {
  lose_weight: "Lose weight",
  energy: "Boost energy & focus",
  skin: "Improve skin health",
  all: "All of the above",
};

const GENDER_MAP: Record<string, string> = {
  female: "Female",
  male: "Male",
  nonbinary: "Non-binary",
  no_answer: "Prefer not to say",
};

const AGE_MAP: Record<string, string> = {
  "18_24": "18 – 24",
  "25_34": "25 – 34",
  "35_44": "35 – 44",
  "45_54": "45 – 54",
  "55_plus": "55+",
};

const WEIGHT_MAP: Record<string, string> = {
  lt_6mo: "Less than 6 months",
  "6mo_1yr": "6 months – 1 year",
  "1_3yr": "1 – 3 years",
  gt_3yr: "More than 3 years",
};

const CONDITION_MAP: Record<string, string> = {
  t2d: "Type 2 diabetes",
  hbp: "High blood pressure",
  cholesterol: "High cholesterol",
  thyroid: "Thyroid disorder",
  heart: "Heart disease",
  none: "None of the above",
};

const TREATMENT_MAP: Record<string, string> = {
  diet_exercise: "Diet & exercise only",
  rx: "Prescription medication",
  surgery: "Weight loss surgery",
  otc: "Supplements / OTC",
  none: "None",
};

function formatMultipleValues(values: unknown, map: Record<string, string>): string {
  if (Array.isArray(values)) {
    return values.map((v) => map[String(v)] || String(v)).join(", ");
  }
  if (typeof values === "string" && values.length > 0) {
    return map[values] || values;
  }
  return "";
}

function formatSingleValue(value: unknown, map: Record<string, string>): string {
  if (typeof value === "string") {
    return map[value] || value;
  }
  return "";
}

/**
 * Sends quiz payload to Google Apps Script Webhook with automatic retry on cold start.
 */
async function sendToGoogleScript(url: string, payload: unknown, maxAttempts = 2) {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 35000); // 35s per attempt

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
        console.warn(`[Quiz API] Attempt ${attempt} failed with status: ${res.status}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      lastError = new Error(msg);
      console.warn(`[Quiz API] Attempt ${attempt} encountered error: ${msg}`);
    }

    if (attempt < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
  }

  return { success: false, error: lastError?.message || "Failed to reach Google Apps Script after retries." };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      sessionId,
      status = "In Progress",
      step = 1,
      totalSteps = 8,
      startedAt,
      answers = {},
    } = body;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: "Missing required sessionId for quiz tracking." },
        { status: 400 }
      );
    }

    // Format human-friendly answers
    const formattedAnswers = {
      goal: formatSingleValue(answers.goal, GOAL_MAP),
      gender: formatSingleValue(answers.gender, GENDER_MAP),
      age: formatSingleValue(answers.age, AGE_MAP),
      weightHistory: formatSingleValue(answers.weight_history, WEIGHT_MAP),
      conditions: formatMultipleValues(answers.conditions, CONDITION_MAP),
      previousTreatments: formatMultipleValues(answers.previous_treatments, TREATMENT_MAP),
      name: typeof answers.name === "string" ? answers.name.trim() : "",
      email: typeof answers.email === "string" ? answers.email.trim() : "",
    };

    const isCompleted = status === "Completed";
    const percent = Math.min(100, Math.round((Number(step) / Number(totalSteps)) * 100));
    const progressText = isCompleted
      ? "Completed (100%)"
      : `Step ${step} of ${totalSteps} (${percent}%)`;

    // Priority: dedicated quiz webhook URL, then fallback to general webhook URL
    const googleScriptUrl =
      process.env.GOOGLE_QUIZ_SCRIPT_WEBHOOK_URL || process.env.GOOGLE_SCRIPT_WEBHOOK_URL;

    const payload = {
      type: "quiz_response",
      timestamp: new Date().toISOString(),
      sessionId,
      status,
      step,
      totalSteps,
      progress: progressText,
      startedAt: startedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      formattedAnswers,
    };

    let cloudResponse: unknown = { status: "local_logged" };

    if (googleScriptUrl) {
      const result = await sendToGoogleScript(googleScriptUrl, payload, 2);

      if (!result.success) {
        console.error("Google Apps Script quiz forward error:", result.error);
        return NextResponse.json(
          {
            success: false,
            error: "Unable to record quiz answers in Google Sheets.",
            detail: result.error,
            sessionId,
          },
          { status: 502 }
        );
      }

      cloudResponse = result.data;
    } else {
      console.log("ℹ️ [Quiz API] GOOGLE_QUIZ_SCRIPT_WEBHOOK_URL / GOOGLE_SCRIPT_WEBHOOK_URL not configured. Quiz attempt recorded locally:", {
        sessionId,
        status,
        progress: progressText,
        formattedAnswers,
      });
    }

    return NextResponse.json({
      success: true,
      sessionId,
      status,
      progress: progressText,
      cloudResponse,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Failed to process quiz submission.";
    console.error("Quiz API route critical error:", error);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
