import { put, call, takeLatest } from "redux-saga/effects";
import { delay } from "redux-saga";

import {
  POST_TEST,
  POST_TEST_S,
  GET_TESTS,
  GET_TESTS_S,
  DELETE_TESTS,
  DELETE_TESTS_S,
  EDIT_TEST,
  EDIT_TEST_S,
  DELETE_ALL_NOTIFICATIONS
} from "./types";

function* postTest(action) {
  try {
    const data = yield call(fetch, "/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.payload)
    });

    if (data.status === 200) {
      let resp = yield data.json();
      console.log("resp", resp);
      yield put({
        type: POST_TEST_S,
        payload: {
          type: 1,
          message: "test added succesfully",
          owner: POST_TEST,
          test: resp.test,
          testId: resp.id
        }
      });
      yield call(delay, 1000);
      yield put({
        type: DELETE_ALL_NOTIFICATIONS
      });
      yield put({
        type: GET_TESTS_S,
        payload: [resp]
      });
    } else {
      let resp = yield data.json();
      console.log(resp);
      yield put({
        type: POST_TEST_S,
        payload: { type: 2, message: resp.message }
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getTets() {
  try {
    const data = yield call(fetch, "/tests");

    if (data.status === 200) {
      let tes = yield data.json();
      yield put({ type: GET_TESTS_S, payload: tes });
    }
  } catch (e) {
    console.log(e);
  }
}

function* deleteTests(action) {
  try {
    const data = yield call(fetch, "/tests/" + action.payload, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (data.status === 200) {
      yield put({ type: DELETE_TESTS_S, payload: action.payload });
    }
  } catch (e) {
    console.log(e);
  }
}

function* editTest(action) {
  try {
    const data = yield call(fetch, "/tests", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.payload)
    });

    if (data.status === 200) {
      let tes = yield data.json();
      yield put({ type: EDIT_TEST_S, payload: tes });
    }
  } catch (e) {
    console.log(e);
  }
}
export default function* watchetchQuestion() {
  yield takeLatest(POST_TEST, postTest);
  yield takeLatest(GET_TESTS, getTets);
  yield takeLatest(DELETE_TESTS, deleteTests);
  yield takeLatest(EDIT_TEST, editTest);
}
