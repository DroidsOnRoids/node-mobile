// @flow
import type { UIReduxStorage } from '../types/storage.types.js';
import { AsyncStorage } from 'react-native';
import { has } from 'lodash';

import {
  getWalletAddress,
  getJobCount
} from '../../../shared/persistentStorage';

const PATH_STORAGE_REF = 'PATH_STORAGE';

const createInitState = async () => {
  const wallet = await getWalletAddress();
  const jobCount = await getJobCount();

  return {
    options: {
      wallet: wallet || ''
    },
    stats: {
      jobCompleteCount: jobCount || '0'
    }
  };
};

export default createInitState;
