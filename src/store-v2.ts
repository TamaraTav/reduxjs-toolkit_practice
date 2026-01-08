import { createStore, combineReducers, applyMiddleware } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import custumerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: custumerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
