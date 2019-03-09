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
    FILE: {
      title: 'File & Base58-string',
      description: 'Send Grin using a file or string.'
    },
    HTTP: {
      title: 'HTTP',
      description: 'Send Grin to and IP address or domain.'
    },
    KEYBASE: {
      title: 'Keybase',
      description: 'Send Grin using Keybase.'
    },
  };
  const [method, setMethod] = useState('FILE');
  const [amount, setAmount] = useState('');

  const routes = {
    FILE: <FileMethod amount={amount} />,
    HTTP: <HTTPMethod />,
  };

  function router(route) {
    return routes[route];
  }

  return (
    <div className="Send">
      <div className="Send-content">
        <div className="Settings-close-wrap">
          <button
            className="Settings-close-btn"
            onClick={props.close}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="Send-tabs">
          <button className="Send-tab active">Send</button>
          {(method === 'FILE') ? <button className="Send-tab">Finalize</button> : null}
        </div>
        <div className="Send-column">
          <label className="Send-label">Method</label>
          <Select
            selected={method}
            value={(
              <React.Fragment>
                <div>{METHOD[method].title}</div>
                <label>{METHOD[method].description}</label>
              </React.Fragment>
            )}
          >
            {['FILE', 'HTTP', 'KEYBASE'].map((m) => (
              <Option onClick={() => setMethod(m)} value={m}>
                <div>{METHOD[m].title}</div>
                <label>{METHOD[m].description}</label>
              </Option>
            ))}
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
          {router(method)}
        </div>
      </div>
    </div>
  );
}

SendPage.propTypes = {
  close: PropTypes.func.isRequired,
};
