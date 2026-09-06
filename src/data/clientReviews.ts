export type ReviewCategory = "all" | "weight" | "energy" | "skin" | "recovery";

export interface ClientReview {
  id: number;
  imageWebp: string;
  imagePng: string;
  alt: string;
  category: "weight" | "energy" | "skin" | "recovery";
  tag: string;
  rating: number;
}

const CATEGORIES: ("weight" | "energy" | "skin" | "recovery")[] = [
  "weight",
  "weight",
  "energy",
  "skin",
  "recovery",
  "weight",
  "energy",
  "weight",
  "skin",
  "recovery",
];

const TAGS: Record<"weight" | "energy" | "skin" | "recovery", string> = {
  weight: "Weight & Metabolism",
  energy: "Energy & Vitality",
  skin: "Glow & Anti-Aging",
  recovery: "Muscle & Recovery",
};

export const CLIENT_REVIEWS: ClientReview[] = Array.from({ length: 50 }, (_, i) => {
  const num = i + 1;
  const category = CATEGORIES[i % CATEGORIES.length];
  return {
    id: num,
    imageWebp: `/client-reviews/review-${num}.webp`,
    imagePng: `/client-reviews/review-${num}.png`,
    alt: `Client Review & Real Experience #${num}`,
    category,
    tag: TAGS[category],
    rating: 5,
  };
});
