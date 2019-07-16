import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

require('./Checkbox.scss');

export default function Checkbox({ checked, ...props }) {
  return (
    <div
      className={cx('Checkbox', { checked })}
      onClick={props.onClick}
    >
      <div className="Checkbox_box">
        <div className="Checkbox_check"></div>
      </div>
    </div>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.boolean,
  onClick: PropTypes.func,
};
