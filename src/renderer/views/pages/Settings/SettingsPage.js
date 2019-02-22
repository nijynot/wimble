import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

require('./SettingsPage.scss');

export default function SettingsPage(props) {
  return (
    <div className="Settings">
      {/* Not needed as currently very few settings exist. */}
      {/* <div className="Settings-sidebar">
        <ul>
          <div>SETTINGS</div>
          <li>Recover</li>
          <li>Check</li>
        </ul>
      </div> */}
      <div className="Settings-content">
        <button
          className="Settings-close-btn"
          onClick={props.close}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        </button>
        <h4>Settings</h4>
        <div className="Settings-setting">
          <span className="Settings-setting-title">Auto-start Owner API</span>
          <span className="Settings-setting-description">Will call <pre>grin wallet owner_api</pre> when the this app starts.</span>
        </div>
        <div className="Settings-setting">
          <span className="Settings-setting-title">Check UTXO</span>
          <span className="Settings-setting-description">Scan UTXO for outputs that belong to you.</span>
        </div>
      </div>
    </div>
  );
}

SettingsPage.propTypes = {
  close: PropTypes.function,
};
