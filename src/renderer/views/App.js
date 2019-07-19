import React, { useState, useEffect, useContext } from 'react';
import cx from 'classnames';
import { animated, useTransition } from 'react-spring';
import { Transition } from 'react-spring/renderprops';
import { BrowserRouter as Router, Switch, Route, Link, withRouter, Redirect } from 'react-router-dom';
import fs from 'fs-extra';
import Big from 'big.js';
import { ipcRenderer } from 'electron';

import grin from 'client/grin';
import { matchAny, setIntervalX } from 'utils/util';
import { animations, animationPaths } from 'utils/animations';
import useHistory from 'hooks/useHistory';
import Amount from 'pages/Amount/AmountPage';
import StandardButton from 'components/StandardButton';
import ResultPage from 'pages/Result/ResultPage';
import TransactionPage from 'pages/Transaction/TransactionPage';
import TransactionsPage from 'pages/Transactions/TransactionsPage';
import HomePage from 'pages/Home/HomePage';
import SettingsPage from './pages/Settings/SettingsPage';
import ReceivePage from './pages/Receive/ReceivePage';
import FinalizePage from './pages/Finalize/FinalizePage';
import WelcomePage from './pages/Welcome/WelcomePage';
import SeedPage from './pages/Seed/SeedPage';
import IntroductionPage from './pages/Introduction/IntroductionPage';
import RestorePage from './pages/Restore/RestorePage';
import PasswordPage from './pages/Password/PasswordPage';
require('./App.scss');

Big.NE = -10;
Big.PE = 30;

function App(props) {
  const { location } = props;
  const history = useHistory(props.history);

  const [doesWalletExist, setDoesWalletExist] = useState(props.wallet);
  const [isOwnerActive, setIsOwnerActive] = useState(false);
  const [isVerifyingPassword, setIsVerifyingPassword] = useState(false);
  const [amount, setAmount] = useState('0');
  const [startOwner, setStartOwner] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const transitions = useTransition(
    { ...location },
    location => location.pathname,
    { ...animations.animation }
  );

  const close = () => {
    if (doesWalletExist && isOwnerActive) {
      setAmount('0');
      history.push('/', { leave: 'zoom', scale: '1.15' });
    }
  }

  const onClickLogin = (password) => {
    // Send `password` to main.js to check if `owner_api` starts
    if (password) {
      setIsVerifyingPassword(true);
      ipcRenderer.send('start-owner', password);
    }
  };

  function back() {
    history.goBack();
  }

  function esc(event) {
    if (event.keyCode === 27) {
      close();
    }
  }

  useEffect(() => {
    // Navigate to `/welcome` if wallet.seed file does not exist in
    // `.wimble/{net}/wallet_data`.
    // If it exists, navigate to the password page.
    if (!doesWalletExist) {
      history.push('/welcome', { enter: 'fade', leave: 'fade', scale: '1' });
    } else if (doesWalletExist && !isOwnerActive) {
      history.push('/password', { enter: 'fade', leave: 'fade', scale: '1' });
    }
  }, [doesWalletExist]);

  useEffect(() => {
    // Detect if `esc` is pressed.
    document.addEventListener('keydown', esc, false);

    // Navigate to `/` if password was correct and `owner_api` was started.
    ipcRenderer.on('login', (e, arg) => {
      if (arg) {
        setIsOwnerActive(true);
        setIsVerifyingPassword(false);
        history.push('/', { leave: 'zoom', scale: '1.15' });
      }
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
        (doesWalletExist && isOwnerActive) ? (
          <div className={cx('App', { hide: location.pathname !== '/' })}>
            <HomePage />
          </div>
        ) : null
      )} />
      {transitions.map(({ item, key, props }) => (
        <animated.div key={key} style={{
          ...props,
          width: (matchAny(item.pathname, animationPaths)) ? '100%' : null,
          height: (matchAny(item.pathname, animationPaths)) ? '100%' : null,
        }}>
          <Switch location={item}>
            <Route
              path="/welcome"
              render={() => <WelcomePage />}
            />
            <Route
              path="/seed"
              render={() => <SeedPage />}
            />
            <Route
              path="/introduction"
              render={() => <IntroductionPage />}
            />
            <Route
              path="/restore"
              render={() => <RestorePage />}
            />
            <Route
              path="/settings"
              render={() => <SettingsPage />}
            />
            <Route
              path="/password"
              render={() => (
                <PasswordPage
                  onClickLogin={onClickLogin}
                  isVerifyingPassword={isVerifyingPassword}
                />
              )}
            />
            <Route
              path="/result/:id?"
              render={() => <ResultPage close={() => close()} />}
            />
            <Route
              path="/tx/:id?"
              render={() => <TransactionPage back={() => back()} />}
            />
            <Route
              path="/txs"
              render={() => <TransactionsPage close={() => close()} />}
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
      ))}
      <StandardButton
        amount={amount}
        setAmount={setAmount}
        setDoesWalletExist={setDoesWalletExist}
      />
    </>
  );
}
const AppWithRouter = withRouter((props) => <App {...props} />);

export default function Root(props) {
  return (
    <Router
      basename={window.location.pathname}
    >
      <AppWithRouter {...props} />
    </Router>
  );
}
