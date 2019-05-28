import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import { Card, Rating } from "react-native-elements";
import { franchiseCheckin } from "../../services/franchiseCheckin";
import { getUser } from "../../services/getUser";
export default class FranchiseInfoCard extends Component {
  viewMapPressed(latitude, longitude) {
    this.props.viewMapPressed(latitude, longitude);
  }
  checkInHandler() {
    getUser().then(user => {
      franchiseCheckin(user.userId, this.props.franchiseInfo.id).then(
        checkinRes => {
          Alert.alert(
            "SubQuch Alert ",
            "A Notification Has Been Sent to This Franchise About Your Checkin ",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
      );
    });
  }
  render() {
    let dimensions = Dimensions.get("window");
    const franchiseInfo = this.props.franchiseInfo;
    return (
      <View>
          <Card containerStyle={{ padding: 0 }}>
            <View style={{ flexDirection: "row", padding: 0 }}>
              <View style={{ padding: 0 }}>
                <Image
                  style={{ height: 100, width: 100 }}
                  source={{ uri: franchiseInfo.logo }}
                />
              </View>
              <View
                style={{
                  width: dimensions.width * 0.6,
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  paddingLeft: 10
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ marginTop: 20, fontWeight: "bold" }}>
                    {franchiseInfo.brandName}
                  </Text>
                  <Text style={{ fontSize: 10, marginTop: 1 }}>
                    {franchiseInfo.welcomeNote}
                  </Text>
                  <Rating imageSize={16} readonly startingValue={3} />
                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <TouchableOpacity onPress={() => this.checkInHandler()}>
                      <View style={{ justifyContent: "flex-end" }}>
                        <Text
                          style={{
                            color: "#03a9f4",
                            fontSize: 12,
                            marginBottom: 25
                          }}
                        >
                          Check In
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.viewMapPressed(
                          franchiseInfo.latitude,
                          franchiseInfo.longitude
                        )
                      }
                    >
                      <View style={{ justifyContent: "flex-end" }}>
                        <Text
                          style={{
                            color: "#03a9f4",
                            fontSize: 12,
                            marginBottom: 25,
                            marginLeft: 25
                          }}
                        >
                          View Map
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Card>
      </View>
    );
  }
}
