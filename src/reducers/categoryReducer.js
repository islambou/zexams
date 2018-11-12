import { GET_CATEGORIES_s } from "../sagas/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES_s:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
