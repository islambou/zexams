import {
  POST_QUESTION_S,
  POST_TEST_S,
  NOTIFICATION,
  DELETE_NOTIFICATION,
  DELETE_ALL_NOTIFICATIONS
} from "../sagas/types";

export default (state = [], action) => {
  switch (action.type) {
    case POST_QUESTION_S:
      return [...state, action.payload];
    case NOTIFICATION:
      return [...state, action.payload];
    case POST_TEST_S:
      return [...state, action.payload];
    case DELETE_ALL_NOTIFICATIONS:
      return [];
    case DELETE_NOTIFICATION:
      let ind = state.map(el => el.entity_id).indexOf(action.payload);
      console.log(ind);
      if (ind === -1) return state;
      return state.slice(0, ind).concat(state.slice(ind + 1));
    default:
      return state;
  }
};
