import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import grin from 'client/grin';
import { animations } from 'utils/animations';
import Wimble from 'svg/Wimble';
import Close from 'svg/Close';
import TransactionCard from 'components/TransactionCard';
require('./TransactionPage.scss');

export default function TransactionPage({ id, ...props }) {
  const [tx, setTx] = useState(null);
  const spring = useSpring({ ...animations.springIn });

  useEffect(() => {
    setTx({
      amount_credited: '60000000000',
      amount_debited: '0',
      confirmation_ts: '2019-01-15T16:01:26Z',
      confirmed: true,
      creation_ts: '2019-01-15T16:01:26Z',
      fee: null,
      id: 0,
      messages: null,
      num_inputs: 0,
      num_outputs: 1,
      parent_key_id: '0200000000000000000000000000000000',
      stored_tx: null,
      tx_slate_id: null,
      tx_type: 'ConfirmedCoinbase',
    });
  }, []);

  return (
    <div className="TransactionPage">
      <Wimble />
      <Close onClick={props.close} />
      <animated.div style={spring}>
        <TransactionCard tx={tx} hint="Send the slate to the recipient." />
      </animated.div>
    </div>
  );
}

TransactionPage.propTypes = {
  id: PropTypes.string.required,
  close: PropTypes.func,
};
