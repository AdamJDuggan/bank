import { configureStore, combineReducers } from "@reduxjs/toolkit";

import AuthStore from "./AuthStore";
import BudgetStore from "./BudgetStore";

export default configureStore({
  reducer: combineReducers({
    auth: AuthStore.reducer,
    budget: BudgetStore.reducer,
  }),
});
