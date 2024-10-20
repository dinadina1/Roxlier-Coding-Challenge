// import required modules
import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productsReducer from "./slices/productSlice";

// reducers
const reducer = combineReducers({
  productsState: productsReducer,
});
// store
const store = configureStore(
  {
    reducer,
  },
  applyMiddleware(thunk)
);

// export store
export default store;
