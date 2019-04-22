import React from "react";
import { StyleSheet, Text, View, Image,ImageBackground, Dimensions, ScrollView,TouchableHighlight  } from "react-native";
import {SearchBar, Button,Icon} from "react-native-elements";
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator} from 'react-navigation'
import MapScreen from "./map";
import MapScreenTwo from "./mapTwo";
import { itemsData } from '../../store'
// const MyIcon = <Icon name="person-outline" size={30} color="#4F8EF7"  type="MaterialIcons" onPress={() => this.props.navigation.openDrawer()}/>
const items = itemsData
export default class LandingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    search : '',
    selectedCategory: null
  }
  updateIndex (selectedCategory) {
    this.setState({selectedCategory})
  }
  updateSearch = search => {
    this.setState({ search });
  };
  render() {
    const { search } = this.state;
    const buttons = ['Pizza', 'Burger', 'Chicken', 'Category 1', 'Category 1', 'Category 1', 'Category 1', 'Category 1']
    const { selectedCategory } = this.state
    let iconSize = 35;
    let dimensions = Dimensions.get("window");
    let imageHeight = dimensions.height * 0.6;
    let imageWidth = dimensions.width;
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          {/* <View style={styles.topBarIcon}>
          {MyIcon}
          </View> */}
          <View style={{marginLeft : 100, marginTop: 5}}>
          <Image style={{ height: 42, width: 150 }} source={require('../../assets/subquch2.png')} />
          </View>
        </View>
        <View>
          <ImageBackground 
            style={{ height: 150, justifyContent: "center", alignItems: "center"}}
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
            containerStyle={{ width : 250, height: 35, padding: 0,backgroundColor: '#fff', marginTop: 55}}
            inputContainerStyle={{width : 250, height: 35, backgroundColor: '#fff'}}
          />
          </ImageBackground >
          {/* <Button title="Clear" onPress={() => {
            AsyncStorage.removeItem("SubQuch_User")
          }} /> */}
        </View>
        <View style={styles.containerItems}>
          <ScrollView horizontal={true} style={{ marginTop: 5, height: 45, backgroundColor: "#171616" }} showsHorizontalScrollIndicator={false}>
          <TouchableHighlight underlayColor="white" underlayColor={'white'}
          >
            <Button
            title="Pizza"
            titleStyle={{
              color: "#fff",
              fontSize: 13
            }}
            type="clear"
            buttonStyle={{
              borderRightWidth: 1,
              borderRadius:0,
              borderColor: "#fff",
            }}
          />
          </TouchableHighlight>
          <Button
            title="Burger"
            titleStyle={{
              color: "#fff",
              fontSize: 13
            }}
            type="clear"
            buttonStyle={{
              borderRightWidth: 1,
              borderRadius:0,
              borderColor: "#fff"
            }}
          />
          <Button
            title="Chicken"
            titleStyle={{
              color: "#fff",
              fontSize: 13
            }}
            type="clear"
            buttonStyle={{
              borderRightWidth: 1,
              borderRadius:0,
              borderColor: "#fff"
            }}
          />
          <Button
            title="Vegetable"
            titleStyle={{
              color: "#fff",
              fontSize: 13
            }}
            type="clear"
            buttonStyle={{
              borderRightWidth: 1,
              borderRadius:0,
              borderColor: "#fff"
            }}
          />
          <Button
            title="Drinks"
            titleStyle={{
              color: "#fff",
              fontSize: 13
            }}
            type="clear"
            buttonStyle={{
              borderRightWidth: 1,
              borderRadius:0,
              borderColor: "#fff"
            }}
          />
          <Button
            title="Ice Cream"
            titleStyle={{
              color: "#fff",
              fontSize: 13
            }}
            type="clear"
            buttonStyle={{
              borderRightWidth: 1,
              borderRadius:0,
              borderColor: "#fff"
            }}
          />
          <Button
            title="Coffee"
            titleStyle={{
              color: "#fff",
              fontSize: 13
            }}
            type="clear"
            buttonStyle={{
              borderRightWidth: 1,
              borderRadius:0,
              borderColor: "#fff"
            }}
          />
          <Button
            title="Chaaye"
            titleStyle={{
              color: "#fff",
              fontSize: 13
            }}
            type="clear"
            buttonStyle={{
              borderRightWidth: 1,
              borderRadius:0,
              borderColor: "#fff"
            }}
          />
          </ScrollView>
          <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 5}}>
            {items.map((item, i) => {
              return (
                <View key={i} style={{ justifyContent: "center" }}>
                  <Image
                    style={{ width: imageWidth * 0.9, height: imageHeight/1.5 }}
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