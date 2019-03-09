import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

require('./Toggle.scss');

export default function Toggle(props) {
  return (
    <div
      className={cx('Toggle', { active: props.active })}
      onClick={props.onClick}
    >
      <button className={cx('Toggle-thumb', { active: props.active })}></button>
    </div>
  );
}

Toggle.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

Toggle.defaultProps = {
  active: false,
};
