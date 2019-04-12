import React from "react";
import { Text, View, Image, StyleSheet, Dimensions, PermissionsAndroid } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Button } from "react-native-elements";
export default class MapScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Map",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={{
          uri:
            "https://images.pexels.com/photos/240834/pexels-photo-240834.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"
        }}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error:null,
    }
  } 
  async LocationSerivce() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Location Permission',
          'message': 'This App needs access to your location ' +
                     'so we can know where you are.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use locations ")
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        )
      } else {
        console.log("Location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 33.6755329,
            longitude: 73.0006774,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
        <MapView.Marker
            coordinate={{latitude: 33.676446,
            longitude: 72.998152}}
            title={"SubQuch"}
            description={"Inverse Square"}
         />
        </MapView>
        <Button title="Near My Location" onPress={() => this.LocationSerivce()}/>
        <Text> You Location : Lat : {this.state.latitude}, Long : {this.state.longitude} </Text>
      </View>
    );
  }
}

let dimensions = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: dimensions.height * 0.9
  },
  icon: {
    width: 24,
    height: 24
  }
});
