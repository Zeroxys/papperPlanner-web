import { legacy_createStore as createStore, combineReducers } from "redux";
import authReducer from "../reducers/authReducers";

const rootReducer = combineReducers({
  auth: authReducer,
});

// TODO AGREGAR PERSIST AL STORE :v
const store = createStore(rootReducer);

export default store;
