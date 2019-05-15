import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
export default class MapScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Map",
    // drawerIcon: ({ tintColor }) => (
    //   <Image
    //     source={{
    //       uri:
    //         "https://images.pexels.com/photos/240834/pexels-photo-240834.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"
    //     }}
    //     style={[styles.icon, { tintColor: tintColor }]}
    //   />
    // )
  };
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null
    };
  }
  componentDidMount(){
    const { params } = this.props.navigation.state;
    console.log("map params are : ", params)
    this.setState({
      latitude: Number(params.latitude),
      longitude: Number(params.longitude)
    })
    console.log('this.state has : ', this.state)
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapView => {
            _mapView = mapView;
          }}
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapView.Marker
            coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
            title={"SubQuch"}
            description={"Inverse Square"}
          />
        </MapView>
        {/* <Button
          title="Near My Location"
          onPress={() => this.LocationSerivce()}
        />
        <Button
          title="Animate to Location"
          onPress={() =>
            _mapView.animateToRegion(
              {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              },
              1000
            )
          }
        /> */}
        {/* <Text>
          You Location : Lat : {this.state.latitude}, Long :{this.state.longitude}
        </Text> */}
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
