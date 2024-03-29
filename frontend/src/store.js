/** @format */

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  passwordListReducer,
  passwordCreateReducer,
  passwordDetailsReducer,
  passwordDeleteReducer,
  passwordUpdateReducer,
} from "./reducers/passwordReducers";

import {
  noteListReducer,
  noteCreateReducer,
  noteDetailsReducer,
  noteDeleteReducer,
  noteUpdateReducer,
} from "./reducers/noteReducers";

const reducer = combineReducers({
  passwordList: passwordListReducer,
  passwordCreate: passwordCreateReducer,
  passwordDetails: passwordDetailsReducer,
  passwordDelete: passwordDeleteReducer,
  passwordUpdate: passwordUpdateReducer,
  noteList: noteListReducer,
  noteCreate: noteCreateReducer,
  noteDetails: noteDetailsReducer,
  noteDelete: noteDeleteReducer,
  noteUpdate: noteUpdateReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
