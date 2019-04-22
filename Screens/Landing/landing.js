import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { SearchBar, Button, Icon } from "react-native-elements";
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator } from "react-navigation";
import MapScreen from "./map";
import MapScreenTwo from "./mapTwo";
import { itemsData } from "../../store";
// const MyIcon = <Icon name="person-outline" size={30} color="#4F8EF7"  type="MaterialIcons" onPress={() => this.props.navigation.openDrawer()}/>
const items = itemsData;
export default class LandingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    search: "",
    selectedCategory: -1
  };
  updateIndex(selectedCategory) {
    this.setState({ selectedCategory });
  }
  updateSearch = search => {
    this.setState({ search });
  };
  categoryClicked(id){
    console.log('id is : ', id)
    this.setState({
      selectedCategory : id
    })
  }
  render() {
    const { search } = this.state;
    const { selectedCategory } = this.state;
    let iconSize = 35;
    let dimensions = Dimensions.get("window");
    let imageHeight = dimensions.height * 0.6;
    let imageWidth = dimensions.width;
    categories = [
      "Pizza",
      "Burger",
      "Chicken",
      "Vegetable",
      "Drinks",
      "Coffee",
      "Chaaye"
    ];
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          {/* <View style={styles.topBarIcon}>
          {MyIcon}
          </View> */}
          <View style={{ marginLeft: 100, marginTop: 5 }}>
            <Image
              style={{ height: 42, width: 150 }}
              source={require("../../assets/subquch2.png")}
            />
          </View>
        </View>
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
        <View style={styles.containerItems}>
          <ScrollView
            horizontal={true}
            style={{height: 45}}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category, categoryIndex) => {
              return (
                <TouchableHighlight
                  key={categoryIndex}
                  style={this.state.selectedCategory === categoryIndex? styles.buttonSelected :styles.button}
                  activeOpacity={0.1}
                  color='#f1c40f'
                  onPress={this.categoryClicked.bind(this, categoryIndex)}
                >
                  <Text style={{color: "#171616"}}>{category}</Text>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 0 }}
          >
            {items.map((item, i) => {
              return (
                <View key={i} style={{ justifyContent: "center" }}>
                  <Image
                    style={{
                      width: imageWidth * 0.9,
                      height: imageHeight / 1.5
                    }}
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
    // backgroundColor: "#171616",
    padding: 10,
    width: 100,
    borderRightWidth: 0.3,
    borderColor: "#fff"
  },
  buttonSelected: {
    alignItems: "center",
    backgroundColor: "#171616",
    padding: 10,
    width: 100,
    borderRightWidth: 0.3,
    borderColor: "#fff"
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

export const MyDrawerNavigator = createDrawerNavigator(
  {
    Landing: {
      screen: LandingScreen
    },
    Map: {
      screen: MapScreen
    },
    MapTwo: {
      screen: MapScreenTwo
    }
  },
  {
    backgroundColor: "green",
    drawerWidth: 200,
    initialRouteName: "Landing"
  }
);
