import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import HomePage from './pages/Home/HomePage';
import SettingsPage from './pages/Settings/SettingsPage';
import SendPage from './pages/Send/SendPage';
require('./App.scss');

export default function App(props) {
  const [isSettingsActive, setSettingsActive] = useState(false);
  const [isReceiveActive, setReceive] = useState(false);
  const [isSendActive, setSend] = useState(false);
  const [startOwner, setStartOwner] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  function toggle() {
    setSettingsActive(!isSettingsActive);
  }

  function esc() {
    if (event.keyCode === 27) {
      setSettingsActive(false);
      setReceive(false);
      setSend(false);
    }
  }

  function isLayerActive() {
    return (isSettingsActive || isReceiveActive || isSendActive);
  }

  useEffect(() => {
    document.addEventListener('keydown', esc, false);
    return function() {
      document.removeEventListener('keydown', esc, false);
    }
  });

  return (
    <React.Fragment>
      <div className="App-toolbar">
        <div className="App-wallet">
          Personal Waldo
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 23" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
        <div className="App-drag"></div>
      </div>
      <div className={cx('App', { hide: isLayerActive() })}>
        <HomePage
          setSend={() => setSend(true)}
        />
        <div
          className="App-settings-btn"
          onClick={() => toggle()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="none" d="M0 0h20v20H0V0z"/><path d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
        </div>
      </div>
      <div className={cx('App-layer', { active: isSettingsActive })}>
        <SettingsPage
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          startOwner={startOwner}
          setStartOwner={setStartOwner}
          close={() => toggle()}
        />
      </div>
      <div className={cx('App-layer', { active: isSendActive })}>
        <SendPage />
      </div>
    </React.Fragment>
  );
}
