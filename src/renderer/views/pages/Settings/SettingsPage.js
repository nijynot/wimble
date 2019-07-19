import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';

import { toBoolean } from 'utils/util';
import Wimble from 'svg/Wimble';
import Close from 'svg/Close';
import useHistory from 'hooks/useHistory';
import Toggle from './components/Toggle';
require('./SettingsPage.scss');

function SettingsPage(props) {
  const history = useHistory(props.history);
  const [hideValues, setHideValues] = useState(toBoolean(localStorage.getItem('hide-values')));

  useEffect(() => {
    localStorage.setItem('hide-values', hideValues);
  }, [hideValues]);

  return (
    <div className="Settings">
      <Wimble />
      <Close onClick={() => history.push('/', { leave: 'zoom', scale: '1.15' })} />
      <div className="Settings_content">
        <section className="Settings_field">
          <div className="Settings_field-text">
            <div className="Settings_field-name">Hide values</div>
            <div className="Settings_field-description">Hide total Grins and transaction history when starting Wimble.</div>
          </div>
          <div className="Settings_field-action">
            <Toggle
              active={hideValues}
              onClick={() => setHideValues(!hideValues)}
            />
          </div>
        </section>
        <div className="Settings_separator"></div>
        <section className="Settings_field">
          <div className="Settings_field-text">
            <div className="Settings_field-name">Check UTXO</div>
            <div className="Settings_field-description">This will call `grin-wallet check` on your Grin wallet.</div>
          </div>
          <div className="Settings_field-action">
            <button className="Settings_btn">Run</button>
          </div>
        </section>
        {/*<div className="Settings_separator"></div>
        <section className="Settings_field">
          <div className="Settings_field-text">
            <div className="Settings_field-name">API Secret</div>
            <input className="Settings_ctrl" placeholder=".api_secret" />
            <div className="Settings_field-description">Keep it safe. It's used for accessing the `owner_api`.</div>
          </div>
        </section>*/}
      </div>
    </div>
  );
}
export default withRouter((props) => <SettingsPage {...props} />);

SettingsPage.propTypes = {
};
