import { GET_QUESTIONS_S, DELETE_QUESTIONS_S } from "../sagas/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_QUESTIONS_S:
      return [...state, ...action.payload];
    case DELETE_QUESTIONS_S:
      return state.filter(item => {
        return action.payload.indexOf(item.id) === -1;
      });

    default:
      return state;
  }
};
