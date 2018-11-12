import { FETCH_USER_S } from "../sagas/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_S:
      return action.payload;

    default:
      return state;
  }
};
