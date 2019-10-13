import React, { Component } from 'react';
import { View } from 'react-native';
import Astronaut from "./Astronaut";

export default class Index extends Component {
  state = {};
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Astronaut width={120} height={50} />
      </View>
    );
  }
}
