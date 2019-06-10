import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  Button,
  Text,
  Modal,
  TouchableHighlight,
  Alert
} from "react-native";
import signUser from "../services/signUser";
import { Avatar, Input } from "react-native-elements";
import RadioForm from "react-native-simple-radio-button";
import DatePicker from "react-native-datepicker";
export default class UserMoreInfoDialog extends Component {
  constructor(props){
    super(props)
    this.state = {
      phone: "",
      gender: "",
      birthday: "",
      signupLoading: false,
      modalVisible: false
    }
  }
  storeDataToStorage = async userData => {
    await storeUserData("info", JSON.stringify(userData));
    await storeUserData("auth", "1");
  };
  isSaveDisabled() {
    if (
      this.state.phone === "" ||
      this.state.birthday === "" ||
      this.state.gender === ""
    ) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <Modal
        style={{ justifyContent: "center", alignItems: "center" }}
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{ marginTop: 150 }}>
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Avatar
                rounded
                size="large"
                title={this.props.userInfo.name}
                source={{
                  uri: this.props.userInfo.photo
                }}
              />
              <Text style={{ marginTop: 10 }}>{this.props.userInfo.name}</Text>
              <Text style={{ marginTop: 5 }}>{this.props.userInfo.email}</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40,
                marginLeft: 20,
                width: 320
              }}
            >
              <Input
                placeholder="Your Phone Number"
                keyboardType="numeric"
                onChangeText={value => {
                  this.setState({ phone: value });
                }}
              />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <DatePicker
                style={{ width: 300, marginTop: 20 }}
                date={this.state.birthday}
                mode="date"
                placeholder="Your Date of Birth"
                format="DD-MM-YYYY"
                minDate="01-01-1950"
                maxDate="01-01-2030"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 0
                  }
                }}
                onDateChange={date => {
                  this.setState({ birthday: date });
                }}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                marginTop: 20,
                flexDirection: "row",
                marginLeft: 30
              }}
            >
              <Text style={{ width: "30%" }}>Your Gender</Text>
              <RadioForm
                style={{ width: "70%" }}
                radio_props={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" }
                ]}
                formHorizontal={true}
                labelStyle={{ padding: 5 }}
                initial={"Male"}
                onPress={value => {
                  this.setState({ gender: value });
                }}
              />
            </View>
            {this.state.signupLoading ? (
              <ActivityIndicator
                size="large"
                color="#000"
                style={{ marginTop: 80 }}
              />
            ) : (
              <TouchableHighlight
                onPress={() => {
                  this.props.setModal(!this.state.modalVisible) 
                  // this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <View
                  style={{
                    marginTop: 40,
                    marginLeft: 20,
                    width: 320
                  }}
                >
                  <Button
                    title="Save"
                    disabled={this.isSaveDisabled()}
                    onPress={() => {
                      this.setState({ signupLoading: true });
                      let stateData = this.state;
                      let user = {
                        ...this.props.userInfo,
                        phone: stateData.phone,
                        gender: stateData.gender,
                        birthday: stateData.birthday
                      };
                      // console.log("user is ; ", user);
                      signUser(user)
                        .then(res => {
                          console.log("Server Resonse is : ", res);
                          this.storeDataToStorage(res.data.data);
                          this.setState({ signupLoading: true })
                          this.setState({ modalVisible: false});
                          this.props.moreInfoDone(true)
                        })
                        .catch(msg2 => {
                          console.log("msg 2 is ; ", msg2);
                          this.props.moreInfoDone(false)
                        });
                    }}
                  />
                </View>
              </TouchableHighlight>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}
