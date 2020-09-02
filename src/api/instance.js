import axios from 'axios';

const APIKEY = '';
const BASE_URL = 'https://www.googleapis.com';
const TIMEOUT = 10e3;

let instance;

export async function create() {
  const config = {
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    params: { key: APIKEY},
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