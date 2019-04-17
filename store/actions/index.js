import { ADD_USER, REMOVE_USER } from "../actionTypes";


export const addUser = ( payload ) => {
  return {
    type : ADD_USER,
    payload: payload
  }
}

export const removeUser = ( payload ) => {
  return {
    type : REMOVE_USER,
    payload: payload
  }
}