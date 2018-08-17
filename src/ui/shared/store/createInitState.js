// @flow
import type { UIReduxStorage } from '../types/storage.types.js';
import { PATH_DEFAULT_WALLET_ADDRESS } from '../../../shared/constants';

import {
  getWalletAddress,
  getJobCount
} from '../../../shared/persistentStorage';

const createInitState = async () => {
  const wallet = await getWalletAddress();
  const jobCount = await getJobCount();

  return {
    options: {
      wallet: wallet || PATH_DEFAULT_WALLET_ADDRESS
    },
    stats: {
      jobCompleteCount: jobCount || '0'
    }
  };
};

export default createInitState;
