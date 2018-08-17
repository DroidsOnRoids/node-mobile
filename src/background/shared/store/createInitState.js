// @flow
import type { DynamicStorage } from '../types/storage.types.js';

import { getWalletAddress } from '../../../shared/persistentStorage';

const createInitState = async () => {
  const wallet = await getWalletAddress();

  return {
    job: {},
    device: {},
    socketClient: {},
    options: {}
  };
};

export default createInitState;
