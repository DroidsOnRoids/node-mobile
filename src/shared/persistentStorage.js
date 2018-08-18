//@flow
import { has } from 'lodash';
import { AsyncStorage } from 'react-native';

// FUCKING PIECE OF SHIT
// if you try and import this from the constants file
// it comes in as undefined
const PATH_DEFAULT_WALLET_ADDRESS =
  '0xF1CD6d591161A7470db74d7556876A7b5C6B9135';

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
    s(error);
  }
};

// ====================================================
// Getters
// ====================================================
export const getWalletAddress = async () => {
  try {
    const wallet = await getPersistStorage(PATH_STORAGE_WALLET_KEY);

    if (wallet === null) {
      await setPersistStorage(
        PATH_STORAGE_WALLET_KEY,
        PATH_DEFAULT_WALLET_ADDRESS
      );
    }
    return wallet || PATH_DEFAULT_WALLET_ADDRESS;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getJobCount = async () => {
  try {
    const count = await getPersistStorage(PATH_STORAGE_JOB_COUNT_KEY);

    if (count === null) {
      await setPersistStorage(PATH_STORAGE_JOB_COUNT_KEY, '0');
    }

    return count || '0';
  } catch (error) {
    console.log(error);
  }
  return '0';
};
