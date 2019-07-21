import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import execa from 'execa';
import { useSpring, animated } from 'react-spring';
import { ipcRenderer } from 'electron';

import Wimble from 'svg/Wimble';
import Spinner from 'svg/Spinner';
require('./PasswordPage.scss');

function PasswordPage({ onClickLogin, ...props }) {
  const [serverStarted, setServerStarted] = useState(false);
  const [password, setPassword] = useState('');
  const springLogo = useSpring({
    from: {
      position: 'absolute',
      top: '30%',
      transform: 'translateY(-50%) scale(2.5)',
    },
    to: {
      top: serverStarted ? '0px' : '30%',
      transform: serverStarted ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(2.5)',
    },
  });
  const springPassword = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: serverStarted ? 1 : 0,
    },
  });

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      onClickLogin(password);
    }
  }

  useEffect(() => {
    ipcRenderer.on('server-started', (e, started) => {
      if (started) setServerStarted(true);
    });
  }, []);

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
