// @flow
import { AppRegistry } from 'react-native';
import App from './App';
import Background from './Background';

AppRegistry.registerComponent('mobileminer', () => App);
console.log('In index');

AppRegistry.registerHeadlessTask('PathBackgroundService', () => Background);
