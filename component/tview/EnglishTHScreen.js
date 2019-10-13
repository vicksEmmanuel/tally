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
  Slider,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  PanResponder,
  StatusBar
} from "react-native";

const SCREENHEIGHT = Dimensions.get("screen").height;
const SCREENWIDTH = Dimensions.get("screen").width;
export default class EnglishTHScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: false
    };
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
  alphabetDescriptionsDisplay(id) {
    const specified = this.props.navigation.state.params.navigation.state.params.english.alphabetDescription.filter(
      each => {
        return each.alphabet === id;
      }
    );
    const view = specified[0].alphabet_desc.map(each => {
      return (
        <Animated.View
          style={{
            height: 80,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Animated.View
              style={{
                height: 32,
                width: 32,
                marginLeft: 10,
                flex: 1
              }}
            />
            <Animated.Text
              style={{
                color: "slategray",
                fontStyle: "italic",
                fontFamily: "century gothic",
                fontSize: 25,
                textAlign: "center",
                flex: 99
              }}
            >
              {each.name}
            </Animated.Text>
          </View>
        </Animated.View>
      );
    });
    return view;
  }
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
            flex: 1
          }}
          horizontal={true}
          renderItem={({ item, index }) => {
            let scrollEnabled = false;
            let scrollOffset = 0;
            let animation = new Animated.ValueXY({
              x: 0,
              y: SCREENHEIGHT - 80
            });
            const animatedHeight = {
              transform: animation.getTranslateTransform()
            };
            let panResponder = PanResponder.create({
              onMoveShouldSetPanResponder: (evt, gestureState) => {
                if (
                  (scrollEnabled && scrollOffset <= 0 && gestureState.dy > 0) ||
                  (!scrollEnabled && gestureState.dy < 0)
                ) {
                  return true;
                }
              },
              onPanResponderGrant: (evt, gestureState) => {
                animation.extractOffset();
              },
              onPanResponderMove: (evt, gestureState) => {
                animation.setValue({ x: 0, y: gestureState.dy });
              },
              onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.moveY > SCREENHEIGHT - 180) {
                  Animated.spring(animation.y, {
                    toValue: 0,
                    tension: 1
                  }).start();
                } else if (gestureState.moveY < 180) {
                  Animated.spring(animation.y, {
                    toValue: 0,
                    tension: 1
                  }).start();
                } else if (gestureState.dy < 0) {
                  scrollEnabled = true;
                  Animated.spring(animation.y, {
                    toValue: -SCREENHEIGHT + 180,
                    tension: 1
                  }).start();
                } else if (gestureState.dy > 0) {
                  scrollEnabled = false;
                  Animated.spring(animation.y, {
                    toValue: SCREENHEIGHT - 180,
                    tension: 1
                  }).start();
                }
              }
            });
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
                    margin: 0,
                    padding: 0
                  }}
                >
                  <View
                    style={{
                      backgroundColor: backgroundColor(),
                      borderTopRadius: 10,
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
                        flex: 80
                      }}
                    >
                      <Text
                        style={{
                          fontSize: item.id >= 1000 ? 110 : 150,
                          color: "white",
                          letterSpacing: 4
                        }}
                      >
                        {item.capital_letter} {item.small_letter}
                      </Text>
                    </View>
                    <Animated.View
                      {...panResponder.panHandlers}
                      style={[
                        animatedHeight,
                        {
                          position: "absolute",
                          left: 0,
                          right: 0,
                          zIndex: 10,
                          backgroundColor: "white",
                          height: SCREENHEIGHT,
                          padding: 1,
                          borderTopRadius: 10
                        }
                      ]}
                    >
                      <ScrollView
                        scrollEnabled={scrollEnabled}
                        scrollEventThrottle={16}
                        onScroll={event => {
                          scrollOffset = event.nativeEvent.contentOffset.y;
                        }}
                      >
                        {this.alphabetDescriptionsDisplay(item.id)}
                      </ScrollView>
                    </Animated.View>
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
