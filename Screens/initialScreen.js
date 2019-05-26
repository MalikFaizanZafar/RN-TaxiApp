import React, { Component } from 'react'
import { View } from 'react-native'
import LandingScreen from './Landing/landing';
import HomeScreen from './home';
import { userAuthStatus } from '../services/userAuth';
export default class InitialScreen extends Component {
  constructor(props){
    super(props)
    this.state = { userAuth : false}
  }

  componentDidMount(){
    this.setState({
      userAuth: userAuthStatus()
    })
    console.log("userAuthStatus is : ", userAuthStatus())
  }

  render() {
    return (
      <View>
      {
        this.state.userAuth?<LandingScreen />: <HomeScreen />
      }
      </View>
    )
  }
}