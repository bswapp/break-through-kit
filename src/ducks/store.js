import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import authReducer from "./authReducer";
import orderReducer from "./orderReducer";
import adminReducer from "./adminReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  admin: adminReducer
});
console.log(rootReducer);

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware))
);
