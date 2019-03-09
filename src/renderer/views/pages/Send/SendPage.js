import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Select from 'components/Select';
import Option from 'components/Option';
import Input from 'components/Input';
import FileMethod from './components/FileMethod';
import HTTPMethod from './components/HTTPMethod';
require('./SendPage.scss');

export default function SendPage(props) {
  const METHOD = {
    FILE: 'File & Base58-string',
    HTTP: 'HTTP',
    KEYBASE: 'Keybase',
  };
  const [method, setMethod] = useState('FILE');
  const [amount, setAmount] = useState('');

  const routes = {
    FILE: <FileMethod />,
    HTTP: <HTTPMethod />,
  };

  return (
    <div className="Send">
      <div className="Send-content">
        <div className="Settings-close-wrap">
          <button
            className="Settings-close-btn"
            onClick={props.close}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          </button>
        </div>
        <div className="Send-tabs">
          <button className="Send-tab active">Send</button>
          {(method === 'FILE') ? <button className="Send-tab">Finalize</button> : null}
        </div>
        <div className="Send-column">
          <label className="Send-label">Method</label>
          <Select selected={method} value={METHOD[method]}>
            <Option onClick={() => setMethod('FILE')} value="FILE">{METHOD['FILE']}</Option>
            <Option onClick={() => setMethod('HTTP')} value="HTTP">{METHOD['HTTP']}</Option>
            <Option onClick={() => setMethod('KEYBASE')} value="KEYBASE">{METHOD['KEYBASE']}</Option>
          </Select>
        </div>
        <div className="Send-row">
          <div className="Send-column">
            <label className="Send-label">Amount</label>
            <Input
              rootClassName="Send-amount"
              className="Send-amount-ctrl"
              placeholder="0.00"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            >
              <div className="jp">ツ</div>
            </Input>
          </div>
          <div className="Send-column">
            <label className="Send-label">From</label>
            <Input
              rootClassName="Send-amount"
              className="Send-amount-ctrl"
              value={(amount) ? `420 - ${amount} ≈ ${420 - parseInt(amount)}` : '420'}
              disabled
            />
          </div>
        </div>
        <div className="Send-column">
          {routes[method]}
        </div>
      </div>
    </div>
  );
}

SendPage.propTypes = {
  close: PropTypes.func.isRequired,
};
