import React, { Component } from "react";
import {
  View,
  Animated,
  TextInput,
  Image,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
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
import { FlaggyScreen } from "../screen";
import Search from "../svg/Search";
import {
  AfricaFlatList,
  EuropeFlatList,
  AsiaFlatList,
  NorthAmericaFlatList,
  SouthAmericaFlatList,
  OceaniaFlatList
} from "./extraContentOfFlaggyView";

export default class FlaggyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      case: [Africa, Asia, Europe, NorthAmerica, Oceania, SouthAmerica],
      indexToScroll: props.navigation.state.params.item
        ? props.navigation.state.params.item
        :  props.navigation.state.params,
      africa: {
        flag: props.navigation.state.params.map.flag.filter(item => {
          return item.continent === Africa;
        })
      },
      asia: {
        flag: props.navigation.state.params.map.flag.filter(item => {
          return item.continent === Asia;
        })
      },
      europe: {
        flag: props.navigation.state.params.map.flag.filter(item => {
          return item.continent === Europe;
        })
      },
      northamerica: {
        flag: props.navigation.state.params.map.flag.filter(item => {
          return item.continent === NorthAmerica;
        })
      },
      oceania: {
        flag: props.navigation.state.params.map.flag.filter(item => {
          return item.continent === Oceania;
        })
      },
      southamerica: {
        flag: props.navigation.state.params.map.flag.filter(item => {
          return item.continent === SouthAmerica;
        })
      }
    };
    this.a = React.createRef();
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
      elevation: 0
    };
    const Input = ({ children }) => {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f3f7",
            padding: 5,
            borderRadius: 20,
            height: 30,
            marginRight: 5
          }}
        >
          <Search
            handleClick={() => {
              params.focal.current.focus();
            }}
          />
          {children}
        </View>
      );
    };
    const AppInput = ({ children }) => {
      return (
        <Input {...params}>
          <TextInput
            style={{
              flex: 1,
              marginLeft: 5,
              fontSize: 14,
              padding: 3,
              height: 30,
              color: "#005da4"
            }}
            placeholder="search"
            pointerEvents="none"
            underlineColorAndroid="transparent"
            onChangeText={text => {
              params.onChangeText(text);
            }}
            ref={params.focal}
          />
        </Input>
      );
    };
    let headerTitle = <AppInput />;
    return { headerStyle, headerTitleStyle, headerTitle };
  };
  _checkTheMost(bor) {
    let africa = this.state.africa.flag.length;
    let asia = this.state.asia.flag.length;
    let europe = this.state.europe.flag.length;
    let northamerica = this.state.northamerica.flag.length;
    let oceania = this.state.oceania.flag.length;
    let southamerica = this.state.southamerica.flag.length;
    let realCase = [Africa, Asia, Europe, NorthAmerica, Oceania, SouthAmerica];

    let arrr = [
      {
        name: Africa,
        length: africa
      },
      {
        name: Asia,
        length: asia
      },
      {
        name: Europe,
        length: europe
      },
      {
        name: NorthAmerica,
        length: northamerica
      },
      {
        name: Oceania,
        length: oceania
      },
      {
        name: SouthAmerica,
        length: southamerica
      }
    ];
    arrr.sort((a, b) => {
      return b.length - a.length;
    });

    if (bor) {
      this.setState({
        case: arrr.map(item => {
          return item.name;
        })
      });
    } else {
      this.setState({
        case: realCase
      });
    }
  }
  _onChangeText(text) {
    const africa = this.props.navigation.state.params.map.flag.filter(item => {
      return item.continent === Africa;
    });
    const asia = this.props.navigation.state.params.map.flag.filter(item => {
      return item.continent === Asia;
    });
    const europe = this.props.navigation.state.params.map.flag.filter(item => {
      return item.continent === Europe;
    });
    const northamerica = this.props.navigation.state.params.map.flag.filter(
      item => {
        return item.continent === NorthAmerica;
      }
    );
    const oceania = this.props.navigation.state.params.map.flag.filter(item => {
      return item.continent === Oceania;
    });
    const southamerica = this.props.navigation.state.params.map.flag.filter(
      item => {
        return item.continent === SouthAmerica;
      }
    );

    if (text === "") {
      this.setState({
        africa: {
          flag: africa
        },
        asia: {
          flag: asia
        },
        europe: {
          flag: europe
        },
        northamerica: {
          flag: northamerica
        },
        oceania: {
          flag: oceania
        },
        southamerica: {
          flag: southamerica
        }
      });
      this._checkTheMost(false);
    } else {
      let a = africa.filter(item => {
        return item.country.toLowerCase().includes(text.toLowerCase());
      });
      let b = asia.filter(item => {
        return item.country.toLowerCase().includes(text.toLowerCase());
      });
      let c = europe.filter(item => {
        return item.country.toLowerCase().includes(text.toLowerCase());
      });
      let d = northamerica.filter(item => {
        return item.country.toLowerCase().includes(text.toLowerCase());
      });
      let e = oceania.filter(item => {
        return item.country.toLowerCase().includes(text.toLowerCase());
      });
      let f = southamerica.filter(item => {
        return item.country.toLowerCase().includes(text.toLowerCase());
      });

      this.setState({
        africa: {
          flag: a
        },
        asia: {
          flag: b
        },
        europe: {
          flag: c
        },
        northamerica: {
          flag: d
        },
        oceania: {
          flag: e
        },
        southamerica: {
          flag: f
        }
      });
      this._checkTheMost(true);
    }
  }
  componentDidMount() {
    this.props.navigation.setParams({
      onChangeText: this._onChangeText.bind(this),
      focal: this.a
    });
  }
  render() {
    const continent = item => {
      switch (item) {
        case Africa:
          return (
            <AfricaFlatList
              data={this.state.africa.flag}
              index={
                this.state.indexToScroll.continent === Africa
                  ? this.state.indexToScroll.id
                  : 0
              }
            />
          );
        case Asia:
          return (
            <AsiaFlatList
              data={this.state.asia.flag}
              index={
                this.state.indexToScroll.continent === Asia
                  ? this.state.indexToScroll.id
                  : 0
              }
            />
          );
        case Europe:
          return (
            <EuropeFlatList
              data={this.state.europe.flag}
              index={
                this.state.indexToScroll.continent === Europe
                  ? this.state.indexToScroll.id
                  : 0
              }
            />
          );
        case Oceania:
          return (
            <OceaniaFlatList
              data={this.state.oceania.flag}
              index={
                this.state.indexToScroll.continent === Oceania
                  ? this.state.indexToScroll.id
                  : 0
              }
            />
          );
        case SouthAmerica:
          return (
            <SouthAmericaFlatList
              data={this.state.southamerica.flag}
              index={
                this.state.indexToScroll.continent === SouthAmerica
                  ? this.state.indexToScroll.id
                  : 0
              }
            />
          );
        case NorthAmerica:
          return (
            <NorthAmericaFlatList
              data={this.state.northamerica.flag}
              index={
                this.state.indexToScroll.continent === NorthAmerica
                  ? this.state.indexToScroll.id
                  : 0
              }
            />
          );
        default:
          return <View style={{ flex: 1 }} />;
      }
    };
    const cases = this.state.case.map(item => {
      return continent(item);
    });
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View style={{ flex: 1, flexDirection: "column" }}>
            <ScrollView
              style={{
                backgroundColor: "white"
              }}
              keyboardDismissMode="interactive"
              maximumZoomScale={3}
              minimumZoomScale={0.2}
            >
              {cases}
            </ScrollView>
          </Animated.View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}
