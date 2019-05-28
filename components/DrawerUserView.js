import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { getUser } from '../services/getUser';
export default class DrawerUserView extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {}
    }
  }
  componentDidMount(){
    getUser().then(userData => {
      this.setState({ user : userData})
    })
  }
  render() {
    return (
      <View style={{ alignItems: "center", marginLeft: 20}}>
        <Image source={{ uri: this.state.user.photo}} style={{ height: 100, width: 100, borderRadius: 50}} />
        <Text style={{ fontWeight: "bold", marginTop: 10}}>{this.state.user.name}</Text>
        <Text style={{ fontSize: 10}}>{this.state.user.email}</Text>
      </View>
    )
  }
}
