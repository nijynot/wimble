import { matchPath } from 'react-router-dom';
import Big from 'big.js';

export const PRICE = '3.2';
export const GRIN = '1000000000';
export const MAX_GRIN = '1000000000';
export const NANO_GRIN = '1';

export function isNumeric(num) {
  return !isNaN(num);
}

export function formatNumber(x) {
  if (typeof x === 'number') {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  console.error('Expected `x` to be a number but got `' + x + '`');
  return x;
}

export function formatTxType(txType) {
  if (txType === 'ConfirmedCoinbase') {
    return 'Coinbase';
  } else if (txType === 'TxReceived') {
    return 'Receive Grin';
  }
  return 'Send Grin';
};

export function formatTxStatus(tx) {
  if (tx.tx_type === 'TxSent') {
    return (tx.confirmed) ? 'Transaction completed' : 'Waiting for response slate';
  } else if (tx.type === 'TxReceived') {
    return (tx.confirmed) ? 'Transaction completed' : 'Waiting for finalization';
  } else if (tx.tx_type === 'TxSentCancelled' || tx.tx_type === 'TxReceivedCancelled') {
    return 'Cancelled';
  }
};

/**
 * Return the net difference of a transaction.
 * @param {object} tx
 * @returns {string}
 */
export function txNetDifference(tx) {
  if (tx && tx.tx_type === 'TxSent') {
    return Big(tx.amount_debited).sub(tx.amount_credited).toString();
  }
}

export function perfectMatch(pathname, match) {
  return matchPath(pathname, { path: match, exact: true, strict: true });
};

export function match(pathname, match) {
  return matchPath(pathname, { path: match });
};

export function matchAny(pathname, matches) {
  return matches.some((match) => {
    return matchPath(pathname, { path: match, exact: true, strict: true });
  });
}

/**
 * Validates whether the nanogrin amount is valid or not.
 * @param {Big} amount - Amount in nanogrin.
 * @returns {boolean}
 */
export function validateAmount(amount) {
  if (
    amount.times(GRIN).cmp(0) === -1 ||
    amount.times(GRIN).cmp(amount.times(GRIN).round()) !== 0 ||
    amount.cmp(GRIN) === 1
  ) {
    return false;
  }
  return true;
}

/**
 * Transform amount in grin to nanogrin.
 * @param {Big|string} amount - Amount in grin.
 * @returns {string}
 */
export function toNanoGrin(amount) {
  let amountCopy;
  if (typeof amount === 'string') {
    amountCopy = Big(amount);
  } else {
    amountCopy = amount;
  }

  if (
    amountCopy.times(GRIN).cmp(0) !== 1 ||
    amountCopy.times(GRIN).cmp(amountCopy.times(GRIN).round()) !== 0 ||
    amountCopy.cmp(GRIN) === 1
  ) {
    throw new Error(`Expected \`amount\` to be greater or equal to 1 nanogrin and less or equal to 1e+9 grins.`);
  }
  return amountCopy.times(GRIN).toString();
}

/**
 * Transform amount in nanogrin to grin.
 * @param {Big|string} amount - Amount in nanogrin.
 * @returns {string}
 */
export function toGrin(amount) {
  let amountCopy;
  if (typeof amount === 'string') {
    amountCopy = Big(amount);
  } else {
    amountCopy = amount;
  }

  if (
    !amountCopy ||
    amountCopy.cmp(amountCopy.round()) !== 0 ||
    amountCopy.div(GRIN).cmp(GRIN) === 1
  ) {
    throw new Error(`Expected \`amount\` to be greater or equal to 1 nanogrin and less or equal to 1e+9 grins.`);
  }
  return amountCopy.div(GRIN).toString();
}

/**
 * Transform amount in nanogrin to grin.
 * @param {Big|string} amount - Amount in grin.
 * @returns {Big}
 */
export function toUSD(amount) {
  let amountCopy;
  if (typeof amount === 'string') {
    amountCopy = Big(amount);
  } else {
    amountCopy = amount;
  }

  if (
    amountCopy.times(GRIN).cmp(0) !== 1 ||
    amountCopy.times(GRIN).cmp(amountCopy.times(GRIN).round()) !== 0 ||
    amountCopy.cmp(GRIN) === 1
  ) {
    throw new Error(`Expected \`amount\` to be greater or equal to 1 nanogrin and less or equal to 1e+9 grins.`);
  }
  return amountCopy.times(PRICE).toString();
}
