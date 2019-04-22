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

export const itemsData = [
  {
    name: "Item 1",
    pic: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"
  },
  {
    name: "Item 2",
    pic: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"
  },
  {
    name: "Item 3",
    pic: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"
  },
  {
    name: "Item 4",
    pic: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"
  },
  {
    name: "Item 5",
    pic: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"
  }
];