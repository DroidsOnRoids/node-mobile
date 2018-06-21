// @flow
import React, { Component } from 'react';
import { View, Image } from 'react-native';

type Props = {};

class Banner extends Component<Props> {
  render() {
    return (
      <View>
        <Image
          source={require('../../assets/images/pathtoplogo.png')}
          style={{ width: 253, height: 220 }}
        />
      </View>
    );
  }
}

export default Banner;
