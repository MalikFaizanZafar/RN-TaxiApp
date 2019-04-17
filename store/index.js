import { createStore, combineReducers } from 'redux';
import { authReducer } from './reducers';
// Store Configurations
const rootReducer = combineReducers({
  auth : authReducer
})

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;