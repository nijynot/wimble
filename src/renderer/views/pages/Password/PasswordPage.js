import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import execa from 'execa';

import Wimble from 'svg/Wimble';
require('./PasswordPage.scss');

function PasswordPage({ onClickLogin, ...props }) {
  const [password, setPassword] = useState('');

  useEffect(() => {
    execa('echo', ['something something!']).then(({ stdout }) => {
      console.log(stdout);
    });
  }, []);

  return (
    <div className="Password">
      <Wimble className="white" />
      <div>
        <input
          placeholder="password" type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="Password_login-btn"
          onClick={() => onClickLogin(password)}
        >→</button>
      </div>
    </div>
  );
}
export default withRouter((props) => <PasswordPage {...props} />);

PasswordPage.propTypes = {
  onClickLogin: PropTypes.func,
};
