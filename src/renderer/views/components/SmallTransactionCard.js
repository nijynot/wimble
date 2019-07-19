import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';
import { get } from 'lodash';

import grin from 'client/grin';
import {
  formatTxType,
  formatNumber,
  toGrin,
  PRICE,
  txNetDifference,
  toUSD,
  formatTxStatus,
  classNameTxStatus,
} from 'utils/util';
import Fetch from 'components/Fetch';
require('./SmallTransactionCard.scss');

export default function SmallTransactionCard({ tx, privacy, ...props }) {
  const [outputs, setOutputs] = useState([]);

  useEffect(() => {
    if (tx && typeof parseInt(tx.id) === 'number') {
      grin.wallet.retrieveOutputs(true, true, tx && tx.id).then((res) => {
        setOutputs(res.reverse());
      });
    }
  }, [tx]);

  const height = get(outputs, '[0].output.height', null);

  return (
    <div
      className={cx('SmallTransactionCard', { privacy })}
      onClick={props.onClick}
    >
      {(tx) ? (
        <>
          <div className="SmallTransactionCard_header">
            <strong>{formatTxType(tx && tx.tx_type)}</strong>
            <span className="grey">
              {height ? (
                <>&nbsp;&bull;&nbsp;Height #{formatNumber(parseInt(height, 10))}</>
              ) : <>&nbsp;&bull;&nbsp; ID: {tx && tx.id}</>}
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
            <div className={cx('SmallTransactionCard_status', tx && classNameTxStatus(tx))}>
              {tx && formatTxStatus(tx)}
            </div>
          </div>
        </>
      ) : (
        <div className="SmallTransactionCard_placeholder">
          No transactions yet.
        </div>
      )}
    </div>
  );
}

SmallTransactionCard.propTypes = {
  tx: PropTypes.object,
  privacy: PropTypes.bool,
  onClick: PropTypes.func,
};

SmallTransactionCard.defaultProps = {
  privacy: false,
};
