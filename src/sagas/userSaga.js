import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import { delay } from "redux-saga";

import {
  FETCH_USER,
  FETCH_USER_S,
  NOTIFICATION,
  DELETE_ALL_NOTIFICATIONS,
  SAVE_CANDIDATE,
  SAVE_CANDIDATE_S,
  FETCH_CANDIDATES,
  FETCH_CANDIDATES_S,
  FETCH_CANDIDATE_S
} from "./types";
function* fetchUser(action) {
  try {
    const data = yield call(fetch, "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `username=${action.payload.username}&password=${
        action.payload.password
      }`
    });

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

function* fetchCandidates() {
  console.log("fetch candidates");
  try {
    const data = yield call(fetch, "/candidate");

    if (data.status === 200) {
      let candidates = yield data.json();
      yield put({ type: FETCH_CANDIDATES_S, payload: candidates });
    }
  } catch (e) {
    console.log(e);
  }
}

function* saveCandidate(action) {
  console.log("called saveCandidate");
  try {
    const data = yield call(fetch, "/candidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.payload)
    });

    if (data.status === 200) {
      let candidate = yield data.json();
      yield put({ type: FETCH_CANDIDATE_S, payload: candidate });
      yield put({
        type: NOTIFICATION,
        payload: { type: 1, message: "Candidate added " }
      });
      yield put({
        type: SAVE_CANDIDATE_S,
        payload: { type: 1, message: "Candidate added " }
      });
      yield call(delay, 1000);
      yield put({ type: DELETE_ALL_NOTIFICATIONS });
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
  yield takeLatest(SAVE_CANDIDATE, saveCandidate);
  yield takeLatest(FETCH_CANDIDATES, fetchCandidates);
}
