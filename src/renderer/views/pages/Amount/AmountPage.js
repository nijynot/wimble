import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Big from 'big.js';
import cx from 'classnames';

import grin from 'client/grin';
import { isNumeric, validateAmount, GRIN } from 'utils/util';
import Close from 'svg/Close';
require('./AmountPage.scss');

function AmountPage({
  amount,
  onChangeAmount,
  close,
  ...props
}) {
  const [spendableAmount, setSpendableAmount] = useState('...');
  const [error, setError] = useState(false);
  const input = (e) => {
    if (e.keyCode === 8 || e.key === 'del') {
      if (amount.length > 1) {
        onChangeAmount(amount.slice(0, -1));
      } else {
        onChangeAmount('0');
      }
    } else if (
      isNumeric(e.key) ||
      (e.key === '.' && !amount.includes('.'))
    ) {
      if (amount === '0') {
        if (e.key === '.') {
          onChangeAmount('0.');
        } else {
          onChangeAmount(e.key);
        }
      } else {
        onChangeAmount(amount + e.key);
      }
    }
  };

  useEffect(() => {
    grin.wallet.retrieveSummaryInfo().then((res) => {
      setSpendableAmount(Big(res.amount_currently_spendable).div(GRIN).toString());
    });
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', input, false);
    return function() {
      document.removeEventListener('keydown', input, false);
    }
  });

  return (
    <div className="Amount">
      <Close onClick={close} className="white" />
      <div className="Amount_total">{spendableAmount} <span>GRIN</span></div>
      <div className="Amount_content">
        <div className="Amount_input">
          <h1 className={cx('Amount_amount', { error: !validateAmount(Big(amount)) })}>{amount}</h1>
          <div className={cx('Amount_suffix', { error: !validateAmount(Big(amount)) })}>GRIN</div>
        </div>
        <div className="Amount_number-row">
          {['7', '8', '9'].map(num => (
            <button className="Amount_number" onClick={() => input({ key: num })}>
              {num}
            </button>
          ))}
        </div>
        <div className="Amount_number-row">
          {['4', '5', '6'].map(num => (
            <button className="Amount_number" onClick={() => input({ key: num })}>
              {num}
            </button>
          ))}
        </div>
        <div className="Amount_number-row">
          {['1', '2', '3'].map(num => (
            <button className="Amount_number" onClick={() => input({ key: num })}>
              {num}
            </button>
          ))}
        </div>
        <div className="Amount_number-row">
          {['.', '0', 'del'].map(num => (
            <button className="Amount_number" onClick={() => input({ key: num })}>
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default withRouter((props) => <AmountPage {...props} />);

AmountPage.propTypes = {
  amount: PropTypes.string,
  onChangeAmount: PropTypes.func,
  close: PropTypes.func,
};
