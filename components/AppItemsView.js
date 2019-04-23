import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { Card, Rating } from "react-native-elements";
import { itemsData } from '../store';
export default class AppItemsView extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: itemsData,
      categories: [
        "Pizza",
        "Burger",
        "Chicken",
        "Vegetable",
        "Drinks",
        "Coffee",
        "Chaaye"
      ],
      selectedCategory: -1
    }
  }
  updateIndex(selectedCategory) {
    this.setState({ selectedCategory });
  }

  categoryClicked(id) {
    this.setState({
      selectedCategory: id
    });
  }
  render() {
    let dimensions = Dimensions.get("window");
    return (
      <View style={styles.containerItems}>
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
                    this.state.selectedCategory === categoryIndex
                      ? styles.buttonSelected
                      : styles.button
                  }
                  activeOpacity={0.1}
                  color="#f1c40f"
                  onPress={this.categoryClicked.bind(this, categoryIndex)}
                >
                  <Text style={{ color: "#ffffff" }}>{category}</Text>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 0 }}
          >
            {this.state.items.map((item, i) => {
              return (
                <Card containerStyle={{ padding: 0 }}>
                  <View style={{ flexDirection: "row", padding: 0 }}>
                    <View style={{ width: dimensions.width * 0.3, padding: 0 }}>
                      <Image
                        style={{ height: 100, width: 100 }}
                        source={{ uri: item.pic }}
                      />
                    </View>
                    <View
                      style={{
                        width: dimensions.width * 0.6,
                        alignItems: "center",
                        justifyContent: "flex-start",
                        flexDirection: "row"
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "flex-start"
                        }}
                      >
                        <Text>{item.name}</Text>
                        <Text style={{ fontSize: 10 }}>
                          This is Items Description
                        </Text>
                        <Rating
                          imageSize={16}
                          readonly
                          startingValue={3}
                          style={{}}
                        />
                      </View>
                    </View>
                  </View>
                </Card>
              );
            })}
          </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBar: {
    backgroundColor: "#171616",
    flexDirection: "row",
    height: 50
  },
  topBarIcon: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  topBarLogo: {
    alignItems: "center",
    justifyContent: "center"
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#47315a"
  },
  itemText: {
    alignItems: "flex-start",
    justifyContent: "center"
  },
  itemBtn: {
    alignItems: "center",
    justifyContent: "center"
  },
  containerItems: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "#e5e5e5",
    // justifyContent: "center",
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#171616",
    padding: 10,
    width: 100,
    borderRightWidth: 0.25,
    borderColor: "#fff"
  },
  buttonSelected: {
    alignItems: "center",
    backgroundColor: "#171616",
    padding: 10,
    width: 100,
    borderWidth: 1.5,
    borderColor: "#fff",
    elevation: 20
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  icon: {
    width: 24,
    height: 24
  }
});
