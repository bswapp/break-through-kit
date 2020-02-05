import Axios from "axios";

// AUTH //
export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const GETUSER = "GETUSER";
export const LOGOUT = "LOGOUT";

export const login = ({ body }) => {
  Axios.post("/auth/login", {
    body
  });
  return {
    type: LOGIN,
    payload: body
  };
};

// ADMIN //

// ORDERS //
export const ADDPRODUCTTOCART = "ADDPRODUCTTOCART";
export const EDITCART = "EDITCART";
export const DELETECART = "DELETECART";
