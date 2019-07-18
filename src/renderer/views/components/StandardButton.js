import React, { useState, useEffect } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Link, withRouter, matchPath } from 'react-router-dom';
import cx from 'classnames';
import Big from 'big.js';
import { useSpring, animated } from 'react-spring';
import { remote } from 'electron';
import fs from 'fs-extra';

import grin from 'client/grin';
import { perfectMatch, match, validateAmount, toNanoGrin } from 'utils/util';
import { animations } from 'utils/animations';
import useInterval from 'hooks/useInterval';
import useHistory from 'hooks/useHistory';
require('./StandardButton.scss');

function StandardButton({
  location,
  amount,
  setAmount,
  setDoesWalletExist,
  txId,
  ...props
}) {
  const { pathname } = location;
  const history = useHistory(props.history);
  const [loading, setLoading] = useState(false);
  const spring = useSpring({ ...animations.standardSlideInFromBottom });
  const buttons = {
    home: {
      text: 'Send',
      className: 'black',
      onClick: ({ history, setAmount }) => {
        setAmount('0');
        history.push('/send', { enter: 'zoom', leave: 'zoom', scale: '1.15' });
      },
      secondary: {
        text: 'Receive',
        onClick: ({ history }) => {
          history.push('/receive', { enter: 'zoom', leave: 'zoom', scale: '1.15' });
        },
      },
    },
    send: {
      text: 'Create transaction',
      className: 'grey wide',
      disabled: ({ amount }) => {
        return (!validateAmount(Big(amount)) || Big(amount).cmp(0) === 0);
      },
      onClick: ({ history, amount }) => {
        // call `initSendTx`
        // call `txLockOutputs`
        // return the /tx/:id with the id.
        // let id;
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          history.push('/result', { enter: 'fade', leave: 'fade', scale: '1' });
        }, 800);
        // if (validateAmount(Big(amount))) {
        //   grin.initSendTx({ amount }).then((res) => {
        //   })
        // }
      },
    },
    result: {
      text: 'Close',
      className: 'black',
      onClick: ({ history }) => {
        history.push('/', { enter: 'zoom', leave: 'zoom', scale: '1.15' });
      },
      secondary: {
        text: 'Finalize',
        onClick: ({ history }) => {
          history.push('/finalize', { enter: 'fade', leave: 'fade', scale: '1' });
        },
      },
    },
    tx: {
      text: 'Close',
      className: 'black',
      onClick: ({ history }) => {
        history.goBack();
      },
    },
    txs: {
      text: 'Close',
      className: 'black',
      onClick: ({ history }) => {
        history.push('/', { enter: 'zoom', leave: 'zoom', scale: '1.15' });
      },
    },
    finalize: {
      text: 'Finalize',
      className: 'black',
      onClick: ({ history }) => {
        history.push('/', { enter: 'zoom', leave: 'zoom', scale: '1.15' });
      },
    },
    receive: {
      text: 'Receive',
      className: 'black',
      onClick: ({ history }) => {
      },
    },
    welcome: {
      text: 'Create a new wallet',
      className: 'black wide',
      onClick: ({ history }) => {
        history.push('/seed', { enter: 'fade', leave: 'fade', scale: '1' });
      },
      secondary: {
        text: 'I already have a wallet',
        onClick: ({ history }) => {
          history.push('/restore', { enter: 'fade', leave: 'fade', scale: '1' });
        },
      },
    },
    seed: {
      text: 'Continue',
      className: 'black',
      onClick: ({ history }) => {
        fs.ensureFile(remote.app.getPath('home') + '/.wimble/main/wallet_data/wallet.seed').then((err) => {
          setDoesWalletExist(true);
          history.push('/introduction', { leave: 'fade', scale: '1' });
        });
      },
      disabled: ({ history }) => {
        if (history.location.state && history.location.state.approved) {
          return false;
        }
        return true;
      },
    },
    introduction: {
      text: 'Continue to wallet',
      className: 'black wide',
      onClick: ({ history }) => {
        history.push('/', { leave: 'zoom', scale: '1.15' });
      },
    },
    restore: {
      text: 'Restore wallet',
      className: 'black wide',
      onClick: ({ history }) => {
        history.push('/', { leave: 'zoom', scale: '1.15' });
      },
    },
    settings: {
      text: 'Close',
      className: 'black',
      onClick: ({ history }) => {
        history.push('/', { leave: 'zoom', scale: '1.15' });
      },
    },
    password: {
      text: '',
      className: 'hide',
    },
  };
  const [button, setButton] = useState(buttons.home);

  const renderButton = () => {
    if (perfectMatch(pathname, '/')) {
      return buttons.home;
    } else if (match(pathname, '/send')) {
      return buttons.send;
    } else if (match(pathname, '/result')) {
      return buttons.result;
    } else if (match(pathname, '/finalize')) {
      return buttons.finalize;
    } else if (match(pathname, '/receive')) {
      return buttons.receive;
    } else if (match(pathname, '/tx')) {
      return buttons.tx;
    } else if (match(pathname, '/txs')) {
      return buttons.txs;
    } else if (match(pathname, '/welcome')) {
      return buttons.welcome;
    } else if (match(pathname, '/seed')) {
      return buttons.seed;
    } else if (match(pathname, '/introduction')) {
      return buttons.introduction;
    } else if (match(pathname, '/restore')) {
      return buttons.restore;
    } else if (match(pathname, '/settings')) {
      return buttons.settings;
    } else if (match(pathname, '/password')) {
      return buttons.password;
    }
  }

  useEffect(() => {
    setButton(renderButton());
  }, [location.pathname]);

  return createPortal(
    <>
      <animated.div style={{
        ...spring,
      }}>
        <button
          className={cx('StandardButton', {
            [button.className]: true,
            loading: loading,
          })}
          disabled={(button.disabled && button.disabled({ history, amount })) || false}
          onClick={(event) => {
            if (!loading) {
              button.onClick({ event, history, amount, setAmount, txId });
            }
          }}
        >
          <svg
            className={cx('svg-spinner', { active: loading })}
            width="18px" height="18px" viewBox="0 0 18 18" version="1.1"
          >
            <circle className="border" cx="9" cy="9" r="7" strokeLinecap="round" strokeWidth="2" stroke="#fff" fill="none" />
          </svg>
          <span className={cx('StandardButton_text', {
            hide: loading,
          })}>{button.text}</span>
        </button>
        {button.secondary && (
          <button
            className="StandardButton_secondary-btn"
            onClick={() => button.secondary.onClick({ history })}
          >
            {button.secondary.text}
          </button>
        )}
      </animated.div>
    </>,
    document.getElementById('standard-button-root')
  );
}
export default withRouter((props) => <StandardButton {...props} />);

StandardButton.propTypes = {
  onClick: PropTypes.func,
  parameter: PropTypes.any,
  amount: PropTypes.string,
  txId: PropTypes.string,
  setAmount: PropTypes.func,
  setDoesWalletExist: PropTypes.func,
};
