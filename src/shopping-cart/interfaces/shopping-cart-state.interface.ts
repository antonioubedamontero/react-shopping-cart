import type { ShoppingCartItem } from "./";

export type ShoppingCartActionType =
  | "add_item_to_cart"
  | "remove_item_from_cart"
  | "edit_item_in_cart"
  | "deselect_item"
  | "select_item"
  | "clear_cart";

export interface ShoppingCartPayload {
  id?: string;
  shoppingCartItem?: ShoppingCartItem;
}

export interface ShoppingCartAction {
  type: ShoppingCartActionType;
  payload?: ShoppingCartPayload;
}

export interface ShoppingCartState {
  shoppingCartItems: ShoppingCartItem[];
  numOfSelectedItems: number;
  total: number;
}
