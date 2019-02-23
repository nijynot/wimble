import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import TransactionRow from './components/TransactionRow';
require('./HomePage.scss');

export default function HomePage(props) {
  const summary = {
    last_confirmed_height: 55086,
    minimum_confirmations: 1,
    total: 420000000000,
    amount_awaiting_confirmation: 0,
    amount_immature: 0,
    amount_currently_spendable: 420000000000,
    amount_locked: 0,
  };
  const txs = [
    { parent_key_id: '0200000000000000000000000000000000',
      id: 0,
      tx_slate_id: null,
      tx_type: 'ConfirmedCoinbase',
      creation_ts: '2019-02-20T20:40:49.930196221Z',
      confirmation_ts: '2019-02-20T20:40:49.930196470Z',
      confirmed: true,
      num_inputs: 0,
      num_outputs: 1,
      amount_credited: 60000000000,
      amount_debited: 0,
      fee: null,
      messages: null,
      stored_tx: null,
    },
    { parent_key_id: '0200000000000000000000000000000000',
      id: 1,
      tx_slate_id: null,
      tx_type: 'ConfirmedCoinbase',
      creation_ts: '2019-02-20T20:44:14.783736129Z',
      confirmation_ts: '2019-02-20T20:44:14.783736350Z',
      confirmed: true,
      num_inputs: 0,
      num_outputs: 1,
      amount_credited: 60000000000,
      amount_debited: 0,
      fee: null,
      messages: null,
      stored_tx: null
    },
    { parent_key_id: '0200000000000000000000000000000000',
      id: 2,
      tx_slate_id: '9d99f04d-1894-4922-8a8f-0b99827a1217',
      tx_type: 'TxReceived',
      creation_ts: '2019-01-31T00:15:07.379475861Z',
      confirmation_ts: '2019-01-31T00:25:56.787830602Z',
      confirmed: true,
      num_inputs: 0,
      num_outputs: 1,
      amount_credited: 4992632000,
      amount_debited: 0,
      fee: null,
      messages: null,
      stored_tx: null,
    },
  ];

  return (
    <div className="Home">
      <div className="Home-header">
        <div className="Home-balance">
          <span className="Home-balance-subheading">Balance <pre>@</pre> <pre>55086</pre></span>
          <h2>{parseFloat(summary.total / 1000000000).toFixed(2)} <span className="jp">ツ</span></h2>
        </div>
        <div className="Home-actions">
          <button
            className="Home-action-btn"
            onClick={props.setReceive}
          >
            <span>Receive</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            {/*<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>*/}
          </button>
          <button
            className="Home-action-btn"
            onClick={props.setSend}
          >
            <span>Send</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            {/*<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>*/}
          </button>
        </div>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  setSend: PropTypes.function,
  setReceive: PropTypes.function,
};
