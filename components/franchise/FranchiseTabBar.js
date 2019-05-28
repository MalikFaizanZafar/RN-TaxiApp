import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import FranchiseScreenStyles from './../../Styles/franchise'
export default class FranchiseTabBar extends Component {
  tabClicked(id){
    this.props.tabClicked(id)
  }
  render() {
    let dimensions = Dimensions.get('window')
    return (
      <View>
      <ScrollView
        horizontal={true}
        style={{ height: 50 }}
        showsHorizontalScrollIndicator={false}
      >
        {this.props.tabItems.map((item, i) => {
          return (
            <TouchableOpacity onPress={this.tabClicked.bind(this, i)} key={i}
            activeOpacity={1.0}
            style={
              this.props.selectedTab === i
                ? FranchiseScreenStyles.buttonSelected
                : FranchiseScreenStyles.button
            }>
              <Text
                style={
                  this.props.selectedTab === i
                    ? FranchiseScreenStyles.buttonSelectedText
                    : FranchiseScreenStyles.buttonText
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
