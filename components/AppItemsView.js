import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { Card, Rating } from "react-native-elements";
import { Badge } from "react-native-elements";
import axios from 'axios';
export default class AppItemsView extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: [],
      categories: [],
      categoriesLoading: true,
      selectedCategory: -1
    }
  }
  updateIndex(selectedCategory) {
    this.setState({ selectedCategory });
  }

  categoryClicked(id) {
    console.log('categoryClicked', id)
    this.setState({
      selectedCategory: id,
      categoriesLoading: true
    });
    axios.get(`http://192.168.1.12:8000/api/auth/itemcategory/${id}/items`).then(selectedCategoryResponse => {
      console.log('selectedCategoryResponse is', selectedCategoryResponse )
      this.setState({ items : selectedCategoryResponse.data.data, categoriesLoading: false})
    })
  }
  componentDidMount(){
    console.log('componentDidMount')
    axios.get('http://192.168.1.12:8080/api/auth/itemcategory').then(categoriesResponse => {
      this.setState({ categories : categoriesResponse.data.data},() => {
        this.setState({ categoriesLoading : false})
      })
      console.log('categoriesResponse is : ', categoriesResponse)
      axios.get('http://192.168.1.12:8080/api/auth/item').then(itemsResponse => {
        console.log('itemsResponse is : ', itemsResponse)
        this.setState({ items : itemsResponse.data.data}, () => {
          this.setState({categoriesLoading : false})
        })
      })
    })
  }
  render() {
    let dimensions = Dimensions.get("window");
    return (
      <View style={styles.containerItems}>
          {
            this.state.categoriesLoading?<ActivityIndicator size="large" color="#000" style={{ marginTop: 150}} />:(<View><ScrollView
            horizontal={true}
            style={{ height: 45 }}
            showsHorizontalScrollIndicator={false}
          >
            {this.state.categories.map((category, categoryIndex) => {
              return (
                <TouchableHighlight
                  key={categoryIndex}
                  style={
                    this.state.selectedCategory === category.id
                      ? styles.buttonSelected
                      : styles.button
                  }
                  activeOpacity={0.1}
                  color="#f1c40f"
                  onPress={this.categoryClicked.bind(this, category.id)}
                >
                  <Text style={{ color: "#ffffff" }}>{category.name}</Text>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 0 }}
          >
            {this.state.items.map((item, i) => {
              return (
                <Card containerStyle={{ padding: 0 }} key={i}>
                  <View style={{ flexDirection: "row", padding: 0 }}>
                    <View style={{ width: dimensions.width * 0.3, padding: 0 }}>
                      <Image
                        style={{ height: 100, width: 100 }}
                        source={{ uri: item.image_url }}
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
                        <Text>{item.name}</Text>
                        <Text style={{ fontSize: 10 }}>
                          {item.description}
                        </Text>
                        <Rating
                          imageSize={16}
                          readonly
                          startingValue={3}
                        />
                      </View>
                      <View style={{ justifyContent: "flex-end", alignItems: "flex-end"}}>
                        <View style={{ flexDirection: "row",justifyContent: "center", alignItems: "center"}}>
                        <Text style={{ fontSize: 15,marginTop: 60, marginRight: 5 }}>
                          Rs
                        </Text>
                        <Badge value={item.price} 
                          badgeStyle={{ height: 25, width: 45, marginRight:10, marginTop: 60, backgroundColor: "#171616"}}
                          textStyle={{ fontSize: 15, color: "#fff"}} />
                        </View>
                      </View>
                    </View>
                  </View>
                </Card>
              );
            })}
          </ScrollView></View>)
          }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBar: {
    backgroundColor: "#171616",
    flexDirection: "row",
    height: 50
  },
  topBarIcon: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  topBarLogo: {
    alignItems: "center",
    justifyContent: "center"
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#47315a"
  },
  itemText: {
    alignItems: "flex-start",
    justifyContent: "center"
  },
  itemBtn: {
    alignItems: "center",
    justifyContent: "center"
  },
  containerItems: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "#e5e5e5",
    // justifyContent: "center",
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#171616",
    padding: 10,
    width: 100,
    borderRightWidth: 0.25,
    borderColor: "#fff",
    maxHeight: 40
  },
  buttonSelected: {
    alignItems: "center",
    backgroundColor: "#171616",
    padding: 10,
    width: 100,
    borderWidth: 1.5,
    borderColor: "#fff",
    elevation: 20,
    maxHeight: 40
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  icon: {
    width: 24,
    height: 24
  }
});
