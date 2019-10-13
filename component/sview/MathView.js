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
import {
  Africa,
  Oceania,
  Europe,
  Asia,
  NorthAmerica,
  SouthAmerica
} from "../../realm/data";
import { grayUp } from "../../actions/realmAction";
import { One, Two, Three, Four, Five } from "../svg/Tally";
import { MathTHScreen } from "../screen";

class MathView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: true,
      count: props.navigation.state.params.math.count,
      viewPrepared: props.graySlate.slimView,
      active: "All"
    };
  }
  activeData() {
    switch (this.state.active) {
      case "All":
        return this.props.navigation.state.params.math.count;
      case "Unit":
        const unit = this.props.navigation.state.params.math.count.filter(
          item => {
            return item.id < 10;
          }
        );
        return unit;
      case "Tens":
        const tens = this.props.navigation.state.params.math.count.filter(
          item => {
            return item.id >= 10 && item.id < 100;
          }
        );
        return tens;
      case "Hundred":
        const hundred = this.props.navigation.state.params.math.count.filter(
          item => {
            return item.id >= 100 && item.id < 1000;
          }
        );
        return hundred;
      case "Thousand":
        const thousand = this.props.navigation.state.params.math.count.filter(
          item => {
            return item.id >= 1000;
          }
        );
        return thousand;
      default:
        return this.props.navigation.state.params.math.count;
    }
  }
  changeActive(activate) {
    if (this.state.active !== activate) {
      this.setState({
        active: activate
      });
    }
  }
  changeTextToTally() {
    this.setState(prev => {
      return {
        text: !prev.text
      };
    });
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
  getScrollTo(x, y) {
    return new Promise((resolve, reject) => {
      if (this.state.active === "All" || this.state.active === "Unit") {
        resolve(y - 1);
      } else {
        let i = 0,
          scrollTo = 0;
        for (i; i < x.length; i++) {
          if (x[i].id === y) {
            scrollTo = i;
            break;
          }
        }
        resolve(scrollTo);
      }
    });
  }
  render() {
    let containerStyle = sub => {
      let backgroundColor = this.state.active === sub ? "#fd6600" : "white";
      return {
        backgroundColor,
        borderRightWidth: 1,
        borderRightColor: "#fd6600",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        paddingLeft: 4,
        paddingRight: 4
      };
    };
    let textStyle = sub => {
      let color = this.state.active === sub ? "white" : "#fd6600";
      return {
        color: color,
        fontSize: 10,
        padding: 2
      };
    };
    const fullNames = ["Unit", "Tens", "Hundred", "Thousand", "All"];
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
            flexDirection: "row"
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
                this.props.navigation.goBack();
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
                fill="#fd6600"
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
              flex: 60
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "#fd6600",
                borderRadius: 2,
                flexDirection: "row"
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  this.changeActive(fullNames[4]);
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
                  this.changeActive(fullNames[0]);
                }}
              >
                <View style={containerStyle(fullNames[0])}>
                  <Text style={textStyle(fullNames[0])}>
                    {this.state.active === fullNames[0] ? fullNames[0] : "U"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={{ width: 40, height: 20 }}
                onPress={() => {
                  this.changeActive(fullNames[1]);
                }}
              >
                <View style={containerStyle(fullNames[1])}>
                  <Text style={textStyle(fullNames[1])}>
                    {this.state.active === fullNames[1] ? fullNames[1] : "T"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={{ width: 40, height: 20 }}
                onPress={() => {
                  this.changeActive(fullNames[2]);
                }}
              >
                <View style={containerStyle(fullNames[2])}>
                  <Text style={textStyle(fullNames[2])}>
                    {this.state.active === fullNames[2] ? fullNames[2] : "H"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={{ width: 40, height: 20 }}
                onPress={() => {
                  this.changeActive(fullNames[3]);
                }}
              >
                <View style={containerStyle(fullNames[3])}>
                  <Text style={textStyle(fullNames[3])}>
                    {this.state.active === fullNames[3] ? fullNames[3] : "TH"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <TouchableWithoutFeedback
            style={{
              flex: 20
            }}
            onPress={() => {
              this.changeTextToTally();
            }}
          >
            <Svg
              version="1.1"
              width={30}
              height={30}
              style={{
                backgroundColor: "orange",
                fill: "white"
              }}
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style="enable-background:new 0 0 512 512;"
              fill="blue"
            >
              <G>
                <G>
                  <G>
                    <Path
                      d="M452.162,178.676c-0.046-0.754-0.195-1.499-0.441-2.214c-0.08-0.268-0.174-0.533-0.282-0.792
				c-0.403-0.928-0.969-1.776-1.672-2.503l-59.733-59.733c-1.496-1.391-3.42-2.232-5.457-2.385
				c-0.198-0.014-0.377-0.115-0.577-0.115H264.533V8.533C264.533,3.82,260.713,0,256,0c-4.713,0-8.533,3.82-8.533,8.533v102.4H128
				c-0.191,0-0.361,0.097-0.551,0.109c-0.741,0.047-1.472,0.193-2.175,0.433c-0.275,0.082-0.545,0.178-0.809,0.288
				c-0.926,0.402-1.772,0.968-2.498,1.67l-59.733,59.733c-1.403,1.509-2.248,3.452-2.395,5.507
				c-0.011,0.181-0.105,0.344-0.105,0.526V384c0.011,9.421,7.645,17.056,17.067,17.067h170.667v102.4
				c0,4.713,3.82,8.533,8.533,8.533c4.713,0,8.533-3.82,8.533-8.533v-102.4H435.2c9.421-0.011,17.056-7.646,17.067-17.067V179.2
				C452.267,179.018,452.173,178.856,452.162,178.676z M119.467,140.067v30.6h-30.6L119.467,140.067z M247.467,384H76.8V187.733
				h42.667c9.421-0.011,17.056-7.645,17.067-17.067V128h110.933V384z M392.533,140.067l30.6,30.6h-30.6V140.067z M435.2,384H264.533
				V128h110.933v42.667c0.011,9.421,7.645,17.056,17.067,17.067H435.2V384z"
                    />
                    <Path
                      d="M131.465,269.853L120.2,295.2c-1.912,4.307,0.028,9.348,4.333,11.262c1.087,0.489,2.266,0.742,3.458,0.742
				c3.376,0.001,6.436-1.986,7.808-5.071l9.127-20.533h34.415l9.126,20.533c1.372,3.084,4.432,5.072,7.808,5.071
				c1.192,0,2.371-0.253,3.458-0.742c4.306-1.914,6.245-6.956,4.333-11.262l-11.264-25.345l-0.101-0.227L169.933,218.4
				c-0.221-0.373-0.472-0.727-0.751-1.059c-0.555-1.135-1.48-2.048-2.623-2.589c-0.303-0.25-0.623-0.478-0.959-0.681
				c-0.065-0.029-0.134-0.017-0.199-0.044c-0.617-0.215-1.256-0.358-1.906-0.426c-0.884-0.321-1.854-0.319-2.737,0.004
				c-0.638,0.068-1.267,0.208-1.874,0.417c-0.071,0.03-0.147,0.017-0.218,0.048c-0.366,0.218-0.714,0.465-1.041,0.738
				c-1.121,0.545-2.025,1.451-2.567,2.573h0c-0.268,0.32-0.51,0.66-0.725,1.018l-22.769,51.231L131.465,269.853z M162.133,242.883
				l9.622,21.65h-19.245L162.133,242.883z"
                    />
                    <Path
                      d="M358.4,213.333h-34.133c-2.263-0.001-4.434,0.898-6.035,2.499c-1.6,1.6-2.499,3.771-2.499,6.035v76.8
				c-0.001,2.263,0.898,4.434,2.499,6.035c1.6,1.6,3.771,2.499,6.035,2.499h29.867c11.828,0.049,22.561-6.914,27.336-17.736
				c4.775-10.822,2.683-23.444-5.327-32.147c5.014-4.802,7.852-11.441,7.857-18.383C383.985,224.801,372.532,213.349,358.4,213.333z
				 M354.133,290.133H332.8v-25.6h21.333c7.069,0,12.8,5.731,12.8,12.8C366.933,284.403,361.203,290.133,354.133,290.133z
				 M358.4,247.467h-25.6V230.4h25.6c4.713,0,8.533,3.82,8.533,8.533S363.113,247.467,358.4,247.467z"
                    />
                  </G>
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
          </TouchableWithoutFeedback>
        </View>
        <FlatList
          data={this.activeData()}
          style={{
            flex: 80,
            paddingLeft: 10
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

              return "rgb(252,206,16)";
            };
            let volume = this.activeData();
            return (
              <TouchableOpacity
                onPress={() => {
                  this.getScrollTo(volume, item.id).then(scrollUp => {
                    this.props.navigation.navigate(MathTHScreen, {
                      ...this.props,
                      data: item,
                      unit: volume,
                      scrollTo: scrollUp
                    });
                  });
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
                  flexWrap: "nowrap"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 30,
                    marginRight: 2
                  }}
                >
                  {item.id}
                </Text>
                {this.state.text === true ? (
                  <Text
                    style={{
                      color: "white",
                      fontSize: 10,
                      width: 50,
                      flexWrap: "wrap"
                    }}
                    numberOfLines={3}
                  >
                    {item.number}
                  </Text>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      flexWrap: "nowrap"
                    }}
                    key={Date.now()}
                  >
                    {this.displayTally(item)}
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => item.id}
        />
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
)(MathView);
