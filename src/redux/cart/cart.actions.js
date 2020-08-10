import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = (cartItem) => ({
   type: CartActionTypes.ADD_ITEM,
   payload: cartItem
});

export const removeItem = (cartItem) => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: cartItem
});

export const clearItemFromCart = (cartItem) => ({
   type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: cartItem
});
