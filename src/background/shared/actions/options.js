// @flow
// device actions
import { OPTIONS_SET_WALLET, OPTIONS_FAILURE } from './constants';

export const updateWallet: (wallet: string) => any = wallet => ({
  type: OPTIONS_SET_WALLET,
  wallet: wallet
});

export const updateOptionsFail: (data: any) => any = data => ({
  type: OPTIONS_FAILURE,
  message: 'Failure setting user options'
});
