import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
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

  render() {
    const markers = [
      {
        latitude: 33.676446,
        longitude: 72.998152,
        title: 'SubQuch',
        subtitle: 'Inverse Square'
      }
    ];
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
        <Text>Welcome to SubQuch Maps</Text>
      </View>
    );
  }
}

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
    bottom: 0
  },
  icon: {
    width: 24,
    height: 24
  }
});
