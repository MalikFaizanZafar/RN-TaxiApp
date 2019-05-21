import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Card, Rating, Badge } from "react-native-elements";
export default class FranchiseListView extends Component {
  constructor(props) {
    super(props);
  }
  itemDealPressed = datum => {
    this.props.itemPressHandler(datum);
  };
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
              <TouchableOpacity
                onPress={() => this.itemDealPressed(datum)}
                key={i}
                setActiveOpacity={this.props.selectedTab === 2 ? 1 : 0.8}
              >
                <Card containerStyle={{ padding: 0 }}>
                  <View style={{ flexDirection: "row", padding: 0 }}>
                    {this.props.selectedTab !== 2 ? (
                      <View
                        style={{ width: dimensions.width * 0.3, padding: 0 }}
                      >
                        <Image
                          style={{ height: 100, width: 100 }}
                          source={{ uri: datum.image_url }}
                        />
                      </View>
                    ) : null}
                    <View
                      style={{
                        width:
                          this.props.selectedTab === 2
                            ? dimensions.width
                            : dimensions.width * 0.6,
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
                        <Text>
                          {this.props.selectedTab === 2 ? " " : datum.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            paddingLeft: this.props.selectedTab === 2 ? 5 : 0
                          }}
                        >
                          {this.props.selectedTab === 2
                            ? datum.franchiseReviewNotes
                            : datum.description}
                        </Text>
                        <Rating
                          imageSize={16}
                          readonly
                          style={{
                            marginLeft: this.props.selectedTab === 2 ? 120 : 0,
                            marginTop: this.props.selectedTab === 2 ? 10 : 0
                          }}
                          startingValue={
                            this.props.selectedTab === 2
                              ? datum.franchiseStars
                              : 3
                          }
                        />
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 15,
                            marginLeft: 150
                          }}
                        >
                          <Text style={{ fontSize: 10 }}>
                            {" "}
                            {this.props.selectedTab === 2 ? "" : "Rs"}{" "}
                          </Text>
                          {this.props.selectedTab !== 2 ? (
                            <Badge
                              value={datum.price}
                              badgeStyle={{
                                height: 25,
                                width: 50,
                                backgroundColor: "#171616"
                              }}
                              textStyle={{ fontSize: 10, color: "#fff" }}
                            />
                          ) : null}
                        </View>
                      </View>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
