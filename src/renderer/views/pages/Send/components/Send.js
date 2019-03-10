import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { Route, Link, withRouter, Switch } from 'react-router-dom';

import Select from 'components/Select';
import Option from 'components/Option';
import Input from 'components/Input';
import FileMethod from './FileMethod';
import HTTPMethod from './HTTPMethod';
export default function Send(props) {
  const methods = [
    {
      method: 'file',
      title: 'File & Base58-string',
      description: 'Send Grin using a file or string.',
      link: '/send/file',
    },
    {
      method: 'http',
      title: 'HTTP',
      description: 'Send Grin to and IP address or domain.',
      link: '/send/http',
    },
    {
      method: 'keybase',
      title: 'Keybase',
      description: 'Send Grin using Keybase.',
      link: '/send/keybase',
    },
  ];
  const [method, setMethod] = useState('file');

  return (
    <React.Fragment>
      <div className="Send-column">
        <label className="Send-label">Method</label>
        <Select
          selected={method}
          value={(
            <React.Fragment>
              <div>{methods.find((m) => m.method === method).title}</div>
              <label>{methods.find((m) => m.method === method).description}</label>
            </React.Fragment>
          )}
        >
          {methods.sort((x,y) => (x.method == method ? -1 : y.method == method ? 1 : 0)).map((m) => (
            <Link to={m.link} onClick={() => setMethod(m.method)}>
              <Option value={m.method}>
                <div>{m.title}</div>
                <label>{m.description}</label>
              </Option>
            </Link>
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
            onChange={(e) => props.setAmount(e.target.value)}
            value={props.amount}
          >
            <div className="jp">ツ</div>
          </Input>
        </div>
        <div className="Send-column">
          <label className="Send-label">From</label>
          <Input
            rootClassName="Send-amount"
            className="Send-amount-ctrl"
            value={(props.amount) ? `420 - ${props.amount} ≈ ${420 - parseInt(props.amount)}` : '420'}
            disabled
          />
        </div>
      </div>
      <div className="Send-column">
        <Route path="/send/file" render={() => <FileMethod amount={props.amount} />} />
        <Route path="/send/http" exact render={() => <HTTPMethod />} />
        <Switch>
        </Switch>
      </div>
    </React.Fragment>
  );
}
