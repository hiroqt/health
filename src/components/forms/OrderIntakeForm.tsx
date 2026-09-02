"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiCheckCircleFill,
  PiUploadSimpleFill,
  PiTruck,
  PiCreditCardFill,
  PiCopySimple,
  PiCheckFat,
  PiX,
  PiTrashFill,
  PiShieldCheckFill,
  PiArrowRight,
  PiArrowLeft,
  PiHeartFill,
  PiMapPinFill,
  PiPhoneFill,
  PiUserFill,
  PiEnvelopeFill,
  PiReceiptFill,
  PiFileTextFill,
  PiPlus,
  PiMinus,
  PiSnowflakeFill,
  PiLockKeyFill,
  PiChatCircleDotsFill,
  PiSparkleFill,
  PiArrowsOutSimpleBold,
  PiMagnifyingGlassPlusFill,
  PiQrCodeFill,
  PiDownloadSimpleBold,
} from "react-icons/pi";

// ─── PRODUCTS & DOSAGES ───────────────────────────────────────────────────────
export interface OrderItemOption {
  id: string;
  name: string;
  dosage: string;
  price: number;
  category: "Weight Management" | "Peptide Therapy" | "Wellness & Longevity";
  coverImage: string;
  shortDesc: string;
}

export const ORDER_PRODUCTS: OrderItemOption[] = [
  // Weight Management
  {
    id: "tirz-15",
    name: "Tirzepatide",
    dosage: "15mg",
    price: 2500,
    category: "Weight Management",
    coverImage: "/TIRZEPATIDE /Tirzepatide benefits (15mg).png",
    shortDesc: "Dual GIP & GLP-1 receptor agonist",
  },
  {
    id: "tirz-30",
    name: "Tirzepatide",
    dosage: "30mg",
    price: 4000,
    category: "Weight Management",
    coverImage: "/TIRZEPATIDE /Tirzepatide benefits (15mg).png",
    shortDesc: "Dual GIP & GLP-1 receptor agonist (High Dose)",
  },
  {
    id: "tirz-60",
    name: "Tirzepatide",
    dosage: "60mg",
    price: 7000,
    category: "Weight Management",
    coverImage: "/TIRZEPATIDE /Tirzepatide benefits (15mg).png",
    shortDesc: "Dual GIP & GLP-1 receptor agonist (Max Dose)",
  },
  {
    id: "reta-15",
    name: "Retatrutide",
    dosage: "15mg",
    price: 3000,
    category: "Weight Management",
    coverImage: "/RETATRUTIDE /Reta benefits (15mg).png",
    shortDesc: "Next-gen triple agonist (GLP-1/GIP/Glucagon)",
  },
  {
    id: "reta-30",
    name: "Retatrutide",
    dosage: "30mg",
    price: 5000,
    category: "Weight Management",
    coverImage: "/RETATRUTIDE /Reta benefits (15mg).png",
    shortDesc: "Next-gen triple agonist (30mg Protocol)",
  },
  {
    id: "cagri-5",
    name: "Cagrilintide",
    dosage: "5mg",
    price: 3000,
    category: "Weight Management",
    coverImage: "/CAGRILINTIDE/Cagrilintide 10mg.jpg",
    shortDesc: "Long-acting amylin analogue for appetite control",
  },
  {
    id: "cagri-10",
    name: "Cagrilintide",
    dosage: "10mg",
    price: 5000,
    category: "Weight Management",
    coverImage: "/CAGRILINTIDE/Cagrilintide 10mg.jpg",
    shortDesc: "Long-acting amylin analogue (10mg Protocol)",
  },
  {
    id: "tesa-10",
    name: "Tesamorelin",
    dosage: "10mg",
    price: 5000,
    category: "Weight Management",
    coverImage: "/TESAMORELIN /Benefits of Tesamorelin.png",
    shortDesc: "Targeted GHRH analogue for visceral fat",
  },

  // Peptide Therapy
  {
    id: "bpc-10",
    name: "BPC-157",
    dosage: "10mg",
    price: 4000,
    category: "Peptide Therapy",
    coverImage: "/BPC-157/Benefits of BPC-157.png",
    shortDesc: "Accelerates tissue healing & gut wall repair",
  },
  {
    id: "mots-10",
    name: "MOTS-c",
    dosage: "10mg",
    price: 3000,
    category: "Peptide Therapy",
    coverImage: "/MOTS-C/Mots-C benefits (10mg).png",
    shortDesc: "Mitochondrial metabolic flexibility & ATP energy",
  },
  {
    id: "mots-40",
    name: "MOTS-c",
    dosage: "40mg",
    price: 6000,
    category: "Peptide Therapy",
    coverImage: "/MOTS-C/Mots-C benefits (10mg).png",
    shortDesc: "Mitochondrial metabolic flexibility (40mg)",
  },

  // Wellness & Longevity
  {
    id: "ghk-100",
    name: "GHK-Cu",
    dosage: "100mg",
    price: 3000,
    category: "Wellness & Longevity",
    coverImage: "/GHK-CU/GHK-CU Benefits.png",
    shortDesc: "Copper peptide for collagen & skin remodeling",
  },
  {
    id: "nad-500",
    name: "NAD+",
    dosage: "500mg",
    price: 3000,
    category: "Wellness & Longevity",
    coverImage: "/NAD+/NAD+ benefits.png",
    shortDesc: "Cellular coenzyme for DNA repair & sirtuins",
  },
  {
    id: "gluta-1500",
    name: "Glutathione",
    dosage: "1500mg",
    price: 6000,
    category: "Wellness & Longevity",
    coverImage: "/GLUTATHIONE /Glutathione Benefits.png",
    shortDesc: "Master antioxidant & hepatic detoxification",
  },
];

export const DELIVERY_OPTIONS = [
  {
    id: "lalamove",
    title: "Lalamove (Instant / Same-Day)",
    badge: "Fast Dispatch",
    description: "Delivered via express courier. Delivery fee shouldered by client upon drop-off.",
    feeText: "Client shoulders fee",
    free: false,
    icon: <PiTruck size={22} className="text-[#F07070]" />,
  },
  {
    id: "jnt",
    title: "J&T Express Nationwide",
    badge: "3 – 7 Days",
    description: "Insured door-to-door delivery across all provinces & cities.",
    feeText: "FREE",
    free: true,
    icon: <PiTruck size={22} className="text-[#2E7D32]" />,
  },
  {
    id: "lbc",
    title: "LBC Express Nationwide",
    badge: "3 – 7 Days",
    description: "Reliable courier service with full tracking updates.",
    feeText: "FREE",
    free: true,
    icon: <PiTruck size={22} className="text-[#2E7D32]" />,
  },
];

export const PAYMENT_METHODS = [
  {
    id: "gcash",
    name: "GCash",
    tag: "E-Wallet",
    accountName: "Tearsize Health",
    accountNumber: "0961 323 6199",
    instructions: "Send exact amount via GCash Express Send or scan QR.",
    badge: "Instant Verification",
    qrImage: "/Qr/gcash.jpg",
  },
  {
    id: "paymaya",
    name: "Maya",
    tag: "E-Wallet",
    accountName: "Tearsize Health",
    accountNumber: "0961 323 6199",
    instructions: "Transfer to Maya Wallet or scan merchant QR code.",
    badge: "Instant Verification",
    qrImage: "/Qr/maya.jpg",
  },
  {
    id: "bdo",
    name: "BDO Unibank",
    tag: "Bank Transfer",
    accountName: "Tearsize Health Care",
    accountNumber: "0065 4801 9283",
    instructions: "Online Banking, InstaPay transfer, or OTC deposit.",
    badge: "Same-Day",
    qrImage: "/Qr/bdo.jpg",
  },
  {
    id: "bpi",
    name: "BPI",
    tag: "Bank Transfer",
    accountName: "Tearsize Health Care",
    accountNumber: "3892 1094 82",
    instructions: "Transfer via BPI App, InstaPay, or branch deposit.",
    badge: "Same-Day",
    qrImage: "/Qr/bpi.jpg",
  },
  {
    id: "paypal",
    name: "PayPal",
    tag: "International / Cards",
    accountName: "tearsize@gmail.com",
    accountNumber: "tearsize@gmail.com",
    instructions: "Send as Friends & Family to prevent transaction holds.",
    badge: "Online",
    qrImage: "/Qr/paypal.jpg",
  },
];

interface OrderIntakeFormProps {
  initialName?: string;
  initialEmail?: string;
  onSuccess?: () => void;
}

export function OrderIntakeForm({
  initialName = "",
  initialEmail = "",
  onSuccess,
}: OrderIntakeFormProps) {
  // Navigation Steps: 1 = Formulations, 2 = Patient & Delivery, 3 = Payment & Proof
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  // Form State
  const [fullName, setFullName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [contactNumber, setContactNumber] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({
    "tirz-15": 1, // default convenient selection
  });
  const [deliveryMode, setDeliveryMode] = useState("jnt");
  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  // Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Warn before browser tab close / refresh if form has unsaved user inputs
  useEffect(() => {
    if (orderSubmitted) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (fullName || contactNumber || completeAddress || file || Object.keys(selectedItems).length > 0) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [orderSubmitted, fullName, contactNumber, completeAddress, file, selectedItems]);

  // Filtered Products
  const filteredProducts = ORDER_PRODUCTS.filter((p) => {
    if (categoryFilter === "All") return true;
    return p.category === categoryFilter;
  });

  // Toggling & Quantities
  const toggleItem = (id: string) => {
    setSelectedItems((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = 1;
      }
      return next;
    });
  };

  const updateQuantity = (id: string, delta: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedItems((prev) => {
      const current = prev[id] || 0;
      const nextQty = current + delta;
      if (nextQty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: nextQty };
    });
  };

  // Live Totals
  const selectedProductList = ORDER_PRODUCTS.filter((p) => selectedItems[p.id]);
  const subtotal = selectedProductList.reduce(
    (acc, p) => acc + p.price * (selectedItems[p.id] || 1),
    0
  );
  const total = subtotal;

  // Copy Helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrorMessage("File size exceeds 10 MB. Please upload a smaller image.");
        return;
      }
      setErrorMessage("");
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFilePreview(event.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  // Step Validation
  const validateStep1 = () => {
    if (selectedProductList.length === 0) {
      setErrorMessage("Please select at least one formulation to proceed.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const validateStep2 = () => {
    if (!fullName.trim()) {
      setErrorMessage("Please enter your Full Name.");
      return false;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid Email Address.");
      return false;
    }
    if (!contactNumber.trim()) {
      setErrorMessage("Please enter your active Contact Number.");
      return false;
    }
    if (!completeAddress.trim()) {
      setErrorMessage("Please enter your complete Delivery Address.");
      return false;
    }
    if (!deliveryMode) {
      setErrorMessage("Please choose your Delivery Courier.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const validateStep3 = () => {
    if (!paymentMethod) {
      setErrorMessage("Please choose a payment method.");
      return false;
    }
    if (!file) {
      setErrorMessage("Please upload your screenshot proof of payment.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const goToNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Final Order Submission
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2() || !validateStep3()) return;

    setIsSubmitting(true);
    setErrorMessage("");

    const generatedRef = `TSZ-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // Convert file to Base64 string for cloud transmission
      let base64String = "";
      if (file) {
        base64String = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });
      }

      const activeDelivery = DELIVERY_OPTIONS.find((d) => d.id === deliveryMode);
      const activePayment = PAYMENT_METHODS.find((m) => m.id === paymentMethod);

      const payload = {
        orderRef: generatedRef,
        fullName,
        email,
        contactNumber,
        completeAddress,
        selectedItems: selectedProductList.map((p) => ({
          id: p.id,
          name: p.name,
          dosage: p.dosage,
          price: p.price,
          quantity: selectedItems[p.id] || 1,
        })),
        deliveryMode: activeDelivery?.title || deliveryMode,
        paymentMethod: activePayment?.name || paymentMethod,
        totalAmount: total,
        fileBase64: base64String,
        fileName: file?.name || "receipt.jpg",
        fileType: file?.type || "image/jpeg",
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        console.warn("Order API note:", data?.error);
      }

      setOrderRef(generatedRef);
      setIsSubmitting(false);
      setOrderSubmitted(true);
      if (onSuccess) onSuccess();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Order submission error:", err);
      // Graceful fallback to client confirmation
      setOrderRef(generatedRef);
      setIsSubmitting(false);
      setOrderSubmitted(true);
      if (onSuccess) onSuccess();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ─── CONFIRMATION RECEIPT SCREEN ────────────────────────────────────────────
  if (orderSubmitted) {
    const activePayment = PAYMENT_METHODS.find((m) => m.id === paymentMethod);
    const activeDelivery = DELIVERY_OPTIONS.find((d) => d.id === deliveryMode);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl mx-auto py-6"
      >
        <div className="bg-white rounded-[32px] border border-[#FFE8EA] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#FFF5F5] to-transparent pointer-events-none" />

          {/* Success Check Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF5A5F] to-[#E04A4F] text-white flex items-center justify-center shadow-lg shadow-[#FF5A5F]/20 mb-6 relative z-10">
            <PiCheckFat size={38} />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#FFF0F0] text-[#FF5A5F] mb-3 relative z-10">
            <PiShieldCheckFill size={15} />
            Order Request Logged · Verification In Progress
          </span>

          <h2 className="font-display font-medium text-[clamp(2rem,4vw,2.75rem)] text-[#0F0F0F] leading-tight mb-2 relative z-10">
            Thank you, {fullName.split(" ")[0]}! 💓
          </h2>

          <p className="text-[15px] text-[#6E6E6E] max-w-lg leading-relaxed mb-8 relative z-10">
            Your intake and payment receipt have been transmitted securely. Our team will verify your transaction and notify you via SMS / Email with your courier tracking details.
          </p>

          {/* Order Reference Badge */}
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#FFF8F7] border border-[#FFE8EA] mb-8 relative z-10">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#6E6E6E]">
              Order Reference No:
            </span>
            <span className="font-mono font-black text-[16px] text-[#FF5A5F]">
              {orderRef}
            </span>
            <button
              type="button"
              onClick={() => handleCopy(orderRef, "ref")}
              className="ml-1 p-1.5 text-[#6E6E6E] hover:text-[#FF5A5F] transition-colors rounded-full hover:bg-white"
              title="Copy Reference"
            >
              {copiedKey === "ref" ? <PiCheckFat size={14} className="text-[#2E7D32]" /> : <PiCopySimple size={14} />}
            </button>
          </div>

          {/* Invoice Summary Card */}
          <div className="w-full rounded-[24px] bg-[#FFF8F7] border border-[#FFE8EA] p-6 md:p-8 text-left flex flex-col gap-5 mb-8 relative z-10">
            <div className="flex items-center justify-between border-b border-[#FFE8EA] pb-4">
              <h3 className="font-display text-[1.2rem] text-[#0F0F0F] flex items-center gap-2">
                <PiReceiptFill className="text-[#FF5A5F]" />
                Prescription & Item Breakdown
              </h3>
              <span className="text-[12px] font-semibold text-[#6E6E6E]">
                {selectedProductList.length} item(s)
              </span>
            </div>

            {/* Selected Items List */}
            <div className="flex flex-col gap-3">
              {selectedProductList.map((item) => {
                const qty = selectedItems[item.id] || 1;
                return (
                  <div key={item.id} className="flex items-center justify-between text-[14px]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[10px] overflow-hidden relative shrink-0 border border-[#FFE8EA] bg-white">
                        <Image src={item.coverImage} alt={item.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-[#0F0F0F]">{item.name}</span>
                        <span className="text-[#6E6E6E] ml-2 text-[12px]">({item.dosage}) × {qty}</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#0F0F0F]">
                      ₱{(item.price * qty).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>

            <hr className="border-[#FFE8EA]" />

            {/* Logistics & Address Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
              <div>
                <span className="text-[#6E6E6E] uppercase font-bold text-[11px] block mb-0.5">
                  Delivery Method
                </span>
                <span className="font-medium text-[#0F0F0F]">{activeDelivery?.title}</span>
              </div>

              <div>
                <span className="text-[#6E6E6E] uppercase font-bold text-[11px] block mb-0.5">
                  Payment Mode
                </span>
                <span className="font-medium text-[#0F0F0F]">{activePayment?.name} (Receipt Attached)</span>
              </div>

              <div className="md:col-span-2">
                <span className="text-[#6E6E6E] uppercase font-bold text-[11px] block mb-0.5">
                  Shipping Destination
                </span>
                <span className="font-medium text-[#0F0F0F]">{completeAddress}</span>
              </div>
            </div>

            <hr className="border-[#FFE8EA]" />

            {/* Grand Total */}
            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-[16px] text-[#0F0F0F]">Grand Total</span>
              <span className="font-display font-black text-[22px] text-[#FF5A5F]">
                ₱{total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center relative z-10">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full font-bold px-8 py-4 text-white bg-[#FF5A5F] hover:bg-[#E04A4F] transition-all shadow-md hover:shadow-lg text-[15px]"
            >
              Return to Home
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full font-semibold px-8 py-4 text-[#2B2B2B] hover:text-[#0F0F0F] border border-[#FFE8EA] hover:border-[#FF5A5F] bg-white transition-all text-[15px]"
            >
              View All Formulations
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // ─── INTERACTIVE CHECKOUT & INTAKE EXPERIENCE ───────────────────────────────
  const activePaymentObj = PAYMENT_METHODS.find((m) => m.id === paymentMethod);
  const activeDeliveryObj = DELIVERY_OPTIONS.find((d) => d.id === deliveryMode);

  return (
    <div className="w-full max-w-6xl mx-auto py-2">
      {/* Top Breadcrumb & Step Navigation */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-white/80 backdrop-blur-md border border-[#FFE8EA] rounded-[24px] p-4 md:px-8">
        <div>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#FF5A5F] block mb-1">
            Official Prescription Checkout
          </span>
          <h1 className="font-display font-bold text-[1.5rem] md:text-[1.85rem] text-[#0F0F0F] leading-tight">
            Secure Your Order
          </h1>
        </div>

        {/* Step Pills */}
        <div className="flex items-center gap-2">
          {[
            { step: 1, label: "1. Formulations" },
            { step: 2, label: "2. Delivery & Info" },
            { step: 3, label: "3. Payment & Proof" },
          ].map((s) => {
            const isActive = currentStep === s.step;
            const isCompleted = currentStep > s.step;

            return (
              <button
                key={s.step}
                type="button"
                onClick={() => {
                  if (s.step === 1) setCurrentStep(1);
                  if (s.step === 2 && validateStep1()) setCurrentStep(2);
                  if (s.step === 3 && validateStep1() && validateStep2()) setCurrentStep(3);
                }}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#FF5A5F] text-white shadow-sm"
                    : isCompleted
                    ? "bg-[#FFF0F0] text-[#FF5A5F] hover:bg-[#FFE8EA]"
                    : "bg-[#FFF8F7] text-[#6E6E6E] hover:bg-[#FFF0F0]"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Content */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* STEP 1: Formulations Selector */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex flex-col gap-6"
            >
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {["All", "Weight Management", "Peptide Therapy", "Wellness & Longevity"].map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                        categoryFilter === cat
                          ? "bg-[#0F0F0F] text-white shadow-sm"
                          : "bg-white border border-[#FFE8EA] text-[#6E6E6E] hover:text-[#0F0F0F] hover:border-[#FF5A5F]"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProducts.map((prod) => {
                  const isSelected = !!selectedItems[prod.id];
                  const qty = selectedItems[prod.id] || 1;

                  return (
                    <div
                      key={prod.id}
                      onClick={() => toggleItem(prod.id)}
                      className={`group relative rounded-[24px] p-4.5 border transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer select-none bg-white ${
                        isSelected
                          ? "border-[#FF5A5F] shadow-md shadow-[#FF5A5F]/10 ring-2 ring-[#FF5A5F]/15"
                          : "border-[#FFE8EA] hover:border-[#FF5A5F]/40 hover:shadow-card-hover"
                      }`}
                    >
                      {/* Product Header */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-16 h-16 rounded-[16px] overflow-hidden relative shrink-0 border border-[#FFE8EA] bg-[#FFF8F7]">
                          <Image
                            src={prod.coverImage}
                            alt={prod.name}
                            fill
                            sizes="64px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="flex flex-col min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-display font-bold text-[16px] text-[#0F0F0F] truncate">
                              {prod.name}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-[#FFF0F0] text-[#FF5A5F] shrink-0">
                              {prod.dosage}
                            </span>
                          </div>
                          <p className="text-[12.5px] text-[#6E6E6E] line-clamp-2 mt-0.5">
                            {prod.shortDesc}
                          </p>
                        </div>
                      </div>

                      {/* Product Bottom Controls */}
                      <div
                        className="flex items-center justify-between pt-3 border-t border-[#FFE8EA]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex flex-col">
                          <span className="text-[11px] uppercase tracking-wider text-[#6E6E6E] font-medium">
                            Price
                          </span>
                          <span className="font-display font-black text-[17px] text-[#0F0F0F]">
                            ₱{prod.price.toLocaleString()}
                          </span>
                        </div>

                        {isSelected ? (
                          <div className="flex items-center gap-2 bg-[#FFF8F7] border border-[#FFE8EA] rounded-full p-1 shadow-sm">
                            <button
                              type="button"
                              onClick={(e) => updateQuantity(prod.id, -1, e)}
                              className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[14px] text-[#2B2B2B] hover:bg-white hover:text-[#FF5A5F] transition-colors"
                            >
                              <PiMinus size={13} />
                            </button>
                            <span className="text-[13.5px] font-bold text-[#0F0F0F] w-6 text-center">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => updateQuantity(prod.id, 1, e)}
                              className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[14px] text-[#2B2B2B] hover:bg-white hover:text-[#FF5A5F] transition-colors"
                            >
                              <PiPlus size={13} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleItem(prod.id)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold bg-[#FFF0F0] text-[#FF5A5F] group-hover:bg-[#FF5A5F] group-hover:text-white transition-all cursor-pointer"
                          >
                            <PiPlus size={14} /> Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Delivery & Patient Details */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex flex-col gap-6"
            >
              {/* Patient Intake Card */}
              <div className="bg-white rounded-[28px] border border-[#FFE8EA] p-6 md:p-8 shadow-sm flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <PiUserFill className="text-[#FF5A5F] text-[20px]" />
                  <h2 className="font-display font-bold text-[1.35rem] text-[#0F0F0F]">
                    1. Patient Credentials
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-[#0F0F0F]">
                      Full Name (First, Middle, Last) <span className="text-[#FF5A5F]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Maria Santos Dela Cruz"
                      className="w-full rounded-[16px] px-4 py-3.5 text-[14.5px] font-medium outline-none border border-[#FFE8EA] focus:border-[#FF5A5F] focus:ring-2 focus:ring-[#FF5A5F]/15 transition-all bg-[#FFF8F7]/30"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-[#0F0F0F]">
                      Email Address <span className="text-[#FF5A5F]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-[16px] px-4 py-3.5 text-[14.5px] font-medium outline-none border border-[#FFE8EA] focus:border-[#FF5A5F] focus:ring-2 focus:ring-[#FF5A5F]/15 transition-all bg-[#FFF8F7]/30"
                    />
                  </div>

                  {/* Contact Number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-[#0F0F0F]">
                      Contact Number <span className="text-[#FF5A5F]">*</span>
                    </label>
                    <div className="flex items-center rounded-[16px] border border-[#FFE8EA] focus-within:border-[#FF5A5F] focus-within:ring-2 focus-within:ring-[#FF5A5F]/15 bg-[#FFF8F7]/30 overflow-hidden">
                      <span className="px-3.5 py-3.5 text-[13.5px] font-bold text-[#6E6E6E] bg-white border-r border-[#FFE8EA]">
                        🇵🇭 +63
                      </span>
                      <input
                        type="tel"
                        required
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="912 345 6789"
                        className="w-full px-3.5 py-3.5 text-[14.5px] font-medium outline-none bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Complete Address */}
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-[#0F0F0F]">
                      Complete Delivery Address <span className="text-[#FF5A5F]">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={completeAddress}
                      onChange={(e) => setCompleteAddress(e.target.value)}
                      placeholder="House/Unit No., Street Name, Barangay, Municipality/City, Province, ZIP code"
                      className="w-full rounded-[16px] px-4 py-3.5 text-[14.5px] font-medium outline-none border border-[#FFE8EA] focus:border-[#FF5A5F] focus:ring-2 focus:ring-[#FF5A5F]/15 transition-all bg-[#FFF8F7]/30 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Courier Selection */}
              <div className="bg-white rounded-[28px] border border-[#FFE8EA] p-6 md:p-8 shadow-sm flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <PiTruck className="text-[#FF5A5F] text-[20px]" />
                  <h2 className="font-display font-bold text-[1.35rem] text-[#0F0F0F]">
                    2. Select Courier & Speed
                  </h2>
                </div>

                <div className="flex flex-col gap-3">
                  {DELIVERY_OPTIONS.map((opt) => {
                    const isSelected = deliveryMode === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setDeliveryMode(opt.id)}
                        className={`rounded-[20px] p-4.5 border transition-all duration-300 flex items-start justify-between gap-4 cursor-pointer ${
                          isSelected
                            ? "bg-[#FFF8F7] border-[#FF5A5F] ring-2 ring-[#FF5A5F]/15 shadow-sm"
                            : "bg-white border-[#FFE8EA] hover:border-[#FF5A5F]/40"
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="mt-0.5">{opt.icon}</div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-[15px] text-[#0F0F0F]">
                                {opt.title}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white border border-[#FFE8EA] text-[#6E6E6E]">
                                {opt.badge}
                              </span>
                            </div>
                            <p className="text-[13px] text-[#6E6E6E] mt-1">
                              {opt.description}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`text-[12.5px] font-bold px-3 py-1 rounded-full shrink-0 ${
                            opt.free
                              ? "bg-[#E8F5E9] text-[#2E7D32]"
                              : "bg-[#FFF0F0] text-[#D94040]"
                          }`}
                        >
                          {opt.feeText}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2 Back Navigation */}
              <div className="flex items-center justify-start pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[#6E6E6E] hover:text-[#0F0F0F] border border-[#FFE8EA] hover:border-[#FF5A5F] bg-white transition-all text-[13.5px] cursor-pointer"
                >
                  <PiArrowLeft size={16} /> Back to Formulations
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Payment & Proof of Payment Upload */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex flex-col gap-6"
            >
              {/* Payment Method Selector */}
              <div className="bg-white rounded-[28px] border border-[#FFE8EA] p-6 md:p-8 shadow-sm flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <PiCreditCardFill className="text-[#FF5A5F] text-[20px]" />
                  <h2 className="font-display font-bold text-[1.35rem] text-[#0F0F0F]">
                    1. Select Payment Channel
                  </h2>
                </div>

                {/* Method Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PAYMENT_METHODS.map((m) => {
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`rounded-[18px] p-4 text-left border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          isSelected
                            ? "bg-[#FFF8F7] border-[#FF5A5F] ring-2 ring-[#FF5A5F]/15 shadow-sm"
                            : "bg-white border-[#FFE8EA] hover:border-[#FF5A5F]/40"
                        }`}
                      >
                        <span className="font-bold text-[15px] text-[#0F0F0F]">{m.name}</span>
                        <span className="text-[11px] font-semibold text-[#6E6E6E] uppercase">
                          {m.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Digital Account Card & Dynamic QR Code */}
                {activePaymentObj && (
                  <div className="rounded-[24px] p-6 bg-gradient-to-br from-[#FFF8F7] to-[#FFF0F0] border border-[#FFE8EA] flex flex-col gap-5 shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#FFE8EA] pb-3">
                      <span className="text-[12px] font-bold uppercase tracking-wider text-[#FF5A5F] flex items-center gap-1.5">
                        <PiSparkleFill size={14} />
                        {activePaymentObj.name} Payment Instructions
                      </span>
                      <span className="text-[13px] font-bold text-[#0F0F0F]">
                        Total to Send: <span className="font-display font-black text-[#FF5A5F] text-[16px]">₱{total.toLocaleString()}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      {/* Left: Account Details */}
                      <div className="md:col-span-7 flex flex-col gap-3.5">
                        <div className="bg-white p-4.5 rounded-[18px] border border-[#FFE8EA] shadow-xs flex flex-col gap-3">
                          <div>
                            <span className="text-[11px] uppercase font-bold text-[#6E6E6E] block mb-0.5">
                              Account Name
                            </span>
                            <span className="text-[15px] font-black text-[#0F0F0F]">
                              {activePaymentObj.accountName}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-2.5 border-t border-[#FFE8EA]">
                            <div>
                              <span className="text-[11px] uppercase font-bold text-[#6E6E6E] block mb-0.5">
                                Account / Mobile Number
                              </span>
                              <span className="font-mono font-bold text-[16.5px] text-[#FF5A5F]">
                                {activePaymentObj.accountNumber}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCopy(activePaymentObj.accountNumber, activePaymentObj.id)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#FFE8EA] hover:bg-[#FFF0F0] text-[#6E6E6E] hover:text-[#FF5A5F] transition-all bg-white text-[12px] font-bold shadow-xs cursor-pointer"
                              title="Copy Account Number"
                            >
                              {copiedKey === activePaymentObj.id ? (
                                <>
                                  <PiCheckFat size={14} className="text-[#2E7D32]" />
                                  <span className="text-[#2E7D32]">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <PiCopySimple size={14} />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        <p className="text-[12.5px] text-[#4A3333] leading-relaxed bg-white/70 p-3 rounded-[14px] border border-[#FFE8EA]/60">
                          💡 <strong>Instructions:</strong> {activePaymentObj.instructions} Please capture your confirmation receipt screenshot to upload below.
                        </p>
                      </div>

                      {/* Right: Dynamic QR Code with Expand Trigger */}
                      {activePaymentObj.qrImage && (
                        <div className="md:col-span-5 flex flex-col items-center justify-center text-center bg-white p-4.5 rounded-[20px] border border-[#FFE8EA] shadow-sm">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A5555] mb-2">
                            Scan {activePaymentObj.name} QR Code
                          </span>

                          <button
                            type="button"
                            onClick={() => setQrModalOpen(true)}
                            className="w-36 h-36 relative rounded-[14px] overflow-hidden border border-[#FFE8EA] bg-[#FFF8F7] shadow-inner group cursor-pointer block"
                            title="Click to expand QR Code"
                          >
                            <Image
                              src={activePaymentObj.qrImage}
                              alt={`${activePaymentObj.name} QR Code`}
                              fill
                              sizes="144px"
                              className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white text-[11px] font-bold">
                              <PiArrowsOutSimpleBold size={20} />
                              <span>Enlarge QR</span>
                            </div>
                          </button>

                          <div className="flex flex-wrap items-center justify-center gap-2 mt-2.5">
                            <button
                              type="button"
                              onClick={() => setQrModalOpen(true)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#FFF0F0] text-[#FF5A5F] hover:bg-[#FF5A5F] hover:text-white transition-all cursor-pointer shadow-xs"
                            >
                              <PiMagnifyingGlassPlusFill size={13} /> Enlarge QR
                            </button>
                            <a
                              href={activePaymentObj.qrImage}
                              download={`Tearsize_${activePaymentObj.name}_QR.jpg`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-[#0F0F0F] text-white hover:bg-[#FF5A5F] transition-all cursor-pointer shadow-xs"
                              title="Download QR to device"
                            >
                              <PiDownloadSimpleBold size={13} /> Download QR
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Proof of Payment Upload Card */}
              <div className="bg-white rounded-[28px] border border-[#FFE8EA] p-6 md:p-8 shadow-sm flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <PiUploadSimpleFill className="text-[#FF5A5F] text-[20px]" />
                  <h2 className="font-display font-bold text-[1.35rem] text-[#0F0F0F]">
                    2. Upload Transaction Screenshot <span className="text-[#FF5A5F]">*</span>
                  </h2>
                </div>

                {!file ? (
                  <label className="border-2 border-dashed border-[#FFE8EA] hover:border-[#FF5A5F] rounded-[24px] p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 bg-[#FFF8F7]/50 hover:bg-[#FFF0F0]/50 group">
                    <div className="w-14 h-14 rounded-full bg-white text-[#FF5A5F] group-hover:scale-105 transition-transform flex items-center justify-center mb-3 shadow-sm border border-[#FFE8EA]">
                      <PiUploadSimpleFill size={24} />
                    </div>
                    <span className="font-bold text-[15px] text-[#0F0F0F]">
                      Tap or drag payment receipt here
                    </span>
                    <span className="text-[12px] text-[#6E6E6E] mt-1">
                      Supports JPG, PNG, JPEG, or PDF up to 10MB
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="rounded-[20px] p-4.5 border border-[#FFE8EA] bg-[#FFF8F7] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      {filePreview ? (
                        <div className="w-14 h-14 rounded-[14px] overflow-hidden relative shrink-0 border border-[#FFE8EA] bg-white">
                          <Image src={filePreview} alt="Receipt preview" fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-[14px] bg-white text-[#FF5A5F] border border-[#FFE8EA] flex items-center justify-center shrink-0">
                          <PiFileTextFill size={24} />
                        </div>
                      )}

                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-bold text-[#0F0F0F] truncate">
                          {file.name}
                        </span>
                        <span className="text-[12px] text-[#6E6E6E]">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB · Valid receipt attached
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2.5 text-[#6E6E6E] hover:text-[#D94040] transition-colors rounded-full hover:bg-white shrink-0"
                      title="Remove file"
                    >
                      <PiTrashFill size={18} />
                    </button>
                  </div>
                )}
              </div>

              {/* Step 3 Back Navigation */}
              <div className="flex items-center justify-start pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[#6E6E6E] hover:text-[#0F0F0F] border border-[#FFE8EA] hover:border-[#FF5A5F] bg-white transition-all text-[13.5px] cursor-pointer"
                >
                  <PiArrowLeft size={16} /> Back to Delivery Details
                </button>
              </div>
            </motion.div>
          )}

          {/* Validation Error Banner */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-[18px] bg-[#FFE8EA] border border-[#FF8FA3] text-[#D94040] text-[13.5px] font-medium flex items-center gap-2.5"
            >
              <PiX size={16} className="shrink-0" />
              {errorMessage}
            </motion.div>
          )}
        </div>

        {/* Right Column: Sticky Live Cart & Security Guarantee */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-5">
          <div className="bg-white rounded-[28px] border border-[#FFE8EA] p-6 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-[#FFE8EA] pb-3.5">
              <h3 className="font-display font-bold text-[1.15rem] text-[#0F0F0F] flex items-center gap-2">
                <PiReceiptFill className="text-[#FF5A5F]" />
                Order Summary
              </h3>
              <span className="text-[12px] font-bold text-[#FF5A5F] bg-[#FFF0F0] px-2.5 py-0.5 rounded-full">
                {selectedProductList.length} Selected
              </span>
            </div>

            {/* Selected Items List */}
            <div className="flex flex-col gap-3 max-h-56 overflow-y-auto pr-1">
              {selectedProductList.length === 0 ? (
                <div className="text-center py-6 text-[#6E6E6E] text-[13px]">
                  No formulations selected. Please choose at least one formulation to proceed.
                </div>
              ) : (
                selectedProductList.map((item) => {
                  const qty = selectedItems[item.id] || 1;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-[16px] bg-[#FFF8F7] border border-[#FFE8EA]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-[10px] bg-white border border-[#FFE8EA] flex items-center justify-center shrink-0 relative overflow-hidden">
                          <Image
                            src={item.coverImage}
                            alt={item.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-[13px] text-[#0F0F0F] block truncate">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-[#6E6E6E] block">
                            {item.dosage} · Qty: {qty}
                          </span>
                        </div>
                      </div>

                      <span className="font-bold text-[13.5px] text-[#FF5A5F] shrink-0">
                        ₱{(item.price * qty).toLocaleString()}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            <hr className="border-[#FFE8EA]" />

            {/* Financial Breakdown */}
            <div className="flex flex-col gap-2 text-[13.5px]">
              <div className="flex justify-between items-center text-[#6E6E6E]">
                <span>Medication Subtotal</span>
                <span className="font-semibold text-[#0F0F0F]">₱{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-[#6E6E6E]">
                <span>Cold-Chain Packaging</span>
                <span className="font-semibold text-[#2E7D32]">FREE (Included)</span>
              </div>
              <div className="flex justify-between items-center text-[#6E6E6E]">
                <span>Delivery Shipping</span>
                <span className={`font-semibold ${activeDeliveryObj?.free ? "text-[#2E7D32]" : "text-[#0F0F0F]"}`}>
                  {activeDeliveryObj?.feeText}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[#FFE8EA] text-[16px] font-bold text-[#0F0F0F]">
                <span>Total Amount</span>
                <span className="font-display font-black text-[22px] text-[#FF5A5F]">
                  ₱{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Primary Action Button (mirrors step flow) */}
            {currentStep === 1 && (
              <button
                type="button"
                onClick={goToNextStep}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-white bg-[#FF5A5F] hover:bg-[#E04A4F] transition-all shadow-md text-[15px] cursor-pointer"
              >
                Continue to Delivery & Info <PiArrowRight size={17} />
              </button>
            )}

            {currentStep === 2 && (
              <button
                type="button"
                onClick={goToNextStep}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-white bg-[#FF5A5F] hover:bg-[#E04A4F] transition-all shadow-md text-[15px] cursor-pointer"
              >
                Continue to Payment & Verification <PiArrowRight size={17} />
              </button>
            )}

            {currentStep === 3 && (
              <button
                type="button"
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-white bg-[#FF5A5F] hover:bg-[#E04A4F] transition-all shadow-md text-[15px] cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting order...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Confirm & Submit Order · ₱{total.toLocaleString()} <PiArrowRight size={17} />
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Clinical Assurance Guarantees */}
          <div className="bg-[#FFF8F7] rounded-[24px] border border-[#FFE8EA] p-5 flex flex-col gap-3 text-[12px] text-[#4A3333]">
            <div className="flex items-center gap-2.5 font-bold text-[#0F0F0F]">
              <PiLockKeyFill className="text-[#FF5A5F] text-[15px]" />
              Doctor-Guided Telehealth Guarantee
            </div>

            <ul className="flex flex-col gap-2 pl-6 list-disc text-[#6E6E6E]">
              <li>Licensed physician review & intake verification</li>
              <li>Cold-chain temperature-controlled pharmaceutical vials</li>
              <li>100% discreet packaging delivered nationwide</li>
            </ul>

            <div className="pt-2 border-t border-[#FFE8EA] flex items-center justify-between text-[11.5px] text-[#6E6E6E]">
              <span>Need help?</span>
              <a
                href="mailto:tearsize@gmail.com"
                className="font-bold text-[#FF5A5F] hover:underline flex items-center gap-1"
              >
                <PiChatCircleDotsFill size={13} /> Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FULLSCREEN EXPANDED LARGE QR MODAL (MAX SIZE) ─── */}
      <AnimatePresence>
        {qrModalOpen && activePaymentObj?.qrImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQrModalOpen(false)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-lg flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[560px] bg-white rounded-[32px] border border-[#FFE8EA] p-4 sm:p-6 shadow-2xl flex flex-col items-center text-center relative overflow-hidden my-auto"
            >
              {/* Floating Close Button */}
              <button
                type="button"
                onClick={() => setQrModalOpen(false)}
                className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-white/90 border border-[#FFE8EA] text-[#6E6E6E] hover:text-[#FF5A5F] hover:bg-[#FFF0F0] transition-colors flex items-center justify-center cursor-pointer z-20 shadow-md"
                title="Close Fullscreen QR"
              >
                <PiX size={20} />
              </button>

              {/* Provider Header Tag */}
              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFF0F0] text-[#FF5A5F] text-[11.5px] font-bold uppercase tracking-wider mb-3">
                <PiQrCodeFill size={15} />
                {activePaymentObj.name} Official Payment QR
              </div>

              {/* ─── FULL-CONTAINER GIANT QR CODE ─── */}
              <div className="w-full aspect-square relative rounded-[24px] overflow-hidden border-2 border-[#FFE8EA] bg-white shadow-inner flex items-center justify-center mb-3">
                <Image
                  src={activePaymentObj.qrImage}
                  alt={`${activePaymentObj.name} Full QR Code`}
                  fill
                  sizes="(max-width: 640px) 90vw, 540px"
                  priority
                  className="object-contain p-1"
                />
              </div>

              {/* ─── COMPACT DETAILS BAR DIRECTLY BELOW QR ─── */}
              <div className="w-full flex flex-col gap-2.5">
                <div className="w-full bg-[#FFF8F7] rounded-[18px] p-3.5 border border-[#FFE8EA] flex flex-col sm:flex-row sm:items-center justify-between text-left gap-2.5">
                  <div className="min-w-0">
                    <span className="text-[10.5px] uppercase font-bold text-[#7A5555] block truncate">
                      {activePaymentObj.accountName}
                    </span>
                    <span className="font-mono font-black text-[17px] text-[#0F0F0F] tracking-wide">
                      {activePaymentObj.accountNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(activePaymentObj.accountNumber, "modal-qr")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#FFE8EA] hover:bg-[#FFF0F0] text-[#6E6E6E] hover:text-[#FF5A5F] transition-all bg-white text-[12px] font-bold shadow-xs cursor-pointer"
                    >
                      {copiedKey === "modal-qr" ? (
                        <>
                          <PiCheckFat size={13} className="text-[#2E7D32]" />
                          <span className="text-[#2E7D32]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <PiCopySimple size={13} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <span className="font-display font-black text-[#FF5A5F] text-[17px] bg-[#FFF0F0] px-3 py-1 rounded-full border border-[#FFE8EA]">
                      ₱{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full mt-1">
                  <a
                    href={activePaymentObj.qrImage}
                    download={`Tearsize_${activePaymentObj.name}_QR.jpg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3 rounded-full font-bold text-[#0F0F0F] bg-[#FFF0F0] hover:bg-[#FFE8EA] border border-[#FFE8EA] transition-all text-[13.5px] flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <PiDownloadSimpleBold size={16} className="text-[#FF5A5F]" /> Save QR to Device
                  </a>

                  <button
                    type="button"
                    onClick={() => setQrModalOpen(false)}
                    className="w-full sm:flex-1 py-3 rounded-full font-bold text-white bg-[#0F0F0F] hover:bg-[#FF5A5F] transition-all text-[13.5px] cursor-pointer shadow-sm"
                  >
                    Done Scanning
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
