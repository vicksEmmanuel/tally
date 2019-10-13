import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import Svg, { G, Path, Rect } from "react-native-svg";

export const RightArrow = props => {
  return (
    <Svg
      version="1.1"
      xmlns="http://www.w3.org/2000/Svg"
      viewBox="0 0 129 129"
      enable-background="new 0 0 129 129"
      fill="slategray"
      width="10"
      height="10"
      style={{
        right: 0,
        marginRight: 10,
        position: 'absolute',
        top: 15,
        right: 0,
        zIndex: 2,
      }}
      onPress={() => {
        props.handleClick();
      }}
    >
      <G>
        <Path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" />
      </G>
    </Svg>
  );
};
