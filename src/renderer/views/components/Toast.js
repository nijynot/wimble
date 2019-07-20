import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ToastContext from 'contexts/ToastContext';
import { useTransition, animated } from 'react-spring';
import uuid from 'uuid/v4';
import cx from 'classnames';

import useInterval from 'hooks/useInterval';
require('./Toast.scss');

export default function Toast(props) {
  const [toasts, setToasts] = useState([]);
  const [refMap] = useState(() => new WeakMap());
  const [cancelMap] = useState(() => new WeakMap());

  const config = { tension: 125, friction: 20, precision: 0.1 };
  const timeout = 4000;
  const transitions = useTransition(toasts, toast => toast.key, {
    config: (item, state) => {
      if (state === 'leave') {
        return [{ duration: timeout }, config, config];
      }
      return config;
    },
    from: {
      opacity: 1,
      from: '100%',
      transform: 'translate3d(0, 100px, 0)',
      height: '0px',
    },
    enter: item => async (next) => {
      await next({
        opacity: 1,
        transform: 'translate3d(0, 0px, 0)',
        height: `${refMap.get(item).offsetHeight}px`,
      });
    },
    leave: item => async (next, cancel) => {
      cancelMap.set(item, cancel);
      await next({ life: '0%' });
      await next({ opacity: 0 });
    },
    onRest: item => setToasts(state => state.filter(i => i.key !== item.key)),
  });

  return (
    <>
      <ToastContext.Provider value={{
        toasts,
        push: (toast) => setToasts([ ...toasts, { key: uuid(), ...toast }]),
      }}>
        {props.children}
      </ToastContext.Provider>
      {createPortal(
        <div className="Toast">
          {transitions.map(({ item, key, props }, i) => (
            <animated.div key={key} style={{ ...props, marginTop: '8px' }}>
              <div
                className={cx('Toast_toast', item.className)}
                ref={ref => ref && refMap.set(item, ref)}
                onClick={() => cancelMap.has(item) && cancelMap.get(item)()}
              >
                {item.text}
                {item.log && <code>{item.log}</code>}
              </div>
            </animated.div>
          ))}
        </div>,
        document.getElementById('toast-root')
      )}
    </>
  );
}
