import { all, fork } from "redux-saga/effects";

import userSaga from "./userSaga";
import questionSaga from "./questionSaga";
import testsSaga from "./testsSaga";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(questionSaga), fork(testsSaga)]);
}
