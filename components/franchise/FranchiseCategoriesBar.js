import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableHighlight } from "react-native";
import LandingScreenStyles from './../../Styles/landing'
export default class FranchiseCategoriesBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: [],
      categories: [{id: 1, name:'Category 1'}, {id: 2, name:'Category 2'}, {id: 2, name:'Category 3'}],
      categoriesLoading: true,
      selectedCategory: -1
    }
  }
  categoryClicked(id) {
    console.log('categoryClicked', id)
    this.setState({
      selectedCategory: id,
      categoriesLoading: true
    })
  }
  render() {
    return (
      <View>
        <ScrollView
            horizontal={true}
            style={{ height: 45 }}
            showsHorizontalScrollIndicator={false}
          >
            {this.state.categories.map((category, categoryIndex) => {
              return (
                <TouchableHighlight
                  key={categoryIndex}
                  style={
                    this.state.selectedCategory === category.id
                      ? LandingScreenStyles.buttonSelected
                      : LandingScreenStyles.button
                  }
                  activeOpacity={1}
                  color="#f1c40f"
                  onPress={this.categoryClicked.bind(this, category.id)}
                >
                  <Text style={{ color: "#ffffff" }}>{category.name}</Text>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </View>
    )
  }
}
