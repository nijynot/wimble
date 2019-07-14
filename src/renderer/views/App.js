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
  const { location, history } = props;

  const [amount, setAmount] = useState('0');
  const [startOwner, setStartOwner] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [transition, setTransition] = useState('fade');
  const zooms = useTransition(
    location,
    location => location.pathname,
    { ...animations.zoomInZoomOut }
  );
  const fades = useTransition(
    { ...location, transition },
    location => location.pathname,
    { ...animations.fadeInFadeOut }
  );
  const mixes = useTransition(
    { ...location, transition },
    location => location.pathname,
    { ...animations.zoomInFadeOut }
  );

  function close() {
    setTransition('zoom');
    history.push('/');
    setAmount('0');
    setTransition('fade');
  }

  function esc() {
    if (event.keyCode === 27) {
      close();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', esc, false);
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
      {zooms.map(({ item, key, props }) => (
        <animated.div key={key} style={{
          ...props,
          width: (animationPaths.zoomInZoomOut.includes(item.pathname)) ? '100%' : null,
          height: (animationPaths.zoomInZoomOut.includes(item.pathname)) ? '100%' : null,
        }}>
          <Switch location={item}>
          </Switch>
        </animated.div>
      ))}
      {fades.map(({ item, key, props }) => {
        return (
          <animated.div key={key} style={{
            ...props,
            width: (matchAny(item.pathname, animationPaths.fadeInFadeOut)) ? '100%' : null,
            height: (matchAny(item.pathname, animationPaths.fadeInFadeOut)) ? '100%' : null,
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
            </Switch>
          </animated.div>
        );
      })}
      {mixes.map(({ item, key, props }) => (
        <animated.div key={key} style={{
          ...props,
          width: (matchAny(item.pathname, animationPaths.zoomInFadeOut)) ? '100%' : null,
          height: (matchAny(item.pathname, animationPaths.zoomInFadeOut)) ? '100%' : null,
        }}>
          <Switch location={item}>
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
          </Switch>
        </animated.div>
      ))}
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
