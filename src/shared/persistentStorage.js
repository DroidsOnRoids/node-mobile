import { AsyncStorage } from 'react-native';

const PATH_STORAGE_REF = 'PATH_STORAGE';

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
  }
};

// ====================================================
// Setters
// ====================================================
export const setMinerId = async (miner_id: string) => {
  try {
    await setPersistStorage('miner_id', miner_id);
  } catch (error) {
    console.log(error);
  }
};

export const setWalletAddress = async (wallet: string) => {
  try {
    await setPersistStorage('wallet', wallet);
  } catch (error) {
    console.log(error);
  }
};

// ====================================================
// Getters
// ====================================================
export const getMinerId = async (miner_id: string) => {
  try {
    await setPersistStorage('miner_id', miner_id);
  } catch (error) {
    console.log(error);
  }
};
