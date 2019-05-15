// import React from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// export default class MapScreen extends React.Component {
//   static navigationOptions = {
//     drawerLabel: "Map",
//     // drawerIcon: ({ tintColor }) => (
//     //   <Image
//     //     source={{
//     //       uri:
//     //         "https://images.pexels.com/photos/240834/pexels-photo-240834.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"
//     //     }}
//     //     style={[styles.icon, { tintColor: tintColor }]}
//     //   />
//     // )
//   };
//   constructor(props) {
//     super(props);

//     this.state = {
//       latitude: null,
//       longitude: null,
//       error: null
//     };
//   }
//   componentDidMount(){
//     const { params } = this.props.navigation.state;
//     console.log("map params are : ", params)
//     this.setState({
//       latitude: Number(params.latitude),
//       longitude: Number(params.longitude)
//     })
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <MapView
//           provider={PROVIDER_GOOGLE}
//           ref={mapView => {
//             _mapView = mapView;
//           }}
//           style={styles.map}
//           initialRegion={{
//             latitude: this.state.latitude,
//             longitude: this.state.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421
//           }}
//         >
//           <MapView.Marker
//             coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
//             title={"SubQuch"}
//             description={"Inverse Square"}
//           />
//         </MapView>
//         {/* <Button
//           title="Near My Location"
//           onPress={() => this.LocationSerivce()}
//         />
//         <Button
//           title="Animate to Location"
//           onPress={() =>
//             _mapView.animateToRegion(
//               {
//                 latitude: this.state.latitude,
//                 longitude: this.state.longitude,
//                 latitudeDelta: 0.0922,
//                 longitudeDelta: 0.0421
//               },
//               1000
//             )
//           }
//         /> */}
//         {/* <Text>
//           You Location : Lat : {this.state.latitude}, Long :{this.state.longitude}
//         </Text> */}
//       </View>
//     );
//   }
// }

// let dimensions = Dimensions.get("window");
// const styles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "flex-end",
//     alignItems: "center"
//   },
//   map: {
//     flex: 1,
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: dimensions.height * 0.9
//   },
//   icon: {
//     width: 24,
//     height: 24
//   }
// });

import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 33.639849;
const LONGITUDE = 72.987583;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyB-EsaismaaJDTBDg0F2l-28Z-7zsVCTWU';

export default class MapScreen extends Component {

  constructor(props) {
    super(props);

    // AirBnB's Office, and Apple Park
    this.state = {
      coordinates: [
        {
          latitude: 33.639849,
          longitude: 72.987583, // 33.639849, 72.987583
        },
        {
          latitude: 33.668819,
          longitude: 72.998826, //33.668819, 72.998826
        },
      ],
    };

    this.mapView = null;
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }

  render() {
    return (
      <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={StyleSheet.absoluteFill}
        ref={c => this.mapView = c}
        onPress={this.onMapPress}
      >
        {this.state.coordinates.map((coordinate, index) =>
          <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
        )}
        {(this.state.coordinates.length >= 2) && (
          <MapViewDirections
            origin={this.state.coordinates[0]}
            waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
            destination={this.state.coordinates[this.state.coordinates.length-1]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={8}
            strokeColor="tomato"
            optimizeWaypoints={true}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              console.log('Distance: ${result.distance} km')
              console.log('Duration: ${result.duration} min.')
              
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 20),
                }
              });
            }}
            onError={(errorMessage) => {
              // console.log('GOT AN ERROR');
            }}
          />
        )}
      </MapView>
    );
  }
}