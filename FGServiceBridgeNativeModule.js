import { NativeModules } from 'react-native';

const { FGServiceBridge } = NativeModules;

export default {
  exampleMethod() {
    return FGServiceBridge.exampleMethod();
  },
  startService() {
    console.log('FGServiceBridgeNativeModule startService');
    return FGServiceBridge.startService();
  },
  stopService() {
    return FGServiceBridge.stopService();
  },
};
