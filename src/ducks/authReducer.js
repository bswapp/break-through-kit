import { REGISTER, LOGIN, GETUSER, LOGOUT } from "./actionTypes";
import axios from "axios";

const initialState = {
  user: {},
  redirect: false,
  error: false
};
console.log(initialState.user);

export const register = (username, password, email, profile_img, is_admin) => {
  return {
    type: REGISTER,
    payload: axios
      .post("/auth/register", {
        username,
        password,
        email,
        profile_img,
        is_admin
      })
      .then(res => res.data)
  };
};

export const login = userObj => {
  return {
    type: LOGIN,
    payload: userObj
  };
};

export const getUser = () => {};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: axios.delete("/auth/logout")
  };
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    // Login Section //

    case LOGIN:
      return {
        user: payload,
        redirect: false,
        error: false
      };

    case `${LOGIN}_REJECTED`:
      return {
        ...state,
        error: payload
      };

    // Register Section //

    case `${REGISTER}_FULFILLED`:
      return {
        redirect: false,
        user: payload,
        error: false
      };

    case `${REGISTER}_REJECTED`:
      return {
        ...state,
        error: payload
      };

    // Logout Section //

    case `${LOGOUT}_FULFILLED`:
      return { user: {}, redirect: true, error: false };

    // Get User Section //

    case `${GETUSER}_FULFILLED`:
      return { ...state, user: payload, error: false };

    case `${GETUSER}_REJECTED`:
      return { ...state, redirect: true, error: payload };

    // Export //

    default:
      return state;
  }
}
