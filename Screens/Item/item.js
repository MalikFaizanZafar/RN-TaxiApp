import React, { Component } from 'react'
import { View } from 'react-native'
import AppTopBar from '../../components/AppTopBar';
import ItemView from '../../components/item/ItemView';
export default class ItemMainScreen extends Component {

  state = {
    item: {},
    franchiseId: 0
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const item = params ? params.item : null;
    const franchiseId = params ? params.franchiseId : null;
    this.setState({item: item, franchiseId: franchiseId})
  }

  render() {
    return (
      <View >
        <AppTopBar  openSubquchDrawer={() => this.props.navigation.openDrawer()} />
        <ItemView item={this.state.item} franchiseId={this.state.franchiseId} />
      </View>
    )
  }
}
