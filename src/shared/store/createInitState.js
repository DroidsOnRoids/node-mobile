// @flow
import type { DynamicStorage } from '../types/storage.types.js';
import initStorage from './initStorage';
import { AsyncStorage } from 'react-native';

import { setMinerId } from './persistentStorage';

const PATH_STORAGE_REF = 'PATH_STORAGE';

const createInitState = async () => {
  const storage = JSON.parse(await AsyncStorage.getItem('PATH_STORAGE'));

  const deviceStored = {
    miner_id: storage.miner_id || ''
  };
  const optionsStored = {
    wallet: storage.wallet || '',
    wifi_enabled: storage.wifi_enabled || ''
  };

  return {
    job: {},
    device: {
      info: {
        ...deviceStored
      }
    },
    socketClient: {},
    options: {
      userSettings: {
        ...optionsStored
      }
    }
  };
};

export default createInitState;
