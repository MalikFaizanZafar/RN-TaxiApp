import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import { Card, Rating, Badge } from "react-native-elements";
export default class AppBrandsListView extends Component {
  constructor(props) {
    super(props);
  }
  franchisePress(franchiseId){
    this.props.franchiseOnPress(franchiseId)
  }
  render() {
    let dimensions = Dimensions.get("window");
    return (
      <View style={{ flex: 1}}>
        {this.props.dataLoading ? (
          <ActivityIndicator
            size="large"
            color="#000"
            style={{ marginTop: 150 }}
          />
        ) : this.props.data.length === 0 ? (
          <Text style={{ marginLeft: 40, marginTop: 100 }}>
            No Franchises within the Range of 5 Kms
          </Text>
        ) :(<ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 0 }}
            >
              {this.props.data.map((datum, i) => {
                return (
                  <TouchableOpacity onPress={ () => this.franchisePress(datum.franchiseId)} key={i} activeOpacity={0.6} >
                  <Card containerStyle={{ padding: 0 }} key={i} >
                    <View style={{ flexDirection: "row", padding: 0 }}>
                      <View
                        style={{ width: dimensions.width * 0.3, padding: 0 }}
                      >
                        <Image
                          style={{ height: 100, width: 100 }}
                          source={{ uri: datum.imageUrl }}
                        />
                      </View>
                      <View
                        style={{
                          width: dimensions.width * 0.6,
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexDirection: "row"
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "column",
                            alignItems: "flex-start"
                          }}
                        >
                          <Text>{ datum.type == 'franchise'? datum.name : datum.typeName}</Text>
                          <Text style={{ fontSize: 10 }}>{datum.type == 'franchise'? datum.address : ''}</Text>
                          <Rating imageSize={16} readonly startingValue={3} />
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginTop: 15,
                              marginLeft: 140
                            }}
                          >
                            <Badge
                              value={datum.type=== "franchise"? datum.distance.toFixed(2): datum.price}
                              badgeStyle={{
                                height: 25,
                                width: 50,
                                backgroundColor: "#171616"
                              }}
                              textStyle={{ fontSize: 10, color: "#fff" }}
                            />
                            <Text style={{ fontSize: 10}}>{datum.type=== "franchise"? ' Km': ' Rs'}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Card>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>)}
      </View>
    );
  }
}
