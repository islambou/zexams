import { FETCH_CANDIDATES_S, FETCH_CANDIDATE_S } from "../sagas/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CANDIDATES_S:
      return action.payload;

    case FETCH_CANDIDATE_S:
      return [...state, action.payload];

    default:
      return state;
  }
};
