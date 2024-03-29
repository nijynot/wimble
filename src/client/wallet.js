import fs from 'fs-extra';
import { app } from 'utils/app';
// import { DOTFILES } from 'utils/util';

const apiSecret = fs.readFileSync(`${app.getPath('home')}/.grin/main/.api_secret`).toString().trim();
const auth = `grin:${apiSecret}`;

/**
 * Get summary of wallet.
 * @returns {Promise.<Object>}
 */
function retrieve_summary_info() {
  return fetch('http://127.0.0.1:3420/v2/owner', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
    body: '{"jsonrpc":"2.0","method":"retrieve_summary_info","params":[true,10],"id":1}',
  }).then((res) => {
    return res.json();
  }).then((res) => {
    return res.result.Ok[1];
  });
}

/**
 * Retreive txs with an optional transaction id.
 * @param {number} txId
 * @param {string} txSlateId - UUID
 * @returns {Promise.<Object[]>}
 */
function retrieve_txs(txId, txSlateId) {
  if (
    typeof txId !== 'number' &&
    typeof txId !== 'undefined' &&
    txId !== null
  ) {
    throw new Error(`Expected \`txId\` to be a number, but got \`${txId}\`.`);
  }

  if (
    (
      typeof txSlateId !== 'string' &&
      typeof txSlateId !== 'undefined' &&
      txSlateId !== null
    ) ||
    txSlateId && txSlateId.length !== 36
  ) {
    throw new Error(
      `Expected \`txSlateId\` to be a UUID of length 36, but got \`${txSlateId}\`.`
    );
  }

  let parameters;
  if (typeof txId === 'number') {
    parameters = `true,${parseInt(txId, 10)},null`;
  } else if (typeof txSlateId === 'string' && txSlateId.length === 36) {
    parameters = `true,null,${txSlateId}`;
  } else {
    parameters = 'true,null,null';
  }

  return fetch('http://127.0.0.1:3420/v2/owner', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
    body: `{"jsonrpc":"2.0","method":"retrieve_txs","params":[${parameters}],"id":1}`,
  }).then((res) => {
    return res.json();
  }).then((res) => {
    return res.result.Ok[1];
  });
}

/**
 * Retreive outputs with an optional transaction id.
 * @param {boolean} includeSpent
 * @param {boolean} refreshFromNode
 * @param {number} txId
 * @returns {Promise.<Object[]>}
 */
function retrieve_outputs(includeSpent = true, refreshFromNode = true, txId) {
  if (
    typeof txId !== 'number' &&
    typeof txId !== 'undefined' &&
    txId !== null
  ) {
    throw new Error(`Expected \`txId\` to be a number, null or undefined - but got \`${txId}\`.`);
  }

  const body = {
    jsonrpc: '2.0',
    method: 'retrieve_outputs',
    id: '1',
    params: [includeSpent, refreshFromNode, txId],
  };

  return fetch('http://127.0.0.1:3420/v2/owner', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
    body: JSON.stringify(body),
  }).then((res) => {
    return res.json();
  }).then((res) => {
    return res.result.Ok[1];
  });
}

/**
 * Calls the `init_send_tx` JSON-RPC method.
 * Resource: https://docs.rs/grin_wallet_libwallet/2.0.0/grin_wallet_libwallet/api_impl/types/struct.InitTxArgs.html
 * @param {Object} options
 * @param {string} options.srcAcctName
 * @param {string} options.amount
 * @param {number} options.minimumConfirmations
 * @param {number} options.maxOutputs
 * @param {number} options.numChangeOutputs
 * @param {boolean} options.selectionStrategyIsUseAll
 * @param {string} options.message
 * @param {number} options.targetSlateVersion
 * @param {boolean} options.estimateOnly
 * @returns {Promise.<Object>}
 */
function init_send_tx(options) {
  if (
    typeof options.amount !== 'string' ||
    parseInt(options.amount, 10) < 0 ||
    parseInt(options.amount, 10) === 0
  ) {
    throw new Error(`Expected \`options.amount\` to be a string of a number greater than 0.`);
  }

  const emptyBody = {
    jsonrpc: '2.0',
    method: 'init_send_tx',
    id: '1',
  };
  const optionsCopy = {};
  optionsCopy.src_acct_name = options.srcAcctName || null;
  optionsCopy.amount = options.amount;
  optionsCopy.minimum_confirmations = options.minimumConfirmations || 10;
  optionsCopy.max_outputs = options.maxOutputs || 500;
  optionsCopy.num_change_outputs = options.numChangeOutputs || 1;
  optionsCopy.selection_strategy_is_use_all = (
    typeof options.selectionStrategyIsUseAll === 'boolean'
  ) ? options.selectionStrategyIsUseAll : true;
  optionsCopy.message = options.message || null;
  optionsCopy.target_slate_version = options.targetSlateVersion || null;
  optionsCopy.estimate_only = typeof options.estimateOnly === 'boolean' ? options.estimateOnly : null;
  optionsCopy.send_args = null;

  const body = {
    ...emptyBody,
    params: {
      args: { ...optionsCopy },
    },
  };


  return fetch('http://127.0.0.1:3420/v2/owner', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
    body: JSON.stringify(body),
  }).then((res) => {
    return res.json();
  }).then((res) => {
    return res.result.Ok;
  });
}

/**
 * Locks the outputs of a slate.
 * @param {Object} slate
 * @param {number} participantId
 * @returns {Promise.<boolean>}
 */
function tx_lock_outputs(slate, participantId) {
  const body = {
    jsonrpc: '2.0',
    method: 'tx_lock_outputs',
    id: '1',
    params: [slate, participantId],
  };

  return fetch('http://127.0.0.1:3420/v2/owner', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
    body: JSON.stringify(body),
  }).then((res) => {
    return res.json();
  }).then((res) => {
    if (res.result && (res.result.Ok === null)) {
      return true;
    }
    return false;
  });
}

/**
 * Cancel a transaction.
 * @param {number} txId
 * @param {string} txSlateId - UUID
 * @returns {Promise.<boolean>}
 */
function cancel_tx(txId, txSlateId) {
  if (
    typeof txId !== 'number' &&
    typeof txId !== 'undefined' &&
    txId !== null
  ) {
    throw new Error(`Expected \`txId\` to be a number, but got \`${txId}\`.`);
  }

  if (
    (
      typeof txSlateId !== 'string' &&
      typeof txSlateId !== 'undefined' &&
      txSlateId !== null
    ) ||
    txSlateId && txSlateId.length !== 36
  ) {
    throw new Error(
      `Expected \`txSlateId\` to be a UUID of length 36, but got \`${txSlateId}\`.`
    );
  }

  let parameters;
  if (typeof txId === 'number') {
    parameters = [txId, null];
  } else if (typeof txSlateId === 'string' && txSlateId.length === 36) {
    parameters = [null, txSlateId];
  } else {
    throw new Error(
      `Expected \`txId\` to be a number or \`txSlateId\` to ` +
      `be a UUID, but got \`${txId}\` and \`${txSlateId}\` respectively.`
    );
  }

  const body = {
    jsonrpc: '2.0',
    method: 'cancel_tx',
    id: '1',
    params: parameters,
  };

  return fetch('http://127.0.0.1:3420/v2/owner', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
    body: JSON.stringify(body),
  }).then((res) => {
    return res.json();
  }).then((res) => {
    if (res.result && (res.result.Ok === null)) {
      return true;
    }
    return false;
  });
}

/**
 * Receive a transaction through a slate.
 * @param {Object} slate
 * @param {string} destAcctName
 * @param {string} message
 * @returns {Promise.<Object>}
 */
function receive_tx(slate, destAcctName = null, message = null) {
  if (typeof slate !== 'object') {
    throw new Error(`Expected \`slate\` be an object, but got \`${slate}\``);
  }

  const body = {
    jsonrpc: '2.0',
    method: 'receive_tx',
    id: '1',
    params: [slate, destAcctName, message],
  };

  return fetch('http://127.0.0.1:3420/v2/foreign', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
    body: JSON.stringify(body),
  }).then((res) => {
    return res.json();
  }).then((res) => {
    return res.result.Ok;
  });
}

/**
 * Finalize a transaction given a response slate.
 * @param {Object} slate
 * @returns {Promise.<Object>}
 */
function finalize_tx(slate) {
  if (typeof slate !== 'object') {
    throw new Error(`Expected \`slate\` be an object, but got \`${slate}\``);
  }

  const body = {
    jsonrpc: '2.0',
    method: 'finalize_tx',
    id: '1',
    params: [slate],
  };

  return fetch('http://127.0.0.1:3420/v2/owner', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
    body: JSON.stringify(body),
  }).then((res) => {
    return res.json();
  }).then((res) => {
    return res.result.Ok;
  });
}

/**
 * Verify message signature in the slate.
 * @param {Object} slate
 * @returns {Promise.<boolean>}
 */
function verify_slate_messages(slate) {
  const body = {
    jsonrpc: '2.0',
    method: 'verify_slate_messages',
    id: '1',
    params: [slate],
  };

  return fetch('http://127.0.0.1:3420/v2/owner', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
    body: JSON.stringify(body),
  }).then((res) => {
    return res.json();
  }).then((res) => {
    if (res.result && (res.result.Ok === null)) {
      return true;
    }
    return false;
  });
}

/**
 * Scans the entire UTXO set from the node, identify which outputs belong to
 * the given wallet update the wallet state to be consistent with what's
 * currently in the UTXO set.
 * @param {boolean} deleteUnconfirmed
 *
 */
function check_repair(deleteUnconfirmed) {
  const body = {
    jsonrpc: '2.0',
    method: 'check_repair',
    id: '1',
    params: [deleteUnconfirmed],
  };

  return fetch('http://127.0.0.1:3420/v2/owner', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
    body: JSON.stringify(body),
  }).then((res) => {
    return res.json();
  }).then((res) => {
    if (res.result && (res.result.Ok === null)) {
      return true;
    }
    return false;
  });
}

/**
 * Posts a completed transaction to the listening node for
 * validation and inclusion in a block for mining.
 * @param {Object} tx - Should be a .grintx file from saved_txs
 * @param {boolean} fluff - Will skip dandelion if `true`.
 * @returns {Promise.<boolean>}
 */
function post_tx(tx, fluff) {
  const body = {
    jsonrpc: '2.0',
    method: 'post_tx',
    id: '1',
    params: [tx, fluff],
  };

  return fetch('http://127.0.0.1:3420/v2/owner', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
    body: JSON.stringify(body),
  }).then((res) => {
    return res.json();
  }).then((res) => {
    if (res.result && (res.result.Ok === null)) {
      return true;
    }
    return false;
  });
}

/**
 * Returns a stored transaction that can used for reposting.
 * @param {Object} tx - Has to be in the `TxLogEntry` format.
 * @returns {Object}
 */
function get_stored_tx(tx) {
  const body = {
    jsonrpc: '2.0',
    method: 'get_stored_tx',
    id: '1',
    params: [tx],
  };

  return fetch('http://127.0.0.1:3420/v2/owner', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
    body: JSON.stringify(body),
  }).then((res) => {
    return res.json();
  }).then((res) => {
    return res.result.Ok;
  });
}

export default {
  retrieveSummaryInfo: retrieve_summary_info,
  retrieveTxs: retrieve_txs,
  retrieveOutputs: retrieve_outputs,
  initSendTx: init_send_tx,
  txLockOutputs: tx_lock_outputs,
  cancelTx: cancel_tx,
  receiveTx: receive_tx,
  finalizeTx: finalize_tx,
  postTx: post_tx,
  getStoredTx: get_stored_tx,
};
