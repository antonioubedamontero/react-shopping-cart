import { v4 as uuidv4 } from "uuid";

import type { ShoppingCartAction, ShoppingCartState } from "../interfaces";

export const shoppingCartInitialState = {
  shoppingCartItems: [],
  total: 0,
};

export const shoppingCartReducer = (
  state: ShoppingCartState,
  action: ShoppingCartAction
): ShoppingCartState => {
  switch (action.type) {
    case "toggle_item_selection":
      return toggleItemSelection(state, action);

    case "add_item_to_cart":
      return addItemToCart(state, action);

    case "edit_item_in_cart":
      return editItemInCart(state, action);

    case "remove_item_from_cart":
      return removeItemFromCart(state, action);

    case "clear_cart":
      return clearCart();

    default:
      throw new Error("Shopping cart action is not defined");
  }
};

const toggleItemSelection = (
  state: ShoppingCartState,
  action: ShoppingCartAction
) => {
  if (!action.payload) throw new Error("payload is required");

  const { id: idPayload, isSelected: isSelectedPayload = false } =
    action.payload;

  const newCartItems = state.shoppingCartItems.map((item) => {
    if (item.id === idPayload) {
      return { ...item, isSelected: isSelectedPayload };
    }
    return item;
  });

  return {
    shoppingCartItems: newCartItems,
    total: newCartItems.reduce((acc, act) => {
      if (act.isSelected) return acc + act.total;
      return acc;
    }, 0),
  };
};

const addItemToCart = (
  state: ShoppingCartState,
  action: ShoppingCartAction
) => {
  if (!action.payload) throw new Error("payload is required");

  const { shoppingCartItem: shoppingCartPayloadItem } = action.payload;

  if (!shoppingCartPayloadItem) {
    return state;
  }

  const { name: namePayload } = shoppingCartPayloadItem;

  const itemExists = state.shoppingCartItems.some(
    (item) => item.name === namePayload
  );

  if (itemExists) {
    // TODO: Show an alert warning item already exists
    return state;
  }

  // Generate new id with uuid
  const newItem = { ...shoppingCartPayloadItem, id: uuidv4() };

  return {
    shoppingCartItems: [...state.shoppingCartItems, newItem],
    total: state.total,
  };
};

const editItemInCart = (
  state: ShoppingCartState,
  action: ShoppingCartAction
) => {
  if (!action.payload) throw new Error("payload is required");

  const { shoppingCartItem: shoppingCartItemPayload } = action.payload;

  if (!shoppingCartItemPayload)
    throw new Error("Shopping cart item missing in payload when editing item");

  const { id: payloadId } = shoppingCartItemPayload;

  if (!payloadId) {
    return state;
  }

  const shoppingCartItemsEdited = state.shoppingCartItems.map((item) => {
    if (item.id === payloadId) return shoppingCartItemPayload;
    return item;
  });

  return {
    shoppingCartItems: shoppingCartItemsEdited,
    total: shoppingCartItemsEdited.reduce((acc, act) => {
      return act.isSelected ? acc + act.total : acc;
    }, 0),
  };
};

const removeItemFromCart = (
  state: ShoppingCartState,
  action: ShoppingCartAction
) => {
  if (!action.payload) throw new Error("payload is required");

  const { id: payloadId } = action.payload;

  if (!payloadId) {
    return state;
  }

  const elementToRemove = state.shoppingCartItems.find(
    (item) => item.id === payloadId
  );

  if (!elementToRemove) {
    return state;
  }

  const newShoppingCartItems = state.shoppingCartItems.filter(
    (cartItem) => cartItem.id !== payloadId
  );

  return {
    shoppingCartItems: newShoppingCartItems,
    total: elementToRemove.isSelected
      ? state.total - elementToRemove.total
      : state.total,
  };
};

const clearCart = () => {
  return shoppingCartInitialState;
};
