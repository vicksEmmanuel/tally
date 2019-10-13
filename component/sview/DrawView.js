import React, { Component } from "react";
import Svg, { G, Path, Rect, Polygon, Polyline } from "react-native-svg";
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
  LayoutAnimation,
  Easing,
  PanResponder,
  FlatList,
  StatusBar
} from "react-native";
import {
  grayUp,
  getPaths,
  addPaths,
  updatePaths,
  getPathData
} from "../../actions/realmAction";
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State
} from "react-native-gesture-handler";
import { SketchCanvas } from "@terrylinla/react-native-sketch-canvas";
const USE_NATIVE_DRIVER = true;
class FlatListItem extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.refs[`sketchRef${this.props.item.id}`]) {
      this.props.path.forEach(ls => {
        this.refs[`sketchRef${this.props.item.id}`].addPath(ls);
      });
    }
  }
  render() {
    const { item, color, strokeWidth } = this.props;
    const panRef = React.createRef();
    const rotationRef = React.createRef();
    const pinchRef = React.createRef();
    /* Pinching */
    let baseScale = new Animated.Value(1);
    let pinchScale = new Animated.Value(1);
    let scale = Animated.multiply(baseScale, pinchScale);
    let lastScale = 1;
    let onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: pinchScale } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
    /* Rotation */
    let rotate = new Animated.Value(0);
    let rotateStr = rotate.interpolate({
      inputRange: [-100, 100],
      outputRange: ["-100rad", "100rad"]
    });
    let lastRotate = 0;
    let onRotateGestureEvent = Animated.event(
      [{ nativeEvent: { rotation: rotate } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
    /* Tilt */
    let tilt = new Animated.Value(0);
    let tiltStr = tilt.interpolate({
      inputRange: [-501, -500, 0, 1],
      outputRange: ["1rad", "1rad", "0rad", "0rad"]
    });
    let lastTilt = 0;
    let onTiltGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: tilt } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
    let onRotateHandlerStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        lastRotate += event.nativeEvent.rotation;
        rotate.setOffset(lastRotate);
        rotate.setValue(0);
      }
    };
    let onPinchHandlerStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        lastScale *= event.nativeEvent.scale;
        baseScale.setValue(lastScale);
        pinchScale.setValue(1);
      }
    };
    let onTiltGestureStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        lastTilt += event.nativeEvent.translationY;
        tilt.setOffset(lastTilt);
        tilt.setValue(0);
      }
    };
    return (
      <View
        style={{
          width: Dimensions.get("screen").width - 10,
          height: Dimensions.get("screen").height - 100
        }}
      >
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={onTiltGestureEvent}
          onHandlerStateChange={onTiltGestureStateChange}
          minDist={10}
          minPointers={2}
          maxPointers={2}
          avgTouches
        >
          <Animated.View style={{ flex: 1 }}>
            <RotationGestureHandler
              ref={rotationRef}
              simultaneousHandlers={pinchRef}
              onGestureEvent={onRotateGestureEvent}
              onHandlerStateChange={onRotateHandlerStateChange}
            >
              <Animated.View style={{ flex: 1 }}>
                <PinchGestureHandler
                  ref={pinchRef}
                  simultaneousHandlers={rotationRef}
                  onGestureEvent={onPinchGestureEvent}
                  onHandlerStateChange={onPinchHandlerStateChange}
                >
                  <Animated.View style={{ flex: 1 }} collapsable={false}>
                    <Animated.View
                      style={[
                        {
                          width: "95%",
                          height: "95%",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 5
                        },
                        {
                          transform: [
                            { perspective: 200 },
                            { scale: scale },
                            { rotate: rotateStr },
                            { rotateX: tiltStr }
                          ]
                        }
                      ]}
                    >
                      <SketchCanvas
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "white"
                        }}
                        ref={`sketchRef${item.id}`}
                        strokeColor={color}
                        strokeWidth={strokeWidth}
                        onStrokeEnd={paths => {
                          this.props.saveAndUpdateFirstPath(paths, item.id);
                        }}
                      />
                    </Animated.View>
                  </Animated.View>
                </PinchGestureHandler>
              </Animated.View>
            </RotationGestureHandler>
          </Animated.View>
        </PanGestureHandler>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            position: "absolute",
            bottom: 0,
            right: 0,
            padding: 5,
            margin: 5
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              margin: 5,
              width: 50,
              height: 50,
              borderRadius: 25
            }}
            onPress={() => {}}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              margin: 5,
              width: 50,
              height: 50,
              borderRadius: 25
            }}
          />
        </View>
      </View>
    );
  }
}
class DrawView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: true,
      strokeWidth: 5,
      viewPrepared: props.graySlate.slimView,
      color: "orange",
      currentPath: 1,
      opa: 0.1,
      userLayout: false,
      paths: props.paths.paths,
      pan: new Animated.ValueXY()
    };
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
  componentWillMount() {
    this.panResponer = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        //Start moving
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: (evt, gestureState) => {
        this.state.pan.flattenOffset();
      }
    });
  }
  componentDidMount() {
    const x = () => {
      return new Promise((resolve, reject) => {
        this.props.getPaths();
        resolve();
      });
    };
    const y = () => {
      return new Promise((resolve, reject) => {
        this.props.getPathData();
        resolve();
      });
    };
    x().then(() => {
      y().then(() => {
        this.setState({
          paths: this.props.paths.paths
        });
      });
    });
  }
  changeLayout() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      userLayout: !this.state.userLayout
    });
  }
  crayons() {
    const colors = [
      "#2e112d",
      "#540032",
      "#820333",
      "#c9283e",
      "#e0433a",
      "#cdff00",
      "#9aff01",
      "#32ff00",
      "#01cc01",
      "#00b067",
      "#009899",
      "#0066b0",
      "#0033cb",
      "#330099",
      "#3c1451",
      "#6b238e",
      "#bc93d1",
      "#004c66",
      "#8ed5f0",
      "#660033",
      "#b20058",
      "#292929",
      "#f6df0e",
      "#f7db4f",
      "black",
      "red",
      "blue"
    ];
    let ranges = colors.map((item, id) => {
      let top = 0;
      if (id > 5) {
        top = 40;
      }
      if (id > 10) {
        top = 60;
      }
      if (id > 20) {
        top = 80;
      }
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: 30,
            height: 50,
            zIndex: id,
            position: "relative",
            top: top,
            margin: 0,
            padding: 0,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Svg
            onPress={() => {
              this.setState({
                color: item
              });
            }}
            style={{
              position: "relative",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
            width={70}
            height={100}
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 512.004 512.004"
            style="enable-background:new 0 0 512.004 512.004;"
          >
            <Rect x="116.544" y="223.373" width="278.915" height="91.747" />
            <Rect
              x="116.544"
              y="315.12"
              fill={item}
              style="fill:orange;"
              width="278.915"
              height="100%"
            />
            <Polyline
              style="fill:orange;"
              fill={item}
              points="116.544,223.376 210.56,0 301.44,0 395.456,223.376 "
            />
            <G style="opacity:0.25;" opacity={0.25}>
              <Polygon
                style="fill:#FFFFFF;"
                fill="#FFFFFF"
                points="255.976,512 116.544,512 116.544,315.12 116.544,223.376 210.56,0 255.976,0 	"
              />
            </G>
          </Svg>
        </TouchableOpacity>
      );
    });
    return ranges;
  }
  crayonView() {
    let view = () => {
      if (this.state.userLayout) {
        return (
          <View
            style={{
              borderRadius: 5,
              padding: 3,
              borderWidth: 3,
              zIndex: 57,
              borderColor: "rgba(0,0,0,0.5)"
            }}
          >
            <View
              style={{
                flexWrap: "wrap",
                marginLeft: 13,
                flexDirection: "row",
                width: "100%",
                overflow: "hidden",
                height: "100%",
                padding: 0,
                paddingTop: 10
              }}
            >
              {this.crayons()}
            </View>
          </View>
        );
      } else {
        return <View />;
      }
    };
    return (
      <Animated.View
        {...this.panResponer.panHandlers}
        activeOpacity={1}
        style={[
          {
            transform: [
              {
                translateX: this.state.pan.x
              },
              {
                translateY: this.state.pan.y
              }
            ]
          },
          {
            position: "absolute",
            borderRadius: this.state.userLayout ? 10 : 0,
            top: 30,
            left: 0,
            right: 0,
            marginLeft: 4,
            width: "100%",
            backgroundColor: this.state.userLayout ? "orange" : "white",
            height: this.state.userLayout ? 200 : 0,
            zIndex: 57,
            padding: 2
          }
        ]}
      >
        {view()}
      </Animated.View>
    );
  }
  updatePaths(id, paths) {
    const tt = () => {
      return new Promise((resolve, reject) => {
        this.props.addMorePaths(this.state.currentPath, paths);
        resolve();
      });
    };
    tt().then(this.props.getPaths());
  }
  savePaths(id, paths) {
    const tt = () => {
      return new Promise((resolve, reject) => {
        this.props.addPaths(this.state.currentPath, paths);
        resolve();
      });
    };
    tt().then(this.props.getPaths());
  }
  saveAndUpdateFirstPath(paths, id) {
    return new Promise((resolve, reject) => {
      let i = 0;
      let notExist = true;
      while (i < this.props.paths.paths.length) {
        if (this.props.paths.paths[i].id === id) {
          notExist = false;
          break;
        }
        i++;
      }
      if (notExist) {
        this.savePaths(id, paths);
      } else {
        this.updatePaths(id, paths);
      }
      resolve();
    });
  }
  paint() {
    const panRef = React.createRef();
    const rotationRef = React.createRef();
    const pinchRef = React.createRef();
    /* Pinching */
    let baseScale = new Animated.Value(1);
    let pinchScale = new Animated.Value(1);
    let scale = Animated.multiply(baseScale, pinchScale);
    let lastScale = 1;
    let onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: pinchScale } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
    /* Rotation */
    let rotate = new Animated.Value(0);
    let rotateStr = rotate.interpolate({
      inputRange: [-100, 100],
      outputRange: ["-100rad", "100rad"]
    });
    let lastRotate = 0;
    let onRotateGestureEvent = Animated.event(
      [{ nativeEvent: { rotation: rotate } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
    /* Tilt */
    let tilt = new Animated.Value(0);
    let tiltStr = tilt.interpolate({
      inputRange: [-501, -500, 0, 1],
      outputRange: ["1rad", "1rad", "0rad", "0rad"]
    });
    let lastTilt = 0;
    let onTiltGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: tilt } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
    let onRotateHandlerStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        lastRotate += event.nativeEvent.rotation;
        rotate.setOffset(lastRotate);
        rotate.setValue(0);
      }
    };
    let onPinchHandlerStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        lastScale *= event.nativeEvent.scale;
        baseScale.setValue(lastScale);
        pinchScale.setValue(1);
      }
    };
    let onTiltGestureStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        lastTilt += event.nativeEvent.translationY;
        tilt.setOffset(lastTilt);
        tilt.setValue(0);
      }
    };
    return (
      <View style={{ flex: 1 }}>
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={onTiltGestureEvent}
          onHandlerStateChange={onTiltGestureStateChange}
          minDist={10}
          minPointers={2}
          maxPointers={2}
          avgTouches
        >
          <Animated.View style={{ flex: 1 }}>
            <RotationGestureHandler
              ref={rotationRef}
              simultaneousHandlers={pinchRef}
              onGestureEvent={onRotateGestureEvent}
              onHandlerStateChange={onRotateHandlerStateChange}
            >
              <Animated.View style={{ flex: 1 }}>
                <PinchGestureHandler
                  ref={pinchRef}
                  simultaneousHandlers={rotationRef}
                  onGestureEvent={onPinchGestureEvent}
                  onHandlerStateChange={onPinchHandlerStateChange}
                >
                  <Animated.View style={{ flex: 1 }} collapsable={false}>
                    <Animated.View
                      style={[
                        {
                          width: "95%",
                          height: "95%",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 5
                        },
                        {
                          transform: [
                            { perspective: 200 },
                            { scale: scale },
                            { rotate: rotateStr },
                            { rotateX: tiltStr }
                          ]
                        }
                      ]}
                    >
                      <SketchCanvas
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "white"
                        }}
                        ref="sketchRef"
                        strokeColor={this.state.color}
                        strokeWidth={this.state.strokeWidth}
                        onStrokeEnd={paths => {
                          if (!(this.state.paths.length > 0)) {
                            //this.saveAndUpdateFirstPath(paths, 1);
                          }
                        }}
                      />
                    </Animated.View>
                  </Animated.View>
                </PinchGestureHandler>
              </Animated.View>
            </RotationGestureHandler>
          </Animated.View>
        </PanGestureHandler>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            position: "absolute",
            bottom: 0,
            right: 0,
            padding: 5,
            margin: 5
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              margin: 5,
              width: 50,
              height: 50,
              borderRadius: 25
            }}
            onPress={() => {}}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              margin: 5,
              width: 50,
              height: 50,
              borderRadius: 25
            }}
          />
        </View>
      </View>
    );
  }
  drawables() {
    if (this.props.paths.paths.length > 0) {
      return (
        <FlatList
          style={{
            padding: 3,
            width: "100%",
            height: "100%"
          }}
          data={this.props.paths.paths}
          horizontal={true}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, id }) => {
            const pathData = this.props.paths.data.filter(dataList => {
              return dataList.id === item.id;
            });
            if (pathData.length > 0) {
              const paths = item.paths.map(list => {
                const newData = pathData[0].data.filter(hmmList => {
                  return hmmList.path === list.id;
                });
                const sNewData = newData.map(jjList => {
                  return jjList.datum;
                });
                return {
                  id: list.id,
                  color: list.color,
                  width: list.width,
                  size: {
                    width: list.sizeWidth,
                    height: list.sizeHeight
                  },
                  data: sNewData,
                  drawer: null
                };
              });
              return (
                <FlatListItem
                  item={item}
                  color={this.state.color}
                  strokeWidth={this.state.strokeWidth}
                  path={paths}
                  saveAndUpdateFirstPath={pathier => {
                    this.saveAndUpdateFirstPath(pathier, item.id);
                  }}
                />
              );
            }
          }}
        />
      );
    } else {
      const x = this.paint();
      return x;
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 5,
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
          backgroundColor: "white"
        }}
      >
        <View
          style={{
            zIndex: 22,
            width: "100%",
            height: "10%",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: 20,
              height: 20,
              backgroundColor: "white",
              borderRadius: 20,
              marginRight: 4,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Svg
              width={10}
              height={10}
              fill="#f58231"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 240.823 240.823"
              style="enable-background:new 0 0 240.823 240.823;"
            >
              <G>
                <Path
                  id="Chevron_Right"
                  d="M57.633,129.007L165.93,237.268c4.752,4.74,12.451,4.74,17.215,0c4.752-4.74,4.752-12.439,0-17.179
		l-99.707-99.671l99.695-99.671c4.752-4.74,4.752-12.439,0-17.191c-4.752-4.74-12.463-4.74-17.215,0L57.621,111.816
		C52.942,116.507,52.942,124.327,57.633,129.007z"
                />
                <G />
                <G />
                <G />
                <G />
                <G />
                <G />
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
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: 20,
              height: 20,
              backgroundColor: "orange",
              borderRadius: 20,
              marginRight: 4,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              this.changeLayout();
            }}
          >
            <Svg
              width={15}
              height={15}
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 512.004 512.004"
              style="enable-background:new 0 0 512.004 512.004;"
            >
              <Rect x="116.544" y="223.373" width="278.915" height="91.747" />
              <Rect
                x="116.544"
                y="315.12"
                fill={this.state.color}
                style="fill:orange;"
                width="278.915"
                height="196.884"
              />
              <Polyline
                style="fill:orange;"
                fill={this.state.color}
                points="116.544,223.376 210.56,0 301.44,0 395.456,223.376 "
              />
              <G style="opacity:0.25;" opacity={0.25}>
                <Polygon
                  style="fill:#FFFFFF;"
                  fill="#FFFFFF"
                  points="255.976,512 116.544,512 116.544,315.12 116.544,223.376 210.56,0 255.976,0 	"
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
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: 20,
              height: 20,
              backgroundColor: "#3ebd44",
              borderRadius: 20,
              marginRight: 4,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Svg
              width={10}
              height={10}
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              fill="white"
              viewBox="0 0 42 42"
              style="enable-background:new 0 0 42 42;"
            >
              <Polygon points="42,19 23,19 23,0 19,0 19,19 0,19 0,23 19,23 19,42 23,42 23,23 42,23 " />
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
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: 20,
              height: 20,
              backgroundColor: this.state.color,
              opacity: this.state.opa,
              borderRadius: 20,
              marginRight: 4
            }}
            onPress={() => {
              this.setState({
                strokeWidth: this.state.strokeWidth + 5,
                opa: this.state.opa * 5
              });
            }}
            onPressIn={() => {
              this.setState({
                strokeWidth:
                  this.state.strokeWidth - 10 > 2
                    ? this.state.strokeWidth - 10
                    : 2,
                opa: this.state.opa / 5 > 0.1 ? this.state.opa / 5 : 0.1
              });
            }}
          />
        </View>
        <View
          style={{
            width: "100%",
            height: "90%",
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        >
          {this.drawables()}
        </View>
        {this.crayonView()}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    graySlate: {
      view: state.realm.view,
      slimView: state.realm.slimView
    },
    paths: {
      paths: state.realm.paths,
      data: state.realm.data
    }
  };
};
const mapDispatchToProps = dispatch => {
  return {
    graySlateEditor: (x, y) => dispatch(grayUp(x, y)),
    getPaths: () => dispatch(getPaths()),
    addPaths: (id, paths) => dispatch(addPaths(id, paths)),
    addMorePaths: (id, paths) => dispatch(updatePaths(id, paths)),
    getPathData: () => dispatch(getPathData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawView);
