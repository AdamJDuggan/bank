import { createAction, createReducer } from "@reduxjs/toolkit";
import firebase from "../firebase/firebase";

const INITIAL_STATE = {
  id: 1,
  isLoggedIn: true,
  name: "Test name",
};

const login = (values) => {
  firebase
    .login(values.email, values.password)
    .then((res) => console.log("login", res))
    .catch((err) => console.log("ERR", err));
};

const reducer = createReducer(INITIAL_STATE, {
  //   [login]: (state, action) => ({
  //     id: action.payload.id || null,
  //     isLoggedIn: !!action.payload.id,
  //     name: action.payload.name,
  //   }),
  //   reset: (state, action) => INITIAL_STATE,
  //   [logout.fulfilled]: (state, action) => INITIAL_STATE,
});

export default { login, reducer };
