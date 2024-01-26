import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import authReducer from "../reducers/authReducers";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = (preloaded) => {
  console.log(preloaded);
  return createStore(rootReducer);
};

export default store;
