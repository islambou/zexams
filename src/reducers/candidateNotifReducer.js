import { SAVE_CANDIDATE_S, DELETE_ALL_NOTIFICATIONS } from "../sagas/types";

export default (state = [], action) => {
  switch (action.type) {
    case SAVE_CANDIDATE_S:
      return [...state, action.payload];

    case DELETE_ALL_NOTIFICATIONS:
      return [];

    default:
      return state;
  }
};
