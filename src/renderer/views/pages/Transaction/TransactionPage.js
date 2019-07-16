import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { withRouter } from 'react-router-dom';

import grin from 'client/grin';
import { animations } from 'utils/animations';
import Wimble from 'svg/Wimble';
import Back from 'svg/Back';
import TransactionCard from 'components/TransactionCard';
require('./TransactionPage.scss');

function TransactionPage({ id, match, ...props }) {
  const [tx, setTx] = useState(null);
  const spring = useSpring({ ...animations.springIn });

  useEffect(() => {
    let id;
    if (typeof match.params.id === 'string' && match.params.id.length !== 36) {
      id = parseInt(match.params.id, 10);
    } else {
      id = match.params.id;
    }

    grin.wallet.retrieveTxs(id).then((res) => {
      setTx(res[0]);
    });
    // setTx({
    //   amount_credited: '60000000000',
    //   amount_debited: '0',
    //   confirmation_ts: '2019-01-15T16:01:26Z',
    //   confirmed: true,
    //   creation_ts: '2019-01-15T16:01:26Z',
    //   fee: null,
    //   id: 0,
    //   messages: null,
    //   num_inputs: 0,
    //   num_outputs: 1,
    //   parent_key_id: '0200000000000000000000000000000000',
    //   stored_tx: null,
    //   tx_slate_id: null,
    //   tx_type: 'ConfirmedCoinbase',
    // });
  }, []);

  return (
    <div className="TransactionPage">
      <Wimble />
      <Back onClick={props.back} />
      <animated.div style={spring}>
        <TransactionCard tx={tx} hint="Send the slate to the recipient." />
      </animated.div>
    </div>
  );
}
export default withRouter((props) => <TransactionPage {...props} />);

TransactionPage.propTypes = {
  id: PropTypes.string.required,
  back: PropTypes.func,
};
