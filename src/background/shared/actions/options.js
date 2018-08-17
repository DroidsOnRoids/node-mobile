// @flow
// device actions
import { OPTIONS_UPDATE_WALLET, OPTIONS_FAILURE } from './constants';

export const updateWallet: (wallet: string) => any = wallet => ({
  type: OPTIONS_UPDATE_WALLET,
  wallet: wallet
});

export const updateOptionsFail: (data: any) => any = data => ({
  type: OPTIONS_FAILURE,
  message: 'Failure setting user options'
});
