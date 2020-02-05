import { ADDPRODUCTTOCART, EDITCART, DELETECART } from "./actionTypes";
import axios from "axios";

export const addProductToCart = productObj => {
  return {
    type: ADDPRODUCTTOCART,
    payload: productObj
  };
};

export const editCart = (cartItems, index) => {
  let filteredItems = cartItems.splice(cartItems.indexOf(cartItems[index]), 1);

  console.log(filteredItems, "this is the car items afterwards");

  return {
    type: EDITCART,
    payload: filteredItems
  };
};
export const deleteCart = () => {};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADDPRODUCTTOCART:
      return {
        ...state,
        cart: [...state.cart, payload]
      };

    case EDITCART:
      return {
        cart: payload

        // it needs to return the updated cart
        // use filter //
      };

    case DELETECART:
      return {
        // needs to delete the cart //
      };

    default:
      return state;
  }
}

const initialState = {
  cart: []
};
