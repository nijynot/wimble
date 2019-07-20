import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Wimble from 'svg/Wimble';
import Back from 'svg/Back';
import grin from 'client/grin';
require('./InitPage.scss');

function InitPage(props) {

  // useEffect(() => {
  //   grin.commands.initWallet();
  // }, []);

  return (
    <div className="Init">
      <Wimble />
      <Back onClick={() => props.history.goBack()} />
      <h2>Choose password</h2>
      <p>Pick a password for your wallet. It'll be used every time you start your wallet.</p>
      <div className="Init_ctrls">
        <input
          type="password"
          className="Init_ctrl"
          placeholder="Password"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
        />
        <input
          type="password"
          className="Init_ctrl"
          placeholder="Confirm password"
          value={props.confirmPassword}
          onChange={(e) => props.setConfirmPassword(e.target.value)}
        />
      </div>
    </div>
  );
}
export default withRouter((props) => <InitPage {...props} />);

InitPage.propTypes = {
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  setPassword: PropTypes.func,
  setConfirmPassword: PropTypes.func,
};
