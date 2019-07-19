import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import grin from 'client/grin';
import Wimble from 'svg/Wimble';
import Close from 'svg/Close';
import useHistory from 'hooks/useHistory';
import SmallTransactionCard from 'components/SmallTransactionCard';
require('./TransactionsPage.scss');

function TransactionsPage(props) {
  const [txs, setTxs] = useState(null);
  const history = useHistory(props.history);

  useEffect(() => {
    grin.wallet.retrieveTxs().then((res) => {
      setTxs(res.reverse());
    });
  }, []);

  return (
    <div className="Transactions">
      <Wimble />
      <Close onClick={props.close} />
      {txs && txs.map((tx) => (
        <SmallTransactionCard
          tx={tx}
          onClick={() => history.push(
            `/tx/${tx.id}`,
            { enter: 'fade', leave: 'fade', scale: '1' }
          )}
        />
      ))}
    </div>
  );
}
export default withRouter((props) => <TransactionsPage {...props} />);

TransactionsPage.propTypes = {
  close: PropTypes.func,
};
