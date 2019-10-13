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
import { LetterTHScreen } from "../screen";

class LetterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: true,
      viewPrepared: props.graySlate.slimView,
      active: "All"
    };
  }
  activeData() {
    switch (this.state.active) {
      case "All":
        return this.props.navigation.state.params.english.letter;
      case "2 Letters":
        const twoLetters = this.props.navigation.state.params.english.letter.filter(
          item => {
            return item.type === 2;
          }
        );
        return twoLetters;
      case "3 Letters":
        const threeLetters = this.props.navigation.state.params.english.letter.filter(
          item => {
            return item.type === 3;
          }
        );
        return threeLetters;
      case "4 Letters":
        const fourLetters = this.props.navigation.state.params.english.letter.filter(
          item => {
            return item.type === 4;
          }
        );
        return fourLetters;
      case "5 Letters":
        const fiveLetters = this.props.navigation.state.params.english.letter.filter(
          item => {
            return item.type === 5;
          }
        );
        return fiveLetters;
      case "6 Letters":
        const sixLetters = this.props.navigation.state.params.english.letter.filter(
          item => {
            return item.type === 6;
          }
        );
        return sixLetters;
      default:
        return this.props.navigation.state.params.english.letter;
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
  getScrollTo(x, y) {
    return new Promise((resolve, reject) => {
      if (this.state.active === "All") {
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
      let backgroundColor = this.state.active === sub ? "#ff00a2" : "white";
      return {
        backgroundColor,
        borderRightWidth: 1,
        borderRightColor: "#ff00a2",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        paddingLeft: 4,
        paddingRight: 4
      };
    };
    let textStyle = sub => {
      let color = this.state.active === sub ? "white" : "#ff00a2";
      return {
        color: color,
        fontSize: 10,
        padding: 2
      };
    };
    const fullNames = [
      "2 Letters",
      "3 Letters",
      "4 Letters",
      "5 Letters",
      "6 Letters",
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
                fill="#ff00a2"
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
                borderColor: "#ff00a2",
                borderRadius: 2,
                flexDirection: "row"
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  this.changeActive(fullNames[5]);
                }}
                style={{ width: 40, height: 20 }}
              >
                <View style={containerStyle(fullNames[5])}>
                  <Text style={textStyle(fullNames[5])}>
                    {this.state.active === fullNames[5] ? fullNames[5] : "All"}
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
                    {this.state.active === fullNames[0] ? fullNames[0] : "2"}
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
                    {this.state.active === fullNames[1] ? fullNames[1] : "3"}
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
                    {this.state.active === fullNames[2] ? fullNames[2] : "4"}
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
                    {this.state.active === fullNames[3] ? fullNames[3] : "5"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                style={{ width: 40, height: 20 }}
                onPress={() => {
                  this.changeActive(fullNames[4]);
                }}
              >
                <View style={containerStyle(fullNames[4])}>
                  <Text style={textStyle(fullNames[4])}>
                    {this.state.active === fullNames[4] ? fullNames[4] : "6"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View
            style={{
              flex: 20,
              height: 35
            }}
          />
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

              return "#ff00a2";
            };
            let volume = this.activeData();
            return (
              <TouchableOpacity
                onPress={() => {
                  this.getScrollTo(volume, item.id).then(scrollUp => {
                    this.props.navigation.navigate(LetterTHScreen, {
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
                  backgroundColor: backgroundColor(item.id),
                  color: "white",
                  flexDirection: "row",
                  flex: 1,
                  flexWrap: "nowrap",
                  alignContent: 'flex-start'
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 25,
                    marginRight: 2,
                    letterSpacing: 3,
                    textAlign: 'center',
                    paddingLeft: 5,
                  }}
                >
                  {item.word}
                </Text>
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
)(LetterView);
