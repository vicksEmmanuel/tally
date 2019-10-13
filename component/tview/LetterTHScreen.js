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
export default class LetterTHScreen extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: this.props.navigation.state.params.scrollTo,
    };
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREENWIDTH / 2, 0, SCREENWIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp"
    });
    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
      ]
    };
    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREENWIDTH / 2, 0, SCREENWIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: "clamp"
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREENWIDTH / 2, 0, SCREENWIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: "clamp"
    });
  }
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREENWIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREENWIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start();
        }
      }
    });
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
          height: SCREENHEIGHT,
          width: SCREENWIDTH
        }}
      >
        {this.props.navigation.state.params.unit
          .map((item, i) => {
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
            if (i < this.state.currentIndex) {
              return null;
            } else if (i === this.state.currentIndex) {
              return (
                <Animated.View
                  {...this.panResponder.panHandlers}
                  style={[
                    this.rotateAndTranslate,
                    {
                      margin: 0,
                      padding: 0,
                      width: SCREENWIDTH,
                      height: SCREENHEIGHT,
                      position: "absolute"
                    }
                  ]}
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
                        {item.word}
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              );
            } else {
              return (
                <Animated.View
                  style={[
                    {
                      transform: [{ scale: this.nextCardScale }],
                      opacity: this.nextCardOpacity,
                      margin: 0,
                      padding: 0,
                      width: SCREENWIDTH,
                      height: SCREENHEIGHT,
                      position: "absolute"
                    }
                  ]}
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
                        {item.word}
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              );
            }
          })
          .reverse()}
      </View>
    );
  }
}
