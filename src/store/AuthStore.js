import {
  createAsyncThunk,
  createReducer,
  createAction,
} from "@reduxjs/toolkit";
import firebase from "../firebase";

const INITIAL_STATE = { id: null, isLoggedIn: false };

const login = createAsyncThunk("auth/login", (values) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .catch((err) => err);
});

const register = createAsyncThunk("auth/register", (values) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password);
});

const watch = createAsyncThunk("auth/watch", (payload, thunkApi) => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      thunkApi.dispatch(watch.success(user));
      resolve(user);
    }, reject);
  });
});
watch.success = createAction("auth/watch/success");

const logout = createAsyncThunk("auth/logout", () => {
  return firebase.auth().signOut();
});

const reducer = createReducer(INITIAL_STATE, {
  [watch.success]: (state, action) => ({
    ...state,
    id: action.payload ? action.payload.uid : null,
    isLoggedIn: !!action.payload,
  }),
});

export default { reducer, login, register, logout, watch };
