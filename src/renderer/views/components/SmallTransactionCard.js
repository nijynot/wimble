import React from 'react';
import PropTypes from 'prop-types';

import { formatTxType } from 'utils/util';
require('./SmallTransactionCard.scss');

export default function SmallTransactionCard({ type, tx, ...props }) {
  return (
    <div className="SmallTransactionCard">
      <div className="SmallTransactionCard_header">
        <strong>{formatTxType(tx.tx_type)}</strong>
        <span className="grey">&nbsp;&bull;&nbsp;Height #145,234</span>
        <span className="SmallTransactionCard_timestamp">Just now</span>
      </div>
      <div className="SmallTransactionCard_details">
        <div className="SmallTransactionCard_detail">
          <h2>$432</h2>
          <div className="grey">53.24 GRIN</div>
        </div>
        <div className="SmallTransactionCard_status">
          Waiting for<br />
          response slate
        </div>
      </div>
    </div>
  );
}

SmallTransactionCard.propTypes = {
  type: PropTypes.string,
  tx: PropTypes.object,
};
