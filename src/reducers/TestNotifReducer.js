import { POST_QUESTION_S, POST_TEST_S } from "../sagas/types";

export default (state = [], action) => {
  switch (action.type) {
    case POST_TEST_S:
      return [...state, action.payload];

    default:
      return state;
  }
};
