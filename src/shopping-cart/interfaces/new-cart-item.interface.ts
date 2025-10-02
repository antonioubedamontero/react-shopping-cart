import type { Promotion } from "./promotion.type";

export interface NewCartItemI {
  name: string;
  numOfItems: number;
  price: number;
  promo: Promotion;
  total?: number;
}
