import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { Card, Rating } from "react-native-elements";
import { Badge } from "react-native-elements";
import axios from "axios";
import { SERVER_URL } from "../constants";
const URL = SERVER_URL;
export default class AppBrandsListView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let dimensions = Dimensions.get("window");
    return (
      <View style={styles.containerItems}>
        <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 0 }}
            >
              {this.props.brands.map((brand, i) => {
                return (
                  <Card containerStyle={{ padding: 0 }} key={i}>
                    <View style={{ flexDirection: "row", padding: 0 }}>
                      <View
                        style={{ width: dimensions.width * 0.3, padding: 0 }}
                      >
                        <Image
                          style={{ height: 100, width: 100 }}
                          source={{ uri: brand.imageUrl }}
                        />
                      </View>
                      <View
                        style={{
                          width: dimensions.width * 0.6,
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexDirection: "row"
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "column",
                            alignItems: "flex-start"
                          }}
                        >
                          <Text>{brand.name}</Text>
                          <Text style={{ fontSize: 10 }}>{brand.address}</Text>
                          <Rating imageSize={16} readonly startingValue={3} />
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginTop: 15,
                              marginLeft: 140
                            }}
                          >
                            <Badge
                              value={brand.distance.toFixed(2)}
                              badgeStyle={{
                                height: 25,
                                width: 50,
                                backgroundColor: "#171616"
                              }}
                              textStyle={{ fontSize: 10, color: "#fff" }}
                            />
                            <Text style={{ fontSize: 10}}> Km</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Card>
                );
              })}
            </ScrollView>
      </View>
    );
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
    borderColor: "#fff",
    maxHeight: 40
  },
  buttonSelected: {
    alignItems: "center",
    backgroundColor: "#171616",
    padding: 10,
    width: 100,
    borderWidth: 1.5,
    borderColor: "#fff",
    elevation: 20,
    maxHeight: 40
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
