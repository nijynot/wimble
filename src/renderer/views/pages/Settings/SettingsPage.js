import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Toggle from './components/Toggle';
require('./SettingsPage.scss');

export default function SettingsPage(props) {
  return (
    <div className="Settings">
      <div className="Settings-content">
        <div className="Settings-close-wrap">
          <button
            className="Settings-close-btn"
            onClick={props.close}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          </button>
        </div>
        <h4>Settings</h4>
        <div className="Settings-setting">
          <div className="Settings-setting-text">
            <span className="Settings-setting-title">Auto-start Owner API</span>
            <span className="Settings-setting-description">Will call <pre>grin wallet owner_api</pre> when the this app starts.</span>
          </div>
          <div className="Settings-setting-toggle">
            <Toggle active={props.startOwner} onClick={() => props.setStartOwner(!props.startOwner)} />
          </div>
        </div>
        <div className="Settings-setting">
          <div className="Settings-setting-text">
            <span className="Settings-setting-title">Check UTXO</span>
            <span className="Settings-setting-description">Scan UTXO for outputs that belong to you.</span>
          </div>
          <div className="Settings-setting-toggle">
            <button className="Settings-btn">Scan</button>
          </div>
        </div>
        <div className="Settings-setting">
          <div className="Settings-setting-text">
            <span className="Settings-setting-title">Dark Mode</span>
            <span className="Settings-setting-description">Everyone likes dark mode.</span>
          </div>
          <div className="Settings-setting-toggle">
            <Toggle active={props.darkMode} onClick={() => props.setDarkMode(!props.darkMode)} />
          </div>
        </div>
      </div>
    </div>
  );
}

SettingsPage.propTypes = {
  darkMode: PropTypes.bool,
  setDarkMode: PropTypes.func,
  startOwner: PropTypes.bool,
  setStartOwner: PropTypes.func,
  close: PropTypes.func,
};
