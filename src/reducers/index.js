import { combineReducers } from "redux";
import userReducer from "./userReducer";
import notifReducer from "./notifReducer";
import questionReducer from "./questionReducer";
import categoryReducer from "./categoryReducer";
import testReducer from "./testReducer";
import TestNotifReducer from "./TestNotifReducer";
const rootReducer = combineReducers({
  user: userReducer,
  notifications: notifReducer,
  questions: questionReducer,
  categories: categoryReducer,
  tests: testReducer,
  testsNotifs: TestNotifReducer
});
export default rootReducer;
