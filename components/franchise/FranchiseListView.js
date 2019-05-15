import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView
} from "react-native";
import { Card, Rating, Badge } from "react-native-elements";
export default class FranchiseListView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let dimensions = Dimensions.get("window");
    return (
      <View>
       <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 0 }}
            >
              {this.props.data.map((datum, i) => {
                return (
                  <Card containerStyle={{ padding: 0 }} key={i} >
                    <View style={{ flexDirection: "row", padding: 0 }}>
                      <View
                        style={{ width: dimensions.width * 0.3, padding: 0 }}
                      >
                        <Image
                          style={{ height: 100, width: 100 }}
                          source={{ uri: datum.image_url }}
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
                          <Text>{ datum.name}</Text>
                          <Text style={{ fontSize: 10 }}>{ datum.description }</Text>
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
                              value={datum.price}
                              badgeStyle={{
                                height: 25,
                                width: 50,
                                backgroundColor: "#171616"
                              }}
                              textStyle={{ fontSize: 10, color: "#fff" }}
                            />
                            <Text style={{ fontSize: 10}}>Rs </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Card>
                );
              })}
            </ScrollView>
      </View>
    );
  }
}
