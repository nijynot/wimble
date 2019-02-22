import React from 'react';
import PropTypes from 'prop-types';
import parse from 'date-fns/parse';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

require('./TransactionRow.scss');

export default function TransactionRow(props) {
  function resolveActionType(txType) {
    switch(txType) {
      case 'ConfirmedCoinbase': return 'Received Coinbase';
      case 'TxReceived': return 'Received';
      case 'TxSent': return 'Sent'
      case 'TxReceivedCancelled': return 'Received: Cancelled'
      case 'TxSentCancelled': return 'Sent: Cancelled'
    }
  }

  function resolveTime() {

  }

  return (
    <div className="TransactionRow">
      <div className="TransactionRow-action">
        <span className="TransactionRow-txtype">{resolveActionType(props.tx.tx_type)}</span>
        <span className="TransactionRow-time">{distanceInWordsToNow(parse(props.tx.creation_ts))}</span>
      </div>
      <div className="TransactionRow-amount">
        <span className="TransactionRow-credited">
          {parseFloat(props.tx.amount_credited / 1000000000).toFixed(2)}
          {' '}<span className="jp">ツ</span>
        </span>
        <span className="TransactionRow-debited">{props.tx.amount_debited}</span>
      </div>
    </div>
  )
}

TransactionRow.propTypes = {
  tx: PropTypes.object,
};
