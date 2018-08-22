// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View, ImageBackground, StatusBar } from 'react-native';

import { getJobCount } from './src/shared/persistentStorage';
import { updateJobCount } from './src/ui/shared/actions/stats';

// Presentational Components
import Banner from './src/ui/components/Banner';
import Info from './src/ui/containers/Info';
import UserSettings from './src/ui/components/UserSettings';

import reduxStore from './src/ui/shared/store/reduxStore';

let store = {};

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

  hydrateStore = async () => {
    const jobCount = await getJobCount();
    store.dispatch(updateJobCount(jobCount || '0'));
  };

  initStore = async () => {
    store = await reduxStore();
    this.setState({ storeLoaded: true });

    // enqueue setInterval to poll AsyncStorage and hydrate store
    setInterval(() => {
      this.hydrateStore();
      console.log('hydrated store');
    }, 10000);
  };

  render() {
    if (this.state.storeLoaded) {
      return (
        <Provider store={store}>
          <ImageBackground
            source={require('./assets/images/3_bg.jpg')}
            style={styles.container}
          >
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
