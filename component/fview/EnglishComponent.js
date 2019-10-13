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
  ScrollView
} from "react-native";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation
} from "react-native-popup-dialog";
import { EnglishScreen, LetterScreen } from "../screen";
import { AlphabetComponent } from "../svg/AlphabetComponent";
import LetterComponent from "./LetterComponent";
import Svg, { G, Path, Circle, Rect } from "react-native-svg";

export class EnglishComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false,
      numberOfCorrectAnswers: 0,
      answerColor: false,
      rand: "",
      correct: "#32ff00",
      wrong: "#ff3298",
      rando: "",
      random: "",
      expanded: false,
      answer: "",
      subtopic: "",
      view: <View />,
      i: 1,
      colorExpanded: false,
      isQuestion: false,
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
  changeLayout() {
    if (this.state.i > 2) {
      this.setState({
        modalVisibility: true,
      });
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState(
        {
          expanded: !this.state.expanded,
          view: null,
          i: 1,
          numberOfCorrectAnswers: 0
        },
        () => {
          this.questionControls();
        }
      );
      this.props.slide();
    }
  }
  changeColorLayout() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      colorExpanded: !this.state.colorExpanded
    });
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
  save() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      colorExpanded: false
    });
  }
  displayMode() {
    const color = [
      "#d9b4fe",
      "#4b5cfc",
      "#187cc7",
      "#2256bd",
      "#3b36b3",
      "#e8527f",
      "#ecdcfa",
      "#ff8465",
      "#c54b9a",
      "#2350dd",
      "#37459c",
      "#54b4f0",
      "#771853",
      "#3d506d",
      "#100922",
      "#7271df",
      "#231f69",
      "#4e0939",
      "#b5043e",
      "#1c174b",
      "#262c3b",
      "orange",
      "black"
    ];
    const colorPlatte = () => {
      const deep = color.map(item => {
        return (
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
              backgroundColor: item,
              margin: 5
            }}
            key={item}
            onPress={() => {
              this.setState({
                color: item
              });
            }}
            activeOpacity={0.95}
          />
        );
      });
      return deep;
    };
    if (this.state.colorExpanded) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView
            maximumZoomScale={3}
            minimumZoomScale={0.2}
            horizontal={false}
            scrollEventThrottle={10}
          >
            <View style={{ width: "100%", height: "20%" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Display mode
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                padding: 10,
                flexDirection: "row",
                flexWrap: "wrap"
              }}
            >
              {colorPlatte()}
              <View style={{ height: 20, width: "100%" }} />
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return <View />;
    }
  }
  answerControls(answers) {
    const state = [answers.answer, answers.false1, answers.false2];
    const randify = Math.floor(Math.random() * state.length);
    if (randify === 2) {
      const anotherRandify = Math.floor(Math.random() * 2) + 1;
      if (anotherRandify === 1) {
        this.setState({
          rand: state[randify],
          rando: state[randify - 1],
          random: state[randify - 2]
        });
      } else {
        this.setState({
          rand: state[randify],
          rando: state[randify - 2],
          random: state[randify - 1]
        });
      }
    } else if (randify === 1) {
      const anotherRandify = Math.floor(Math.random() * 2) + 1;
      if (anotherRandify === 1) {
        this.setState({
          rand: state[randify],
          rando: state[randify + 1],
          random: state[randify - 1]
        });
      } else {
        this.setState({
          rand: state[randify],
          rando: state[randify - 1],
          random: state[randify + 1]
        });
      }
    } else {
      const anotherRandify = Math.floor(Math.random() * 2) + 1;
      if (anotherRandify === 1) {
        this.setState({
          rand: state[randify],
          rando: state[randify + 1],
          random: state[randify + 2]
        });
      } else {
        this.setState({
          rand: state[randify],
          rando: state[randify + 1],
          random: state[randify + 2]
        });
      }
    }
  }
  questionControls() {
    const letter = () => {
      let tops = this.props.english.letter;
      let randomTopStatePicker = tops[Math.floor(Math.random() * tops.length)];
      let xValue = String(randomTopStatePicker.word).split("");
      let ques1 = Math.floor(Math.random() * xValue.length);
      let answer = xValue[ques1];
      xValue[ques1] = "_";
      return {
        question: xValue.join(""),
        answer,
        numb: 1
      };
    };
    const consonant = () => {
      const state = this.props.english.alphabet.filter(item => {
        return item.vc === "consonant";
      });
      let question = state[Math.floor(Math.random() * state.length)];
      let answer = question.small_letter;
      return {
        question: "Select the odd value below",
        answer,
        numb: 1
      };
    };
    const vowel = () => {
      const state = this.props.english.alphabet.filter(item => {
        return item.vc === "vowel";
      });
      let question = state[Math.floor(Math.random() * state.length)];
      let answer = question.small_letter;
      return {
        question: "Select a vowel value below",
        answer,
        numb: 1
      };
    };
    const falseAnswers = sub => {
      if (sub === "letter") {
        let valXY = Math.floor(Math.random() * 26);
        let falsify1 = this.props.english.alphabet[valXY];
        let valXZ = Math.floor(Math.random() * 26);
        let falsify2 = this.props.english.alphabet[valXZ];
        if (falsify1.small_letter === falsify2.small_letter) {
          if (valXZ + 4 <= 25) {
            valXZ += 4;
            falsify2 = this.props.english.alphabet[valXZ];
          } else {
            valXZ -= 4;
            falsify2 = this.props.english.alphabet[valXZ];
          }
        }
        if (falsify1.small_letter === this.state.answer) {
          if (valXY + 1 <= 25) {
            valXY += 1;
            falsify1 = this.props.english.alphabet[valXY];
          } else {
            valXY -= 1;
            falsify1 = this.props.english.alphabet[valXY];
          }
        }
        if (falsify2.small_letter === this.state.answer) {
          if (valXZ + 1 <= 25) {
            valXZ += 1;
            falsify2 = this.props.english.alphabet[valXZ];
          } else {
            valXZ -= 1;
            falsify2 = this.props.english.alphabet[valXZ];
          }
        }
        return {
          false1: falsify1.small_letter,
          false2: falsify2.small_letter
        };
      } else if (sub === "consonant") {
        const Value = this.props.english.alphabet.filter(item => {
          return item.vc === "vowel";
        });
        let valXY = Math.floor(Math.random() * Value.length);
        let falsify1 = Value[valXY];
        let valXZ = Math.floor(Math.random() * Value.length);
        let falsify2 = Value[valXZ];
        if (falsify1.small_letter === falsify2.small_letter) {
          if (valXZ + 2 < Value.length) {
            valXZ += 2;
            falsify2 = Value[valXZ];
          } else {
            valXZ -= 2;
            falsify2 = Value[valXZ];
          }
        }

        return {
          false1: falsify1.small_letter,
          false2: falsify2.small_letter
        };
      } else if (sub === "vowel") {
        const Value = this.props.english.alphabet.filter(item => {
          return item.vc === "consonant";
        });
        let valXY = Math.floor(Math.random() * Value.length);
        let falsify1 = Value[valXY];
        let valXZ = Math.floor(Math.random() * Value.length);
        let falsify2 = this.props.english.alphabet[valXZ];
        if (falsify1.small_letter === this.state.answer) {
          if (valXY + 1 > Value.length - 1) {
            valXY -= 1;
            falsify1 = Value[valXY];
          } else {
            valXY += 1;
            falsify1 = Value[valXY];
          }
        }
        if (falsify2.small_letter === this.state.answer) {
          if (valXZ + 1 < 25) {
            valXZ += 1;
            falsify2 = Value[valXZ];
          } else {
            valXZ -= 1;
            falsify2 = Value[valXZ];
          }
        }
        if (falsify1.small_letter === falsify2.small_letter) {
          if (valXZ + 1 < Value.length - 1) {
            valXZ += 1;
            falsify2 = Value[valXZ];
          } else {
            valXZ -= 1;
            falsify2 = Value[valXZ];
          }
        }

        return {
          false1: falsify1.small_letter,
          false2: falsify2.small_letter
        };
      }
    };
    if (this.state.view === null && this.state.expanded) {
      const state = ["letter", "consonant", "vowel", "image"];
      let randomQuestionPicker = state[Math.floor(Math.random() * 4)];
      switch (randomQuestionPicker) {
        case "letter":
          const topic = letter();
          const question = topic.question;
          const answer = topic.answer;
          const falsify = falseAnswers("letter");
          this.setState(
            {
              i: (this.state.i += 1),
              answer,
              subtopic:
                "Instruction: fill in the missing gap with an option listed below",
              view: (
                <Text
                  numberOfLines={5}
                  style={{
                    textAlign: "center",
                    fontSize: 40,
                    letterSpacing: 6,
                    fontWeight: "400",
                    color: "white"
                  }}
                >
                  {question}
                </Text>
              )
            },
            () => {
              this.answerControls({
                answer,
                false1: falsify.false1,
                false2: falsify.false2
              });
            }
          );
          break;
        case "consonant":
          const topic2 = consonant();
          const question2 = topic2.question;
          const answer2 = topic2.answer;
          const falsify2 = falseAnswers("consonant");
          this.setState(
            {
              i: (this.state.i += 1),
              answer: answer2,
              subtopic:
                "Instruction: choose a consonant among the options below",
              view: (
                <Text
                  numberOfLines={5}
                  style={{
                    textAlign: "justify",
                    fontSize: 40,
                    padding: 5,
                    letterSpacing: 3,
                    fontWeight: "400",
                    color: "white",
                    marginLeft: 10
                  }}
                >
                  {question2}
                </Text>
              )
            },
            () => {
              this.answerControls({
                answer: answer2,
                false1: falsify2.false1,
                false2: falsify2.false2
              });
            }
          );
          break;
        case "vowel":
          const topic3 = vowel();
          const question3 = topic3.question;
          const answer3 = topic3.answer;
          const falsify3 = falseAnswers("vowel");
          this.setState(
            {
              i: (this.state.i += 1),
              answer: answer3,
              subtopic: "Instruction: choose a vowel among the options below",
              view: (
                <Text
                  numberOfLines={5}
                  style={{
                    textAlign: "justify",
                    fontSize: 40,
                    padding: 5,
                    letterSpacing: 3,
                    fontWeight: "400",
                    color: "white",
                    marginLeft: 10
                  }}
                >
                  {question3}
                </Text>
              )
            },
            () => {
              this.answerControls({
                answer: answer3,
                false1: falsify3.false1,
                false2: falsify3.false2
              });
            }
          );
          break;
        default:
          const topic4 = letter();
          const question4 = topic4.question;
          const answer4 = topic4.answer;
          const falsify4 = falseAnswers("letter");
          this.setState(
            {
              i: (this.state.i += 1),
              answer: answer4,
              subtopic:
                "Instruction: fill in the missing gap with an option listed below",
              view: (
                <Text
                  numberOfLines={5}
                  style={{
                    textAlign: "center",
                    fontSize: 40,
                    letterSpacing: 6,
                    fontWeight: "400",
                    color: "white"
                  }}
                >
                  {question4}
                </Text>
              )
            },
            () => {
              this.answerControls({
                answer: answer4,
                false1: falsify4.false1,
                false2: falsify4.false2
              });
            }
          );
      }
    }
  }
  questionController() {
    if (this.state.i <= 10) {
      this.setState(
        {
          view: null
        },
        () => {
          this.questionControls();
        }
      );
    } else {
      this.setState({
        modalVisibility: true
      });
    }
  }
  englishSlide() {
    const modal = () => {
      const scoreComp = Math.floor(Math.random() * 2) + 1;
      let comp = <View />;
      if (scoreComp === 1) {
        comp = (
          <Svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={100}
            height={100}
            viewBox="0 0 56 56"
            style="enable-background:new 0 0 56 56;"
          >
            <Circle
              fill="#e57e25"
              style="fill:#E57E25;"
              cx="28"
              cy="28"
              r="28"
            />
            <Path
              fill="#38454f"
              style="fill:#38454F;"
              d="M0.729,30.188c3.621-3.458,9.574-4.556,13.853-2.558c-3.798,5.417-6.596,11.581-8.155,18.219
	c0.471,0.569,0.968,1.114,1.482,1.643c0.141-0.133,0.252-0.3,0.296-0.503c1.471-6.684,4.259-12.877,8.075-18.296
	c2.555,1.983,3.809,5.247,3.525,9.435l-0.004,0.054l0.002,0.055c0.251,6.063,3.746,11.611,9.348,14.839
	c1.762,1.016,3.608,1.723,5.466,2.129c1.658-0.402,3.256-0.952,4.784-1.634c-3.049,0.236-6.277-0.514-9.252-2.228
	c-4.989-2.875-8.105-7.782-8.346-13.136c0.395-6.064-2.008-9.374-4.324-11.145c1.487-1.945,3.112-3.778,4.858-5.488
	c7.154,6.653,13.881,13.779,20.076,21.313l4.313,5.247l1.545-1.271l-4.313-5.247c-6.223-7.568-12.977-14.728-20.16-21.416
	c1.39-1.259,2.85-2.442,4.373-3.543c2.39,3.021,6.233,4.501,11.036,4.185c4.519,0.205,8.76,2.665,11.643,6.754
	c2.242,3.18,3.383,6.962,3.269,10.49c0.623-1.611,1.099-3.294,1.417-5.033c-0.592-2.311-1.617-4.575-3.051-6.609
	c-3.255-4.617-8.084-7.388-13.248-7.602l-0.055-0.002l-0.054,0.004c-4.07,0.274-7.294-0.911-9.295-3.34
	c5.142-3.417,10.935-5.93,17.155-7.3c0.203-0.045,0.365-0.161,0.498-0.302c-0.528-0.512-1.072-1.008-1.639-1.477
	c-6.19,1.454-11.965,3.99-17.109,7.407c-1.946-3.908-1.265-9.4,1.667-13.169l0.407-0.523C29.888,0.048,28.95,0,28,0v0.614
	c-2.774,4.391-3.187,10.109-0.926,14.371c-1.659,1.195-3.245,2.483-4.753,3.857c-3.269-2.989-6.615-5.891-10.053-8.674L8.953,7.484
	C8.461,7.941,7.987,8.415,7.529,8.906l3.481,2.818c3.369,2.727,6.649,5.569,9.855,8.497c-1.829,1.798-3.531,3.726-5.085,5.772
	c-0.114-0.058-0.23-0.118-0.339-0.169C10.698,23.603,4.46,24.534,0.19,28H0c0,0.93,0.048,1.848,0.136,2.754L0.729,30.188z"
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
        );
      } else {
        comp = (
          <Svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            width={100}
            height={100}
            y="0px"
            viewBox="0 0 504.616 504.616"
            style="enable-background:new 0 0 504.616 504.616;"
          >
            <Path
              fill="#E2574C"
              style="fill:#E2574C;"
              d="M468.923,484.136c0,11.422-9.058,20.48-20.48,20.48H56.172c-11.028,0-20.48-9.058-20.48-20.48
	V198.598c0-3.545,2.757-6.695,6.302-7.483c34.265-7.877,61.44-79.951,61.44-167.778v-8.271c0-3.938,2.757-7.483,6.695-7.877
	l56.32-7.089c2.363-0.394,4.726,0.394,6.302,2.363c16.935,16.542,46.08,31.508,79.163,31.508s62.228-14.966,79.163-31.508
	c1.575-1.575,3.938-2.363,6.302-2.363l56.714,7.089c3.938,0.394,6.695,3.938,6.695,7.877v8.271
	c0,87.828,27.175,159.902,61.44,167.778c3.545,0.788,6.302,3.938,6.302,7.483C468.529,198.598,468.923,484.136,468.923,484.136z"
            />
            <Path
              fill="#BF392B"
              style="fill:#BF392B;"
              d="M252.308,157.638c56.714,0,102.4-59.865,102.4-133.908c0-7.483-0.394-14.572-1.182-21.662
	l-15.36-1.969c-2.363-0.394-4.726,0.394-6.302,2.363c-16.935,16.542-46.08,31.508-79.163,31.508s-62.228-14.966-79.163-31.508
	c-1.575-1.575-3.938-2.363-6.302-2.363l-15.36,1.969c-1.575,7.089-1.969,14.178-1.969,21.662
	C149.908,97.773,195.594,157.638,252.308,157.638z"
            />
            <Path
              fill="#D9D9D9"
              style="fill:#D9D9D9;"
              d="M150.302,2.069c6.695,34.658,49.625,61.046,101.612,61.046S346.831,36.727,353.92,2.069L338.166,0.1
	h-1.969c-1.575,0.394-3.151,0.788-4.332,2.363c-16.935,16.542-46.08,31.508-79.163,31.508s-62.228-14.966-79.163-31.508
	c-1.182-1.182-2.757-1.969-4.332-2.363h-1.969C167.237,0.099,150.302,2.069,150.302,2.069z"
            />
            <Path
              fill="#EFEFEF"
              style="fill:#EFEFEF;"
              d="M344.074,0.099c0.788,7.877,1.575,15.754,1.575,23.631c0,69.317-41.748,126.031-93.342,126.031
	s-93.342-56.32-93.342-126.031c0-8.271,0.788-16.148,1.575-23.631h-16.935c-0.788,7.877-1.575,15.754-1.575,23.631
	c0,77.982,49.625,141.785,110.277,141.785S362.584,101.712,362.584,23.73c0-7.877-0.788-15.754-1.575-23.631
	C361.009,0.099,344.074,0.099,344.074,0.099z"
            />
            <Path
              fill="#EC9089"
              style="fill:#EC9089;"
              d="M327.138,204.899h55.138c2.363,0,3.938,1.575,3.938,3.938v23.631c0,2.363-1.575,3.938-3.938,3.938
	h-55.138c-2.363,0-3.938-1.575-3.938-3.938v-23.631C323.2,206.869,324.775,204.899,327.138,204.899z"
            />
            <Path
              fill="#EEE0DF"
              style="fill:#EEE0DF;"
              d="M237.735,389.219h-43.717c-1.182,0-1.182-1.182-0.788-1.575c7.877-7.877,18.117-14.572,27.569-21.662
	c12.603-9.846,23.237-20.48,23.237-37.022c0-22.449-18.117-32.689-40.172-32.689c-18.511,0-35.446,10.634-36.628,30.326
	c0,5.514,2.757,7.877,8.271,8.271c5.12,0.788,10.634-1.182,11.815-6.695c1.969-9.058,8.665-13.391,16.935-13.391
	c11.422,0,18.117,5.908,18.117,16.542c0,9.452-9.846,18.117-18.905,25.206c-11.422,8.665-22.055,16.542-31.902,27.175
	c-2.363,2.757-5.514,7.877-5.514,14.572c0,9.452,2.363,12.209,11.028,12.209h61.046c5.514,0,7.089-4.726,7.089-9.452
	C244.431,395.521,242.855,389.219,237.735,389.219L237.735,389.219z M306.658,338.019c-1.182,0-1.575-1.182-0.788-1.969
	l21.268-20.874c2.363-2.363,4.332-4.726,4.332-8.665c0.394-5.514-0.788-11.028-6.302-11.028h-55.926
	c-5.514,0-6.695,6.302-6.695,11.028s1.182,9.452,6.695,9.452h32.689c-2.363,1.969-4.332,3.545-6.302,5.908l-13.785,14.178
	c-2.757,3.151-3.938,6.695-1.969,11.028c1.575,3.938,4.726,5.908,8.271,5.908c13.785,0,29.538,2.363,29.538,20.086
	c0,10.24-7.483,18.511-18.511,18.511c-9.452,0-14.966-3.151-19.298-11.422c-2.757-4.726-7.877-5.514-12.997-3.545
	c-5.514,2.363-7.877,7.089-5.12,12.603c6.695,14.178,20.874,20.086,37.022,20.086c23.237,0,40.566-14.966,40.96-38.203
	C338.954,352.986,325.957,339.989,306.658,338.019z"
            />
            <Path
              fill="#CB4E44"
              style="fill:#CB4E44;"
              d="M41.994,191.115c-3.545,0.788-6.302,3.938-6.302,7.483v285.538c0,11.422,9.058,20.48,20.48,20.48
	h7.089V177.33C56.566,184.419,49.477,189.146,41.994,191.115z M462.622,191.115c-7.483-1.575-14.572-6.695-21.268-13.785v326.892
	h7.089c11.028,0,20.48-9.058,20.48-20.48V198.598C468.923,194.659,466.166,191.903,462.622,191.115z"
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
        );
      }
      return (
        <Dialog
          onDismiss={() => {
            this.setState({
              modalVisibility: false,
              view: null,
              i: 1,
              numberOfCorrectAnswers: 0
            });
            if (!this.state.expanded) {
              this.props.slide2();
            }
            this.questionController();
          }}
          dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
          onHardwareBackPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.setState({
              modalVisibility: false,
              view: null,
              i: 1,
              numberOfCorrectAnswers: 0
            });
          }}
          onTouchOutside={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.setState({
              modalVisibility: false,
              view: null,
              i: 1,
              numberOfCorrectAnswers: 0
            });
          }}
          width={0.6}
          visible={this.state.modalVisibility}
          rounded
          actionsBordered
        >
          <DialogContent
            style={{
              backgroundColor: "#f7f7f8",
              height: 300,
              justifyContent: "center"
            }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View
                style={{
                  height: 150,
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  marginTop: 20
                }}
              >
                {comp}
              </View>
              <View
                style={{ height: 30, justifyContent: "center", marginTop: 10 }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#BF392B",
                    fontSize: 25,
                    fontWeight: "bold"
                  }}
                >
                  Score {this.state.numberOfCorrectAnswers}/10
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    const x = () => {
                      return new Promise((resolve, reject) => {
                        this.setState(
                          {
                            modalVisibility: false,
                            numberOfCorrectAnswers: 0,
                            i: 0
                          },
                          () => {
                            resolve();
                          }
                        );
                      });
                    };
                    x();
                  }}
                  style={{
                    backgroundColor: "rgb(141,141,140)",
                    borderRadius: 5,
                    padding: 7,
                    justifyContent: "center",
                    marginRight: 4
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 14,
                      fontWeight: "500"
                    }}
                  >
                    Continue
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const x = () => {
                      return new Promise((resolve, reject) => {
                        this.setState(
                          {
                            modalVisibility: false,
                            numberOfCorrectAnswers: 0,
                          },
                          () => {
                            resolve();
                          }
                        );
                      });
                    };
                    x().then(() => {
                      this.setState({
                        expanded: false,
                        view: null,
                        i: 1,
                      });
                    });
                  }}
                  style={{
                    backgroundColor: "#BF392B",
                    borderRadius: 5,
                    padding: 7,
                    justifyContent: "center",
                    marginRight: 4
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 14,
                      fontWeight: "500"
                    }}
                  >
                    Quit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </DialogContent>
        </Dialog>
      );
    };
    if (this.state.expanded) {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: this.state.expanded ? "10%" : 0,
              padding: 5,
              flexDirection: "row",
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              backgroundColor: this.state.colorExpanded
                ? "rgba(0,0,0,0.6)"
                : "white"
            }}
          >
            <TouchableOpacity
              activeOpacity={0.95}
              style={{
                justifyContent: "center"
              }}
              onPress={() => {
                if (!this.state.colorExpanded) {
                  this.changeLayout();
                }
                this.save();
              }}
            >
              <Svg
                version="1.1"
                id="Capa_1"
                fill="#3c1451"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width={this.state.expanded ? "20px" : "0px"}
                height={this.state.expanded ? "20px" : "0px"}
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
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => {
                this.save();
              }}
              style={{
                justifyContent: "center",
                marginLeft: 15
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  textAlign: "left",
                  color: "rgb(141,141,140)"
                }}
              >
                Subject Questions: English
              </Text>
              <Text
                style={{
                  padding: 4,
                  fontSize: 12,
                  textAlign: "left",
                  color: "rgb(141,141,140)",
                  marginRight: 10
                }}
              >
                {this.state.subtopic}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: "50%",
              padding: 10,
              paddingTop: 5,
              backgroundColor: this.state.colorExpanded
                ? "rgba(0,0,0,0.6)"
                : "white"
            }}
          >
            <TouchableOpacity
              activeOpacity={0.95}
              style={{
                backgroundColor: this.state.color,
                justifyContent: "center",
                width: "100%",
                borderRadius: 10,
                height: "80%"
              }}
              onPress={() => {
                this.save();
              }}
            >
              <View
                style={{
                  height: "80%",
                  width: "100%",
                  justifyContent: "center"
                }}
              >
                {this.state.view === null ? <View /> : this.state.view}
              </View>
              <View
                style={{
                  alignContent: "flex-end",
                  height: "20%",
                  padding: 10,
                  justifyContent: "flex-end"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.changeColorLayout();
                  }}
                >
                  <Svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    fill="rgb(141,141,140)"
                    width="20px"
                    height="50px"
                    viewBox="0 0 108.336 108.336"
                    style="enable-background:new 0 0 108.336 108.336;"
                  >
                    <G>
                      <Path
                        d="M54.168,0C24.3,0,0,24.3,0,54.168c0,29.869,24.3,54.168,54.168,54.168s54.168-24.299,54.168-54.168
		C108.336,24.3,84.036,0,54.168,0z M91.639,91.611c-10.412,10.371-22.904,15.559-37.471,15.559c8.186,0,15.211-5.188,21.083-15.559
		c5.871-10.373,8.808-22.885,8.808-37.532c0-14.608-2.937-27.107-8.808-37.503C69.38,6.184,62.354,0.987,54.168,0.987
		c14.566,0,27.059,5.197,37.471,15.588c10.413,10.396,15.622,22.895,15.622,37.503C107.262,68.727,102.053,81.238,91.639,91.611z"
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
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: "20%",
              padding: 10,
              paddingTop: 5,
              flexDirection: "row",
              backgroundColor: this.state.colorExpanded
                ? "rgba(0,0,0,0.6)"
                : "white"
            }}
          >
            <TouchableOpacity
              activeOpacity={0.95}
              style={{
                backgroundColor: this.state.color,
                justifyContent: "center",
                width: 80,
                borderRadius: 80,
                height: 80,
                marginRight: 25
              }}
              onPress={() => {
                if (this.state.rand === this.state.answer) {
                  this.setState({
                    numberOfCorrectAnswers: (this.state.numberOfCorrectAnswers += 1)
                  });
                }
                this.questionController();
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 20, color: "white" }}
              >
                {this.state.rand}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.95}
              style={{
                backgroundColor: this.state.color,
                justifyContent: "center",
                width: 80,
                borderRadius: 80,
                height: 80,
                marginRight: 25
              }}
              onPress={() => {
                if (this.state.rando === this.state.answer) {
                  this.setState({
                    numberOfCorrectAnswers: (this.state.numberOfCorrectAnswers += 1)
                  });
                }
                this.questionController();
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 20, color: "white" }}
              >
                {this.state.rando}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.95}
              style={{
                backgroundColor: this.state.color,
                justifyContent: "center",
                width: 80,
                borderRadius: 80,
                height: 80
              }}
              onPress={() => {
                if (this.state.random === this.state.answer) {
                  this.setState({
                    numberOfCorrectAnswers: (this.state.numberOfCorrectAnswers += 1)
                  });
                }
                this.questionController();
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 20, color: "white" }}
              >
                {this.state.random}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              position: "absolute",
              borderTopRightRadius: this.state.colorExpanded ? 20 : 0,
              borderTopLeftRadius: this.state.colorExpanded ? 20 : 0,
              bottom: 40,
              left: 0,
              right: 0,
              width: "100%",
              backgroundColor: "white",
              padding: 10,
              height: this.state.colorExpanded ? 200 : 0
            }}
          >
            {this.displayMode()}
          </TouchableOpacity>
          {modal()}
        </View>
      );
    } else {
      return <View />;
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
          onPress={() => {
            this.props.navigation.navigate(EnglishScreen, {
              ...this.props
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
            <AlphabetComponent number={Math.floor(Math.random() * 4) + 1} />
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
              Alphabets
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
              Act of learning the alphabets
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
          onPress={() => {
            this.props.navigation.navigate(LetterScreen, {
              ...this.props
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
            <LetterComponent
              letter={
                this.props.english.letter[
                  Math.floor(Math.random() * this.props.english.letter.length) +
                    1
                ]
              }
              number={Math.floor(Math.random() * 10) + 1}
            />
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
              Letter Words
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
              The letters are clear
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.95}
          onPressIn={() => {
            this.setState({
              third: {
                name: "third",
                long: true
              }
            });
          }}
          onPressOut={() => {
            this.setState({
              third: {
                name: "third",
                long: false
              }
            });
          }}
          style={this.handleOnLongPress(
            this.state.third.name,
            this.state.third.long
          )}
          onPress={() => {
            this.changeLayout();
          }}
        >
          <View
            style={{
              flex: 1
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                padding: 5,
                position: "absolute",
                top: -20
              }}
            >
              <TouchableHighlight
                style={{
                  backgroundColor: "#a2ff00",
                  padding: 5,
                  borderRadius: 80,
                  width: 50,
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    color: "white",
                    justifyContent: "center",
                    width: "100%",
                    fontWeight: "bold",
                    textAlign: "center",
                    letterSpacing: 3
                  }}
                >
                  ?
                </Text>
              </TouchableHighlight>
            </View>
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
              Questions
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
              Practice makes perfect
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ height: 10, width: Dimensions.get("screen").width }} />
        <TouchableOpacity
          activeOpacity={1}
          style={{
            position: "absolute",
            borderTopRightRadius: this.state.expanded ? 20 : 0,
            borderTopLeftRadius: this.state.expanded ? 20 : 0,
            top: -115,
            left: 0,
            right: 0,
            width: "102%",
            backgroundColor: "white",
            borderTopWidth: this.state.expanded ? 5 : 0,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderTopColor: this.state.expanded ? "rgb(141,141,140)" : "white",
            height: this.state.expanded ? SCREENHEIGHT : 0
          }}
          onPress={() => {
            this.save();
          }}
        >
          {this.englishSlide()}
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
