import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

require('./Option.scss');

export default function Option(props) {
  return (
    <div
      className={cx('Option', props.className)}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

Option.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};
