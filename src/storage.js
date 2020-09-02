import { createStore, createDataStore } from './utils/localforage';

const de4t = createStore();
const data = createDataStore();

export {
  de4t as default,
  data as dataStorage
};
