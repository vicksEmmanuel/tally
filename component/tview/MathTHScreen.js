import React, { Component } from "react";
import Svg, { G, Path, Rect } from "react-native-svg";
import { connect } from "react-redux";
import {
  View,
  Animated,
  Image,
  Text,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StatusBar
} from "react-native";
import { One, Two, Three, Four, Five } from "../svg/Tally";

export default class MathTHScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  displayTally(number) {
    const tallize = x => {
      switch (x) {
        case 1:
          return (
            <View>
              <One />
            </View>
          );
        case 2:
          return (
            <View>
              <Two />
            </View>
          );
        case 3:
          return (
            <View>
              <Three />
            </View>
          );
        case 4:
          return (
            <View>
              <Four />
            </View>
          );
        case 0:
          return (
            <View>
              <Five />
            </View>
          );
        default:
          return <View />;
      }
    };
    const displayTallies = num => {
      let x = Math.ceil(num.id / 5);
      const tallyPrepare = [];
      for (let p = 1; p <= x; p++) {
        let viewTally = <View />;
        if (p === x) {
          viewTally = tallize(num.id - Math.floor(num.id / 5) * 5);
        } else {
          viewTally = (
            <View
              style={{
                margin: 2
              }}
            >
              <Five />
            </View>
          );
        }
        tallyPrepare.push(<View key={Date.now()}>{viewTally}</View>);
      }
      return tallyPrepare;
    };
    return displayTallies(number);
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    if (!params.active) {
      params.active = "All";
    }
    let headerTitleStyle = {
      fontSize: 10,
      textAlign: "center",
      alignItems: "center",
      color: "slategray"
    };
    let headerStyle = {
      shadowColor: "transparent",
      elevation: 0
    };
    let header = <View />;
    return { headerStyle, headerTitleStyle, header };
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          height: Dimensions.get("screen").height,
          width: Dimensions.get("screen").width
        }}
      >
        <FlatList
          data={this.props.navigation.state.params.unit}
          style={{
            flex: 1,
            paddingLeft: 10
          }}
          horizontal={true}
          renderItem={({ item, index }) => {
            let backgroundColor = () => {
              const colors = [
                "#fc5b46",
                "#ff4438",
                "#ff4438",
                "rgb(252,206,16)",
                "#e0767f",
                "#b5a8a9",
                "#212121"
              ];

              return colors[Math.floor(Math.random() * 6) + 1];
            };
            return (
              <View
                style={{
                  flex: 1
                }}
              >
                <Animated.View
                  style={{
                    width: Dimensions.get("screen").width,
                    height: Dimensions.get("screen").height,
                    padding: 25
                  }}
                >
                  <View
                    style={{
                      backgroundColor: backgroundColor(),
                      borderRadius: 20,
                      flex: 1,
                      borderBottomWidth: 4,
                      borderRightColor: "rgba(0, 0, 0, 0.4)",
                      borderRightWidth: 4,
                      borderBottomColor: "rgba(0, 0, 0, 0.4)"
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-end",
                        padding: 3,
                        flex: 20
                      }}
                      onPress={() => {
                        this.props.navigation.goBack();
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 30,
                          color: "rgba(225,225,225, 0.6)",
                          fontFamily: "San Serif",
                          marginRight: 10,
                          top: -10
                        }}
                      >
                        x
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        alignItems: "center",
                        flex: 60
                      }}
                    >
                      <Text
                        style={{
                          fontSize: item.id >= 1000 ? 110 : 150,
                          color: "white"
                        }}
                      >
                        {item.id}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 20,
                        flexDirection: "row"
                      }}
                    >
                      <View style={{ flex: 50, padding: 5, flexWrap: "wrap" }}>
                        <ScrollView style={{ flex: 1, width: "100%" }}>
                          <View
                            style={{
                              width: "100%",
                              flexDirection: "row",
                              flexWrap: "wrap"
                            }}
                          >
                            {this.displayTally(item)}
                          </View>
                        </ScrollView>
                      </View>
                      <View style={{ flex: 50, padding: 5, flexWrap: "wrap" }}>
                        <Text
                          style={{ color: "white", fontSize: 20 }}
                          numberOfLines={3}
                        >
                          {item.number}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              </View>
            );
          }}
          initialScrollIndex={this.props.navigation.state.params.scrollTo}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    );
  }
}
