import { matchPath } from 'react-router-dom';
import Big from 'big.js';

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
  return (
    txType === 'ConfirmedCoinbase' ||
    txType === 'TxReceived'
  ) ? 'Receive Grin' : 'Send Grin';
};

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
 * @param {Big} amount - Amount in grin.
 * @returns {Big}
 */
export function toNanoGrin(amount) {
  if (
    amount.times(GRIN).cmp(0) !== 1 ||
    amount.times(GRIN).cmp(amount.times(GRIN).round()) !== 0 ||
    amount.cmp(GRIN) === 1
  ) {
    throw new Error(`Expected \`amount\` to be greater or equal to 1 nanogrin and less or equal to 1e+9 grins.`);
  }
  return amount.times(GRIN);
}
