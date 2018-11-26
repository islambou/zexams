import { POST_TEST_S, DELETE_ALL_NOTIFICATIONS } from "../sagas/types";

export default (state = [], action) => {
  switch (action.type) {
    case POST_TEST_S:
      return [...state, action.payload];

    case DELETE_ALL_NOTIFICATIONS:
      return [];

    default:
      return state;
  }
};
