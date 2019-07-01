import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, Alert } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyB-EsaismaaJDTBDg0F2l-28Z-7zsVCTWU";

export default class FranchiseTrackingScreen extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  };
  constructor(props) {
    super(props);

    // AirBnB's Office, and Apple Park
    this.state = {
      coordinates: [
        {
          latitude: 33.639849,
          longitude: 72.987583 // 33.639849, 72.987583
        },
        {
          latitude: 33.668819,
          longitude: 72.998826 //33.668819, 72.998826
        }
      ],
      distance: 0,
      duration: 0
    };

    this.mapView = null;
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({
      coordinates: [
        {
          latitude: Number(params.userLat),
          longitude: Number(params.userLon) // 33.639849, 72.987583
        },
        {
          latitude: Number(params.latitude),
          longitude: Number(params.longitude) //33.668819, 72.998826
        }
      ]
    });
    // locs = [
    //   { lat: 33.494652, lon: 73.101231 },
    //   { lat: 33.494766, lon: 73.10125 },
    //   { lat: 33.494786, lon: 73.10109 },
    //   { lat: 33.494805, lon: 73.101231 },
    //   { lat: 33.494926, lon: 73.101004 },
    //   { lat: 33.495068, lon: 73.101049 }
    // ];
    // let i = 0;
    // setInterval(() => {
    //   navigator.geolocation.getCurrentPosition(
    //     position => {
    //       if(this.state.distance < 0.01){
    //         return
    //       }
    //       console.log("locs is : ", locs)
    //       this.setState({
    //         coordinates: [
    //           {
    //             latitude: locs[i].lat,
    //             longitude: locs[i].lon // 33.639849, 72.987583
    //           },
    //           {
    //             latitude: Number(params.latitude),
    //             longitude: Number(params.longitude) //33.668819, 72.998826
    //           }
    //         ]
    //       });
    //     i++;
    //     },
    //     error => console.log("error is : ", error),
    //     { enableHighAccuracy: true, timeout: 200000 }
    //   );
    // }, 2000);
  }
  onMapPress = e => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate]
    });
  };

  render() {
    return (
      <MapView
        initialRegion={{
          latitude: this.state.coordinates[0].latitude,
          longitude: this.state.coordinates[0].longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
        style={StyleSheet.absoluteFill}
        ref={c => (this.mapView = c)}
        onPress={this.onMapPress}
      >
        {this.state.coordinates.map((coordinate, index) => (
          <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
        ))}
        {this.state.coordinates.length >= 2 && (
          <MapViewDirections
            origin={this.state.coordinates[0]}
            waypoints={
              this.state.coordinates.length > 2
                ? this.state.coordinates.slice(1, -1)
                : null
            }
            destination={
              this.state.coordinates[this.state.coordinates.length - 1]
            }
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={8}
            strokeColor="tomato"
            optimizeWaypoints={true}
            onStart={params => {
              console.log(
                `Started routing between ${params.origin} and ${
                  params.destination
                }`
              );
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);
              if (result.distance < 0.01) {
                Alert.alert(
                  "SubQuch Alert ",
                  "You Have Reached the Franchise. Would You Like To Checkin?",
                  [{ text: "OK", onPress: () => console.log("Checked In") }],
                  { cancelable: false }
                );
              }
              this.setState({
                distance: result.distance,
                duration: result.duration
              });

              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20
                }
              });
            }}
            onError={errorMessage => {
              // console.log('GOT AN ERROR');
            }}
          />
        )}
        <Text
          style={{
            marginLeft: 10,
            marginTop: 10,
            color: "tomato",
            fontWeight: "bold"
          }}
        >
          Distance :{" "}
          {this.state.distance ? `${this.state.distance.toFixed(3)} Km` : ""}
        </Text>
        <Text
          style={{
            marginLeft: 10,
            marginTop: 10,
            color: "tomato",
            fontWeight: "bold"
          }}
        >
          Duration :{" "}
          {this.state.distance
            ? `${this.state.duration.toFixed(2)} Minutes`
            : ""}
        </Text>
      </MapView>
    );
  }
}
