import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

require('./Back.scss');

export default function Back(props) {
  return (
    <button
      onClick={props.onClick}
      className={cx('Back', props.className)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="4 4 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
  );
}

Back.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};
