//@flow
import { has } from 'lodash';
import { AsyncStorage } from 'react-native';

import { PATH_DEFAULT_WALLET_ADDRESS } from './constants';

// These have to be in this file, otherwise weird timing bugs
// happen
const PATH_STORAGE_REF = 'PATH_STORAGE';
const PATH_STORAGE_WALLET_KEY = 'wallet';
const PATH_STORAGE_JOB_COUNT_KEY = 'jobCompleteCount';

//AsyncStorage.setItem(PATH_STORAGE_REF, '');

const setPersistStorage = async (key: string, value: string) => {
  const storeString = await AsyncStorage.getItem(PATH_STORAGE_REF);

  if (storeString !== null) {
    const currentStore = JSON.parse(storeString) || {};

    const newState = {
      ...currentStore,
      [key]: value
    };
    await AsyncStorage.setItem(PATH_STORAGE_REF, JSON.stringify(newState));
  } else {
    const newState = {
      [key]: value
    };
    await AsyncStorage.setItem(PATH_STORAGE_REF, JSON.stringify(newState));
  }
};

const getPersistStorage = async (key: string) => {
  const storeString = await AsyncStorage.getItem(PATH_STORAGE_REF);

  if (storeString !== null) {
    const currentStore = JSON.parse(storeString) || {};
    if (has(currentStore, key)) {
      const value = currentStore[key];
      return value;
    }
  }
  return null;
};

// ====================================================
// Setters
// ====================================================
export const incrementStorageJobCount = async () => {
  try {
    const jobCount = await getJobCount();
    const newJobCount = parseInt(jobCount) + 1;
    await setPersistStorage(PATH_STORAGE_JOB_COUNT_KEY, newJobCount.toString());
  } catch (error) {
    console.log(error);
  }
};

export const setWalletAddress = async (wallet: string) => {
  try {
    await setPersistStorage(PATH_STORAGE_WALLET_KEY, wallet);
  } catch (error) {
    console.log(error);
  }
};

// ====================================================
// Getters
// ====================================================
export const getWalletAddress = async () => {
  try {
    const wallet = await getPersistStorage(PATH_STORAGE_WALLET_KEY);
    return wallet || PATH_DEFAULT_WALLET_ADDRESS;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getJobCount = async () => {
  try {
    const count = await getPersistStorage(PATH_STORAGE_JOB_COUNT_KEY);
    return count || '0';
  } catch (error) {
    console.log(error);
  }
  return '0';
};
