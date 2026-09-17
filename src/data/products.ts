export interface Benefit {
  title: string;
  description: string;
}

export interface DosingInfo {
  dosage: string;
  frequency: string;
  duration: string;
  route?: string;
}

export interface ProductVariant {
  id: string;
  dosage: string;
  price: number;
  duration: string;
  shortDesc?: string;
}

export type ProductCategory = "Weight Management" | "Peptide Therapy" | "Wellness & Longevity";

export interface OrderItemOption {
  id: string;
  name: string;
  dosage: string;
  price: number;
  category: ProductCategory;
  coverImage?: string;
  shortDesc: string;
  duration?: string;
}

export interface Product {
  slug: string;
  name: string;
  shortName?: string;
  category: ProductCategory;
  shortDescription: string;
  about: string;
  coverImage?: string;
  benefits: Benefit[];
  dosing: DosingInfo;
  tips: string[];
  inclusions?: string[];
  variants: ProductVariant[];
}

export const STANDARD_INCLUSIONS: string[] = [
  "Complete set of syringe",
  "BAC Water for dilution",
  "Alcohol pads",
  "Detailed instructions & guidelines",
  "Doctor-guided plan",
];

export const PRODUCTS: Product[] = [
  // ─── 1. Weight Management ──────────────────────────────────────────────────
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    shortName: "Tirz",
    category: "Weight Management",
    shortDescription: "Dual GIP and GLP-1 receptor agonist for substantial weight loss and metabolic control.",
    about: "Tirzepatide is a groundbreaking dual-action receptor agonist targeting both GIP and GLP-1 incretin pathways. By activating both receptors, it synergistically curbs appetite, delays gastric emptying, improves insulin secretion, and recalibrates metabolic health, delivering profound and sustained reductions in body weight.",
    coverImage: "/TIRZEPATIDE /Tirzepatide benefits (15mg).png",
    benefits: [
      { title: "Substantial Weight Loss", description: "Promotes profound and sustained reductions in body weight (up to 22%) and body fat." },
      { title: "Appetite & Satiety Control", description: "Dramatically reduces cravings, dampens food noise, and enhances post-meal fullness." },
      { title: "Glycemic Regulation", description: "Optimizes glucose control, insulin sensitivity, and lipid parameters." },
      { title: "Cardiometabolic Health", description: "Supports healthy blood pressure, visceral fat reduction, and cardiovascular markers." }
    ],
    dosing: {
      dosage: "15mg, 30mg, or 60mg vial (Starting dose: 2.5mg)",
      frequency: "Once a week (SubQ)",
      duration: "15mg: 5-6 weeks | 30mg: 2 months | 60mg: 3-4 months of use",
      route: "Subcutaneous (fatty areas of abdomen, arms, or thighs)",
    },
    tips: [
      "Administer on the same day each week via subcutaneous route; can be taken with or without food.",
      "Same active ingredient in Mounjaro with 99% purity and fewer side effects than Semaglutide.",
      "Prioritize high-protein intake and daily hydration to preserve lean muscle mass.",
      "Eat smaller, frequent portions to prevent mild early gastrointestinal adjustment symptoms."
    ],
    inclusions: STANDARD_INCLUSIONS,
    variants: [
      {
        id: "tirz-15",
        dosage: "15mg",
        price: 2500,
        duration: "5-6 weeks of use",
        shortDesc: "Dual GIP & GLP-1 receptor agonist",
      },
      {
        id: "tirz-30",
        dosage: "30mg",
        price: 4000,
        duration: "1-8 weeks (2 months) of use",
        shortDesc: "Dual GIP & GLP-1 receptor agonist",
      },
      {
        id: "tirz-60",
        dosage: "60mg",
        price: 7000,
        duration: "3-4 months of use",
        shortDesc: "Dual GIP & GLP-1 receptor agonist",
      },
    ],
  },
  {
    slug: "retatrutide",
    name: "Retatrutide",
    shortName: "Reta",
    category: "Weight Management",
    shortDescription: "Next-generation triple agonist (GLP-1, GIP, and Glucagon) for advanced weight management.",
    about: "Retatrutide represents the cutting edge in metabolic science as a triple hormone receptor agonist targeting GLP-1, GIP, and Glucagon receptors. In addition to potent appetite suppression and glycemic control, glucagon receptor activation stimulates basal energy expenditure and liver fat oxidation for exceptional weight management.",
    coverImage: "/RETATRUTIDE /Reta benefits (15mg).png",
    benefits: [
      { title: "Maximal Weight Reduction", description: "Delivers superior fat loss results through multi-receptor hormonal synergy." },
      { title: "Thermogenic Energy Expenditure", description: "Glucagon agonism elevates basal metabolic rate and hepatic fat clearance." },
      { title: "Appetite Suppression", description: "Strongly attenuates hunger signaling and eliminates persistent cravings." },
      { title: "Visceral Fat & Muscle Preservation", description: "Reduces stubborn visceral fat while preserving lean functional muscle." }
    ],
    dosing: {
      dosage: "15mg or 30mg vial (Starting dose: 2mg)",
      frequency: "Once a week (SubQ)",
      duration: "15mg: 5-6 weeks | 30mg: 3 months of use",
      route: "Subcutaneous (fatty areas of abdomen, arms, or thighs)",
    },
    tips: [
      "Administer on the same day each week via subcutaneous route; can be taken with or without food.",
      "Acts as a triple-agonist on three key metabolic receptors regulating appetite, metabolism, and energy balance.",
      "Prioritize high-protein intake and daily hydration to preserve lean muscle mass.",
      "Eat smaller, frequent portions to prevent mild early gastrointestinal adjustment symptoms."
    ],
    inclusions: STANDARD_INCLUSIONS,
    variants: [
      {
        id: "reta-15",
        dosage: "15mg",
        price: 3000,
        duration: "5-6 weeks of use",
        shortDesc: "Next-gen triple agonist (GLP-1/GIP/Glucagon)",
      },
      {
        id: "reta-30",
        dosage: "30mg",
        price: 5000,
        duration: "3 months of use",
        shortDesc: "Next-gen triple agonist (GLP-1/GIP/Glucagon)",
      },
    ],
  },
  {
    slug: "cagrilintide",
    name: "Cagrilintide",
    shortName: "Cagri",
    category: "Weight Management",
    shortDescription: "Long-acting amylin analogue for enhanced satiety, delayed gastric emptying, and appetite control.",
    about: "Cagrilintide is a novel, long-acting synthetic amylin analogue designed for metabolic support and chronic weight management. By acting on calcitonin and amylin receptors in the brain's appetite control centers, Cagrilintide promotes early satiety, prolongs fullness after meals, and works effectively on its own or synergistically in multi-target weight loss protocols.",
    coverImage: "/CAGRILINTIDE/Cagrilintide 10mg.jpg",
    benefits: [
      { title: "Potent Satiety Enhancement", description: "Acts on central amylin receptors to signal profound post-meal fullness." },
      { title: "Delayed Gastric Emptying", description: "Slows digestion to reduce postprandial glucose spikes and hunger." },
      { title: "Synergistic Weight Loss", description: "Offers exceptional complementary efficacy alongside GLP-1 therapies." },
      { title: "Food Noise Reduction", description: "Diminishes hedonic eating behaviors and cravings for calorie-dense foods." }
    ],
    dosing: {
      dosage: "5mg or 10mg vial (Starting dose: 0.3mg - 1mg)",
      frequency: "Once a week (SubQ)",
      duration: "5mg vial: 5 weeks | 10mg vial: 10 weeks of use",
      route: "Subcutaneous (fatty areas of abdomen, upper arm, or thighs)",
    },
    tips: [
      "Inject subcutaneously once weekly on the same day, with or without meals.",
      "Begin at the starting dose (0.3mg) and titrate in 4-week increments to minimize nausea.",
      "Next-generation dual agonist that pairs powerfully with GLP-1 therapies to amplify results.",
      "Pair with balanced nutrition and consistent hydration for peak digestive comfort."
    ],
    inclusions: STANDARD_INCLUSIONS,
    variants: [
      {
        id: "cagri-5",
        dosage: "5mg",
        price: 3000,
        duration: "5 weeks of use",
        shortDesc: "Long-acting amylin analogue for appetite control",
      },
      {
        id: "cagri-10",
        dosage: "10mg",
        price: 5000,
        duration: "10 weeks of use",
        shortDesc: "Long-acting amylin analogue for appetite control",
      },
    ],
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    shortName: "Tesa",
    category: "Weight Management",
    shortDescription: "Targeted Growth Hormone-Releasing Hormone (GHRH) analogue for visceral fat reduction.",
    about: "Tesamorelin is a synthetic Growth Hormone-Releasing Hormone (GHRH) analogue with a proven ability to specifically target and mobilize stubborn visceral adipose tissue (deep belly fat). By stimulating the pituitary gland to release endogenous growth hormone in a natural pulsatile pattern, Tesamorelin improves lean body composition, lipid profiles, and metabolic flexibility.",
    coverImage: "/TESAMORELIN /Benefits of Tesamorelin.png",
    benefits: [
      { title: "Visceral Fat Mobilization", description: "Clinically proven to specifically reduce deep abdominal and visceral fat." },
      { title: "Body Composition Support", description: "Preserves and supports lean muscle tissue during fat reduction." },
      { title: "Natural GH Release", description: "Stimulates the pituitary gland to release endogenous growth hormone pulses." },
      { title: "Lipid Profile & Metabolism", description: "Supports improvements in cholesterol, triglycerides, and metabolic markers." }
    ],
    dosing: {
      dosage: "10mg vial (Starting dose: 0.5mg - 1mg)",
      frequency: "Once daily (SubQ)",
      duration: "10mg vial is good for 1 month of use",
      route: "Subcutaneous (fatty areas of abdomen, arms, or thighs)",
    },
    tips: [
      "Self inject subcutaneously into fatty areas of abdomen, arms, or thighs once daily.",
      "Administer on an empty stomach at bedtime (at least 90-120 minutes after last meal).",
      "Avoid carbohydrates or sugars right before injection to preserve natural GH release.",
      "Cycle protocols (e.g. 5 days on, 2 days off) as recommended by your physician."
    ],
    inclusions: STANDARD_INCLUSIONS,
    variants: [
      {
        id: "tesa-10",
        dosage: "10mg",
        price: 5000,
        duration: "1 month of use",
        shortDesc: "Targeted GHRH analogue for visceral fat",
      },
    ],
  },

  // ─── 2. Peptide Therapy ────────────────────────────────────────────────────
  {
    slug: "bpc-157",
    name: "BPC-157",
    shortName: "BPC157",
    category: "Peptide Therapy",
    shortDescription: "Accelerates tissue repair, joint recovery, and gut lining healing.",
    about: "BPC-157 (Body Protection Compound-157) is a pentadecapeptide naturally derived from gastric juice that is widely known for its potent systemic healing and regenerative properties. It accelerates the repair of muscles, tendons, ligaments, and the gut lining. By promoting angiogenesis (formation of new blood vessels), it enhances blood flow to damaged tissues, significantly reducing recovery time.",
    coverImage: "/BPC-157/Benefits of BPC-157.png",
    benefits: [
      { title: "Accelerated Tissue Healing", description: "Speeds up the repair of tendons, muscles, ligaments, and joints after injury or strain." },
      { title: "Gut Lining Repair", description: "Protects and restores the gut mucosal barrier, alleviating digestive inflammation." },
      { title: "Joint & Cartilage Support", description: "Reduces inflammation, eases stiffness, and promotes joint recovery." },
      { title: "Post-Workout Recovery", description: "Aids fast recovery from physical exertion and strenuous training." }
    ],
    dosing: {
      dosage: "10mg vial (Starting dose: 1mg)",
      frequency: "5 Days On, 2 Days Off (SubQ)",
      duration: "10mg vial is good for 1 month of use",
      route: "Subcutaneous (fatty areas of abdomen, arms, or thighs)",
    },
    tips: [
      "Self inject via subcutaneous route into fatty areas of abdomen, arms, or thighs (5 days on, 2 days off).",
      "For localized injuries, can be administered near the affected area if instructed by your physician.",
      "Can be taken alongside other peptides like TB-500 for synergistic healing effects.",
      "Ensure proper hydration and a protein-rich diet to support cellular tissue repair."
    ],
    inclusions: STANDARD_INCLUSIONS,
    variants: [
      {
        id: "bpc-10",
        dosage: "10mg",
        price: 4000,
        duration: "1 month of use",
        shortDesc: "Accelerates tissue healing & gut wall repair",
      },
    ],
  },
  {
    slug: "mots-c",
    name: "MOTS-c",
    shortName: "Mots C",
    category: "Peptide Therapy",
    shortDescription: "Mitochondrial-derived peptide for energy production and metabolic flexibility.",
    about: "MOTS-c is a 16-amino acid mitochondrial-derived peptide (MDP) that directly regulates cellular metabolism and energy homeostasis. Often described as an exercise mimetic, MOTS-c activates the AMPK signaling pathway, stimulates glucose uptake in skeletal muscle, enhances fatty acid oxidation, and supports mitochondrial biogenesis and longevity.",
    coverImage: "/MOTS-C/Mots-C benefits (10mg).png",
    benefits: [
      { title: "Metabolic Boost & Fat Burn", description: "Enhances fat burning and improves cellular metabolic flexibility." },
      { title: "Exercise Mimetic & Endurance", description: "Provides cellular energy benefits, boosting athletic performance and muscle preservation." },
      { title: "Insulin Sensitivity", description: "Improves skeletal muscle glucose uptake and overall insulin response." },
      { title: "Mitochondrial ATP Energy", description: "Optimizes mitochondrial ATP production for sustained daily vitality and anti-aging support." }
    ],
    dosing: {
      dosage: "10mg or 40mg vial",
      frequency: "Twice a week (SubQ)",
      duration: "10mg vial: 10 weeks | 40mg vial: 2 months of use",
      route: "Subcutaneous (fatty areas of abdomen, arms, or thighs)",
    },
    tips: [
      "Self inject via subcutaneous route into fatty areas of abdomen, arms, or thighs twice a week.",
      "Administer prior to exercise or in the morning to maximize energy and fat oxidation.",
      "May cause slight transient flushing or warmth after injection.",
      "Cycle off for 2-4 weeks after a full protocol to maintain optimal receptor sensitivity."
    ],
    inclusions: STANDARD_INCLUSIONS,
    variants: [
      {
        id: "mots-10",
        dosage: "10mg",
        price: 3000,
        duration: "10 weeks of use",
        shortDesc: "Mitochondrial metabolic flexibility & ATP energy",
      },
      {
        id: "mots-40",
        dosage: "40mg",
        price: 6000,
        duration: "2 months of use",
        shortDesc: "Mitochondrial metabolic flexibility & ATP energy",
      },
    ],
  },
  {
    slug: "tb-500",
    name: "TB-500",
    shortName: "TBC500",
    category: "Peptide Therapy",
    shortDescription: "Synthetic Thymosin Beta-4 for cellular migration, muscle recovery, and flexibility.",
    about: "TB-500 is a synthetic fraction of the naturally occurring protein Thymosin Beta-4 (Tβ4). It plays a vital role in cellular structure and repair by upregulating actin, promoting cell migration, reducing fibrous scar tissue formation, and increasing flexibility and endurance in recovering tissues. It acts systemically throughout the entire body.",
    benefits: [
      { title: "Systemic Tissue Regeneration", description: "Upregulates actin to repair damaged muscle fibers and connective tissues." },
      { title: "Cell Migration & Repair", description: "Facilitates rapid migration of healing cells to injury sites." },
      { title: "Reduced Scarring & Adhesions", description: "Inhibits excessive fibrous scar tissue to maintain tissue flexibility." },
      { title: "Endurance & Recovery", description: "Promotes healthy microcirculation and shortens recovery times between workouts." }
    ],
    dosing: {
      dosage: "10mg vial (Starting dose: 1mg)",
      frequency: "1-3 times weekly (SubQ)",
      duration: "1 month of use (contingent upon patient needs)",
      route: "Subcutaneous",
    },
    tips: [
      "Can be injected subcutaneously anywhere due to its systemic distribution.",
      "Combines synergistically with BPC-157 for comprehensive tendon and ligament healing.",
      "Store reconstituted peptide refrigerated at 2°C – 8°C."
    ],
    inclusions: STANDARD_INCLUSIONS,
    variants: [
      {
        id: "tb-10",
        dosage: "10mg",
        price: 4000,
        duration: "1 month of use",
        shortDesc: "Tissue regeneration, cellular migration & healing",
      },
    ],
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    shortName: "Ipamorelin",
    category: "Peptide Therapy",
    shortDescription: "Selective growth hormone secretagogue for lean muscle, fat loss, and deep cellular recovery.",
    about: "Ipamorelin is one of the cleanest and most selective Growth Hormone Secretagogues (GHS) available. It mimics ghrelin to bind selectively to the secretagogue receptor on the pituitary gland, releasing growth hormone in a smooth, physiological pulse without stimulating hunger, cortisol, aldosterone, or prolactin. This leads to accelerated fat loss, lean muscle definition, deep sleep, and revitalized collagen production.",
    benefits: [
      { title: "Selective GH Pulsing", description: "Stimulates natural growth hormone production without raising cortisol or prolactin." },
      { title: "Lean Muscle & Fat Loss", description: "Enhances fat breakdown (lipolysis) while protecting lean muscle mass." },
      { title: "Deep Sleep & Cellular Recovery", description: "Improves REM and slow-wave deep sleep cycles for superior nightly repair." },
      { title: "Skin Elasticity & Collagen", description: "Supports healthy collagen renewal for firmer skin and stronger hair/nails." }
    ],
    dosing: {
      dosage: "10mg vial (Starting dose: 1mg)",
      frequency: "Once daily (SubQ, at bedtime)",
      duration: "1 month of use (contingent upon patient needs)",
      route: "Subcutaneous",
    },
    tips: [
      "Inject on an empty stomach at bedtime (or post-workout) without carbohydrates to avoid blunting GH release.",
      "Consistent nightly use provides the most dramatic improvements in sleep quality and body composition.",
      "Keep reconstituted vial refrigerated at all times."
    ],
    inclusions: STANDARD_INCLUSIONS,
    variants: [
      {
        id: "ipa-10",
        dosage: "10mg",
        price: 6000,
        duration: "1 month of use",
        shortDesc: "Selective growth hormone secretagogue",
      },
    ],
  },

  // ─── 3. Wellness & Longevity ──────────────────────────────────────────────
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    shortName: "GHK-Cu",
    category: "Wellness & Longevity",
    shortDescription: "Copper peptide for skin rejuvenation, collagen synthesis, and deep tissue remodeling.",
    about: "GHK-Cu (Glycyl-L-Histidyl-L-Lysine Copper) is a naturally occurring tripeptide complex with profound regenerative and anti-aging properties. It stimulates collagen and elastin synthesis, promotes tissue remodeling, accelerates wound healing, acts as a powerful antioxidant, and stimulates hair follicle growth while resetting cellular gene expression toward a youthful state.",
    coverImage: "/GHK-CU/GHK-CU Benefits.png",
    benefits: [
      { title: "Skin Rejuvenation & Firmness", description: "Boosts collagen and elastin production for firmer, younger-looking, and smoother skin." },
      { title: "Antioxidant Protection", description: "Protects skin cells against oxidative stress, environmental toxins, and photo-aging." },
      { title: "Dermal Remodeling", description: "Accelerates tissue repair and softens the appearance of scars and fine lines." },
      { title: "Hair Follicle Support", description: "Stimulates microcirculation to hair follicles, reducing shedding and encouraging thicker growth." }
    ],
    dosing: {
      dosage: "100mg vial (5 units / 0.5mg)",
      frequency: "5 Days On, 2 Days Off (SubQ)",
      duration: "100mg vial is good for 20 weeks of use",
      route: "Subcutaneous (fatty areas of abdomen, arms, or thighs)",
    },
    tips: [
      "Self inject via subcutaneous route into fatty areas of abdomen, arms, or thighs on a 5 days on, 2 days off schedule.",
      "Diluting with additional bacteriostatic water can help reduce temporary injection site tenderness.",
      "Monitor zinc intake, as prolonged copper peptide protocols can influence trace mineral balance.",
      "Store reconstituted peptide in the refrigerator at 2°C – 8°C."
    ],
    inclusions: STANDARD_INCLUSIONS,
    variants: [
      {
        id: "ghk-100",
        dosage: "100mg",
        price: 3000,
        duration: "20 weeks of use",
        shortDesc: "Copper peptide for collagen & skin remodeling",
      },
    ],
  },
  {
    slug: "nad-plus",
    name: "NAD+",
    shortName: "NAD+",
    category: "Wellness & Longevity",
    shortDescription: "Cellular energy coenzyme for sirtuin activation, DNA repair, and mental clarity.",
    about: "NAD+ (Nicotinamide Adenine Dinucleotide) is a vital coenzyme found in every cell of the body, essential for energy production, DNA repair, and cellular metabolism. As we age, NAD+ levels naturally decline, leading to fatigue and cognitive decline. Replenishing NAD+ restores cellular energy, sharpens mental clarity, and supports healthy aging.",
    coverImage: "/NAD+/NAD+ benefits.png",
    benefits: [
      { title: "Cellular Energy (ATP)", description: "Restores mitochondrial bioenergetics to boost physical stamina and reduce fatigue." },
      { title: "Mental Clarity & Focus", description: "Clears brain fog, supports burnout recovery, and sharpens executive memory and focus." },
      { title: "Sirtuin & Longevity", description: "Activates sirtuin longevity enzymes and supports genomic DNA repair." },
      { title: "Recovery Under Stress", description: "Provides cellular resilience and nervous system support during demanding periods." }
    ],
    dosing: {
      dosage: "500mg vial (10 units / 1mg)",
      frequency: "Twice a week (SubQ)",
      duration: "500mg vial is good for 25 weeks of use",
      route: "Subcutaneous (fatty areas of abdomen, arms, or thighs)",
    },
    tips: [
      "Self inject via subcutaneous route into fatty areas of abdomen, arms, or thighs twice a week.",
      "Best administered in the morning before breakfast as it increases energy levels and may disrupt sleep if taken late.",
      "Inject slowly over 20-30 seconds to minimize temporary localized warmth.",
      "Keep refrigerated at all times to maintain potency."
    ],
    inclusions: STANDARD_INCLUSIONS,
    variants: [
      {
        id: "nad-500",
        dosage: "500mg",
        price: 3000,
        duration: "25 weeks of use",
        shortDesc: "Cellular coenzyme for DNA repair & sirtuins",
      },
    ],
  },
  {
    slug: "kpv",
    name: "KPV",
    shortName: "KPV",
    category: "Wellness & Longevity",
    shortDescription: "Potent anti-inflammatory tripeptide for gut mucosal healing, clearer skin, and immune balance.",
    about: "KPV (Lysine-Proline-Valine) is a potent, naturally occurring tripeptide derived from alpha-Melanocyte-Stimulating Hormone (α-MSH). It possesses exceptional anti-inflammatory, antimicrobial, and immune-modulating properties. KPV directly calms overactive inflammatory cascades via NF-κB inhibition, making it unmatched for gut barrier restoration, IBD/IBS support, clearer skin, and systemic inflammation reduction.",
    coverImage: "/PRICELIST/KPV 15mg.png",
    benefits: [
      { title: "Targeted Gut Wall Repair", description: "Restores intestinal epithelial integrity, healing mucosal inflammation and improving digestion." },
      { title: "NF-κB Inhibition & Inflammation", description: "Directly suppresses core inflammatory cytokines for total-body inflammatory calming." },
      { title: "Skin Clearing & Dermatological Health", description: "Calms systemic histamine reactions, inflammatory eczema, and improves skin clarity." },
      { title: "Stronger Immune Response", description: "Promotes immune resilience and supports balanced host defenses." }
    ],
    dosing: {
      dosage: "15mg vial",
      frequency: "Once daily (SubQ)",
      duration: "15mg vial is good for 20 weeks of use",
      route: "Subcutaneous (fatty areas of abdomen or thighs)",
    },
    tips: [
      "Self inject via subcutaneous route into fatty areas of abdomen or thighs once daily.",
      "Derived from the C-terminal fragment of α-MSH with potent anti-inflammatory and gut mucosal healing properties.",
      "Synergizes powerfully with BPC-157 for a comprehensive gut-lining rejuvenation protocol.",
      "Well-tolerated with virtually no systemic side effects."
    ],
    inclusions: STANDARD_INCLUSIONS,
    variants: [
      {
        id: "kpv-15",
        dosage: "15mg",
        price: 4000,
        duration: "20 weeks of use",
        shortDesc: "Anti-inflammatory & gut mucosal healing",
      },
    ],
  },
  {
    slug: "glow70",
    name: "Glow70",
    shortName: "Glow70",
    category: "Wellness & Longevity",
    shortDescription: "Advanced aesthetic peptide formulation for radiant complexion, collagen synthesis, and skin elasticity.",
    about: "Glow70 is our premier skin-radiance and aesthetic longevity formulation. Combining synergistic concentrations of GHK-Cu, collagen-stimulating peptides, and cellular reparative factors, Glow70 is specifically engineered to improve dermal density, accelerate skin cell turnover, diminish fine lines, and give the complexion a hydrated, lit-from-within luminosity.",
    benefits: [
      { title: "Dermal Radiance & Luminosity", description: "Revitalizes microcirculation and skin cellular turnover for a vibrant natural glow." },
      { title: "Collagen & Elastin Synthesis", description: "Tightens skin architecture, improving suppleness and reducing fine lines." },
      { title: "Deep Cellular Hydration", description: "Improves skin moisture retention and intercellular lipid matrix strength." },
      { title: "Tone & Texture Refinement", description: "Assists in evening out skin tone and smoothing micro-texture." }
    ],
    dosing: {
      dosage: "70mg vial",
      frequency: "Once daily (SubQ)",
      duration: "Ongoing aesthetic protocol",
      route: "Subcutaneous",
    },
    tips: [
      "Pair with adequate daily water intake and SPF protection for best aesthetic outcomes.",
      "Best administered in the evening to allow overnight cellular regeneration.",
      "Keep vial refrigerated at 2°C – 8°C."
    ],
    inclusions: STANDARD_INCLUSIONS,
    variants: [
      {
        id: "glow-70",
        dosage: "70mg",
        price: 5000,
        duration: "Aesthetic protocol",
        shortDesc: "Aesthetic skin radiance & collagen synthesis",
      },
    ],
  },
  {
    slug: "klow80",
    name: "Klow80",
    shortName: "Klow80",
    category: "Wellness & Longevity",
    shortDescription: "Synergistic longevity formulation combining KPV, GHK-Cu, and gut-skin rejuvenation factors.",
    about: "Klow80 is a cutting-edge integrative formulation designed to optimize the gut-skin longevity axis. By combining the anti-inflammatory power of KPV with the regenerative and collagen-rebuilding strength of GHK-Cu and vital longevity cofactors, Klow80 addresses both internal inflammation and external radiance, restoring vitality from the inside out.",
    benefits: [
      { title: "Gut-Skin Axis Optimization", description: "Addresses internal gut permeability and external skin radiance simultaneously." },
      { title: "Dual Anti-Inflammatory Action", description: "Synergistically suppresses systemic oxidative stress and cytokine signaling." },
      { title: "Extracellular Matrix Renewal", description: "Accelerates structural tissue remodeling and skin elasticity." },
      { title: "Comprehensive Longevity", description: "Enhances overall energy, cellular resistance, and biological vitality." }
    ],
    dosing: {
      dosage: "80mg vial",
      frequency: "Once daily (SubQ)",
      duration: "Ongoing longevity protocol",
      route: "Subcutaneous",
    },
    tips: [
      "Administer subcutaneously consistently on scheduled protocol days.",
      "Combines internal anti-inflammatory benefits with external aesthetic rejuvenating effects.",
      "Reconstitute with bacteriostatic water and store in the refrigerator."
    ],
    inclusions: STANDARD_INCLUSIONS,
    variants: [
      {
        id: "klow-80",
        dosage: "80mg",
        price: 5000,
        duration: "Longevity protocol",
        shortDesc: "Gut-skin axis longevity & rejuvenation",
      },
    ],
  },
  {
    slug: "glutathione",
    name: "Glutathione",
    shortName: "Gluta",
    category: "Wellness & Longevity",
    shortDescription: "The master antioxidant for cellular defense, liver detoxification, and skin brightness.",
    about: "Glutathione is the body’s most powerful antioxidant, naturally produced in the liver. It plays a critical role in detoxifying harmful compounds, maintaining immune health, and neutralizing free radicals. Supplementing Glutathione helps combat oxidative stress, brightens the skin, and protects cells from damage caused by aging and environmental toxins.",
    coverImage: "/GLUTATHIONE /Glutathione Benefits.png",
    benefits: [
      { title: "Potent Master Antioxidant", description: "Neutralizes free radicals and prevents cellular damage across all organs." },
      { title: "Liver Detoxification", description: "Supports hepatic health and eliminates metabolic toxins from the body." },
      { title: "Skin Brightening", description: "Improves overall skin tone, clarity, and reduces hyperpigmentation." },
      { title: "Immune System & Overall Wellness", description: "Strengthens cellular defense and boosts vitality and physical energy." }
    ],
    dosing: {
      dosage: "1500mg vial",
      frequency: "Thrice a week (SubQ)",
      duration: "1500mg vial is good for 6 weeks of use",
      route: "Subcutaneous (fatty areas of abdomen, arms, or thighs)",
    },
    tips: [
      "Self inject via subcutaneous route into fatty areas of abdomen, arms, or thighs thrice a week.",
      "Take alongside Vitamin C to enhance absorption, cellular recycling, and effectiveness.",
      "Ensure proper hydration to aid the natural detoxification process.",
      "Made of three amino acids (glutamine, glycine, and cysteine) to neutralize toxins and protect cells."
    ],
    inclusions: STANDARD_INCLUSIONS,
    variants: [
      {
        id: "gluta-1500",
        dosage: "1500mg",
        price: 6000,
        duration: "6 weeks of use",
        shortDesc: "Master antioxidant & hepatic detoxification",
      },
    ],
  }
];

// ─── DERIVED ORDER PRODUCTS (SINGLE SOURCE OF TRUTH) ─────────────────────────
export const ORDER_PRODUCTS: OrderItemOption[] = PRODUCTS.flatMap((product) =>
  product.variants.map((v) => ({
    id: v.id,
    name: product.name,
    dosage: v.dosage,
    price: v.price,
    category: product.category,
    coverImage: product.coverImage,
    shortDesc: v.shortDesc || product.shortDescription,
    duration: v.duration,
  }))
);

const SLUG_ALIASES: Record<string, string> = {
  "tirz": "tirzepatide",
  "reta": "retatrutide",
  "cagri": "cagrilintide",
  "tesa": "tesamorelin",
  "bpc157": "bpc-157",
  "bpc": "bpc-157",
  "mots": "mots-c",
  "motsc": "mots-c",
  "mots-c": "mots-c",
  "tb500": "tb-500",
  "tbc500": "tb-500",
  "tbc-500": "tb-500",
  "tb-500": "tb-500",
  "nad": "nad-plus",
  "nad+": "nad-plus",
  "nadplus": "nad-plus",
  "nad-plus": "nad-plus",
  "gluta": "glutathione",
  "glutathione": "glutathione",
  "ghk": "ghk-cu",
  "ghkcu": "ghk-cu",
  "ghk-cu": "ghk-cu",
  "glow": "glow70",
  "glow70": "glow70",
  "glow-70": "glow70",
  "klow": "klow80",
  "klow80": "klow80",
  "klow-80": "klow80",
};

export function getProductBySlug(slug: string): Product | undefined {
  const normalized = slug.toLowerCase().trim();
  const targetSlug = SLUG_ALIASES[normalized] || normalized;
  return PRODUCTS.find(p => p.slug === targetSlug || p.slug.toLowerCase() === normalized || p.shortName?.toLowerCase() === normalized);
}

