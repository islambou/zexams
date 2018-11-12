import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { GET_QUESTIONS, GET_TESTS, GET_CATEGORIES } from "./sagas/types";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
sagaMiddleware.run(rootSaga);
export default store;

//default dispatches
store.dispatch({ type: GET_QUESTIONS });
store.dispatch({ type: GET_TESTS });
store.dispatch({ type: GET_CATEGORIES });
