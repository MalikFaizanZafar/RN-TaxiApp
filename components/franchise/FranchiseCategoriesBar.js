import React, { Component } from "react";
import { View, Text, ScrollView, TouchableHighlight } from "react-native";
import LandingScreenStyles from "./../../Styles/landing";
export default class FranchiseCategoriesBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: -1
    };
  }
  categoryClicked(id) {
    this.setState({
      selectedCategory: id,
      categoriesLoading: true
    });
    this.props.selectedCategory(id);
  }
  render() {
    return (
      <View style={{ marginTop: 30, backgroundColor: "#171616" }}>
        <ScrollView
          horizontal={true}
          style={{ height: 45 }}
          showsHorizontalScrollIndicator={false}
        >
          {this.props.categories.map((category, categoryIndex) => {
            return (
              <TouchableHighlight
                key={categoryIndex}
                style={
                  this.state.selectedCategory === category.id
                    ? LandingScreenStyles.categoryButtonSelected
                    : LandingScreenStyles.categoryButton
                }
                activeOpacity={1}
                color="#f1c40f"
                onPress={this.categoryClicked.bind(this, category.id)}
              >
                <Text
                  style={
                    this.state.selectedCategory === category.id
                      ? LandingScreenStyles.categoryButtonSelectedText
                      : LandingScreenStyles.categoryButtonText
                  }
                >
                  {category.name}
                </Text>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
