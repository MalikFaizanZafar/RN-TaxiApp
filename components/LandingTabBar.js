import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import LandingScreenStyles from '../Styles/landing'
export default class LandingTabBar extends Component {
  tabClicked(id){
    this.props.tabClicked(id)
  }
  render() {
    return (
      <View>
      <ScrollView
        horizontal={true}
        style={{ height: 45 }}
        showsHorizontalScrollIndicator={false}
      >
        {this.props.tabItems.map((item, i) => {
          return (
            <TouchableOpacity onPress={this.tabClicked.bind(this, i)} key={i}
            activeOpacity={1.0}
            style={
              this.props.selectedTab === i
                ? LandingScreenStyles.buttonSelected
                : LandingScreenStyles.button
            }>
              <Text
                style={
                  this.props.selectedTab === i
                    ? LandingScreenStyles.buttonSelectedText
                    : LandingScreenStyles.buttonText
                }
              >
                {item}
              </Text>
            </TouchableOpacity> 
          );
        })}
      </ScrollView>
    </View>
    )
  }
}
