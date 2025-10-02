export type Promotion = "none" | "twoForOne" | "threeForTwo";
export const PROMOTIONAL_VALUES = [
  { id: "none", text: "Ninguna" },
  { id: "twoForOne", text: "Dos por uno" },
  { id: "threeForTwo", text: "Tres por dos" },
] as const;
