export interface Benefit {
  title: string;
  description: string;
}

export interface DosingInfo {
  dosage: string;
  frequency: string;
  duration: string;
}

export type ProductCategory = "Weight Management" | "Peptide Therapy" | "Wellness & Longevity";

export interface Product {
  slug: string;
  name: string;
  shortName?: string;
  category: ProductCategory;
  shortDescription: string;
  about: string;
  coverImage: string;
  benefits: Benefit[];
  dosing: DosingInfo;
  tips: string[];
}

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
      { title: "Substantial Weight Loss", description: "Promotes profound and sustained reductions in body weight and body fat." },
      { title: "Appetite & Satiety Control", description: "Dramatically reduces cravings and enhances post-meal fullness." },
      { title: "Glycemic Regulation", description: "Optimizes glucose control, insulin sensitivity, and lipid parameters." },
      { title: "Cardiometabolic Health", description: "Supports healthy blood pressure, visceral fat reduction, and cardiovascular markers." }
    ],
    dosing: {
      dosage: "2.5mg (Starting dose)",
      frequency: "Once weekly (SubQ)",
      duration: "Titrate up monthly as directed"
    },
    tips: [
      "Administer on the same day each week; can be taken with or without food.",
      "Prioritize high-protein intake and daily hydration to preserve lean muscle mass.",
      "Eat smaller, frequent portions to prevent mild early gastrointestinal adjustment symptoms."
    ]
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
      { title: "Metabolic Recalibration", description: "Improves HbA1c, triglycerides, and overall insulin dynamics." }
    ],
    dosing: {
      dosage: "2mg (Starting dose)",
      frequency: "Once weekly (SubQ)",
      duration: "Titrate up every 4 weeks as tolerated"
    },
    tips: [
      "Start low and titrate gradually to ensure optimal tolerance and comfort.",
      "Maintain adequate hydration with electrolytes and incorporate resistance training.",
      "Store reconstituted peptide in the refrigerator at all times."
    ]
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
      { title: "Craving Reduction", description: "Diminishes hedonic eating behaviors and cravings for calorie-dense foods." }
    ],
    dosing: {
      dosage: "0.3mg - 2.4mg (Titrated)",
      frequency: "Once weekly (SubQ)",
      duration: "Ongoing maintenance protocol"
    },
    tips: [
      "Inject subcutaneously once weekly on the same day, with or without meals.",
      "Begin at the starting dose (0.3mg) and titrate in 4-week increments to minimize nausea.",
      "Pair with balanced nutrition and consistent hydration for peak digestive comfort."
    ]
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
      { title: "Body Composition", description: "Preserves and supports lean muscle tissue during fat reduction." },
      { title: "Natural GH Release", description: "Stimulates the pituitary gland to release endogenous growth hormone pulses." },
      { title: "Lipid Profile Support", description: "Supports improvements in triglycerides and cardiovascular markers." }
    ],
    dosing: {
      dosage: "1mg - 2mg",
      frequency: "Once daily (5-7 days per week, before bed)",
      duration: "8 to 12 weeks"
    },
    tips: [
      "Administer on an empty stomach at bedtime (at least 90-120 minutes after last meal).",
      "Avoid carbohydrates or sugars right before injection to preserve natural GH release.",
      "Cycle protocols (e.g. 5 days on, 2 days off) as recommended by your physician."
    ]
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
      { title: "Accelerated Tissue Healing", description: "Speeds up the repair of tendons, muscles, ligaments, and joints." },
      { title: "Gut Lining Repair", description: "Protects and restores the gut mucosal barrier, alleviating digestive inflammation." },
      { title: "Joint & Cartilage Support", description: "Reduces inflammation, eases stiffness, and promotes joint recovery." },
      { title: "Angiogenesis & Circulation", description: "Promotes new microvascular development for enhanced nutrient delivery to injured areas." }
    ],
    dosing: {
      dosage: "250mcg - 500mcg",
      frequency: "1-2 times daily (SubQ)",
      duration: "4 to 8 weeks"
    },
    tips: [
      "For localized injuries, administer near the affected area if instructed by your physician.",
      "Can be taken alongside other peptides like TB-500 for synergistic healing effects.",
      "Always ensure proper hydration and a protein-rich diet to support tissue repair."
    ]
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
      { title: "Metabolic Boost", description: "Enhances fat burning and improves cellular metabolic flexibility." },
      { title: "Exercise Mimetic", description: "Provides cellular energy benefits similar to intensive physical training." },
      { title: "Insulin Sensitivity", description: "Improves skeletal muscle glucose uptake and insulin response." },
      { title: "Mitochondrial Function", description: "Optimizes mitochondrial ATP production for sustained energy." }
    ],
    dosing: {
      dosage: "5mg - 10mg",
      frequency: "1-3 times per week (SubQ)",
      duration: "4 to 6 weeks"
    },
    tips: [
      "Administer prior to exercise or in the morning to maximize energy and fat oxidation.",
      "May cause slight transient flushing or warmth after injection.",
      "Cycle off for 2-4 weeks after a full protocol to maintain optimal receptor sensitivity."
    ]
  },
  {
    slug: "tb-500",
    name: "TB-500",
    shortName: "TBC500",
    category: "Peptide Therapy",
    shortDescription: "Synthetic Thymosin Beta-4 for cellular migration, muscle recovery, and flexibility.",
    about: "TB-500 is a synthetic fraction of the naturally occurring protein Thymosin Beta-4 (Tβ4). It plays a vital role in cellular structure and repair by upregulating actin, promoting cell migration, reducing fibrous scar tissue formation, and increasing flexibility and endurance in recovering tissues. It acts systemically throughout the entire body.",
    coverImage: "/TB-500/TB-500-Benefits.jpg",
    benefits: [
      { title: "Systemic Tissue Regeneration", description: "Upregulates actin to repair damaged muscle fibers and connective tissues." },
      { title: "Cell Migration & Repair", description: "Facilitates rapid migration of healing cells to injury sites." },
      { title: "Reduced Scarring & Adhesions", description: "Inhibits excessive fibrous scar tissue to maintain tissue flexibility." },
      { title: "Endurance & Recovery", description: "Promotes healthy microcirculation and shortens recovery times between workouts." }
    ],
    dosing: {
      dosage: "2mg - 5mg",
      frequency: "1-2 times weekly (SubQ)",
      duration: "4 to 6 weeks (Loading phase), then monthly maintenance"
    },
    tips: [
      "Can be injected subcutaneously anywhere due to its systemic distribution.",
      "Combines synergistically with BPC-157 for comprehensive tendon and ligament healing.",
      "Store reconstituted peptide refrigerated at 2°C – 8°C."
    ]
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    shortName: "Ipamorelin",
    category: "Peptide Therapy",
    shortDescription: "Selective growth hormone secretagogue for lean muscle, fat loss, and deep cellular recovery.",
    about: "Ipamorelin is one of the cleanest and most selective Growth Hormone Secretagogues (GHS) available. It mimics ghrelin to bind selectively to the secretagogue receptor on the pituitary gland, releasing growth hormone in a smooth, physiological pulse without stimulating hunger, cortisol, aldosterone, or prolactin. This leads to accelerated fat loss, lean muscle definition, deep sleep, and revitalized collagen production.",
    coverImage: "/IPAMORELIN/Ipamorelin-Benefits.jpg",
    benefits: [
      { title: "Selective GH Pulsing", description: "Stimulates natural growth hormone production without raising cortisol or prolactin." },
      { title: "Lean Muscle & Fat Loss", description: "Enhances fat breakdown (lipolysis) while protecting lean muscle mass." },
      { title: "Deep Sleep & Cellular Recovery", description: "Improves REM and slow-wave deep sleep cycles for superior nightly repair." },
      { title: "Skin Elasticity & Collagen", description: "Supports healthy collagen renewal for firmer skin and stronger hair/nails." }
    ],
    dosing: {
      dosage: "200mcg - 300mcg",
      frequency: "1-2 times daily (SubQ, at bedtime)",
      duration: "8 to 12 weeks"
    },
    tips: [
      "Inject on an empty stomach at bedtime (or post-workout) without carbohydrates to avoid blunting GH release.",
      "Consistent nightly use provides the most dramatic improvements in sleep quality and body composition.",
      "Keep reconstituted vial refrigerated at all times."
    ]
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
      { title: "Skin Rejuvenation", description: "Boosts collagen and elastin production for firmer, younger-looking skin." },
      { title: "Dermal Remodeling", description: "Accelerates tissue repair and softens the appearance of scars and fine lines." },
      { title: "Hair Follicle Support", description: "Stimulates hair follicles, reduces shedding, and encourages thicker growth." },
      { title: "Anti-Inflammatory", description: "Reduces oxidative stress and calms chronic inflammatory pathways in the body." }
    ],
    dosing: {
      dosage: "1mg - 2mg",
      frequency: "Once daily (SubQ, 5-7 days per week)",
      duration: "4 to 8 weeks"
    },
    tips: [
      "Diluting with additional bacteriostatic water can help reduce temporary injection site tenderness.",
      "Monitor zinc intake, as prolonged copper peptide protocols can influence trace mineral balance.",
      "Store reconstituted peptide in the refrigerator."
    ]
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
      { title: "Cellular Energy (ATP)", description: "Restores mitochondrial bioenergetics to boost natural physical and mental stamina." },
      { title: "Cognitive Clarity", description: "Clears brain fog and improves focus, executive memory, and mental sharpness." },
      { title: "Sirtuin & Anti-Aging", description: "Activates sirtuin longevity enzymes and supports genomic DNA repair." },
      { title: "Neuroprotection", description: "Protects neuronal networks and supports healthy cellular resilience." }
    ],
    dosing: {
      dosage: "50mg - 100mg (SubQ)",
      frequency: "2-3 times per week",
      duration: "Ongoing wellness protocol"
    },
    tips: [
      "Best administered in the morning as it increases energy levels and may disrupt sleep if taken late.",
      "Inject slowly over 20-30 seconds to minimize temporary localized warmth.",
      "Keep refrigerated at all times to maintain potency."
    ]
  },
  {
    slug: "kpv",
    name: "KPV",
    shortName: "KPV",
    category: "Wellness & Longevity",
    shortDescription: "Potent anti-inflammatory tripeptide for gut mucosal healing and immune balance.",
    about: "KPV (Lysine-Proline-Valine) is a potent, naturally occurring tripeptide derived from alpha-Melanocyte-Stimulating Hormone (α-MSH). It possesses exceptional anti-inflammatory, antimicrobial, and immune-modulating properties. KPV directly calms overactive inflammatory cascades via NF-κB inhibition, making it unmatched for gut barrier restoration, IBD/IBS support, and systemic inflammation reduction.",
    coverImage: "/KPV/KPV-Benefits.jpg",
    benefits: [
      { title: "Targeted Gut Wall Repair", description: "Restores intestinal epithelial integrity, healing mucosal inflammation." },
      { title: "NF-κB Inhibition", description: "Directly suppresses core inflammatory cytokines (TNF-α, IL-6, IL-1β)." },
      { title: "Antimicrobial Action", description: "Combats dysbiotic pathogens while supporting healthy microbiome balance." },
      { title: "Dermatological Calming", description: "Calms systemic histamine reactions, inflammatory eczema, and skin redness." }
    ],
    dosing: {
      dosage: "200mcg - 500mcg",
      frequency: "1-2 times daily (SubQ)",
      duration: "4 to 8 weeks"
    },
    tips: [
      "Synergizes powerfully with BPC-157 for a comprehensive gut-lining rejuvenation protocol.",
      "Can be administered subcutaneously or in targeted oral formulations.",
      "Well-tolerated with virtually no systemic side effects."
    ]
  },
  {
    slug: "glow",
    name: "Glow Blend",
    shortName: "Glow",
    category: "Wellness & Longevity",
    shortDescription: "Advanced aesthetic peptide blend for radiant complexion, collagen synthesis, and skin elasticity.",
    about: "Glow is our premier skin-radiance and aesthetic longevity formulation. Combining synergistic concentrations of GHK-Cu, collagen-stimulating peptides, and cellular reparative factors, Glow is specifically engineered to improve dermal density, accelerate skin cell turnover, diminish fine lines, and give the complexion a hydrated, lit-from-within luminosity.",
    coverImage: "/GLOW/Glow-Benefits.jpg",
    benefits: [
      { title: "Dermal Radiance & Luminosity", description: "Revitalizes microcirculation and skin cellular turnover for a vibrant natural glow." },
      { title: "Collagen & Elastin Synthesis", description: "Tightens skin architecture, improving suppleness and reducing fine lines." },
      { title: "Deep Cellular Hydration", description: "Improves skin moisture retention and intercellular lipid matrix strength." },
      { title: "Tone & Texture Refinement", description: "Assists in evening out skin tone and smoothing micro-texture." }
    ],
    dosing: {
      dosage: "1ml - 2ml",
      frequency: "2-3 times per week (SubQ)",
      duration: "6 to 8 weeks"
    },
    tips: [
      "Pair with adequate daily water intake and SPF protection for best aesthetic outcomes.",
      "Best administered in the evening to allow overnight cellular regeneration.",
      "Keep vial refrigerated at 2°C – 8°C."
    ]
  },
  {
    slug: "klow",
    name: "Klow Blend",
    shortName: "Klow",
    category: "Wellness & Longevity",
    shortDescription: "Synergistic longevity formulation combining KPV, GHK-Cu, and gut-skin rejuvenation factors.",
    about: "Klow is a cutting-edge integrative formulation designed to optimize the gut-skin longevity axis. By combining the anti-inflammatory power of KPV with the regenerative and collagen-rebuilding strength of GHK-Cu and vital longevity cofactors, Klow addresses both internal inflammation and external radiance, restoring vitality from the inside out.",
    coverImage: "/KLOW/Klow-Benefits.jpg",
    benefits: [
      { title: "Gut-Skin Axis Optimization", description: "Addresses internal gut permeability and external skin radiance simultaneously." },
      { title: "Dual Anti-Inflammatory Action", description: "Synergistically suppresses systemic oxidative stress and cytokine signaling." },
      { title: "Extracellular Matrix Renewal", description: "Accelerates structural tissue remodeling and skin elasticity." },
      { title: "Comprehensive Longevity", description: "Enhances overall energy, cellular resistance, and biological vitality." }
    ],
    dosing: {
      dosage: "1ml - 2ml",
      frequency: "2-3 times per week (SubQ)",
      duration: "6 to 10 weeks"
    },
    tips: [
      "Administer subcutaneously consistently on scheduled protocol days.",
      "Combines internal anti-inflammatory benefits with external aesthetic rejuvenating effects.",
      "Reconstitute with bacteriostatic water and store in the refrigerator."
    ]
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
      { title: "Liver Detoxification", description: "Supports liver health and eliminates metabolic toxins from the body." },
      { title: "Immune System Support", description: "Strengthens cellular defense and immune response against oxidative stress." },
      { title: "Skin Brightening", description: "Improves overall skin tone, clarity, and reduces hyperpigmentation." }
    ],
    dosing: {
      dosage: "200mg - 500mg",
      frequency: "1-3 times per week (IM or SubQ)",
      duration: "Ongoing wellness protocol"
    },
    tips: [
      "Take alongside Vitamin C to enhance absorption, cellular recycling, and effectiveness.",
      "Best administered via IM (intramuscular) or SubQ injection for maximum bioavailability.",
      "Ensure proper hydration to aid the natural detoxification process."
    ]
  }
];

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
};

export function getProductBySlug(slug: string): Product | undefined {
  const normalized = slug.toLowerCase().trim();
  const targetSlug = SLUG_ALIASES[normalized] || normalized;
  return PRODUCTS.find(p => p.slug === targetSlug || p.slug.toLowerCase() === normalized || p.shortName?.toLowerCase() === normalized);
}

