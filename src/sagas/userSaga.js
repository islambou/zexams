import { put, call, takeEvery } from "redux-saga/effects";
import { delay } from "redux-saga";

import {
  FETCH_USER,
  FETCH_USER_S,
  NOTIFICATION,
  DELETE_ALL_NOTIFICATIONS
} from "./types";
function* fetchUser(action) {
  try {
    const data = yield call(
      fetch,
      `/login?username=${action.payload.username}&password=${
        action.payload.password
      }`,
      {
        method: "POST"
      }
    );

    if (data.status === 200) {
      let user = yield data.json();
      yield put({ type: FETCH_USER_S, payload: user });
    }
    if (data.status === 401) {
      let res = yield data.json();
      let message = res.message;
      yield put({ type: NOTIFICATION, payload: { type: 2, message } });
      yield call(delay, 1000);
      yield put({ type: DELETE_ALL_NOTIFICATIONS });
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* watchetchUser() {
  yield takeEvery(FETCH_USER, fetchUser);
}
