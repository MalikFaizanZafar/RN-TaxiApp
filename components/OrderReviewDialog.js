import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  Modal,
  TouchableHighlight,
  Alert,
  Dimensions
} from "react-native";
import { Input, Rating,Button } from "react-native-elements";
export default class OrderReviewDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      rating: 0,
      reviewDialogVisible: false,
      addingReview: false
    };
  }
  setModalVisible() {
    this.setState({ reviewDialogVisible: false });
    this.props.closeReviewDialog();
  }
  ratingCompleted(rating) {
    console.log("Rating is: " + rating);
  }

  render() {
    let dimensions = Dimensions.get('window')
    this.state.reviewDialogVisible = this.props.reviewDialogVisible;
    return (
      <View>
        <Modal
          style={{ justifyContent: "center", alignItems: "center" }}
          animationType="slide"
          transparent={false}
          visible={this.state.reviewDialogVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 150 }}>
            <View>
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
                  multiline={true}
                  placeholder="Write a Review"
                  maxLength={50}
                  onChangeText={value => {
                    this.setState({ review: value });
                  }}
                />
                <Rating
                  onFinishRating={this.ratingCompleted}
                  style={{ paddingVertical: 10 }}
                />
              </View>
              {this.state.addingReview ? (
                <ActivityIndicator
                  size="large"
                  color="#000"
                  style={{ marginTop: 80 }}
                />
              ) : (
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible();
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
                      buttonStyle={{ width: "40%", marginLeft:"30%"}}
                      // disabled={this.isSaveDisabled()}
                      onPress={() => {
                        console.log("Save Pressed");
                      }}
                    />
                  </View>
                </TouchableHighlight>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
