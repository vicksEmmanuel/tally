import React, { Component } from "react";
import { View, TouchableHighlight, Text } from "react-native";

const LetterComponent = props => {
  return (
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
          backgroundColor: "black",
          padding: 10,
          borderRadius: 4,
          width: 100,
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "orange",
            justifyContent: "center",
            width: "100%",
            fontWeight: "bold",
            letterSpacing: 3
          }}
        >
          {props.letter === undefined ? "" : props.letter.word}
        </Text>
      </TouchableHighlight>
    </View>
  );
};
export default LetterComponent;
