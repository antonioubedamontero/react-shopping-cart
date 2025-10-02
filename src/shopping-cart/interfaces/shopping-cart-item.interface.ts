import type { Promotion } from "./";

export interface ShoppingCartItem {
  id?: string;
  selected: boolean;
  numOfItems: number;
  name: string;
  price: number;
  promo: Promotion;
  total: number;
}
