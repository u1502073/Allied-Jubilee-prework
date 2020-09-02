import axios from 'axios';

const KEY = 'AIzaSyAtuVKZkrc3ONHikiM2BPg9dHsa4p2hl3I';
const BASE_URL = 'https://www.googleapis.com';
const TIMEOUT = 10e3;

let instance;

export async function create() {
  const config = {
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    params: { key: KEY},
    headers: {}
  }

  return axios.create(config);
}

export async function get() {
  if (!instance) {
    instance = await create();
  }
  return Promise.resolve(instance);
}