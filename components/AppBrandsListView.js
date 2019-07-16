import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList
} from "react-native";
import { Card, Rating, Badge } from "react-native-elements";
export default class AppBrandsListView extends Component {
  constructor(props) {
    super(props);
  }
  franchisePress(franchiseId, franchiseDistance) {
    this.props.franchiseOnPress(franchiseId, franchiseDistance);
  }

  _handleLoadMore(){
    console.log("loadMore triggered inside component")
    this.props.loadMore()
  }
  render() {
    let dimensions = Dimensions.get("window");
    return (
      <View style={{ flex: 1 }}>
        {this.props.dataLoading ? (
          <View style={{ marginTop: 150, alignItems: "center", fontSize: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", color:"#000"}}>{`Loading ${this.props.selectedTab === 0 ? "Deals" : "Franchises"} Near You`}</Text>
            <ActivityIndicator
              size="large"
              color="#000"
            />
          </View>
        ) : this.props.data.length === 0 ? (
          <View style={{ marginTop: 170, alignItems: "center" }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", color:"#000"}} >
            {`No ${
              this.props.selectedTab === 0 ? "Deals" : "Franchises"
            }  within the Range of 35 Kms`}
          </Text>
          </View>
        ) : (
          <FlatList
            data={this.props.data}
            showsVerticalScrollIndicator
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 0 }}
            keyExtractor={item => item.typeId.toString()}
            onEndReached={() => this._handleLoadMore()}
            onEndReachedThreshold={0.5}
            renderItem={({item})=> (
              <TouchableOpacity
                  onPress={() => this.franchisePress(item.franchiseId, item.distance.toFixed(3))}
                  activeOpacity={0.6}
                >
                  <Card containerStyle={{ padding: 0 }} >
                    <View style={{ flexDirection: "row", padding: 0 }}>
                      <View
                        style={{ width: dimensions.width * 0.3, padding: 0 }}
                      >
                        <Image
                          style={{ height: 100, width: 100 }}
                          source={{ uri: item.imageUrl }}
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
                          <Text>
                            {item.type == "franchise"
                              ? item.name
                              : item.typeName}
                          </Text>
                          <Text style={{ fontSize: 10 }}>
                            {item.type == "franchise" ? item.address : ""}
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
                            <Badge
                              value={
                                item.type === "franchise"
                                  ? item.distance.toFixed(2)
                                  : item.price
                              }
                              badgeStyle={{
                                height: 25,
                                width: 50,
                                backgroundColor: "#171616"
                              }}
                              textStyle={{ fontSize: 10, color: "#fff" }}
                            />
                            <Text style={{ fontSize: 10 }}>
                              {item.type === "franchise" ? " Km" : " Rs"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
        )}
            >
            )}
          </FlatList>
        )}
      </View>
    );
  }
}
