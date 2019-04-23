import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { SearchBar } from "react-native-elements";
export default class AppSearchView extends Component {
  state = {
    search: "",
    selectedCategory: -1
  };
  updateSearch = search => {
    this.setState({ search });
  };
  render() {
    const { search } = this.state;
    return (
      <View>
        <ImageBackground
          style={{
            height: 150,
            justifyContent: "center",
            alignItems: "center"
          }}
          source={{
            uri:
              "https://images.pexels.com/photos/1001990/pexels-photo-1001990.jpeg"
          }}
        >
          <SearchBar
            placeholder="Search an Item"
            onChangeText={this.updateSearch}
            value={search}
            lightTheme={true}
            containerStyle={{
              width: 250,
              height: 35,
              padding: 0,
              backgroundColor: "#fff",
              marginTop: 55
            }}
            inputContainerStyle={{
              width: 250,
              height: 35,
              backgroundColor: "#fff"
            }}
          />
        </ImageBackground>
        {/* <Button title="Clear" onPress={() => {
            AsyncStorage.removeItem("SubQuch_User")
          }} /> */}
      </View>
    );
  }
}
