// @flow
import type { DynamicStorage } from '../types/storage.types.js';
import initStorage from './initStorage';

import { PATH_DEFAULT_WALLET_ADDRESS } from '../../../shared/constants';
import { getWalletAddress } from '../../../shared/persistentStorage';

const PATH_STORAGE_REF = 'PATH_STORAGE';

const createInitState = async () => {
  const wallet = await getWalletAddress();

  return {
    job: {},
    device: {},
    socketClient: {},
    options: {
      wallet: wallet || PATH_DEFAULT_WALLET_ADDRESS
    }
  };
};

export default createInitState;
