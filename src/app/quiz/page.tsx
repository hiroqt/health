"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PiArrowRight, PiArrowLeft, PiCheckFat, PiSyringe, PiSyringeFill, PiX, PiLightbulbFilament } from "react-icons/pi";

// ─── Animation ────────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const questionVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? 48 : -48,
    scale: 0.97,
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? -48 : 48,
    scale: 0.97,
    transition: { duration: 0.32, ease },
  }),
};

const optionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease, delay: i * 0.07 },
  }),
};

// ─── Trivia ───────────────────────────────────────────────────────────────────
type Trivia = { eyebrow: string; headline: string; body: string };

const TRIVIA: Record<string, Trivia> = {
  goal: {
    eyebrow: "Did you know",
    headline: "Your goals shape your biology.",
    body: "Research shows that people who articulate a clear health goal are 2–3× more likely to sustain lifestyle changes over 6 months compared to those who start without one.",
  },
  gender: {
    eyebrow: "Quick science",
    headline: "Hormones drive more than you think.",
    body: "Estrogen and testosterone directly influence where the body stores fat, how quickly it burns calories, and how medications like GLP-1 agonists are metabolized — making biological sex a key variable in any treatment plan.",
  },
  age: {
    eyebrow: "Worth knowing",
    headline: "Metabolism shifts every decade.",
    body: "After age 30, resting metabolic rate drops roughly 1–2% per decade. The good news: doctor-guided interventions can recalibrate this — regardless of where you're starting from.",
  },
  weight_history: {
    eyebrow: "You're not alone",
    headline: "Duration matters — but it's not destiny.",
    body: "Studies on GLP-1 therapies show meaningful weight loss even in people who've struggled for over a decade. The length of the struggle often reflects biology, not willpower.",
  },
  conditions: {
    eyebrow: "Good to know",
    headline: "Comorbidities change the equation.",
    body: "Conditions like Type 2 diabetes and hypertension are strongly linked to excess adipose tissue. Treating the root cause — weight — often improves or resolves these conditions without extra medication.",
  },
  previous_treatments: {
    eyebrow: "The data says",
    headline: "Most diets fail long-term without support.",
    body: "Up to 80% of weight lost through diet alone is regained within 5 years. Physician-supervised programs with pharmacological support show significantly better long-term outcomes.",
  },
  name: {
    eyebrow: "Almost there",
    headline: "Personalization starts with a name.",
    body: "Your doctor won't be reading a spreadsheet — they'll be reading your story. Every detail you share, from your name to your history, informs a plan built around you specifically.",
  },
};

const triviaVariants = {
  enter:  { opacity: 0, scale: 0.96, y: 24 },
  center: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.5, ease } },
  exit:   { opacity: 0, scale: 0.96, y: -20, transition: { duration: 0.3, ease } },
};

const wordVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease, delay: 0.1 + i * 0.04 },
  }),
};

function TriviaScreen({ trivia, onContinue }: { trivia: Trivia; onContinue: () => void }) {
  // Split headline into words for staggered reveal
  const words = trivia.headline.split(" ");

  // Auto-advance after 3.2s
  useEffect(() => {
    const t = setTimeout(onContinue, 3200);
    return () => clearTimeout(t);
  }, [onContinue]);

  return (
    <motion.div
      key="trivia"
      variants={triviaVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="flex flex-col gap-6 w-full"
    >
      {/* Card */}
      <div
        className="relative rounded-[22px] overflow-hidden p-7 flex flex-col gap-5"
        style={{
          background: "linear-gradient(140deg, #2E1010 0%, #1A0808 60%, #0F0404 100%)",
          border: "1px solid rgba(240,112,112,0.18)",
          boxShadow: "0 16px 48px rgba(240,112,112,0.12)",
        }}
      >
        {/* Slash decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div style={{ position: "absolute", top: "-20%", left: "8%", width: "5px", height: "140%", background: "rgba(240,112,112,0.14)", transform: "rotate(-16deg)" }} />
          <div style={{ position: "absolute", top: "-20%", left: "12%", width: "5px", height: "140%", background: "rgba(240,112,112,0.07)", transform: "rotate(-16deg)" }} />
        </div>

        {/* Icon + eyebrow */}
        <div className="flex items-center gap-2.5 relative">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(240,112,112,0.18)" }}
          >
            <PiLightbulbFilament size={16} style={{ color: "#F07070" }} />
          </div>
          <span
            className="text-[10.5px] font-bold tracking-[0.22em] uppercase"
            style={{ color: "rgba(240,112,112,0.7)" }}
          >
            {trivia.eyebrow}
          </span>
        </div>

        {/* Headline — word by word reveal */}
        <motion.h2
          className="font-display leading-[1.15] relative"
          style={{ fontSize: "clamp(1.45rem, 3.5vw, 1.9rem)", color: "white" }}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, i) => (
            <motion.span key={i} custom={i} variants={wordVariants} style={{ display: "inline-block", marginRight: "0.28em" }}>
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Body */}
        <motion.p
          className="text-[14px] leading-relaxed relative"
          style={{ color: "rgba(255,255,255,0.6)" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.45 } }}
        >
          {trivia.body}
        </motion.p>

        {/* Progress strip */}
        <div className="w-full h-0.5 rounded-full overflow-hidden relative" style={{ background: "rgba(240,112,112,0.15)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #F07070, #D94040)", originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3.2, ease: "linear" }}
          />
        </div>
      </div>

      {/* Skip tap */}
      <button
        type="button"
        onClick={onContinue}
        className="self-center text-[12.5px] font-medium transition-colors duration-150 cursor-pointer"
        style={{ color: "#C4A0A0" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F07070"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#C4A0A0"; }}
      >
        Skip →
      </button>
    </motion.div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Option = { label: string; value: string };
type Question =
  | { id: string; type: "single"; label: string; sublabel?: string; options: Option[] }
  | { id: string; type: "multiple"; label: string; sublabel?: string; options: Option[]; maxChoices?: number }
  | { id: string; type: "input"; label: string; sublabel?: string; placeholder: string; inputType?: string };

// ─── Questions ────────────────────────────────────────────────────────────────
const QUESTIONS: Question[] = [
  {
    id: "goal",
    type: "single",
    label: "What's your primary goal?",
    sublabel: "We'll tailor your program around what matters most to you.",
    options: [
      { label: "Lose weight",          value: "lose_weight"    },
      { label: "Boost energy & focus", value: "energy"         },
      { label: "Improve skin health",  value: "skin"           },
      { label: "All of the above",     value: "all"            },
    ],
  },
  {
    id: "gender",
    type: "single",
    label: "How do you identify?",
    sublabel: "Some treatments are adjusted based on biological factors.",
    options: [
      { label: "Female",           value: "female"            },
      { label: "Male",             value: "male"              },
      { label: "Non-binary",       value: "nonbinary"         },
      { label: "Prefer not to say", value: "no_answer"        },
    ],
  },
  {
    id: "age",
    type: "single",
    label: "What's your age range?",
    sublabel: "Treatment protocols vary depending on your age group.",
    options: [
      { label: "18 – 24", value: "18_24" },
      { label: "25 – 34", value: "25_34" },
      { label: "35 – 44", value: "35_44" },
      { label: "45 – 54", value: "45_54" },
      { label: "55+",     value: "55_plus" },
    ],
  },
  {
    id: "weight_history",
    type: "single",
    label: "How long have you been trying to reach your goal weight?",
    options: [
      { label: "Less than 6 months",  value: "lt_6mo"  },
      { label: "6 months – 1 year",   value: "6mo_1yr" },
      { label: "1 – 3 years",         value: "1_3yr"   },
      { label: "More than 3 years",   value: "gt_3yr"  },
    ],
  },
  {
    id: "conditions",
    type: "multiple",
    label: "Have you been diagnosed with any of the following?",
    sublabel: "Select all that apply. This helps your doctor ensure safety.",
    options: [
      { label: "Type 2 diabetes",      value: "t2d"        },
      { label: "High blood pressure",  value: "hbp"        },
      { label: "High cholesterol",     value: "cholesterol" },
      { label: "Thyroid disorder",     value: "thyroid"    },
      { label: "Heart disease",        value: "heart"      },
      { label: "None of the above",    value: "none"       },
    ],
  },
  {
    id: "previous_treatments",
    type: "multiple",
    label: "Have you tried any of these before?",
    sublabel: "Select all that apply.",
    options: [
      { label: "Diet & exercise only",  value: "diet_exercise" },
      { label: "Prescription medication", value: "rx"          },
      { label: "Weight loss surgery",   value: "surgery"       },
      { label: "Supplements / OTC",     value: "otc"           },
      { label: "None",                  value: "none"          },
    ],
  },
  {
    id: "name",
    type: "input",
    label: "What should we call you?",
    sublabel: "Your doctor will use this to personalize your plan.",
    placeholder: "Your first name",
  },
  {
    id: "email",
    type: "input",
    label: "Where should we send your results?",
    sublabel: "A licensed doctor will review your answers within 24 hours.",
    placeholder: "your@email.com",
    inputType: "email",
  },
];

type Answers = Record<string, string | string[]>;

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full" aria-label={`Question ${step} of ${total}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: "#9A7878" }}>
          {step} / {total}
        </span>
        <span className="text-[11px] font-semibold" style={{ color: "#F07070" }}>{pct}%</span>
      </div>
      <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "#F5DADA" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #F07070, #E85555)" }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.45, ease }}
        />
      </div>
    </div>
  );
}

// ─── Single choice ────────────────────────────────────────────────────────────
function SingleChoice({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {options.map((opt, i) => {
        const selected = value === opt.value;
        return (
          <motion.button
            key={opt.value}
            type="button"
            custom={i}
            variants={optionVariants}
            initial="hidden"
            animate="visible"
            onClick={() => onChange(opt.value)}
            className="w-full flex items-center justify-between rounded-[14px] px-5 py-4 text-left transition-all duration-200 cursor-pointer"
            style={{
              background: selected ? "#FFF0F0" : "white",
              border: `1.5px solid ${selected ? "#F07070" : "#F5DADA"}`,
              boxShadow: selected
                ? "0 0 0 3px rgba(240,112,112,0.12)"
                : "0 1px 3px rgba(240,112,112,0.06)",
            }}
          >
            <span
              className="text-[15px] font-medium"
              style={{ color: selected ? "#D94040" : "#1A0A0A" }}
            >
              {opt.label}
            </span>
            <span
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200"
              style={{
                borderColor: selected ? "#F07070" : "#E8BFBF",
                background: selected ? "#F07070" : "transparent",
              }}
            >
              {selected && <PiCheckFat size={10} color="white" />}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── Multi choice ─────────────────────────────────────────────────────────────
function MultiChoice({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (val: string) => {
    if (val === "none") {
      onChange(["none"]);
      return;
    }
    const without = value.filter((v) => v !== "none");
    onChange(
      without.includes(val) ? without.filter((v) => v !== val) : [...without, val]
    );
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {options.map((opt, i) => {
        const selected = value.includes(opt.value);
        return (
          <motion.button
            key={opt.value}
            type="button"
            custom={i}
            variants={optionVariants}
            initial="hidden"
            animate="visible"
            onClick={() => toggle(opt.value)}
            className="w-full flex items-center justify-between rounded-[14px] px-5 py-4 text-left transition-all duration-200 cursor-pointer"
            style={{
              background: selected ? "#FFF0F0" : "white",
              border: `1.5px solid ${selected ? "#F07070" : "#F5DADA"}`,
              boxShadow: selected
                ? "0 0 0 3px rgba(240,112,112,0.12)"
                : "0 1px 3px rgba(240,112,112,0.06)",
            }}
          >
            <span
              className="text-[15px] font-medium"
              style={{ color: selected ? "#D94040" : "#1A0A0A" }}
            >
              {opt.label}
            </span>
            <span
              className="w-5 h-5 rounded-[5px] border-2 flex items-center justify-center shrink-0 transition-all duration-200"
              style={{
                borderColor: selected ? "#F07070" : "#E8BFBF",
                background: selected ? "#F07070" : "transparent",
              }}
            >
              {selected && <PiCheckFat size={10} color="white" />}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── Text input ───────────────────────────────────────────────────────────────
function TextInput({
  placeholder,
  value,
  onChange,
  inputType = "text",
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  inputType?: string;
}) {
  return (
    <motion.div
      custom={0}
      variants={optionVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        className="w-full rounded-[14px] px-5 py-4 text-[16px] font-medium outline-none transition-all duration-200"
        style={{
          background: "white",
          border: "1.5px solid #F5DADA",
          color: "#1A0A0A",
          boxShadow: "0 1px 3px rgba(240,112,112,0.06)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#F07070";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(240,112,112,0.12)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#F5DADA";
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(240,112,112,0.06)";
        }}
      />
    </motion.div>
  );
}

// ─── Results screen ───────────────────────────────────────────────────────────
function ResultsScreen({ answers }: { answers: Answers }) {
  const name = (answers["name"] as string) || "there";

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } }}
      className="flex flex-col items-center text-center gap-6 w-full max-w-md mx-auto"
    >
      {/* Checkmark */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #F07070, #D94040)" }}
      >
        <PiCheckFat size={36} color="white" />
      </motion.div>

      <div className="flex flex-col gap-2">
        <h2
          className="font-display leading-tight"
          style={{ fontSize: "clamp(1.9rem, 4vw, 2.5rem)", color: "#1A0A0A" }}
        >
          You&apos;re all set, {name}!
        </h2>
        <p className="text-[15px] leading-relaxed" style={{ color: "#4A3333" }}>
          A licensed doctor will review your answers within 24 hours and reach out with a personalized plan — entirely online.
        </p>
      </div>

      {/* What's next */}
      <div
        className="w-full rounded-[18px] p-6 flex flex-col gap-4 text-left"
        style={{ background: "#FFF5F5", border: "1px solid #F5DADA" }}
      >
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "#9A7878" }}>
          What happens next
        </p>
        {[
          "Doctor reviews your intake within 24 hrs",
          "Personalized treatment plan sent to your email",
          "Free discreet delivery to your door",
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold"
              style={{ background: "#FADADD", color: "#D94040" }}
            >
              {i + 1}
            </span>
            <span className="text-[14px] font-medium" style={{ color: "#4A3333" }}>{item}</span>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full font-semibold gap-2 text-white transition-colors duration-200"
        style={{ background: "#F07070", fontSize: "14.5px", minHeight: "52px", padding: "0 40px" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#D94040")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#F07070")}
      >
        Back to home
      </Link>
    </motion.div>
  );
}

// ─── Quiz Page ────────────────────────────────────────────────────────────────
export default function QuizPage() {
  const [step, setStep]               = useState(0); // 0-indexed
  const [dir, setDir]                 = useState(1); // 1 = forward, -1 = back
  const [answers, setAnswers]         = useState<Answers>({});
  const [done, setDone]               = useState(false);
  const [triviaId, setTriviaId]       = useState<string | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const question = QUESTIONS[step];
  const total    = QUESTIONS.length;

  // Current answer
  const currentAnswer = answers[question?.id] ?? (question?.type === "multiple" ? [] : "");

  const canAdvance = (() => {
    if (!question) return false;
    const a = answers[question.id];
    if (question.type === "single")   return typeof a === "string" && a.length > 0;
    if (question.type === "multiple") return Array.isArray(a) && a.length > 0;
    if (question.type === "input")    return typeof a === "string" && a.trim().length > 0;
    return false;
  })();

  const setAnswer = (id: string, val: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  // After trivia is dismissed, advance to the next step
  const afterTrivia = () => {
    setTriviaId(null);
    setDir(1);
    setStep((s) => s + 1);
  };

  const goNext = () => {
    if (!canAdvance || !question) return;
    const isLast = step === total - 1;
    if (isLast) { setDone(true); return; }
    // Show trivia if one exists for this question
    if (TRIVIA[question.id]) {
      setTriviaId(question.id);
    } else {
      setDir(1);
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (triviaId) { setTriviaId(null); return; } // dismiss trivia first
    if (step === 0) return;
    setDir(-1);
    setStep((s) => s - 1);
  };

  // Auto-advance on single choice selection
  const handleSingleChange = (id: string, val: string) => {
    setAnswer(id, val);
    setTimeout(() => {
      const isLast = step === total - 1;
      if (isLast) { setDone(true); return; }
      if (TRIVIA[id]) {
        setTriviaId(id);
      } else {
        setDir(1);
        setStep((s) => s + 1);
      }
    }, 340);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFF5F5 0%, #FFFFFF 50%)" }}
    >
      {/* ── Exit confirmation dialog ── */}
      <AnimatePresence>
        {showExitConfirm && (
          <>
            {/* Backdrop */}
            <motion.div
              key="exit-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-[3px]"
              onClick={() => setShowExitConfirm(false)}
            />
            {/* Dialog */}
            <motion.div
              key="exit-dialog"
              initial={{ opacity: 0, scale: 0.93, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, scale: 0.95, y: 8, transition: { duration: 0.18 } }}
              className="fixed inset-0 z-[90] flex items-center justify-center px-5 pointer-events-none"
            >
              <div
                className="pointer-events-auto w-full max-w-[360px] rounded-[22px] p-7 flex flex-col gap-5"
                style={{
                  background: "white",
                  boxShadow: "0 24px 64px rgba(26,10,10,0.18), 0 2px 8px rgba(240,112,112,0.08)",
                  border: "1px solid #F5DADA",
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: "#FFF0F0" }}
                >
                  <PiX size={20} style={{ color: "#F07070" }} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <h2
                    className="font-display text-[#1A0A0A] leading-snug"
                    style={{ fontSize: "1.25rem" }}
                  >
                    Leave the quiz?
                  </h2>
                  <p className="text-[14px] leading-relaxed" style={{ color: "#9A7878" }}>
                    Your progress won&apos;t be saved. You&apos;ll need to start over if you come back.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/"
                    className="flex items-center justify-center rounded-full font-semibold text-white transition-colors duration-200"
                    style={{ background: "#F07070", fontSize: "14px", minHeight: "48px" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#D94040"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F07070"; }}
                  >
                    Yes, leave
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowExitConfirm(false)}
                    className="flex items-center justify-center rounded-full font-semibold transition-colors duration-200 cursor-pointer"
                    style={{
                      fontSize: "14px",
                      minHeight: "48px",
                      color: "#4A3333",
                      border: "1.5px solid #F5DADA",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E8BFBF"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#F5DADA"; }}
                  >
                    Keep going
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Brand slash decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{ position: "absolute", top: "-10%", left: "4%", width: "6px", height: "130%", background: "rgba(240,112,112,0.08)", transform: "rotate(-16deg)" }} />
        <div style={{ position: "absolute", top: "-10%", left: "7.5%", width: "6px", height: "130%", background: "rgba(240,112,112,0.05)", transform: "rotate(-16deg)" }} />
        <div style={{ position: "absolute", top: "5%", right: "4%", width: "90px", height: "90px", background: "rgba(240,112,112,0.05)", transform: "rotate(45deg)", borderRadius: "12px" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "55px", height: "55px", background: "rgba(240,112,112,0.04)", transform: "rotate(45deg)", borderRadius: "8px" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-5 py-5 flex items-center justify-between max-w-[600px] mx-auto w-full">
        <Link href="/" aria-label="by tearsize home" className="flex items-center gap-1.5">
          <span className="font-display font-medium leading-none select-none" style={{ color: "#9A7878", fontSize: "0.9rem" }}>by</span>
          <span className="font-display font-black italic leading-none select-none" style={{ color: "#F07070", fontSize: "1.4rem" }}>
            tears
          </span>
          <PiSyringeFill size={24} style={{ color: "#F07070", transform: "rotate(-25deg)", margin: "0 -2px" }} aria-hidden="true" />
          <span className="font-display font-black italic leading-none select-none" style={{ color: "#F07070", fontSize: "1.4rem" }}>
            ze
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setShowExitConfirm(true)}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
          style={{ background: "#F5DADA", color: "#9A7878" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FADADD"; (e.currentTarget as HTMLElement).style.color = "#D94040"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F5DADA"; (e.currentTarget as HTMLElement).style.color = "#9A7878"; }}
          aria-label="Exit quiz"
        >
          <PiX size={16} />
        </button>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 py-8">
        <div className="w-full max-w-[520px] mx-auto flex flex-col gap-8">

          {!done && question && (
            <>
              {/* Progress */}
              <ProgressBar step={step + 1} total={total} />

              {/* Question card / Trivia */}
              <div className="relative" style={{ minHeight: "420px" }}>
                <AnimatePresence mode="wait" custom={dir}>

                  {/* ── Trivia interstitial ── */}
                  {triviaId && TRIVIA[triviaId] && (
                    <TriviaScreen
                      key={`trivia-${triviaId}`}
                      trivia={TRIVIA[triviaId]}
                      onContinue={afterTrivia}
                    />
                  )}

                  {/* ── Question ── */}
                  {!triviaId && (
                  <motion.div
                    key={step}
                    custom={dir}
                    variants={questionVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col gap-6 w-full"
                  >
                    {/* Question text */}
                    <div className="flex flex-col gap-1.5">
                      <h1
                        className="font-display text-[#1A0A0A] leading-[1.15]"
                        style={{ fontSize: "clamp(1.4rem, 3.5vw, 1.85rem)" }}
                      >
                        {question.label}
                      </h1>
                      {question.sublabel && (
                        <p className="text-[14px] leading-relaxed" style={{ color: "#9A7878" }}>
                          {question.sublabel}
                        </p>
                      )}
                    </div>

                    {/* Choices / input */}
                    {question.type === "single" && (
                      <SingleChoice
                        options={question.options}
                        value={currentAnswer as string}
                        onChange={(val) => handleSingleChange(question.id, val)}
                      />
                    )}
                    {question.type === "multiple" && (
                      <MultiChoice
                        options={question.options}
                        value={currentAnswer as string[]}
                        onChange={(val) => setAnswer(question.id, val)}
                      />
                    )}
                    {question.type === "input" && (
                      <TextInput
                        placeholder={question.placeholder}
                        value={currentAnswer as string}
                        onChange={(val) => setAnswer(question.id, val)}
                        inputType={question.inputType}
                      />
                    )}

                    {/* Navigation — only shown for multi / input since single auto-advances */}
                    {(question.type === "multiple" || question.type === "input") && (
                      <div className="flex items-center justify-between gap-3 mt-2">
                        <button
                          type="button"
                          onClick={goBack}
                          disabled={step === 0}
                          className="inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                          style={{
                            color: "#9A7878",
                            fontSize: "13.5px",
                            minHeight: "44px",
                            padding: "0 18px",
                            border: "1.5px solid #F5DADA",
                          }}
                          onMouseEnter={(e) => { if (step > 0) (e.currentTarget as HTMLElement).style.borderColor = "#E8BFBF"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#F5DADA"; }}
                        >
                          <PiArrowLeft size={15} />
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={goNext}
                          disabled={!canAdvance}
                          className="inline-flex items-center gap-2 rounded-full font-semibold text-white transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          style={{
                            background: "#F07070",
                            fontSize: "13.5px",
                            minHeight: "44px",
                            padding: "0 28px",
                          }}
                          onMouseEnter={(e) => { if (canAdvance) (e.currentTarget as HTMLElement).style.background = "#D94040"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F07070"; }}
                        >
                          {step === total - 1 ? "Submit" : "Continue"}
                          <PiArrowRight size={15} />
                        </button>
                      </div>
                    )}

                    {/* Back button for single choice (no forward btn since it auto-advances) */}
                    {question.type === "single" && step > 0 && (
                      <button
                        type="button"
                        onClick={goBack}
                        className="self-start inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200 cursor-pointer"
                        style={{
                          color: "#9A7878",
                          fontSize: "13px",
                          minHeight: "40px",
                          padding: "0 16px",
                          border: "1.5px solid #F5DADA",
                        }}
                      >
                        <PiArrowLeft size={14} />
                        Back
                      </button>
                    )}
                  </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}

          {/* Results */}
          <AnimatePresence>
            {done && <ResultsScreen answers={answers} />}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer note */}
      {!done && (
        <footer className="relative z-10 pb-6 text-center px-4">
          <p className="text-[11.5px]" style={{ color: "#C4A0A0" }}>
            Your information is private and never sold. Reviewed by licensed doctors only.
          </p>
        </footer>
      )}
    </div>
  );
}
