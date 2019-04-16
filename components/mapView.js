import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const MyMapView = props => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={props.region}
      showsUserLocation={true}
      onRegionChange={reg => props.onRegionChange(reg)}
    >
      <MapView.Marker coordinate={props.region} />
    </MapView>
  );
};
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
    height: dimensions.height
  },
  icon: {
    width: 24,
    height: 24
  }
});
export default MyMapView;
