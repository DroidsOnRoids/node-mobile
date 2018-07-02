// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View, ImageBackground, StatusBar } from 'react-native';
import Config from 'react-native-config';

// Presentational Components
import Banner from './src/components/Banner';
import Info from './src/containers/Info';
import UserSettings from './src/components/UserSettings';

console.log(Config);

// Renderless Components
import Device from './src/Device';
import JobRunner from './src/JobRunner';
import SocketClient from './src/SocketClient';

import reduxStore from './src/shared/store/reduxStore';

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
            <SocketClient socketUrl={Config.API_URL} />
            <StatusBar barStyle="light-content" />
            <UserSettings />
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
