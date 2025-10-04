import type { Promotion } from "./";

export interface ShoppingCartItem {
  id?: string;
  isSelected: boolean;
  numOfItems: number;
  name: string;
  price: number;
  promo: Promotion;
  total: number;
}
