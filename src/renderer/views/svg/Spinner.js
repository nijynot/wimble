import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

require('./Spinner.scss');

export default function Spinner({ active, ...props }) {
  return (
    <svg
      className={cx('Spinner', { active })}
      width="18px" height="18px" viewBox="0 0 18 18" version="1.1"
    >
      <circle className="Spinner_circle" cx="9" cy="9" r="7" strokeLinecap="round" strokeWidth="2" stroke="#fff" fill="none" />
    </svg>
  );
}

Spinner.propTypes = {
  active: PropTypes.bool,
};
