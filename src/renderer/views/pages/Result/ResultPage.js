import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { withRouter } from 'react-router-dom';

import grin from 'client/grin';
import { animations } from 'utils/animations';
import Wimble from 'svg/Wimble';
import Close from 'svg/Close';
import TransactionCard from 'components/TransactionCard';
require('./ResultPage.scss');

function ResultPage({ match, ...props }) {
  const [tx, setTx] = useState(null);
  const spring = useSpring({ delay: 400, ...animations.springIn });

  useEffect(() => {
    let id;
    console.log(match);
    if (match && typeof match.params.id === 'string' && match.params.id.length === 36) {
      console.log(1);
      grin.wallet.retrieveTxs(null, id).then((res) => {
        console.log(2);
        console.log(res);
        setTx(res.reverse()[0]);
      });
    } else {
      id = match && match.params.id || null;
      grin.wallet.retrieveTxs(id).then((res) => {
        setTx(res.reverse()[0]);
      });
    }
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
    <div className="ResultPage">
      <Wimble />
      <Close onClick={props.close} />
      <animated.div style={spring}>
        <TransactionCard tx={tx} hint="Send the slate to the recipient." />
      </animated.div>
    </div>
  );
}
export default withRouter((props) => <ResultPage {...props} />);

ResultPage.propTypes = {
  id: PropTypes.string.required,
  close: PropTypes.func,
};
