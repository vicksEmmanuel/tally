import React, { Component } from "react";
import {
  View,
  Animated,
  Image,
  Text,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar
} from "react-native";
import index from "../../image/flags/index";
import {
  Africa,
  Oceania,
  Europe,
  Asia,
  NorthAmerica,
  SouthAmerica
} from "../../realm/data";
import { RightArrow } from "../svg/RightArrow";
import { FlaggyScreen } from "../screen";

export default class FlagsView extends Component {
  state = {
    title: ""
  };
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
      elevation: 0
    };
    return { headerStyle, headerTitleStyle };
  };

  render() {
    const { navigation } = this.props;
    const width = 15;
    const height = 15;
    const africa = navigation.state.params.map.flag.map(item => {
      let x = index[item.code];
      if (item.continent === Africa) {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.navigate(FlaggyScreen, {
                ...navigation.state.params,
                item
              });
            }}
          >
            <Image
              source={x}
              style={{
                width,
                height,
                margin: 0
              }}
            />
          </TouchableWithoutFeedback>
        );
      }
    });
    const oceania = navigation.state.params.map.flag.map(item => {
      let x = index[item.code];
      if (item.continent === Oceania) {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.navigate(FlaggyScreen, {
                ...navigation.state.params,
                item
              });
            }}
          >
            <Image
              source={x}
              style={{
                width,
                height,
                margin: 0
              }}
            />
          </TouchableWithoutFeedback>
        );
      }
    });
    const asia = navigation.state.params.map.flag.map(item => {
      let x = index[item.code];
      if (item.continent === Asia) {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.navigate(FlaggyScreen, {
                ...navigation.state.params,
                item
              });
            }}
          >
            <Image
              source={x}
              style={{
                width,
                height,
                margin: 0
              }}
            />
          </TouchableWithoutFeedback>
        );
      }
    });
    const northamerica = navigation.state.params.map.flag.map(item => {
      let x = index[item.code];
      if (item.continent === NorthAmerica) {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.navigate(FlaggyScreen, {
                ...navigation.state.params,
                item
              });
            }}
          >
            <Image
              source={x}
              style={{
                width,
                height,
                margin: 0
              }}
            />
          </TouchableWithoutFeedback>
        );
      }
    });
    const southamerica = navigation.state.params.map.flag.map(item => {
      let x = index[item.code];
      if (item.continent === SouthAmerica) {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.navigate(FlaggyScreen, {
                ...navigation.state.params,
                item
              });
            }}
          >
            <Image
              source={x}
              style={{
                width,
                height,
                margin: 0
              }}
            />
          </TouchableWithoutFeedback>
        );
      }
    });
    const europe = navigation.state.params.map.flag.map(item => {
      let x = index[item.code];
      if (item.continent === Europe) {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.navigate(FlaggyScreen, {
                ...navigation.state.params,
                item
              });
            }}
          >
            <Image
              source={x}
              style={{
                width,
                height,
                margin: 0
              }}
            />
          </TouchableWithoutFeedback>
        );
      }
    });
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column"
        }}
      >
        <StatusBar barStyle="light-content" />
        <View
          style={{
            flex: 1,
            marginTop: 10
          }}
        >
          <ScrollView
            maximumZoomScale={3}
            minimumZoomScale={0.2}
            horizontal={false}
            scrollEventThrottle={10}
          >
            <View
              style={{
                marginTop: 10
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  margin: 0
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    margin: 3,
                    padding: 3,
                    marginLeft: 10,
                    fontWeight: "bold"
                  }}
                >
                  Africa
                </Text>
                <TouchableWithoutFeedback
                  style={{
                    flex: 1
                  }}
                >
                  <RightArrow
                    handleClick={() => {
                      this.props.navigation.navigate(FlaggyScreen, {
                        ...this.props,
                        svg: "Africa"
                      });
                    }}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  margin: 0
                }}
              >
                {africa}
              </View>
            </View>
            <View
              style={{
                marginTop: 20
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  margin: 0
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    margin: 3,
                    padding: 3,
                    marginLeft: 10,
                    fontWeight: "bold"
                  }}
                >
                  Asia
                </Text>
                <TouchableWithoutFeedback
                  style={{
                    flex: 1
                  }}
                >
                  <RightArrow
                    handleClick={() => {
                      this.props.navigation.navigate(FlaggyScreen, {
                        ...this.props,
                        svg: "Asia"
                      });
                    }}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  margin: 0
                }}
              >
                {asia}
              </View>
            </View>
            <View
              style={{
                marginTop: 20
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  margin: 0
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    margin: 3,
                    padding: 3,
                    marginLeft: 10,
                    fontWeight: "bold"
                  }}
                >
                  Europe
                </Text>
                <TouchableWithoutFeedback
                  style={{
                    flex: 1
                  }}
                >
                  <RightArrow
                    handleClick={() => {
                      this.props.navigation.navigate(FlaggyScreen, {
                        ...this.props,
                        svg: "Europe"
                      });
                    }}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  margin: 0
                }}
              >
                {europe}
              </View>
            </View>
            <View
              style={{
                marginTop: 20
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  margin: 0
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    margin: 3,
                    padding: 3,
                    marginLeft: 10,
                    fontWeight: "bold"
                  }}
                >
                  North America
                </Text>
                <TouchableWithoutFeedback
                  style={{
                    flex: 1
                  }}
                >
                  <RightArrow
                    handleClick={() => {
                      this.props.navigation.navigate(FlaggyScreen, {
                        ...this.props,
                        svg: "North America"
                      });
                    }}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  margin: 0
                }}
              >
                {northamerica}
              </View>
            </View>
            <View
              style={{
                marginTop: 10
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  margin: 0
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    margin: 3,
                    padding: 3,
                    marginLeft: 10,
                    fontWeight: "bold"
                  }}
                >
                  Oceania
                </Text>
                <TouchableWithoutFeedback
                  style={{
                    flex: 1
                  }}
                >
                  <RightArrow
                    handleClick={() => {
                      this.props.navigation.navigate(FlaggyScreen, {
                        ...this.props,
                        svg: "Oceania"
                      });
                    }}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  margin: 0
                }}
              >
                {oceania}
              </View>
            </View>
            <View
              style={{
                marginTop: 10
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  margin: 0
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    margin: 3,
                    padding: 3,
                    marginLeft: 10,
                    fontWeight: "bold"
                  }}
                >
                  South America
                </Text>
                <TouchableWithoutFeedback
                  style={{
                    flex: 1
                  }}
                >
                  <RightArrow
                    handleClick={() => {
                      this.props.navigation.navigate(FlaggyScreen, {
                        ...this.props,
                        svg: "South America"
                      });
                    }}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  margin: 0,
                  marginBottom: 70
                }}
              >
                {southamerica}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
