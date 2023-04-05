import React, { useReducer } from "react";
import CartContext from "./cart-context";

const ACTIONS = {
  ADD_ITEM: "add-item",
  REMOVE_ITEM: "remove-item",
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case ACTIONS.REMOVE_ITEM:
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );

      const existingItem = state.items[existingItemIndex];
      const updatedTotal = state.totalAmount - existingCartItem.price;
      let updatedStateItems;

      if (existingItem.amount === 1) {
        updatedStateItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updated = { ...existingItem, amount: existingItem.amount - 1 };
        updatedStateItems = [...state.items];
        updatedStateItems[existingItemIndex] = updated;
      }

      return {
        items: updatedStateItems,
        totalAmount: updatedTotal,
      };
    default:
      return defaultCartState;
  }
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartProvider = (props) => {
  const [cartState, dispatcCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatcCartAction({ type: ACTIONS.ADD_ITEM, item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatcCartAction({ type: ACTIONS.REMOVE_ITEM, id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    revomeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
