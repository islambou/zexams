import { GET_TESTS_S, DELETE_TESTS_S, EDIT_TEST_S } from "../sagas/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_TESTS_S:
      return [...state, ...action.payload];
    case DELETE_TESTS_S:
      return state.filter(item => {
        return action.payload.indexOf(item.id) === -1;
      });
    case EDIT_TEST_S:
      return state.map(item => {
        if (item.id === action.payload.id) return action.payload;
        return item;
      });
    default:
      return state;
  }
};
