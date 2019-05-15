import React, { Component } from 'react'
import { View, Text, Image,Dimensions } from "react-native";
import { Card, Rating } from "react-native-elements";
export default class FranchiseInfoCard extends Component {
  render() {
    let dimensions = Dimensions.get("window");
    const franchiseInfo = this.props.franchiseInfo
    return (
      <View >
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
                  <Text style={{ marginTop: 20, fontWeight: "bold"}}>
                    {franchiseInfo.brandName}
                  </Text>
                  <Text style={{ fontSize: 10, marginTop: 1 }}>
                    { franchiseInfo.welcomeNote}
                  </Text>
                  <Rating imageSize={16} readonly startingValue={3} />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 15,
                      marginLeft: 140
                    }}
                  >
                  </View>
                </View>
              </View>
            </View>
          </Card>
        </View>
    )
  }
}
