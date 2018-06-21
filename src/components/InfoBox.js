// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'exo-regular',
    color: 'white',
    fontSize: 20
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: '#0f4b77'
  }
});

type Props = {
  prefix: string,
  data: number | string
};

class InfoBox extends Component<Props> {
  render() {
    return (
      <View style={styles.button}>
        <Text style={styles.text}>{`${this.props.prefix}${
          this.props.data
        }`}</Text>
      </View>
    );
  }
}

export default InfoBox;
