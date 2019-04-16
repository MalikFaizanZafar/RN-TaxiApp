import React from 'react';
import { View , StyleSheet, Dimensions} from 'react-native';
import MapInput from '../../components/mapInput'
import MyMapView from '../../components/mapView'
import { getLocation } from '../../services/getLocation'

class MapScreenTwo extends React.Component {
  static navigationOptions = {
    drawerLabel: "MapTwo",
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
  state = {
    region: {},
  };

  componentDidMount() {
    this.getInitialState();
  }

  getInitialState() {
    getLocation().then(data => {
      this.updateState({
        latitude: data.latitude,
        longitude: data.longitude,
      });
    });
  }

  updateState(location) {
    this.setState({
      region: {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
    });
  }

  getCoordsFromName(loc) {
    this.updateState({
      latitude: loc.lat,
      longitude: loc.lng,
    });
  }

  onMapRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.region['latitude'] ? (
          <View style={{ flex: 1 }}>
            <MyMapView
              region={this.state.region}
              onRegionChange={reg => this.onMapRegionChange(reg)}
            />
          </View>
        ) : null}
        <View style={{ flex: 0.75, marginBottom: 800}}>
            <MapInput notifyChange={loc => this.getCoordsFromName(loc)} />
        </View>
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
  icon: {
    width: 24,
    height: 24
  }
});

export default MapScreenTwo;