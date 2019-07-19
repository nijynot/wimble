import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import execa from 'execa';
import { useSpring, animated } from 'react-spring';

import Wimble from 'svg/Wimble';
import Spinner from 'svg/Spinner';
require('./PasswordPage.scss');

function PasswordPage({ onClickLogin, ...props }) {
  const [password, setPassword] = useState('');
  const springLogo = useSpring({
    delay: 2500,
    from: {
      position: 'absolute',
      top: '30%',
      opacity: 1,
      transform: 'translateY(-50%) scale(2.5)',
    },
    to: {
      top: '0px',
      opacity: 1,
      transform: 'translateY(-50%) scale(1)',
    },
  });
  const springPassword = useSpring({
    delay: 2500,
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      onClickLogin(password);
    }
  }

  return (
    <div className="Password">
      <animated.div style={springLogo}>
        <Wimble className="white" />
      </animated.div>
      <animated.div style={springPassword}>
        <div>
          <input
            placeholder="password" type="password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => onEnter(e)}
          />
          <button
            className="Password_login-btn"
            onClick={() => onClickLogin(password)}
          >
            {props.isVerifyingPassword ? (
              <Spinner active />
            ) : '→'}
          </button>
        </div>
      </animated.div>
      <div className="Password_credits">
        Wimble by @nijynot
      </div>
    </div>
  );
}
export default withRouter((props) => <PasswordPage {...props} />);

PasswordPage.propTypes = {
  isVerifyingPassword: PropTypes.bool,
  onClickLogin: PropTypes.func,
};
