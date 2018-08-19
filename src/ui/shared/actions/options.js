// @flow
// device actions
import { OPTIONS_SET_WALLET } from './constants';

export const updateWalletAddress: (wallet: string) => any = wallet => ({
  type: OPTIONS_SET_WALLET,
  wallet
});
