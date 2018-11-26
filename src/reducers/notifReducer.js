import {
  NOTIFICATION,
  DELETE_NOTIFICATION,
  DELETE_ALL_NOTIFICATIONS
} from "../sagas/types";

export default (state = [], action) => {
  switch (action.type) {
    case NOTIFICATION:
      return [...state, action.payload];

    case DELETE_ALL_NOTIFICATIONS:
      return [];
    case DELETE_NOTIFICATION:
      let ind = state.map(el => el.entityid).indexOf(action.payload);
      if (ind === -1) return state;
      return state.slice(0, ind).concat(state.slice(ind + 1));
    default:
      return state;
  }
};
