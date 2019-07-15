import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';

import grin from 'client/grin';
import { formatTxType, formatNumber, toGrin, PRICE, txNetDifference, toUSD, formatTxStatus } from 'utils/util';
import Fetch from 'components/Fetch';
require('./SmallTransactionCard.scss');

export default function SmallTransactionCard({ tx, privacy, ...props }) {
  const [outputs, setOutputs] = useState([]);

  useEffect(() => {
    grin.wallet.retrieveOutputs(true, true, tx && tx.id).then((res) => {
      setOutputs(res.reverse());
    });
  }, []);

  const height = (outputs && outputs.length > 0) ? outputs[0].output.height : '0';

  return (
    <div className={cx('SmallTransactionCard', { privacy })}>
      <div className="SmallTransactionCard_header">
        <strong>{formatTxType(tx && tx.tx_type)}</strong>
        <span className="grey">
          &nbsp;&bull;&nbsp;Height #{formatNumber(parseInt(height, 10))}
        </span>
        <span className="SmallTransactionCard_timestamp">
          {moment(tx && tx.creation_ts).fromNow()}
        </span>
      </div>
      <div className="SmallTransactionCard_details">
        <div className="SmallTransactionCard_detail">
          <h2>${tx && toUSD(toGrin(txNetDifference(tx)))}</h2>
          <div className="grey">{tx && toGrin(txNetDifference(tx))} GRIN</div>
        </div>
        <div className="SmallTransactionCard_status">
          {tx && formatTxStatus(tx)}
        </div>
      </div>
    </div>
  );
}

SmallTransactionCard.propTypes = {
  tx: PropTypes.object,
  privacy: PropTypes.boolean,
};

SmallTransactionCard.defaultProps = {
  privacy: false,
};
