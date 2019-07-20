import fs from 'fs-extra';
import { app } from 'utils/app';
// import { DOTFILES } from 'utils/util';

const apiSecret = fs.readFileSync(`${app.getPath('home')}/.grin/main/.api_secret`).toString().trim();
const auth = `grin:${apiSecret}`;

function chain() {
  return fetch('http://127.0.0.1:3413/v1/chain', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
  }).then((res) => {
    return res.json();
  }).then((res) => {
    return res;
  });
}

function status() {
  return fetch('http://127.0.0.1:3413/v1/status', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
  }).then((res) => {
    return res.json();
  }).then((res) => {
    return res;
  });
}

export default {
  chain,
  status,
};
