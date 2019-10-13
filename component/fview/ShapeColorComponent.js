import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  LayoutAnimation,
  UIManager,
  Platform,
  ScrollView,
  Image
} from "react-native";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation
} from "react-native-popup-dialog";
import { MapsComponent, FlagsComponent } from "../svg/MapsComponent";
import { LineOne } from "../svg/LineComponent";
import { DrawScreen } from "../screen";
import index from "../../image/flags/index";
import Svg, { G, Path, Circle, Rect } from "react-native-svg";

export class ShapeColorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: <View />,
      color: "#373045",
      first: {
        name: "first",
        long: false
      },
      second: {
        name: "second",
        long: false
      },
      third: {
        name: "third",
        long: false
      },
      fourth: {
        name: "fourth",
        long: false
      }
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  handleOnLongPress(name, long) {
    switch (name) {
      case "first":
        return long === false
          ? {
              backgroundColor: "#ffb200",
              height: 200,
              width: Dimensions.get("screen").width - 5,
              margin: 10,
              marginBottom: 20,
              padding: 10,
              borderRadius: 12,
              borderBottomWidth: 4,
              borderBottomColor: "rgba(255, 165, 0, 0.4)"
            }
          : {
              backgroundColor: "#ffb200",
              height: 210,
              width: Dimensions.get("screen").width - 5,
              margin: 5,
              marginBottom: 20,
              padding: 10,
              borderRadius: 12,
              borderBottomWidth: 4,
              borderBottomColor: "rgba(255, 165, 0, 0.4)"
            };
      case "second":
        return long === false
          ? {
              backgroundColor: "#ff00a2",
              height: 200,
              width: Dimensions.get("screen").width - 5,
              margin: 10,
              padding: 10,
              borderRadius: 12,
              borderBottomWidth: 4,
              borderBottomColor: "rgba(162, 0, 255, 0.4)"
            }
          : {
              backgroundColor: "#ff00a2",
              height: 210,
              width: Dimensions.get("screen").width - 5,
              margin: 5,
              padding: 10,
              borderRadius: 12,
              borderBottomWidth: 4,
              borderBottomColor: "rgba(162, 0, 255, 0.4)"
            };
      case "third":
        return long === false
          ? {
              backgroundColor: "#00a2ff",
              height: 200,
              width: Dimensions.get("screen").width - 5,
              margin: 10,
              padding: 10,
              borderRadius: 12,
              borderBottomWidth: 4,
              borderBottomColor: "rgba(162, 0, 255, 0.4)"
            }
          : {
              backgroundColor: "#00a2ff",
              height: 210,
              width: Dimensions.get("screen").width - 5,
              margin: 5,
              padding: 10,
              borderRadius: 12,
              borderBottomWidth: 4,
              borderBottomColor: "rgba(162, 0, 255, 0.4)"
            };
      case "fourth":
        return long === false
          ? {
              backgroundColor: "#a2ff00",
              height: 200,
              width: Dimensions.get("screen").width - 5,
              margin: 10,
              padding: 10,
              borderRadius: 12,
              borderBottomWidth: 4,
              borderBottomColor: "rgba(162, 255, 0, 0.4)"
            }
          : {
              backgroundColor: "#a2ff00",
              height: 210,
              width: Dimensions.get("screen").width - 5,
              margin: 5,
              padding: 10,
              borderRadius: 12,
              borderBottomWidth: 4,
              borderBottomColor: "rgba(162, 255, 0, 0.4)"
            };
      default:
        return null;
    }
  }
  render() {
    const SCREENHEIGHT = Dimensions.get("screen").height;
    return (
      <Animated.View
        style={{
          flex: 1,
          padding: 2,
          marginTop: 10
        }}
      >
        <TouchableOpacity
          activeOpacity={0.95}
          onPressIn={() => {
            this.setState({
              first: {
                name: "first",
                long: true
              }
            });
          }}
          onPressOut={() => {
            this.setState({
              first: {
                name: "first",
                long: false
              }
            });
          }}
          style={this.handleOnLongPress(
            this.state.first.name,
            this.state.first.long
          )}
        >
          <View
            style={{
              flex: 1
            }}
          >
            <MapsComponent number={Math.floor(Math.random() * 2) + 1} />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row"
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 30,
                fontWeight: "bold",
                fontFamily: "century gothic"
              }}
            >
              Shapes
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
          >
            <Text
              style={{
                fontFamily: "century gothic",
                fontWeight: "400",
                color: "white",
                fontSize: 15,
                letterSpacing: 2,
                textShadowColor: "rgba(0,0,0,0.4)",
                textShadowRadius: {
                  width: -1,
                  height: 1
                },
                textShadowRadius: 5
              }}
              numberOfLines={2}
            >
              How things are built
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.95}
          onPressIn={() => {
            this.setState({
              second: {
                name: "second",
                long: true
              }
            });
          }}
          onPressOut={() => {
            this.setState({
              second: {
                name: "second",
                long: false
              }
            });
          }}
          onPress={() => {
            this.props.navigation.navigate(DrawScreen, { ...this.props });
          }}
          style={this.handleOnLongPress(
            this.state.second.name,
            this.state.second.long
          )}
        >
          <View
            style={{
              flex: 1
            }}
          >
            <FlagsComponent {...this.props} />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row"
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 30,
                fontWeight: "bold",
                fontFamily: "century gothic"
              }}
            >
              Color
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
          >
            <Text
              style={{
                fontFamily: "century gothic",
                fontWeight: "400",
                color: "white",
                fontSize: 15,
                letterSpacing: 2,
                textShadowColor: "rgba(0,0,0,0.4)",
                textShadowRadius: {
                  width: -1,
                  height: 1
                },
                textShadowRadius: 5
              }}
              numberOfLines={2}
            >
              Everywhere is colored
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ height: 10, width: Dimensions.get("screen").width }} />
      </Animated.View>
    );
  }
}
