import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { SketchCanvas } from "@terrylinla/react-native-sketch-canvas";

export class GestureComponent extends Component {
  state = {
    canIWrite: true,
    whatShouldIWrite: "",
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
  handleOnLongPress(name, long) {
    switch (name) {
      case "first":
        return long === false
          ? {
              backgroundColor: "#060506",
              height: 500,
              width: Dimensions.get("screen").width - 5,
              margin: 10,
              marginBottom: 20,
              padding: 10,
              borderRadius: 12,
              borderBottomWidth: 4,
              borderBottomColor: "rgba(255, 165, 0, 0.4)"
            }
          : {
              backgroundColor: "#060506",
              height: 510,
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
  alphabetQuestions() {
    let letter = this.props.english.alphabet[
      Math.floor(Math.random() * this.props.english.alphabet.length)
    ];
    let findWhatToWrite = `? Write the capital letter "${
      letter.capital_letter
    } and small letter ${letter.small_letter} "`;
    this.setState({
      whatShouldIWrite: findWhatToWrite
    });
  }
  alphabetDescQuestions() {
    let letter = this.props.english.alphabetDescription[
      Math.floor(Math.random() * this.props.english.alphabetDescription.length)
    ];
    let findWhatToWrite = `? Write in both capital and small letters the word "${
      letter.alphabet_desc[
        Math.floor(Math.random() * letter.alphabet_desc.length)
      ].name
    }"`;
    this.setState({
      whatShouldIWrite: findWhatToWrite
    });
  }
  lettersQuestion() {
    const state = ["number", "write"];

    if (state[Math.floor(Math.random() * state.length)] === "number") {
      const also = ["how", "write"];
      if (also[Math.floor(Math.random() * also.length)] === "how") {
        let numb = Math.floor(Math.random() * 6) + 1;
        if (numb === 1) {
          numb += 1;
        }
        let findWhatToWrite = `? Write  "${numb}" letter words`;
        this.setState({
          whatShouldIWrite: findWhatToWrite
        });
      } else {
        let letter = this.props.english.letter[
          Math.floor(Math.random() * this.props.english.letter.length)
        ];
        let findWhatToWrite = `? How many letters can you see in the word "${
          letter.word
        }"`;
        this.setState({
          whatShouldIWrite: findWhatToWrite
        });
      }
    } else {
      let letter = this.props.english.letter[
        Math.floor(Math.random() * this.props.english.letter.length)
      ];
      let findWhatToWrite = `? Write the letters "${letter.word}"`;
      this.setState({
        whatShouldIWrite: findWhatToWrite
      });
    }
  }
  countingQuestion() {
    const state = ["tally", "letters", "num"];
    let random = state[Math.floor(Math.random() * state.length)];
    if (random === "tally") {
      let letter = this.props.math.count[Math.floor(Math.random() * 20)];
      let findWhatToWrite = `? Draw the tallies of the number "${
        letter.number
      }"`;
      this.setState({
        whatShouldIWrite: findWhatToWrite
      });
    } else if (random === "letters") {
      let letter = this.props.math.count[
        Math.floor(Math.random() * this.props.math.count.length)
      ];
      let findWhatToWrite = `? Write the number "${letter.id} in words"`;
      this.setState({
        whatShouldIWrite: findWhatToWrite
      });
    } else {
      let letter = this.props.math.count[
        Math.floor(Math.random() * this.props.math.count.length)
      ];
      let findWhatToWrite = `? Write the number "${letter.number}"`;
      this.setState({
        whatShouldIWrite: findWhatToWrite
      });
    }
  }
  arithmeticsQuestion() {
    const state = ["+", "-", "*", "/"];
    let findWhatToWrite = `? "${
      this.props.math.count[
        Math.floor(Math.random() * this.props.math.count.length)
      ].id
    } ${state[Math.floor(Math.random() * state.length)]} ${
      this.props.math.count[
        Math.floor(Math.random() * this.props.math.count.length)
      ].id
    }" equals what`;
    this.setState({
      whatShouldIWrite: findWhatToWrite
    });
  }
  whatShouldIWriteController() {
    if (this.state.canIWrite) {
      const state = [
        "alphabet",
        "alphabetdesc",
        "letters",
        "counting",
        "arithmetics"
      ];
      let nextTopicToWriteOn = state[Math.floor(Math.random() * state.length)];
      switch (nextTopicToWriteOn) {
        case "alphabet":
          return this.alphabetQuestions();
        case "alphabetdesc":
          return this.alphabetDescQuestions();
        case "letters":
          return this.lettersQuestion();
        case "counting":
          return this.countingQuestion();
        case "arithmetics":
          return this.arithmeticsQuestion();
        default:
          return this.alphabetQuestions();
      }
    } else {
      return "";
    }
  }
  tController() {
    if (this.state.whatShouldIWrite.length > 0) {
      this.setState({
        canIWrite: false
      });
    } else {
      this.setState({
        canIWrite: true
      });
    }
    this.whatShouldIWriteController();
  }
  componentDidMount() {
    this.tController();
  }
  render() {
    return (
      <Animated.View
        style={{
          flex: 1,
          padding: 2,
          marginTop: 10
        }}
      >
        <View
          style={this.handleOnLongPress(
            this.state.first.name,
            this.state.first.long
          )}
        >
          <View style={{ height: 40, width: "100%" }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "rgb(141,141,140)"
              }}
            >
              the BlackBoard
            </Text>
          </View>
          <View style={{ height: 30, width: "100%" }}>
            <Text style={{ color: "white", fontSize: 14, fontStyle: "italic" }}>
              {this.state.whatShouldIWrite}
            </Text>
          </View>
          <View style={{ height: 50, width: "100%", flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                height: 30,
                padding: 4,
                backgroundColor: "cornflowerblue",
                width: 60,
                borderRadius: 5,
                marginRight: 5,
                alignContent: "flex-end"
              }}
              onPress={() => {
                this.setState({
                  whatShouldIWrite: ""
                });
                this.whatShouldIWriteController();
                alert(JSON.stringify(this.refs.sketchRef.getPaths()));
              }}
            >
              <Text
                style={{ color: "white", fontSize: 14, textAlign: "center" }}
              >
                Correct
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 30,
                padding: 4,
                backgroundColor: "cornflowerblue",
                width: 60,
                alignContent: "flex-end",
                borderRadius: 5
              }}
              onPress={() => {
                this.setState({
                  whatShouldIWrite: ""
                });
                this.whatShouldIWriteController();
              }}
            >
              <Text
                style={{ color: "white", fontSize: 14, textAlign: "center" }}
              >
                Wrong
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 30,
                padding: 4,
                backgroundColor: "black",
                width: 60,
                borderRadius: 5,
                marginRight: 5,
                alignContent: "flex-end"
              }}
              onPress={() => {
                this.refs.sketchRef.undo();
              }}
            >
              <Text
                style={{ color: "white", fontSize: 14, textAlign: "center" }}
              >
                Undo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 30,
                padding: 4,
                backgroundColor: "black",
                width: 60,
                borderRadius: 5,
                marginRight: 5,
                alignContent: "flex-end"
              }}
              onPress={() => {
                this.refs.sketchRef.clear();
              }}
            >
              <Text
                style={{ color: "white", fontSize: 14, textAlign: "center" }}
              >
                Clear
              </Text>
            </TouchableOpacity>
          </View>
          <SketchCanvas
            style={{ width: "100%", height: 350 }}
            ref="sketchRef"
            strokeColor={"rgb(141,141,140)"}
            strokeWidth={5}
          />
        </View>
        <View style={{ height: 10, width: Dimensions.get("screen").width }} />
      </Animated.View>
    );
  }
}
