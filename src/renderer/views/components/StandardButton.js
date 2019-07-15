import React, { useState, useEffect } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Link, withRouter, matchPath } from 'react-router-dom';
import cx from 'classnames';
import Big from 'big.js';

import grin from 'client/grin';
import { perfectMatch, match, validateAmount, toNanoGrin } from 'utils/util';
import useInterval from 'hooks/useInterval';
import useHistory from 'hooks/useHistory';
require('./StandardButton.scss');

function StandardButton({
  location,
  amount,
  setAmount,
  txId,
  ...props
}) {
  const { pathname } = location;
  const history = useHistory(props.history);
  const [loading, setLoading] = useState(false);
  const buttons = {
    home: {
      text: 'Send',
      className: 'black',
      onClick: ({ history, setAmount }) => {
        setAmount('0');
        history.push('/send', { enter: 'zoom', scale: '1.15' });
      },
      secondary: {
        text: 'Receive',
        onClick: ({ history }) => {
          history.push('/receive', { enter: 'zoom', scale: '1.15' });
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
          history.push('/tx', { enter: 'fade', leave: 'fade', scale: '1' });
        }, 800);
        // if (validateAmount(Big(amount))) {
        //   grin.initSendTx({ amount }).then((res) => {
        //   })
        // }
      },
    },
    tx: {
      text: 'Finalize',
      className: 'black',
      onClick: ({ history }) => {
        history.push('/finalize', { enter: 'fade', leave: 'fade', scale: '1' });
      },
      secondary: {
        text: 'Finalize later',
        onClick: ({ history }) => {
          history.push('/', { leave: 'zoom', scale: '1.15' });
        },
      },
    },
    finalize: {
      text: 'Finalize',
      className: 'black',
      onClick: ({ history }) => {
        history.push('/', { leave: 'zoom', scale: '1.15' });
      },
    },
    receive: {
      text: 'Receive',
      className: 'black',
      onClick: ({ history }) => {
      },
    },
  };
  const [button, setButton] = useState(buttons.home);

  const renderButton = () => {
    if (perfectMatch(pathname, '/')) {
      return buttons.home;
    } else if (match(pathname, '/send')) {
      return buttons.send;
    } else if (match(pathname, '/tx')) {
      return buttons.tx;
    } else if (match(pathname, '/finalize')) {
      return buttons.finalize;
    } else if (match(pathname, '/receive')) {
      return buttons.receive;
    }
  }

  useEffect(() => {
    setButton(renderButton());
  }, [location.pathname]);

  return createPortal(
    <>
      <button
        className={cx('StandardButton', {
          [button.className]: true,
          loading: loading,
        })}
        disabled={button.disabled && button.disabled({ history, amount }) || false}
        onClick={(event) => {
          if (!loading) {
            button.onClick({ event, history, amount, setAmount, txId });
          }
        }}
      >
        <svg
          className={cx('svg-spinner', {
            active: loading,
          })}
          width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
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
};
