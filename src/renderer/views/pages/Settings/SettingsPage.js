import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';

import Wimble from 'svg/Wimble';
import Close from 'svg/Close';
import useHistory from 'hooks/useHistory';
require('./SettingsPage.scss');

function SettingsPage(props) {
  const history = useHistory(props.history);
  return (
    <div className="Settings">
      <Wimble />
      <Close onClick={() => history.push('/', { leave: 'zoom', scale: '1.15' })} />
      <div className="Settings_content">
        <section className="Settings_field">
          <div className="Settings_field-text">
            <div className="Settings_field-name">Hide values</div>
            <div className="Settings_field-description">Will hide values when starting Wimble</div>
          </div>
          <div className="Settings_field-action">
            <button>Press me!</button>
          </div>
        </section>
        <div className="Settings_separator"></div>
        <section className="Settings_field">
          <div className="Settings_field-text">
            <div className="Settings_field-name">Check UTXO</div>
            <div className="Settings_field-description">This will update which outputs that belong to you.</div>
          </div>
          <div className="Settings_field-action">
            <button>Run</button>
          </div>
        </section>
        <div className="Settings_separator"></div>
        <section className="Settings_field">
          <div className="Settings_field-text">
            <div className="Settings_field-name">API Secret</div>
            <div className="Settings_field-description">Keep this safe. It's used for accessing the `.wimble` wallet.</div>
          </div>
          <div className="Settings_field-action">
            <button>Run</button>
          </div>
        </section>
      </div>
    </div>
  );
}
export default withRouter((props) => <SettingsPage {...props} />);

SettingsPage.propTypes = {
};
