import type { ShoppingCartItem } from "./";

export type ShoppingCartActionType =
  | "toggle_item_selection"
  | "add_item_to_cart"
  | "edit_item_in_cart"
  | "remove_item_from_cart"
  | "clear_cart";

export interface ShoppingCartPayload {
  id?: string;
  isSelected?: boolean;
  shoppingCartItem?: ShoppingCartItem;
}

export interface ShoppingCartAction {
  type: ShoppingCartActionType;
  payload?: ShoppingCartPayload;
}

export interface ShoppingCartState {
  shoppingCartItems: ShoppingCartItem[];
  total: number;
}
