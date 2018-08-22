// @flow
import { AppRegistry } from 'react-native';
import App from './App';
import BackgroundTask from './Background';

// import FGServiceBridge from './FGServiceBridgeNativeModule';

const backgroundRunner = BackgroundTask()
  .then(function() {
    console.log('Started background task');
  })
  .catch(function(error) {
    console.log('Failed to start background task', error);
  });

// FGServiceBridge.startService().then(function(value) {
//   console.log('startService return:', value);
// });
AppRegistry.registerComponent('mobileminer', () => App);
