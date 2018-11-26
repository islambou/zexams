import { combineReducers } from "redux";
import userReducer from "./userReducer";
import notifReducer from "./notifReducer";

const rootReducer = combineReducers({
  user: userReducer,
  notifications: notifReducer
});
export default rootReducer;
