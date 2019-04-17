
import { ADD_USER, REMOVE_USER } from "../actionTypes";

const initialState = {
  user: {}
}
export const authReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_USER:
    state.user = action.payload
      return {
        state
      }
    case REMOVE_USER:
    state.user = {}
      return {
        state
      }
    default:
      return state;
  }
}