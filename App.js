// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View, ImageBackground, StatusBar } from 'react-native';

// Presentational Components
import Banner from './src/components/Banner';
import Info from './src/containers/Info';

// Renderless Components
import Device from './src/Device';
import JobRunner from './src/JobRunner';
import SocketClient from './src/SocketClient';

import reduxStore from './src/shared/store/reduxStore';

// 10.0.2.2 instead of localhost because of being in a simulator
const socketURL = 'ws://10.0.2.2:3000/ws';

let store = {};
let socketHandle = {};

type Props = {};

type State = {
  storeLoaded: boolean
};

export default class App extends Component<Props, State> {
  state = {
    storeLoaded: false
  };

  componentWillMount() {
    this.initStore();
  }

  initStore = async () => {
    store = await reduxStore();
    this.setState({ storeLoaded: true });
  };

  render() {
    if (this.state.storeLoaded) {
      return (
        <Provider store={store}>
          <ImageBackground
            source={require('./assets/images/3_bg.jpg')}
            style={styles.container}
          >
            <Device />
            <JobRunner />
            <SocketClient socketUrl={socketURL} />
            <StatusBar barStyle="light-content" />
            <Banner />
            <Info />
          </ImageBackground>
        </Provider>
      );
    } else {
      // a loading screen would be a nice addition
      return <View />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 70,
    paddingBottom: 20,
    paddingHorizontal: 10
  }
});
