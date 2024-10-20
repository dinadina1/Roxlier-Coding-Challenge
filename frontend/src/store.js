// import required modules
import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import transactionReducer from "./slices/transactionSlice";

// reducers
const reducer = combineReducers({
  transactionState: transactionReducer,
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
