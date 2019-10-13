import React, { Component } from "react";
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
  StatusBar,
  TouchableHighlight,
  LayoutAnimation,
  UIManager,
  Platform
} from "react-native";
import {
  Africa,
  Oceania,
  Europe,
  Asia,
  NorthAmerica,
  SouthAmerica
} from "../../realm/data";
import { grayUp } from "../../actions/realmAction";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation
} from "react-native-popup-dialog";
import { One, Two, Three, Four, Five } from "../svg/Tally";
import Svg, { G, Path, Circle, Rect } from "react-native-svg";
import { MathTHScreen } from "../screen";

class ArithmeticView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false,
      expanded: false,
      top: 0,
      answer: "",
      bottom: 0,
      sign: "",
      view: <View />,
      colorExpanded: false,
      color: "#373045",
      text: true,
      count: props.navigation.state.params.math.count,
      viewPrepared: props.graySlate.slimView,
      active: "All"
    };
  }
  activeData() {
    let newData = this.props.navigation.state.params.newData;
    switch (this.state.active) {
      case "All":
        return newData;
      case "Addition":
        const add = newData.filter(item => {
          return item.sign === "+";
        });
        return add;
      case "Subtraction":
        const sub = newData.filter(item => {
          return item.sign === "-";
        });
        return sub;
      case "Multiplication":
        const times = newData.filter(item => {
          return item.sign === "*";
        });
        return times;
      case "Division":
        const division = newData.filter(item => {
          return item.sign === "/";
        });
        return division;
      default:
        return newData;
    }
  }
  changeActive(activate) {
    if (this.state.active !== activate) {
      this.setState({
        active: activate
      });
    }
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitleStyle = {
      fontSize: 10,
      textAlign: "center",
      alignItems: "center",
      color: "slategray"
    };
    let headerStyle = {
      shadowColor: "transparent",
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(23,23,23, 0.4)",
      backgroundColor: "#f8f8fc"
    };
    let header = <View />;
    return { headerStyle, headerTitleStyle, header };
  };
  changeLayout() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      expanded: !this.state.expanded,
      view: null
    });
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
      let x = Math.ceil(num / 5);
      const tallyPrepare = [];
      for (let p = 1; p <= x; p++) {
        let viewTally = <View />;
        if (p === x) {
          viewTally = tallize(num - Math.floor(num / 5) * 5);
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
  mathExpression() {
    if (
      String(this.state.top).includes(".") ||
      String(this.state.bottom).includes(".")
    ) {
      return <View />;
    } else {
      let topLength = String(this.state.top).split("").length;
      let bottomLength = String(this.state.bottom).split("").length;
      let topHandler = null;
      let bottomHandler = null;
      if (topLength > bottomLength) {
        let top = String(this.state.top).split("");
        let bottom = new Array(topLength);
        if (topLength - bottomLength === 1) {
          const temp = String(this.state.bottom).split("");
          for (let i = 0; i < bottom.length; i++) {
            if (i === 0) {
              bottom[i] = "^";
            } else {
              bottom[i] = temp[i - 1];
            }
          }
        } else if (topLength - bottomLength === 2) {
          const temp = String(this.state.bottom).split("");
          for (let i = 0; i < bottom.length; i++) {
            if (i === 0) {
              bottom[i] = "^";
            } else if (i === 1) {
              bottom[i] = "^";
            } else {
              bottom[i] = temp[i - 2];
            }
          }
        }
        topHandler = top;
        bottomHandler = bottom;
      } else if (topLength === bottomLength) {
        let top = String(this.state.top).split("");
        let bottom = String(this.state.bottom).split("");
        topHandler = top;
        bottomHandler = bottom;
      } else if (topLength < bottomLength) {
        let bottom = String(this.state.bottom).split("");
        let top = new Array(bottomLength);
        if (bottomLength - topLength === 1) {
          const temp = String(this.state.top).split("");
          for (let i = 0; i < top.length; i++) {
            if (i === 0) {
              top[i] = "^";
            } else {
              top[i] = temp[i - 1];
            }
          }
        } else if (bottomLength - topLength === 2) {
          const temp = String(this.state.top).split("");
          for (let i = 0; i < top.length; i++) {
            if (i === 0) {
              top[i] = "^";
            } else if (i === 1) {
              top[i] = "^";
            } else {
              top[i] = temp[i - 2];
            }
          }
        }
        topHandler = top;
        bottomHandler = bottom;
      }
      const mapTop = topHandler.map(i => {
        return (
          <View
            style={{
              flexDirection: "row",
              padding: 5,
            }}
          >
            <Text
              style={{
                fontStyle: "italic",
                fontSize: 15,
                textAlign: "right",
                color: "rgb(141,141,140)"
              }}
            />
            <Text
              style={{
                fontSize: 30,
                textAlign: "left",
                fontWeight: "400",
                color: "rgb(141,141,140)"
              }}
            >
              {i === "^" ? ` ` : i}
            </Text>
          </View>
        );
      });
      const mapBottom = bottomHandler.map(i => {
        return (
          <View
            style={{
              flexDirection: "row",
              padding: 5,
            }}
          >
            <Text
              style={{
                fontStyle: "italic",
                fontSize: 15,
                textAlign: "right",
                color: "rgb(141,141,140)"
              }}
            />
            <Text
              style={{
                fontSize: 30,
                textAlign: "left",
                fontWeight: "400",
                color: "rgb(141,141,140)"
              }}
            >
              {i === "^" ? " " : i}
            </Text>
          </View>
        );
      });

      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 60
            }}
          >
            <View
              style={{
                flex: 46,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {mapTop}
            </View>
            <View
              style={{
                flex: 8,
                justifyContent: "center",
                alignItems: "flex-start",
                paddingLeft: 20
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "300",
                  color: "rgb(141,141,140)"
                }}
              >
                {this.state.sign}
              </Text>
            </View>
            <View
              style={{
                flex: 46,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {mapBottom}
            </View>
          </View>
          <View style={{ flex: 40 }} />
        </View>
      );
    }
  }
  displayExpression() {
    if (this.state.expanded) {
      if (this.state.sign === "+") {
        return this.mathExpression();
      } else if (this.state.sign === "-") {
        return <View />;
      } else if (this.state.sign === "*") {
        return <View />;
      } else if (this.state.sign === "/") {
        return <View />;
      }
    } else {
      return <View />;
    }
  }
  arithmeticsSlide() {
    if (this.state.expanded) {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 1
            }}
          >
            <Svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="50px"
              height="20px"
              viewBox="0 0 401.991 401.991"
              style="enable-background:new 0 0 401.991 401.991;"
              fill="rgba(141,141,140, 0.9)"
            >
              <G>
                <Path
                  d="M394,154.174c-5.331-5.33-11.806-7.995-19.417-7.995H27.406c-7.611,0-14.084,2.665-19.414,7.995
		C2.662,159.503,0,165.972,0,173.587v54.82c0,7.617,2.662,14.086,7.992,19.41c5.33,5.332,11.803,7.994,19.414,7.994h347.176
		c7.611,0,14.086-2.662,19.417-7.994c5.325-5.324,7.991-11.793,7.991-19.41v-54.82C401.991,165.972,399.332,159.5,394,154.174z"
                />
              </G>
              <G />
              <G />
              <G />
              <G />
              <G />
              <G />
              <G />
              <G />
              <G />
              <G />
              <G />
              <G />
              <G />
              <G />
              <G />
            </Svg>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 1
            }}
          >
            <View
              style={{
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                width: "90%",
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "rgb(141,141,140)",
                height: 200
              }}
            >
              {this.displayExpression()}
            </View>
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }
  render() {
    const SCREENHEIGHT = Dimensions.get("screen").height;
    let containerStyle = sub => {
      let backgroundColor =
        this.state.active === sub ? "rgb(0,93,164)" : "white";
      return {
        backgroundColor,
        borderRightWidth: 1,
        borderRightColor: "rgb(0,93,164)",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        paddingLeft: 4,
        paddingRight: 4
      };
    };
    let textStyle = sub => {
      let color = this.state.active === sub ? "white" : "rgb(0,93,164)";
      return {
        color: color,
        fontSize: 10,
        padding: 2
      };
    };
    const fullNames = [
      "Addition",
      "Subtraction",
      "Multiplication",
      "Division",
      "All"
    ];
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            paddingTop: 3,
            opacity: !this.state.expanded ? 1 : 0.5
          }}
        >
          <View
            style={{ flex: 20, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              style={{
                width: 15,
                height: 15,
                borderRadius: 50
              }}
              onPress={() => {
                if (!this.state.expanded) {
                  this.props.navigation.goBack();
                }
              }}
            >
              <Svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 512.008 512.008"
                style="enable-background:new 0 0 512.008 512.008;"
                width={15}
                height={15}
                fill="rgb(0,93,164)"
                style={{
                  top: -2
                }}
              >
                <G>
                  <G>
                    <Path
                      d="M384.001,53.333V10.667c0-4.354-2.646-8.281-6.688-9.896C376.022,0.25,374.668,0,373.335,0
    c-2.854,0-5.646,1.146-7.708,3.292L130.96,248.625c-3.937,4.125-3.937,10.625,0,14.75l234.667,245.333
    c3.021,3.146,7.646,4.167,11.688,2.521c4.042-1.615,6.688-5.542,6.688-9.896v-42.667c0-2.729-1.042-5.354-2.917-7.333L196.022,256
    L381.085,60.667C382.96,58.688,384.001,56.063,384.001,53.333z"
                    />
                  </G>
                </G>
                <G />
                <G />
                <G />
                <G />
                <G />
                <G />
                <G />
                <G />
                <G />
                <G />
                <G />
                <G />
                <G />
                <G />
                <G />
              </Svg>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 80
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "rgb(0,93,164)",
                borderRadius: 2,
                flexDirection: "row"
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  if (!this.state.expanded) {
                    this.changeActive(fullNames[4]);
                  }
                }}
                style={{ width: 40, height: 20 }}
              >
                <View style={containerStyle(fullNames[4])}>
                  <Text style={textStyle(fullNames[4])}>
                    {this.state.active === fullNames[4] ? fullNames[4] : "A"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={{ width: 40, height: 20 }}
                onPress={() => {
                  if (!this.state.expanded) {
                    this.changeActive(fullNames[0]);
                  }
                }}
              >
                <View style={containerStyle(fullNames[0])}>
                  <Text style={textStyle(fullNames[0])}>
                    {this.state.active === fullNames[0] ? fullNames[0] : "+"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={{ width: 40, height: 20 }}
                onPress={() => {
                  if (!this.state.expanded) {
                    this.changeActive(fullNames[1]);
                  }
                }}
              >
                <View style={containerStyle(fullNames[1])}>
                  <Text style={textStyle(fullNames[1])}>
                    {this.state.active === fullNames[1] ? fullNames[1] : "-"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={{ width: 40, height: 20 }}
                onPress={() => {
                  if (!this.state.expanded) {
                    this.changeActive(fullNames[2]);
                  }
                }}
              >
                <View style={containerStyle(fullNames[2])}>
                  <Text style={textStyle(fullNames[2])}>
                    {this.state.active === fullNames[2] ? fullNames[2] : "*"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={{ width: 40, height: 20 }}
                onPress={() => {
                  if (!this.state.expanded) {
                    this.changeActive(fullNames[3]);
                  }
                }}
              >
                <View style={containerStyle(fullNames[3])}>
                  <Text style={textStyle(fullNames[3])}>
                    {this.state.active === fullNames[3] ? fullNames[3] : "/"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <FlatList
          data={this.activeData()}
          style={{
            flex: 80,
            paddingLeft: 10,
            opacity: !this.state.expanded ? 1 : 0.5
          }}
          numColumns={2}
          initialNumToRender={10}
          renderItem={({ item, index }) => {
            let backgroundColor = id => {
              const colors = [
                "#fc5b46",
                "#ff4438",
                "#ff4438",
                "rgb(252,206,16)",
                "#e0767f",
                "#b5a8a9",
                "#212121"
              ];

              return "rgb(0,93,164)";
            };
            return (
              <TouchableOpacity
                activeOpacity={!this.state.expanded ? 1 : 0.95}
                onPress={() => {
                  if (!this.state.expanded) {
                    this.setState(
                      {
                        top: item.x,
                        sign: item.sign,
                        bottom: item.y,
                        answer: item.ans
                      },
                      () => {
                        this.changeLayout();
                      }
                    );
                  }
                }}
                style={{
                  width: Dimensions.get("screen").width / 2 - 15,
                  padding: 2,
                  height: Dimensions.get("screen").height / 8,
                  borderRadius: 4,
                  margin: 3,
                  justifyContent: "center",
                  backgroundColor: backgroundColor(item.id),
                  color: "white",
                  flexDirection: "row",
                  flex: 1,
                  flexWrap: "nowrap",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    marginRight: 2,
                    textAlign: "center",
                    alignSelf: "center"
                  }}
                >
                  {item.x} {item.sign} {item.y} = {item.ans}
                </Text>
              </TouchableOpacity>
            );
          }}
          scrollEnabled={!this.state.expanded}
          keyExtractor={(item, index) => item.id}
        />
        <TouchableOpacity
          activeOpacity={1}
          style={{
            position: "absolute",
            borderTopRightRadius: this.state.expanded ? 20 : 0,
            borderTopLeftRadius: this.state.expanded ? 20 : 0,
            top: 50,
            left: 0,
            right: 0,
            width: "100%",
            backgroundColor: "white",
            borderTopWidth: this.state.expanded ? 5 : 0,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderTopColor: this.state.expanded ? "rgb(141,141,140)" : "white",
            height: this.state.expanded ? SCREENHEIGHT : 0
          }}
        >
          {this.arithmeticsSlide()}
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    graySlate: {
      view: state.realm.view,
      slimView: state.realm.slimView
    }
  };
};
const mapDispatchToProps = dispatch => {
  return {
    graySlateEditor: (x, y) => dispatch(grayUp(x, y))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArithmeticView);
