function chain() {
  return fetch('http://127.0.0.1:3413/v1/chain', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from('grin:TTX3j673vGnD2R0Q8WoR').toString('base64')}`
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
      'Authorization': `Basic ${Buffer.from('grin:TTX3j673vGnD2R0Q8WoR').toString('base64')}`
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
