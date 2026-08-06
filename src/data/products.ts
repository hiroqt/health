export interface Benefit {
  title: string;
  description: string;
}

export interface DosingInfo {
  dosage: string;
  frequency: string;
  duration: string;
}

export interface Product {
  slug: string;
  name: string;
  shortDescription: string;
  about: string;
  coverImage: string;
  benefits: Benefit[];
  dosing: DosingInfo;
  tips: string[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    shortDescription: "Accelerates healing, recovery, and cellular repair.",
    about: "BPC-157 (Body Protection Compound-157) is a peptide naturally found in gastric juice that is widely known for its potent healing properties. It accelerates the repair of muscles, tendons, ligaments, and the gut lining. By promoting angiogenesis (the formation of new blood vessels), it enhances blood flow to damaged tissues, significantly reducing recovery time from injuries and strenuous exercise.",
    coverImage: "/BPC-157/Benefits of BPC-157.png",
    benefits: [
      { title: "Accelerated Healing", description: "Speeds up the repair of tendons, muscles, and ligaments." },
      { title: "Gut Health", description: "Protects and heals the gut lining, alleviating digestive issues." },
      { title: "Joint Support", description: "Reduces inflammation and promotes joint recovery." },
      { title: "Neuroprotection", description: "Supports brain health and central nervous system recovery." }
    ],
    dosing: {
      dosage: "250mcg - 500mcg",
      frequency: "1-2 times daily",
      duration: "4 to 6 weeks"
    },
    tips: [
      "For localized injuries, inject near the site of injury for best results.",
      "Can be taken alongside other peptides for synergistic healing effects.",
      "Always ensure proper hydration and a protein-rich diet to support tissue repair."
    ]
  },
  {
    slug: "ghk-cu",
    name: "GHK-CU",
    shortDescription: "The ultimate copper peptide for skin rejuvenation and healing.",
    about: "GHK-Cu is a naturally occurring copper peptide known for its remarkable ability to stimulate collagen and elastin production, making it a powerhouse for anti-aging and skin health. It also promotes wound healing, acts as a potent antioxidant, and has been shown to support hair growth by increasing hair follicle size.",
    coverImage: "/GHK-CU/GHK-CU Benefits.png",
    benefits: [
      { title: "Skin Rejuvenation", description: "Boosts collagen and elastin for firmer, younger-looking skin." },
      { title: "Wound Healing", description: "Accelerates tissue repair and reduces scarring." },
      { title: "Hair Growth", description: "Stimulates hair follicles and promotes thicker hair." },
      { title: "Anti-Inflammatory", description: "Reduces inflammation and oxidative stress in the body." }
    ],
    dosing: {
      dosage: "1mg - 2mg",
      frequency: "Once daily",
      duration: "4 to 8 weeks"
    },
    tips: [
      "Injection site pain is common; diluting with additional bacteriostatic water or mixing with BPC-157 can help.",
      "Monitor zinc levels, as prolonged use can deplete zinc.",
      "Store reconstituted peptide in the refrigerator."
    ]
  },
  {
    slug: "glutathione",
    name: "Glutathione",
    shortDescription: "The master antioxidant for cellular defense and detox.",
    about: "Glutathione is the body’s most powerful antioxidant, naturally produced in the liver. It plays a critical role in detoxifying harmful compounds, maintaining immune health, and neutralizing free radicals. Supplementing Glutathione helps combat oxidative stress, brightens the skin, and protects cells from damage caused by aging and environmental toxins.",
    coverImage: "/GLUTATHIONE /Glutathione Benefits.png",
    benefits: [
      { title: "Potent Antioxidant", description: "Neutralizes free radicals and prevents cellular damage." },
      { title: "Detoxification", description: "Supports liver health and eliminates toxins from the body." },
      { title: "Immune Support", description: "Strengthens the immune system's ability to fight infections." },
      { title: "Skin Brightening", description: "Improves skin tone and reduces hyperpigmentation." }
    ],
    dosing: {
      dosage: "200mg - 500mg",
      frequency: "1-3 times per week",
      duration: "Ongoing"
    },
    tips: [
      "Take with Vitamin C to enhance absorption and effectiveness.",
      "Best administered via IM (intramuscular) injection for maximum bioavailability.",
      "Ensure proper hydration to aid the detoxification process."
    ]
  },
  {
    slug: "mots-c",
    name: "Mots-C",
    shortDescription: "Mitochondrial-derived peptide for energy and metabolic health.",
    about: "MOTS-c is a mitochondrial-derived peptide that regulates metabolic functions and energy production. It mimics the effects of exercise by enhancing insulin sensitivity, promoting fat oxidation, and improving overall metabolic flexibility. It is highly effective for weight management, athletic endurance, and combating age-related metabolic decline.",
    coverImage: "/MOTS-C/Mots-C benefits (10mg).png",
    benefits: [
      { title: "Metabolic Boost", description: "Enhances fat burning and improves metabolic flexibility." },
      { title: "Exercise Mimetic", description: "Provides cellular benefits similar to physical exercise." },
      { title: "Insulin Sensitivity", description: "Improves glucose regulation and insulin response." },
      { title: "Energy Production", description: "Optimizes mitochondrial function for increased energy." }
    ],
    dosing: {
      dosage: "5mg - 10mg",
      frequency: "1-3 times per week",
      duration: "4 to 6 weeks"
    },
    tips: [
      "Administer prior to exercise to maximize energy and fat oxidation.",
      "May cause slight flushing or warmth after injection.",
      "Cycle off for 2-4 weeks after a full protocol to maintain sensitivity."
    ]
  },
  {
    slug: "nad-plus",
    name: "NAD+",
    shortDescription: "Cellular energy and anti-aging coenzyme.",
    about: "NAD+ (Nicotinamide Adenine Dinucleotide) is a vital coenzyme found in every cell of the body, essential for energy production, DNA repair, and cellular metabolism. As we age, NAD+ levels naturally decline, leading to fatigue and cognitive decline. Replenishing NAD+ restores cellular energy, sharpens mental clarity, and supports healthy aging.",
    coverImage: "/NAD+/NAD+ benefits.png",
    benefits: [
      { title: "Cellular Energy", description: "Restores mitochondrial function to boost natural energy." },
      { title: "Cognitive Clarity", description: "Clears brain fog and improves focus and memory." },
      { title: "Anti-Aging", description: "Supports DNA repair and cellular longevity." },
      { title: "Addiction Recovery", description: "Helps reduce cravings and supports neurotransmitter balance." }
    ],
    dosing: {
      dosage: "50mg - 100mg (SubQ)",
      frequency: "2-3 times per week",
      duration: "Ongoing"
    },
    tips: [
      "NAD+ injections can be uncomfortable; inject slowly to minimize discomfort.",
      "Best used in the morning as it can significantly increase energy levels and disrupt sleep if taken late.",
      "Keep refrigerated at all times to maintain potency."
    ]
  },
  {
    slug: "retatrutide",
    name: "Retatrutide",
    shortDescription: "Next-generation triple agonist for advanced weight management.",
    about: "Retatrutide is a cutting-edge triple hormone receptor agonist (GLP-1, GIP, and Glucagon). By targeting all three receptors, it offers unprecedented efficacy in weight loss and metabolic regulation. It significantly reduces appetite, improves energy expenditure, and promotes rapid, sustained fat loss while improving cardiovascular and metabolic health markers.",
    coverImage: "/RETATRUTIDE /Reta benefits (15mg).png",
    benefits: [
      { title: "Maximal Weight Loss", description: "Delivers superior fat loss results compared to single or dual agonists." },
      { title: "Appetite Suppression", description: "Dramatically reduces hunger and cravings." },
      { title: "Metabolic Control", description: "Improves blood sugar regulation and lipid profiles." },
      { title: "Energy Expenditure", description: "Glucagon agonism increases baseline metabolic rate." }
    ],
    dosing: {
      dosage: "2mg (Starting)",
      frequency: "Once weekly",
      duration: "Titrate up as directed"
    },
    tips: [
      "Start at the lowest dose and titrate slowly to minimize gastrointestinal side effects.",
      "Prioritize protein intake and strength training to preserve lean muscle mass.",
      "Stay highly hydrated and monitor blood sugar levels if diabetic."
    ]
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    shortDescription: "Targeted fat reduction and GH-releasing peptide.",
    about: "Tesamorelin is a highly effective Growth Hormone-Releasing Hormone (GHRH) analogue. It is unique in its ability to specifically target and reduce visceral adipose tissue (stubborn belly fat) while increasing natural growth hormone levels. This leads to improved body composition, enhanced muscle tone, and better overall metabolic health.",
    coverImage: "/TESAMORELIN /Benefits of Tesamorelin.png",
    benefits: [
      { title: "Visceral Fat Loss", description: "Specifically targets and reduces deep belly fat." },
      { title: "Muscle Tone", description: "Enhances lean muscle mass and overall body composition." },
      { title: "Natural GH Release", description: "Stimulates the pituitary gland to produce natural growth hormone." },
      { title: "Lipid Profile", description: "Can improve cholesterol and triglyceride levels." }
    ],
    dosing: {
      dosage: "1mg - 2mg",
      frequency: "Once daily (before bed)",
      duration: "8 to 12 weeks"
    },
    tips: [
      "Administer on an empty stomach, ideally before bed, to mimic natural GH pulses.",
      "Do not eat carbs or fats 2 hours prior to injection.",
      "Requires consistent use for at least 6-8 weeks to see significant body composition changes."
    ]
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    shortDescription: "Dual GIP and GLP-1 receptor agonist for weight loss.",
    about: "Tirzepatide is a highly effective dual-action agonist targeting both GIP and GLP-1 receptors. It provides powerful appetite suppression, delays gastric emptying, and significantly improves insulin sensitivity. It is one of the most effective treatments available for substantial weight loss and long-term metabolic control.",
    coverImage: "/TIRZEPATIDE /Tirzepatide benefits (15mg).png",
    benefits: [
      { title: "Significant Weight Loss", description: "Promotes profound and sustained reductions in body weight." },
      { title: "Appetite Control", description: "Reduces hunger signals and increases feelings of fullness." },
      { title: "Blood Sugar Regulation", description: "Improves insulin secretion and sensitivity." },
      { title: "Cardiovascular Health", description: "Supports healthy blood pressure and cholesterol levels." }
    ],
    dosing: {
      dosage: "2.5mg (Starting)",
      frequency: "Once weekly",
      duration: "Titrate up as directed"
    },
    tips: [
      "Inject on the same day each week; can be taken with or without food.",
      "Eat smaller, more frequent meals to prevent nausea.",
      "Focus on nutrient-dense foods to ensure adequate vitamin and mineral intake while in a caloric deficit."
    ]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}
