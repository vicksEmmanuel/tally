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
  SafeAreaView,
  TextInput,
  StatusBar,
  FlatList,
  Easing
} from "react-native";
import Swipeout from "react-native-swipeout";
import { connect } from "react-redux";
import Button from "react-native-button";
import {
  initAlphabet,
  getAlphabet,
  initFlag,
  getFlag,
  initNumber,
  getCurrentUser,
  getNumber,
  initAlphabetDescription,
  getAlphabetDescription,
  initLetter,
  getLetter,
  grayUp,
  getUsers,
  addUser,
  setToCurrentUser,
  deleteAUser,
  updateAUser
} from "../actions/realmAction";
import { LineChart } from "react-native-chart-kit";
import { EnglishComponent } from "./fview/EnglishComponent";
import { MathComponent } from "./fview/MathComponent";
import { MapComponent } from "./fview/MapComponent";
import { GestureComponent } from "./fview/GestureComponent";
import { ShapeColorComponent } from "./fview/ShapeColorComponent";
import Avatar from "./svg/Avatar";
import Svg, { G, Path, Circle, Polygon, Rect, Line } from "react-native-svg";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation
} from "react-native-popup-dialog";

class FlatListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null
    };
  }
  render() {
    const { item } = this.props;
    const swipeSettings = {
      autoClose: true,
      onOpen: (sectionId, rowId, direction) => {},
      onClose: (sectionId, rowId, direction) => {},
      right: [
        {
          onPress: () => {
            this.props.editor();
          },
          text: "Edit",
          type: "secondary"
        },
        {
          onPress: () => {
            this.props.deleteAUser();
          },
          text: "Delete",
          type: "primary"
        }
      ]
    };
    return (
      <Swipeout style={{ backgroundColor: "white" }} {...swipeSettings}>
        <TouchableOpacity
          style={{
            flex: 1,
            borderBottomColor: "rgba(141,140,14,0.7)",
            borderBottomWidth: 0.5,
            backgroundColor: "white",
            flexDirection: "row",
            paddingLeft: 5
          }}
          activeOpacity={0.95}
          onPress={this.props.func}
        >
          {item.current === true ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#32ff00",
                borderRadius: 10,
                width: 10,
                height: 10,
                justifyContent: "center",
                alignItem: "center",
                position: "relative",
                top: 7,
                marginRight: 4
              }}
              activeOpacity={0.95}
            />
          ) : (
            <View style={{ marginRight: 14 }} />
          )}
          <TouchableOpacity
            style={{
              backgroundColor: item.bg,
              borderRadius: 17,
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItem: "center"
            }}
            activeOpacity={0.95}
          >
            <Text
              style={{
                fontSize: 14,
                textAlign: "center",
                color: "white"
              }}
            >
              {this.props.name}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              padding: 3,
              marginLeft: 10
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
            </View>
            <View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ fontSize: 12, fontWeight: "100", color: "black" }}
              >
                {item.name} is {item.age} years old
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: false,
      edit: false,
      usersList: props.kids.user,
      currentUser: props.kids.current,
      msg: "",
      name: "",
      age: 0,
      check: true,
      springMovement: new Animated.Value(0),
      activeOpacity: new Animated.Value(1),
      column: false,
      userLayout: false,
      color: "#373045",
      x: 0,
      y: 0,
      yValue: new Animated.Value(0),
      title: "",
      active: "english"
    };
    props.flag();
    props.alphabet();
    props.count();
    props.alphabetDescription();
    props.letter();
    props.users();
    props.currentUser();
  }
  componentDidMount() {
    const x = () => {
      return new Promise((resolve, reject) => {
        this.props.users();
        this.props.currentUser();
        resolve();
      });
    };
    x().then(() => {
      this.setState(
        {
          currentUser: this.props.kids.current,
          usersList: this.props.kids.user
        },
        () => {
          const popUp = this.props.kids.user
            ? !(this.props.kids.user.length > 0)
              ? () => {
                  this.setState(
                    {
                      edit: false,
                      name: "",
                      age: 0
                    },
                    () => {
                      this.expandColumn();
                    }
                  );
                }
              : () => {}
            : () => {};
          popUp();
        }
      );
    });
  }
  moveAnimation = () => {
    Animated.timing(this.state.yValue, {
      toValue: 3,
      duration: 1000,
      easing: Easing.back()
    }).start(() => {
      Animated.timing(this.state.yValue, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear()
      }).start(() => {
        this.moveAnimation();
      });
    });
  };
  stopMoveAnimation = () => {
    Animated.timing(this.state.yValue, {
      toValue: 0,
      duration: 1000,
      easing: Easing.back()
    }).stop();
  };
  expandColumn() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      column: true
    });
    this.moveAnimation();
  }
  collapseColumn() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      column: false
    });
    this.stopMoveAnimation();
  }
  expandReport() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      report: true
    });
    this.moveAnimation();
  }
  collapseReport() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      report: false
    });
    this.stopMoveAnimation();
  }
  containerStyle(sub) {
    let backgroundColor = this.state.active === sub ? "#fd6600" : "#f0f3f7";
    let borderWidth = this.state.active === sub ? 5 : 0;
    let borderColor =
      this.state.active === sub ? "rgba(253, 102, 0, 0.4)" : "white";
    return {
      backgroundColor: backgroundColor,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      padding: 5,
      width: 57,
      height: 57,
      marginRight: 20,
      borderWidth: borderWidth,
      borderColor: borderColor
    };
  }
  style(sub) {
    return {
      color: this.state.active === sub ? "white" : "#757575",
      fontSize: 10
    };
  }
  handleTitle(event) {
    if (event.nativeEvent.contentOffset.y >= 25) {
      this.setState({
        title: "intelliQ"
      });
    } else {
      this.setState({
        title: ""
      });
    }
  }
  changeSlided() {
    this.setState({ slided: !this.state.slided });
    this.refs.scrollView.scrollTo(0);
  }
  changeSlided2() {
    this.setState({ slided: false });
    this.refs.scrollView.scrollTo(Dimensions.get("screen").height);
  }
  changeLayout() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState(
      {
        userLayout: !this.state.userLayout
      },
      () => {
        if (this.state.userLayout) {
          this.moveAnimation();
        } else {
          this.stopMoveAnimation();
        }
      }
    );
  }
  userSlide() {
    const xx = () => {
      if (this.props.kids.user.length > 0) {
        return (
          <FlatList
            style={{
              padding: 3,
              width: "100%",
              backgroundColor: "white"
            }}
            data={this.state.usersList}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, id }) => {
              return (
                <FlatListItems
                  item={item}
                  name={this.nameTransform(item.name)}
                  func={() => {
                    this.props.setToCurrentUser(item);
                  }}
                  deleteAUser={() => {
                    this.props.deleteAUser(item.id);
                  }}
                  editor={() => {
                    this.props.setToCurrentUser(item);
                    this.setState(
                      {
                        edit: true,
                        name: item.name,
                        age: item.age
                      },
                      () => {
                        this.expandColumn();
                      }
                    );
                  }}
                />
              );
            }}
          />
        );
      } else {
        return (
          <View
            style={{
              padding: 20,
              backgroundColor: "#e4fbfd",
              width: "100%",
              height: 400,
              marginRight: 5,
              marginLeft: 5,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "#005da4",
                textAlign: "center"
              }}
              numberOfLines={2}
            >
              No Kid is added yet
            </Text>
          </View>
        );
      }
    };
    if (this.state.userLayout) {
      return (
        <View
          style={{
            borderTopRightRadius: this.state.column ? 20 : 0,
            borderTopLeftRadius: this.state.column ? 20 : 0,
            height: "100%",
            width: "100%",
            flex: 1
          }}
        >
          <View
            style={{
              padding: 3,
              paddingLeft: 8,
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 5 }}>
              <TouchableOpacity
                activeOpacity={0.95}
                style={{
                  paddingRight: 10,
                  paddingTop: 3,
                  justifyContent: "center"
                }}
                onPress={() => {
                  this.changeLayout();
                }}
              >
                <Animated.View
                  style={{
                    position: "relative",
                    top: this.state.yValue
                  }}
                >
                  <Svg
                    version="1.1"
                    id="Capa_1"
                    fill="rgba(141,140,141,0.7)"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="15px"
                    height="15px"
                    viewBox="0 0 444.819 444.819"
                    style="enable-background:new 0 0 444.819 444.819;"
                  >
                    <G>
                      <Path
                        d="M434.252,114.203l-21.409-21.416c-7.419-7.04-16.084-10.561-25.975-10.561c-10.095,0-18.657,3.521-25.7,10.561
    L222.41,231.549L83.653,92.791c-7.042-7.04-15.606-10.561-25.697-10.561c-9.896,0-18.559,3.521-25.979,10.561l-21.128,21.416
    C3.615,121.436,0,130.099,0,140.188c0,10.277,3.619,18.842,10.848,25.693l185.864,185.865c6.855,7.23,15.416,10.848,25.697,10.848
    c10.088,0,18.75-3.617,25.977-10.848l185.865-185.865c7.043-7.044,10.567-15.608,10.567-25.693
    C444.819,130.287,441.295,121.629,434.252,114.203z"
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
                </Animated.View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                padding: 5,
                position: "relative",
                alignItems: "flex-end",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  padding: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 5
                }}
                onPress={() => {
                  this.setState(
                    {
                      edit: false,
                      name: "",
                      age: 0
                    },
                    () => {
                      this.expandColumn();
                    }
                  );
                }}
              >
                <Svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width={15}
                  height={15}
                  viewBox="0 0 53 53"
                  style="enable-background:new 0 0 53 53;"
                >
                  <Polygon
                    style="fill:#14A085;"
                    fill="#14A085"
                    points="7,8.5 47,8.5 47,0.5 0,0.5 0,45.5 7,45.5 "
                  />
                  <Rect
                    x="7"
                    y="8.5"
                    style="fill:#38454F;"
                    fill="#38454F"
                    width="46"
                    height="44"
                  />
                  <Line
                    style="fill:none;stroke:#A4E869;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;"
                    x1="30"
                    stroke="#A4E869"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeMiterlimit={10}
                    y1="19.5"
                    x2="30"
                    y2="41.5"
                  />
                  <Line
                    style="fill:none;stroke:#A4E869;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;"
                    x1="41"
                    stroke="#A4E869"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeMiterlimit={10}
                    y1="30.5"
                    x2="19"
                    y2="30.5"
                  />
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
                <Text
                  style={{
                    fontSize: 10,
                    color: "#9933cc",
                    textAlign: "center"
                  }}
                >
                  new
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  borderRadius: 3,
                  padding: 5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.expandReport();
                }}
              >
                <Svg
                  viewBox="0 0 512 512"
                  width={15}
                  height={15}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#c9283e"
                >
                  <Path d="m76 240c12.101562 0 23.054688-4.855469 31.148438-12.652344l44.402343 22.199219c-.222656 1.808594-.550781 3.585937-.550781 5.453125 0 24.8125 20.1875 45 45 45s45-20.1875 45-45c0-6.925781-1.703125-13.410156-4.511719-19.277344l60.234375-60.234375c5.867188 2.808594 12.351563 4.511719 19.277344 4.511719 24.8125 0 45-20.1875 45-45 0-4.671875-.917969-9.089844-2.246094-13.328125l52.335938-39.242187c7.140625 4.769531 15.699218 7.570312 24.910156 7.570312 24.8125 0 45-20.1875 45-45s-20.1875-45-45-45-45 20.1875-45 45c0 4.671875.917969 9.089844 2.246094 13.328125l-52.335938 39.242187c-7.140625-4.769531-15.699218-7.570312-24.910156-7.570312-24.8125 0-45 20.1875-45 45 0 6.925781 1.703125 13.410156 4.511719 19.277344l-60.234375 60.234375c-5.867188-2.808594-12.351563-4.511719-19.277344-4.511719-12.101562 0-23.054688 4.855469-31.148438 12.652344l-44.402343-22.199219c.222656-1.808594.550781-3.585937.550781-5.453125 0-24.8125-20.1875-45-45-45s-45 20.1875-45 45 20.1875 45 45 45zm0 0" />
                  <Path d="m497 482h-16v-317c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v317h-30v-227c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v227h-30v-107c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v107h-30v-167c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v167h-16c-8.289062 0-15 6.710938-15 15s6.710938 15 15 15h482c8.289062 0 15-6.710938 15-15s-6.710938-15-15-15zm0 0" />
                </Svg>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#c9283e",
                    textAlign: "center"
                  }}
                >
                  report
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ padding: 5, marginTop: 5 }}>
            {this.props.kids ? (
              this.props.kids.user ? (
                xx()
              ) : (
                <View />
              )
            ) : (
              <View />
            )}
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }
  nameTransform(name) {
    const x = String(name).split(" ");
    let t = "";
    if (x.length > 1) {
      t = `${String(x[0])
        .toUpperCase()
        .substr(0, 1)}${String(x[1])
        .toUpperCase()
        .substr(0, 1)}`;
    } else {
      t = `${String(x[0])
        .toUpperCase()
        .substr(0, 1)}`;
    }
    return t;
  }
  render() {
    const { navigation } = this.props;
    const SCREENHEIGHT = Dimensions.get("screen").height;
    const subjects = () => {
      let sub = this.state.active;
      switch (sub) {
        case "english":
          return (
            <EnglishComponent
              {...this.props}
              slide={() => {
                this.changeSlided();
              }}
              slide2={() => {
                this.changeSlided2();
              }}
            />
          );
        case "math":
          return (
            <MathComponent
              {...this.props}
              slide={() => {
                this.changeSlided();
              }}
              slide2={() => {
                this.changeSlided2();
              }}
            />
          );
        case "map":
          return (
            <MapComponent
              {...this.props}
              slide={() => {
                this.changeSlided();
              }}
              slide2={() => {
                this.changeSlided2();
              }}
            />
          );
        case "gesture":
          return <GestureComponent {...this.props} />;
        case "shapes and color":
          return <ShapeColorComponent {...this.props} />;
        default:
          return <View />;
      }
    };
    const chartConfig = {
      backgroundGradientFrom: "#1e2923",
      backgroundGradientFromOpacity: 0.7,
      backgroundGradientTo: "#08130d",
      backgroundGradientToOpacity: 1,
      color: (opacity = 1) => `rgba(26,255,146,${opacity})`,
      strokeWidth: 2,
      barPercentage: 0.5
    };
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: this.state.slided ? "rgb(141,141,140)" : null
        }}
      >
        <StatusBar barStyle="light-content" />
        <View
          style={{
            flex: 1,
            backgroundColor: "white"
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              position: "absolute",
              zIndex: 2,
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              height: 30,
              padding: 3
            }}
          >
            <View
              style={{
                flex: 80,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "white",
                  justifyContent: "center"
                }}
              >
                {this.state.title}
              </Text>
            </View>
            <View
              style={{
                flex: 20,
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              <Button
                containerStyle={{
                  flex: 1,
                  borderRadius: 20,
                  backgroundColor: "white",
                  width: 20,
                  height: 20,
                  marginRight: 10
                }}
              >
                {this.state.currentUser == null ? (
                  <Avatar
                    func={() => {
                      this.changeLayout();
                    }}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.changeLayout();
                    }}
                    style={{
                      backgroundColor: this.props.kids.current
                        ? this.props.kids.current.bg
                          ? this.props.kids.current.bg
                          : "slategray"
                        : "slategray",
                      borderRadius: 17,
                      width: 25,
                      height: 25,
                      justifyContent: "center",
                      alignItem: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: "center",
                        color: "white"
                      }}
                    >
                      {this.props.kids.current
                        ? this.props.kids.current.name
                          ? this.nameTransform(this.props.kids.current.name)
                          : "..."
                        : "..."}
                    </Text>
                  </TouchableOpacity>
                )}
              </Button>
            </View>
          </View>
          <ScrollView
            ref="scrollView"
            scrollEnabled={this.state.slided ? false : true}
            maximumZoomScale={3}
            minimumZoomScale={0.2}
            horizontal={false}
            scrollEventThrottle={10}
            onMomentumScrollBegin={event => {
              this.handleTitle(event);
            }}
            onMomentumScrollEnd={event => {
              this.handleTitle(event);
            }}
            onScroll={event => {
              this.handleTitle(event);
            }}
            style={{
              flex: 1,
              paddingTop: 15
            }}
          >
            <View
              style={{
                width: Dimensions.get("screen").width,
                height: 50,
                padding: 1
              }}
            >
              <Text
                style={{
                  margin: 5,
                  fontWeight: "bold",
                  fontFamily: "century gothic",
                  fontSize: 20,
                  fontStyle: "normal",
                  padding: 5
                }}
              >
                IntelliQ
              </Text>
            </View>
            <ScrollView
              style={{
                width: Dimensions.get("screen").width,
                padding: 5,
                paddingLeft: 20
              }}
              horizontal={true}
            >
              <Button
                containerStyle={this.containerStyle("english")}
                style={this.style("english")}
                onPress={() => {
                  this.setState({
                    active: "english"
                  });
                }}
              >
                English
              </Button>
              <Button
                containerStyle={this.containerStyle("math")}
                style={this.style("math")}
                onPress={() => {
                  this.setState({
                    active: "math"
                  });
                }}
              >
                Math
              </Button>
              <Button
                containerStyle={this.containerStyle("map")}
                style={this.style("map")}
                onPress={() => {
                  this.setState({
                    active: "map"
                  });
                }}
              >
                Map
              </Button>
              <Button
                containerStyle={this.containerStyle("gesture")}
                style={this.style("gesture")}
                onPress={() => {
                  this.setState({
                    active: "gesture"
                  });
                }}
              >
                Writing
              </Button>
              <Button
                containerStyle={this.containerStyle("shapes and color")}
                style={this.style("shapes and color")}
                onPress={() => {
                  this.setState({
                    active: "shapes and color"
                  });
                }}
              >
                Shapes & Color
              </Button>
              <View style={{ marginLeft: 5 }} />
            </ScrollView>
            {subjects()}
          </ScrollView>
        </View>
        {this.state.userLayout ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              width: "100%",
              height: SCREENHEIGHT,
              zIndex: 6
            }}
          />
        ) : (
          <View />
        )}
        <TouchableOpacity
          activeOpacity={1}
          style={{
            position: "absolute",
            borderTopRightRadius: this.state.userLayout ? 20 : 0,
            borderTopLeftRadius: this.state.userLayout ? 20 : 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: "102%",
            backgroundColor: "white",
            height: this.state.userLayout
              ? Dimensions.get("screen").height - 105
              : 0,
            zIndex: 7
          }}
        >
          {this.userSlide()}
        </TouchableOpacity>
        {this.state.column ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              width: "100%",
              height: SCREENHEIGHT,
              zIndex: 9
            }}
          />
        ) : (
          <View />
        )}
        <TouchableOpacity
          activeOpacity={1}
          style={{
            position: "absolute",
            borderTopRightRadius: this.state.column ? 20 : 0,
            borderTopLeftRadius: this.state.column ? 20 : 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: "102%",
            backgroundColor: "#d6b17d",
            borderTopWidth: this.state.column ? 5 : 0,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderTopColor: this.state.column
              ? "rgba(141,141,140, 0.7)"
              : "white",
            height: this.state.column ? 200 : 0,
            zIndex: 10
          }}
        >
          <View
            style={{
              borderTopRightRadius: this.state.column ? 20 : 0,
              borderTopLeftRadius: this.state.column ? 20 : 0,
              height: "100%",
              width: "100%",
              backgroundColor: "#d6b17d"
            }}
          >
            <View style={{ padding: 3, paddingLeft: 8, flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.95}
                style={{
                  paddingRight: 10,
                  paddingTop: 3,
                  justifyContent: "center"
                }}
                onPress={() => {
                  this.collapseColumn();
                  this.setState({
                    edit: false
                  });
                }}
              >
                <Animated.View
                  style={{
                    position: "relative",
                    top: this.state.yValue
                  }}
                >
                  <Svg
                    version="1.1"
                    id="Capa_1"
                    fill="#3c1451"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="15px"
                    height="15px"
                    viewBox="0 0 444.819 444.819"
                    style="enable-background:new 0 0 444.819 444.819;"
                  >
                    <G>
                      <Path
                        d="M434.252,114.203l-21.409-21.416c-7.419-7.04-16.084-10.561-25.975-10.561c-10.095,0-18.657,3.521-25.7,10.561
    L222.41,231.549L83.653,92.791c-7.042-7.04-15.606-10.561-25.697-10.561c-9.896,0-18.559,3.521-25.979,10.561l-21.128,21.416
    C3.615,121.436,0,130.099,0,140.188c0,10.277,3.619,18.842,10.848,25.693l185.864,185.865c6.855,7.23,15.416,10.848,25.697,10.848
    c10.088,0,18.75-3.617,25.977-10.848l185.865-185.865c7.043-7.044,10.567-15.608,10.567-25.693
    C444.819,130.287,441.295,121.629,434.252,114.203z"
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
                </Animated.View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "rgb(105,74,136)"
                }}
              >
                {this.state.edit === true ? `Edit` : `Add`} Kid's Details
              </Text>
            </View>
            <ScrollView
              maximumZoomScale={3}
              minimumZoomScale={0.2}
              horizontal={false}
              scrollEventThrottle={10}
              onMomentumScrollEnd={() => {
                Animated.spring(this.state.springMovement, {
                  toValue: 1,
                  friction: 1
                }).start(() => {
                  Animated.spring(this.state.springMovement, {
                    toValue: 0,
                    friction: 1
                  }).start();
                });
              }}
            >
              <Animated.View
                style={{
                  padding: 10,
                  position: "relative",
                  top: this.state.springMovement
                }}
              >
                <View style={{ flexDirection: "row", padding: 10 }}>
                  <TextInput
                    style={{
                      flex: 1,
                      marginLeft: 5,
                      fontSize: 14,
                      padding: 3,
                      height: 30,
                      color: "#771853",
                      borderBottomWidth: 1,
                      borderBottomColor: "#771853",
                      width: "70%"
                    }}
                    placeholderTextColor="#3d506d"
                    placeholder="Add kids name"
                    value={this.state.name}
                    underlineColorAndroid="transparent"
                    onChangeText={text => {
                      this.setState(
                        {
                          name: text
                        },
                        () => {
                          if (String(text).length > 25) {
                            this.setState({
                              name: String(this.state.name).substr(0, 25),
                              msg: "name is too long"
                            });
                          } else if (String(text).length < 3) {
                            this.setState({
                              name: text,
                              msg: "name is too short"
                            });
                          } else {
                            this.setState({
                              msg: ""
                            });
                          }
                        }
                      );
                    }}
                  />
                </View>
                <View
                  style={{ flexDirection: "row", padding: 10, width: "100%" }}
                >
                  <TextInput
                    style={{
                      marginLeft: 5,
                      marginRight: 10,
                      fontSize: 14,
                      padding: 3,
                      height: 30,
                      color: "#771853",
                      borderBottomWidth: 1,
                      borderBottomColor: "#771853",
                      width: "20%"
                    }}
                    placeholderTextColor="#3d506d"
                    placeholder="Age"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    value={this.state.age === 0 ? "" : this.state.age}
                    onChangeText={text => {
                      if (String(text).includes(".")) {
                        text = String(text).replace(/\./g, "");
                      }
                      this.setState(
                        {
                          age: Number(text)
                        },
                        () => {
                          if (this.state.age > 10 || this.state.age < 1) {
                            this.setState({
                              msg: "kid is too old",
                              age: 0
                            });
                          } else {
                            this.setState({
                              msg: ""
                            });
                          }
                        }
                      );
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#771853",
                      fontStyle: "italic",
                      padding: 3,
                      width: "80%"
                    }}
                  >
                    {this.state.msg}
                  </Text>
                </View>
              </Animated.View>
              <Animated.View
                style={{
                  position: "relative",
                  bottom: 0,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  padding: 10,
                  top: this.state.springMovement
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.95}
                  style={{
                    backgroundColor: "rgb(105,74,136)",
                    padding: 5,
                    borderRadius: 4,
                    width: 70,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => {
                    if (
                      (this.state.name.length > 3 &&
                        this.state.name.length <= 25) ||
                      (this.state.age > 0 && this.state.age <= 10)
                    ) {
                      const x = () => {
                        return new Promise((resolve, reject) => {
                          if (this.state.edit) {
                            this.props.updateUser({
                              name: this.state.name,
                              age: this.state.age,
                              id: this.state.currentUser.id
                            });
                          } else {
                            this.props.addUser({
                              name: this.state.name,
                              age: this.state.age
                            });
                          }
                          resolve();
                        });
                      };
                      x().then(() => {
                        const pp = () => {
                          return new Promise((resolve, reject) => {
                            this.props.currentUser();
                            resolve();
                          });
                        };
                        pp().then(() => {
                          this.setState(
                            {
                              msg: "kid is added",
                              name: "",
                              age: 0
                            },
                            () => {
                              setTimeout(() => {
                                this.collapseColumn();
                                this.setState({
                                  currentUser: this.props.kids.current
                                });
                              }, 1000);
                            }
                          );
                        });
                      });
                    } else {
                      this.setState({
                        msg: "kids details is incorrect"
                      });
                    }
                  }}
                >
                  <Text
                    style={{
                      color: "#d6b17d",
                      textAlign: "center",
                      fontSize: 14
                    }}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </ScrollView>
          </View>
        </TouchableOpacity>
        {this.state.report ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              width: "100%",
              height: SCREENHEIGHT,
              zIndex: 14
            }}
          />
        ) : (
          <View />
        )}
        <TouchableOpacity
          activeOpacity={1}
          style={{
            position: "absolute",
            borderTopRightRadius: this.state.report ? 20 : 0,
            borderTopLeftRadius: this.state.report ? 20 : 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: "102%",
            backgroundColor: "#d6b17d",
            borderTopWidth: this.state.report ? 5 : 0,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderTopColor: this.state.report
              ? "rgba(141,141,140, 0.7)"
              : "white",
            height: this.state.report ? 200 : 0,
            zIndex: 15
          }}
        >
          <View
            style={{
              borderTopRightRadius: this.state.report ? 20 : 0,
              borderTopLeftRadius: this.state.report ? 20 : 0,
              height: "100%",
              width: "100%",
              backgroundColor: "white"
            }}
          >
            <View style={{ padding: 3, paddingLeft: 8, flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.95}
                style={{
                  paddingRight: 10,
                  paddingTop: 3,
                  justifyContent: "center"
                }}
                onPress={() => {
                  this.collapseReport();
                }}
              >
                <Animated.View
                  style={{
                    position: "relative",
                    top: this.state.yValue
                  }}
                >
                  <Svg
                    version="1.1"
                    id="Capa_1"
                    fill="#3c1451"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="15px"
                    height="15px"
                    viewBox="0 0 444.819 444.819"
                    style="enable-background:new 0 0 444.819 444.819;"
                  >
                    <G>
                      <Path
                        d="M434.252,114.203l-21.409-21.416c-7.419-7.04-16.084-10.561-25.975-10.561c-10.095,0-18.657,3.521-25.7,10.561
    L222.41,231.549L83.653,92.791c-7.042-7.04-15.606-10.561-25.697-10.561c-9.896,0-18.559,3.521-25.979,10.561l-21.128,21.416
    C3.615,121.436,0,130.099,0,140.188c0,10.277,3.619,18.842,10.848,25.693l185.864,185.865c6.855,7.23,15.416,10.848,25.697,10.848
    c10.088,0,18.75-3.617,25.977-10.848l185.865-185.865c7.043-7.044,10.567-15.608,10.567-25.693
    C444.819,130.287,441.295,121.629,434.252,114.203z"
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
                </Animated.View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "rgb(105,74,136)"
                }}
              >
                {this.props.kids.current
                  ? this.props.kids.current.name
                    ? this.nameTransform(this.props.kids.current.name)
                    : "..."
                  : "..."}
                's Report
              </Text>
            </View>
            <ScrollView
              maximumZoomScale={3}
              minimumZoomScale={0.2}
              horizontal={true}
              scrollEventThrottle={10}
            >
              <Animated.View
                style={{
                  padding: 10,
                  position: "relative",
                  top: this.state.springMovement
                }}
              >
                <LineChart
                  width={Dimensions.get("screen").width - 2}
                  height={150}
                  data={{
                    labels: [],
                    datasets: [
                      {
                        data: [
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100
                        ]
                      }
                    ],
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                    strokeWidth: 2
                  }}
                  chartConfig={chartConfig}
                  onDataPointClick={() => {}}
                />
              </Animated.View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    english: {
      alphabet: state.realm.alphabet,
      alphabetDescription: state.realm.alphabetdescription,
      letter: state.realm.letter
    },
    math: {
      count: state.realm.count
    },
    map: {
      flag: state.realm.flag
    },
    kids: {
      user: state.realm.user,
      current: state.realm.current
    }
  };
};
const mapDispatchToProps = dispatch => {
  return {
    initAlphabet: () => dispatch(initAlphabet()),
    alphabet: () => dispatch(getAlphabet()),
    initFlag: () => dispatch(initFlag()),
    flag: () => dispatch(getFlag()),
    addUser: user => dispatch(addUser(user)),
    updateUser: user => dispatch(updateAUser(user)),
    setToCurrentUser: user => dispatch(setToCurrentUser(user)),
    deleteAUser: id => dispatch(deleteAUser(id)),
    currentUser: () => dispatch(getCurrentUser()),
    users: () => dispatch(getUsers()),
    initNumber: () => dispatch(initNumber()),
    count: () => dispatch(getNumber()),
    initAlphabetDescription: () => dispatch(initAlphabetDescription()),
    alphabetDescription: () => dispatch(getAlphabetDescription()),
    initLetter: () => dispatch(initLetter()),
    letter: () => dispatch(getLetter()),
    graySlateEditor: (x, y) => dispatch(grayUp(x, y))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
