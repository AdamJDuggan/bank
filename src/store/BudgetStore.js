import {
  createAsyncThunk,
  createReducer,
  createAction,
} from "@reduxjs/toolkit";
import firebase from "../firebase";

const INITIAL_STATE = {};

const create = createAsyncThunk("budget/create", (payload, thunkAPI) => {
  firebase
    .firestore()
    .collection("budget")
    .add(payload)
    .then((res) => console.log("HIT", res))
    .catch((err) => console.log("err", err));
});

const get = createAsyncThunk("budget/get", async (payload, thunkAPI) => {
  const snapshot = await firebase
    .firestore()
    .collection("budget")
    .doc("pO1Oox1Hehm1pUGll5yB");
  // .doc("uid", "==", payload);
  snapshot
    .get()
    .then((doc) => doc.data())
    .then((doc) => thunkAPI.dispatch(get.success(doc)));
});
get.success = createAction("budget/get/success");

const reducer = createReducer(INITIAL_STATE, {
  [get.success]: (state, action) => action.payload,
});

export default { reducer, get, create };
