import React, { useState, useEffect, useContext } from 'react';
import cx from 'classnames';
import { animated, useTransition } from 'react-spring';
import { Transition } from 'react-spring/renderprops';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import fs from 'fs-extra';
import Big from 'big.js';

import grin from 'client/grin';
import { matchAny } from 'utils/util';
import { animations, animationPaths } from 'utils/animations';
import useHistory from 'hooks/useHistory';
import Amount from 'pages/Amount/AmountPage';
import StandardButton from 'components/StandardButton';
import TransactionPage from 'pages/Transaction/TransactionPage';
import HomePage from 'pages/Home/HomePage';
import SettingsPage from './pages/Settings/SettingsPage';
import ReceivePage from './pages/Receive/ReceivePage';
import FinalizePage from './pages/Finalize/FinalizePage';
require('./App.scss');

Big.NE = -10;
Big.PE = 30;

function App(props) {
  const { location } = props;
  const history = useHistory(props.history);

  const [amount, setAmount] = useState('0');
  const [startOwner, setStartOwner] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const transitions = useTransition(
    { ...location },
    location => location.pathname,
    { ...animations.animation }
  );

  function close() {
    setAmount('0');
    history.push('/', { leave: 'zoom', scale: '1.15' });
  }

  function esc() {
    if (event.keyCode === 27) {
      close();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', esc, false);
    grin.wallet.retrieveTxs().then((res) => {
      console.log(res);
    });
    return function() {
      document.removeEventListener('keydown', esc, false);
    }
  }, []);

  return (
    <>
      <div className="App-toolbar">
        <div className="App-drag"></div>
      </div>
      <Route path="/" render={() => (
        <div className={cx('App', { hide: location.pathname !== '/' })}>
          <HomePage />
        </div>
      )} />
      {transitions.map(({ item, key, props }) => {
        return (
          <animated.div key={key} style={{
            ...props,
            width: (matchAny(item.pathname, animationPaths)) ? '100%' : null,
            height: (matchAny(item.pathname, animationPaths)) ? '100%' : null,
          }}>
            <Switch location={item}>
              <Route
                path="/tx"
                render={() => <TransactionPage close={() => close()} />}
              />
              <Route
                path="/finalize"
                render={() => <FinalizePage close={() => close()} />}
              />
              <Route
                path="/send"
                render={() => (
                  <Amount
                    amount={amount}
                    onChangeAmount={setAmount}
                    close={() => close()}
                  />
                )}
              />
              <Route
                path="/receive"
                render={() => <ReceivePage close={() => close()} />}
              />
            </Switch>
          </animated.div>
        );
      })}
      <StandardButton
        amount={amount}
        setAmount={setAmount}
      />
    </>
  );
}
const AppWithRouter = withRouter((props) => <App {...props} />);

export default function Root() {
  return (
    <Router
      basename={window.location.pathname}
    >
      <AppWithRouter />
    </Router>
  );
}
