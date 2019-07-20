import React, { useState, useEffect, useContext } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Link, withRouter, matchPath } from 'react-router-dom';
import cx from 'classnames';
import Big from 'big.js';
import { useSpring, animated } from 'react-spring';
import { remote } from 'electron';
import fs from 'fs-extra';

import { app } from 'utils/app';
import grin from 'client/grin';
import { perfectMatch, match, validateAmount, toNanoGrin } from 'utils/util';
import { animations } from 'utils/animations';
import ToastContext from 'contexts/ToastContext';
import useInterval from 'hooks/useInterval';
import useHistory from 'hooks/useHistory';
require('./StandardButton.scss');

function StandardButton({
  location,
  amount,
  setAmount,
  setDoesWalletExist,
  txId,
  receiveSlate,
  finalizeSlate,
  setReceiveSlate,
  setFinalizeSlate,
  ...props
}) {
  const { pathname } = location;
  const toasts = useContext(ToastContext);
  const history = useHistory(props.history);
  const [loading, setLoading] = useState(false);
  const spring = useSpring({ delay: 200, ...animations.standardSlideInFromBottom });
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
      onClick: async ({ history, amount }) => {
        setLoading(true);
        try {
          const slate = await grin.wallet.initSendTx({ amount: toNanoGrin(amount) });
          const locked = await grin.wallet.txLockOutputs(slate, 0);
          if (locked) {
            fs.outputJsonSync(
              `${app.getPath('home')}/.wimble/main/wallet_data/wimble_txs/${slate.id}.tx`,
              slate
            );
            setLoading(false);
            history.push(`/result/${slate.id}`, { enter: 'fade', leave: 'fade', scale: '1' });
          } else {
            setLoading(false);
            toasts.push({
              text: 'Failed to lock outputs. Make sure you\'re sending valid amounts.',
              className: 'error',
            });
          }
        } catch (e) {
          console.log(e);
          setLoading(false);
          toasts.push({
            text: 'Error: Something went wrong with `Creating transaction`.',
            className: 'error',
          });
        }
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
      onClick: ({ history, finalizeSlate }) => {
        grin.wallet.finalizeTx(finalizeSlate).then((slate) => {
          setFinalizeSlate(null);
          fs.outputJsonSync(
            `${app.getPath('home')}/.wimble/main/wallet_data/wimble_txs/${slate.id}.final.tx`,
            slate
          );
          toasts.push({ text: `Finalization successful!` });
          history.push(`/tx/${slate.id}`, { enter: 'fade', leave: 'fade', scale: '1' });
        }).catch((e) => {
          console.log(e);
          toasts.push({
            text: `Error: Could not finalize slate.`,
            className: 'error',
          });
        });
      },
      disabled: ({ finalizeSlate }) => {
        if (!finalizeSlate) {
          return true;
        }
      },
    },
    receive: {
      text: 'Receive',
      className: 'black',
      onClick: ({ history, receiveSlate }) => {
        grin.wallet.receiveTx(receiveSlate).then((slate) => {
          setReceiveSlate(null);
          fs.outputJsonSync(
            `${app.getPath('home')}/.wimble/main/wallet_data/wimble_txs/${slate.id}.response.tx`,
            slate
          );
          toasts.push({ text: `Receive successful!` });
          history.push(`/tx/${slate.id}`, { enter: 'fade', leave: 'fade', scale: '1' });
        }).catch((e) => {
          console.log(e);
          toasts.push({
            text: `Error: Could not receive slate.`,
            // log: e,
            className: 'error',
          });
        });
      },
      disabled: ({ receiveSlate }) => {
        if (!receiveSlate) {
          return true;
        }
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
        // Check if `wallet.seed` exists, if it does not, create a init a new wallet.
        fs.ensureFile(remote.app.getPath('home') + '/.wimble/main/wallet_data/wallet.seed').then((res) => {
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
          disabled={(button.disabled && button.disabled({
            history,
            amount,
            receiveSlate,
            finalizeSlate,
          })) || false}
          onClick={(event) => {
            if (!loading) {
              button.onClick({
                event,
                history,
                amount,
                setAmount,
                txId,
                receiveSlate,
                finalizeSlate,
              });
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
  receiveSlate: PropTypes.object,
  finalizeSlate: PropTypes.object,
  setReceiveSlate: PropTypes.func,
  setFinalizeSlate: PropTypes.func,
  txId: PropTypes.string,
  setAmount: PropTypes.func,
  setDoesWalletExist: PropTypes.func,
};
