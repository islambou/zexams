import { put, call, takeEvery } from "redux-saga/effects";
import { FETCH_USER, FETCH_USER_S } from "./types";
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
  } catch (e) {
    console.log(e);
  }
}

export default function* watchetchUser() {
  yield takeEvery(FETCH_USER, fetchUser);
}
