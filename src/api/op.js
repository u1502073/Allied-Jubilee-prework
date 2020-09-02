import { get as getInstance } from './instance';

const passSuccessResponse = (res) => {
  return res;
};

const passFailResponse = (error) => {
  return Promise.reject(error);
};

export async function get(url, data, config) {
  return (await getInstance()).get(url, data, config).then(passSuccessResponse, passFailResponse);
}
export async function post(url, data, config) {
  return (await getInstance()).post(url, data, config).then(passSuccessResponse, passFailResponse);
}

export async function put(url, data, config) {
  return (await getInstance()).put(url, data, config).then(passSuccessResponse, passFailResponse);
}

export async function del(url, config) {
  return (await getInstance()).delete(url, config).then(passSuccessResponse, passFailResponse);
}