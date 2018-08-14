// @flow
import type { DynamicStorage } from '../types/storage.types.js';
import initStorage from './initStorage';
import { AsyncStorage } from 'react-native';

import { has } from 'lodash';

const PATH_STORAGE_REF = 'PATH_STORAGE';

const createInitState = async () => {
  const storage = JSON.parse(await AsyncStorage.getItem('PATH_STORAGE'));

  if (storage === null) {
    return {
      options: {
        userSettings: {
          // TODO REMOVE / UPDATE
          wallet: '0x12345678901234567890'
        }
      }
    };
  }

  const optionsStored = {
    // TODO STRING NEEDS TO BE EMPTY
    wallet: storage.wallet || '0x12345678901234567890',
    wifi_enabled: storage.wifi_enabled || ''
  };

  return {
    options: {
      userSettings: {
        ...optionsStored
      }
    }
  };
};

export default createInitState;
