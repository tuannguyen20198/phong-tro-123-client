import authReducer from "./authReducer";
import userReducer from "./userReducer";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import appReducer from "./appReducer"
import postReducer from "./postReducer";

const comonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};
const rootConfig = {
  ...comonConfig,
  key: "auth",
  whitelist: ["isLoggedIn", "token"],
};
const rootReducer = combineReducers({
  auth: persistReducer(rootConfig, authReducer),
  user: userReducer,
  post: postReducer,
  app:appReducer,
});
export default rootReducer;
