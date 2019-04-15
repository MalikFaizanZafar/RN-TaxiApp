import React from "react";
import { StyleSheet, Text, View, Button, Image, Dimensions, ScrollView } from "react-native";
import { Badge } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator} from 'react-navigation'
import MapScreen from "./map";
import MapScreenTwo from "./mapTwo";
const MyIcon = <Icon name="person-outline" size={30} color="#4F8EF7"  type="MaterialIcons" onPress={() => this.props.navigation.openDrawer()}/>
const items = [
  {
    name: "Item 1",
    pic: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"
  },
  {
    name: "Item 2",
    pic: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"
  },
  {
    name: "Item 3",
    pic: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"
  },
  {
    name: "Item 4",
    pic: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"
  },
  {
    name: "Item 5",
    pic: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"
  }
];
export default class LandingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    let iconSize = 35;
    let dimensions = Dimensions.get("window");
    let imageHeight = dimensions.height * 0.6;
    let imageWidth = dimensions.width;
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.topBarIcon}>
          {MyIcon}
          </View>
          <View style={styles.topBarLogo}>
          <Icon name='person-outline' type="MaterialIcons" />
            <Text style={{ fontSize: 20, color: "white" }}>SubQuch Logo</Text>
          </View>
        </View>
        <View>
          <Image
            style={{ height: 120 }}
            source={{
              uri:
                "https://images.pexels.com/photos/1001990/pexels-photo-1001990.jpeg"
            }}
          />
        </View>
        <View style={styles.containerItems}>
          <ScrollView horizontal={true} style={{ marginTop: 25, height: 50 }}>
            <View style={{ flex: 1, justifyContent: "center", width: 100 }}>
              <Badge  textStyle={{ color: 'white', fontSize: 10, lineHeight: 10 }} value="Pizza" status="primary" />
            </View>
            <View style={{ flex: 1, justifyContent: "center", width: 100 }}>
              <Badge value="Burger" status="primary" />
            </View>
            <View style={{ flex: 1, justifyContent: "center", width: 100 }}>
              <Badge value="Chicken" status="primary" />
            </View>
            <View style={{ flex: 1, justifyContent: "center", width: 100 }}>
              <Badge value="Chinese" status="primary" />
            </View>
            <View style={{ flex: 1, justifyContent: "center", width: 100 }}>
              <Badge value="Italian" status="primary" />
            </View>
            <View style={{ flex: 1, justifyContent: "center", width: 100 }}>
              <Badge value="French" status="primary" />
            </View>
            <View style={{ flex: 1, justifyContent: "center", width: 100 }}>
              <Badge value="Vegetable" status="primary" />
            </View>
            <View style={{ flex: 1, justifyContent: "center", width: 100 }}>
              <Badge value="Drinks" status="primary" />
            </View>
          </ScrollView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {items.map((item, i) => {
              return (
                <View key={i} style={{ justifyContent: "center" }}>
                  <Image
                    style={{ width: imageWidth * 0.8, height: imageHeight/2 }}
                    source={{
                      uri: item.pic
                    }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: "bold"
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 23
  },
  topBar: {
    backgroundColor: "#7B1FA2",
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
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  icon: {
    width: 24,
    height: 24,
  }
});


export const MyDrawerNavigator = createDrawerNavigator({
  Landing: {
    screen: LandingScreen,
  },
  Map: {
    screen: MapScreen
  },
  MapTwo: {
    screen: MapScreenTwo
  }
}, {
  backgroundColor: 'green',
  drawerWidth: 200,
  initialRouteName: "Landing"
});