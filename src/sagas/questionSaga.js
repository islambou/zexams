import { put, call, takeLatest } from "redux-saga/effects";
import { delay } from "redux-saga";

import {
  POST_QUESTION,
  POST_QUESTION_S,
  GET_QUESTIONS,
  GET_QUESTIONS_S,
  DELETE_QUESTIONS,
  DELETE_QUESTIONS_S,
  GET_CATEGORIES,
  GET_CATEGORIES_s,
  DELETE_NOTIFICATION,
  DELETE_ALL_NOTIFICATIONS
} from "./types";
function* postQuestion(action) {
  try {
    const data = yield call(fetch, "/question/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.payload)
    });

    if (data.status === 200) {
      let resp = yield data.json();
      console.log(resp);

      yield put({
        type: GET_QUESTIONS_S,
        payload: resp
      });
      yield put({
        type: POST_QUESTION_S,
        payload: {
          type: 1,
          message: "question added succesfully",
          entity_id: resp._id
        }
      });
      yield call(delay, 1000);
      yield put({
        type: DELETE_ALL_NOTIFICATIONS,
        payload: resp._id
      });
    } else {
      let resp = yield data.json();
      console.log(resp);
      yield put({
        type: POST_QUESTION_S,
        payload: { type: 2, message: resp.message }
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getQuestions(action) {
  try {
    const data = yield call(fetch, "/question/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.payload || [])
    });

    if (data.status === 200) {
      let ques = yield data.json();
      yield put({ type: GET_QUESTIONS_S, payload: ques });
    }
  } catch (e) {
    console.log(e);
  }
}

function* deleteQuestions(action) {
  try {
    const data = yield call(fetch, "/question", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.payload)
    });

    if (data.status === 200) {
      let ques = yield data.json();
      console.log(ques);
      yield put({ type: DELETE_QUESTIONS_S, payload: ques });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getCategories() {
  try {
    const data = yield call(fetch, "/category");

    if (data.status === 200) {
      let cats = yield data.json();
      yield put({ type: GET_CATEGORIES_s, payload: cats });
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* watchetchQuestion() {
  yield takeLatest(POST_QUESTION, postQuestion);
  yield takeLatest(GET_QUESTIONS, getQuestions);
  yield takeLatest(DELETE_QUESTIONS, deleteQuestions);
  yield takeLatest(GET_CATEGORIES, getCategories);
}
