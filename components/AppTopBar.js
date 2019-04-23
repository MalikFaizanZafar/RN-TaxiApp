import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import {Button } from "react-native-elements";
export default class AppTopBar extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View style={styles.topBar}>
          <View style={styles.topBarIcon}>
          <Button title="|||" type="outline" buttonStyle={{marginLeft: 5,borderWidth:0}} titleStyle={{ fontWeight: 'bold',color: "#fff", fontSize: 25, transform: [{ rotate: '90deg'}]}} onPress={this.props.openSubquchDrawer}/>
          </View>
          <View style={{ marginLeft: 75, marginTop: 5 }}>
            <Image
              style={{ height: 42, width: 150 }}
              source={require("../assets/subquch2.png")}
            />
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#171616",
    flexDirection: "row",
    height: 50
  },
  topBarIcon: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
});


