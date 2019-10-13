import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import { connect } from "react-redux";
import Avatar from "./svg/Avatar";
import Button from "react-native-button";
import {
  initAlphabet,
  getAlphabet,
  initFlag,
  getFlag,
  initNumber,
  getNumber,
  getCurrentUser,
  getUsers,
  grayUp,
  getAlphabetDescription,
  initAlphabetDescription,
  initLetter,
  getLetter
} from "../actions/realmAction";
import Splash from "./Splash";
import Index from "./Index";
import BackgroundTask from "react-native-background-task";
import PushNotification from "react-native-push-notification";

const configNotification = {
  onNotification: notification => {
    notification.finish();
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },
  popInitialNotification: true,
  requestPermissions: true
};
const localNotification = () => {
  PushNotification.localNotification({
    message: "Learning with intelliQ",
    title: "IntelliQ",
    vibration: 300,
    vibrate: true,
    smallIcon: "ic_notification",
    largeIcon: "",
    autoCancel: true,
    playSound: true,
    soundName: 'default',
  });
};
BackgroundTask.define(() => {
  const x = () => {
    const today = new Date();
    return {
      day: today.getDate(),
      hour: today.getHours(),
      today
    };
  };
  //1 is monday
  if (x().day === 1) {
    if (x().hour === 8) {
    }
  }
  localNotification();
  BackgroundTask.finish();
});
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: "Splash"
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitle = params.title;
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
    return { header };
  };
  splashController() {
    return new Promise((resolve, reject) => {
      this.props.initAlphabet();
      this.props.initFlag();
      this.props.initNumber();
      this.props.initAlphabetDescription();
      this.props.initLetter();
      this.props.users();
      this.props.currentUser();
      resolve();
    });
  }
  componentDidMount() {
    const register = () => {
      return new Promise((resolve,reject) => {
        PushNotification.configure(configNotification);
        resolve();
      });
    };
    register().then(() => {
      BackgroundTask.schedule({
        period: 3600,
      });
    });
    setTimeout(() => {
      this.splashController().then(() => {
        this.setState({
          currentScreen: "Index"
        });
      });
    }, 1000);
  }
  render() {
    const { currentScreen } = this.state;
    let mainScreen =
      currentScreen === "Splash" ? <Splash /> : <Index {...this.props} />;
    return mainScreen;
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
    graySlate: {
      view: state.realm.view,
      slimView: state.realm.slimView
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
    initNumber: () => dispatch(initNumber()),
    currentUser: () => dispatch(getCurrentUser()),
    users: () => dispatch(getUsers()),
    initAlphabetDescription: () => dispatch(initAlphabetDescription()),
    alphabetDescription: () => dispatch(getAlphabetDescription()),
    initLetter: () => dispatch(initLetter()),
    letter: () => dispatch(getLetter()),
    count: () => dispatch(getNumber()),
    graySlateEditor: (x, y) => dispatch(grayUp(x, y))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
