import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

require('./Input.scss');

export default function Input(props) {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={cx('Input', props.rootClassName, {
        active: focus,
      })}
      disabled={props.disabled}
    >
      <input
        className={cx('Input-ctrl', props.className)}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        disabled={props.disabled}
      />
      {props.children}
    </div>
  );
}

Input.propTypes = {
  rootClassName: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};
