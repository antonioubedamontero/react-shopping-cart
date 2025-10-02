import { v4 as uuidv4 } from "uuid";

import type { ShoppingCartAction, ShoppingCartState } from "../interfaces";

export const shoppingCartInitialState = {
  shoppingCartItems: [],
  numOfSelectedItems: 0,
  total: 0,
};

export const shoppingCartReducer = (
  state: ShoppingCartState,
  action: ShoppingCartAction
): ShoppingCartState => {
  switch (action.type) {
    case "add_item_to_cart":
      return addItemToCart(state, action);

    case "remove_item_from_cart":
      return removeItemFromCart(state, action);

    case "deselect_item":
      return unSelectItemFromCart(state, action);

    case "select_item":
      return selectItemFromCart(state, action);

    default:
      throw new Error("Shopping cart action is not defined");
  }
};

const addItemToCart = (
  state: ShoppingCartState,
  action: ShoppingCartAction
) => {
  const { shoppingCartItem: shoppingCartPayloadItem } = action.payload;
  if (!shoppingCartPayloadItem) {
    return state;
  }

  const { name: namePayload, total: totalPayload = 0 } =
    shoppingCartPayloadItem;
  const itemExists = state.shoppingCartItems.some(
    (item) => item.name === namePayload
  );

  if (itemExists) {
    return state;
  }

  // Generate new id with uuid
  const newItem = shoppingCartPayloadItem;
  newItem.id = uuidv4();

  return {
    shoppingCartItems: [newItem, ...state.shoppingCartItems],
    numOfSelectedItems: state.numOfSelectedItems + 1,
    total: state.total + totalPayload,
  };
};

const removeItemFromCart = (
  state: ShoppingCartState,
  action: ShoppingCartAction
) => {
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
    numOfSelectedItems: elementToRemove.selected
      ? state.numOfSelectedItems - 1
      : state.numOfSelectedItems,
    total: elementToRemove.selected
      ? state.total - elementToRemove.total!
      : state.total,
  };
};

const unSelectItemFromCart = (
  state: ShoppingCartState,
  action: ShoppingCartAction
) => {
  const { id: payloadId } = action.payload;

  if (!payloadId) {
    return state;
  }

  const elementToDeselect = state.shoppingCartItems.find(
    (item) => item.id === payloadId
  );

  if (!elementToDeselect?.selected) {
    return state;
  }

  const newShoppingCartItems = state.shoppingCartItems.map((item) => {
    if (item.id === payloadId) {
      item.selected = false;
    }
    return item;
  });

  return {
    shoppingCartItems: newShoppingCartItems,
    numOfSelectedItems: state.numOfSelectedItems - 1,
    total: state.total - elementToDeselect.total!,
  };
};

const selectItemFromCart = (
  state: ShoppingCartState,
  action: ShoppingCartAction
) => {
  const { id: payloadId } = action.payload;

  if (!payloadId) {
    return state;
  }

  const elementToSelect = state.shoppingCartItems.find(
    (item) => item.id === payloadId
  );

  if (!elementToSelect || elementToSelect?.selected) {
    return state;
  }

  const newShoppingCartItems = state.shoppingCartItems.map((item) => {
    if (item.id === payloadId) {
      item.selected = true;
    }
    return item;
  });

  return {
    shoppingCartItems: newShoppingCartItems,
    numOfSelectedItems: state.numOfSelectedItems + 1,
    total: state.total + elementToSelect.total!,
  };
};
