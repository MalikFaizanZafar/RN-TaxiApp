import React from "react";
import { AppRegistry} from "react-native";
import AppContainer from './main'
import { Provider } from 'react-redux';
import configureStore from "./store";

const store = configureStore()
class App extends React.Component {
  someEvent() {
    // call navigate for AppNavigator here:
    this.navigator &&
      this.navigator.dispatch(
        NavigationActions.navigate({ routeName: someRouteName })
      );
  }
  render() {
    return (
      <Provider store = { store }>
      <AppContainer
        ref={nav => {
          this.navigator = nav;
        }}
      />
      </Provider>
    );
  }
}
AppRegistry.registerComponent('SubQuch', () => App)