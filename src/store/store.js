import { configureStore, combineReducers } from "@reduxjs/toolkit";

import AuthStore from "./AuthStore";

export default configureStore({
  reducer: combineReducers({
    auth: AuthStore.reducer,
  }),
});
