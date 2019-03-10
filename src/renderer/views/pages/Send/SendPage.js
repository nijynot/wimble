import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Route, Link, Switch, withRouter } from 'react-router-dom';

import Send from './components/Send';
import Finalize from './components/Finalize';
// import useRouter from 'hooks/useRouter';
require('./SendPage.scss');

function SendPage(props) {
  const [amount, setAmount] = useState('');

  return (
    <div className="Send">
      <div className="Send-content">
        <Link to="/">
          <div className="Send-close-wrap">
            <button
              className="Settings-close-btn"
              onClick={props.close}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </Link>
        <div className="Send-tabs">
          <Link to="/send/file">
            <button
              className={cx('Send-tab', { active: props.match.params.method !== 'finalize' })}
            >
              Send
            </button>
          </Link>
          <Link to="/send/finalize">
            <button
              className={cx('Send-tab', { active: props.match.params.method === 'finalize' })}
            >
              Finalize
            </button>
          </Link>
        </div>
        <Switch>
          <Route path="/send/finalize" render={() => <Finalize />} />
          <Route path="/send/:method" render={() => <Send amount={amount} setAmount={setAmount} />} />
        </Switch>
      </div>
    </div>
  );
}

SendPage.propTypes = {
  close: PropTypes.func.isRequired,
};

export default withRouter(SendPage);
