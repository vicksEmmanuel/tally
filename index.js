/**
 * @format
 */

import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { name as appName } from "./app.json";
import rootReducer from "./reducers/rootReducer";
//import Index from './testComponent/Index.js';
import {
  MainScreen,
  FlagScreen,
  FlaggyScreen,
  MathScreen,
  EnglishScreen,
  LetterScreen,
  ArithmeticsScreen,
  DrawScreen,
} from "./component/screen";
import FlagView from "./component/sview/FlagsView";
import FlaggyView from "./component/tview/FlaggyView";
import MathView from "./component/sview/MathView";
import MathTHScreen from "./component/tview/MathTHScreen";
import Main from "./component/Main.js";
import EnglishView from './component/sview/EnglishView';
import EnglishTHScreen from './component/tview/EnglishTHScreen';
import LetterTHScreen from './component/tview/LetterTHScreen';
import LetterView from './component/sview/LetterView';
import ArithmeticView from './component/sview/ArithmeticView';
import DrawView from "./component/sview/DrawView";

const stacky = createStackNavigator({
  MainScreen: {
    screen: Main,
  },
  FlagScreen: {
    screen: FlagView,
    navigationOptions: {
      headerTitle: "Flags"
    }
  },
  FlaggyScreen: {
    screen: FlaggyView,
  },
  MathScreen: {
    screen: MathView,
  },
  EnglishScreen: {
    screen: EnglishView,
  },
  LetterScreen: {
    screen: LetterView,
  },
  LetterTHScreen: {
    screen: LetterTHScreen,
  },
  MathTHScreen: {
    screen: MathTHScreen,
  },
  EnglishTHScreen: {
    screen: EnglishTHScreen,
  },
  ArithmeticsScreen: {
    screen: ArithmeticView,
  },
  DrawScreen: {
    screen: DrawView,
  },
});
const StackyApp = createAppContainer(stacky);
let store = createStore(rootReducer, applyMiddleware(thunk));
const appy = () => {
  return (
    <Provider store={store}>
      <StackyApp />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => appy);
