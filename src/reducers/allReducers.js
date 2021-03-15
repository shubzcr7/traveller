import counterReducer from "./CounterReducer";
import loggedReducer from "./LoginReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
});

export default allReducers;
