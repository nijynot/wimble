import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';

import OutsideClickHandler from './OutsideClickHandler';
require('./Select.scss');

export default function Select(props) {
  const [show, setShow] = useState(false);

  return (
    <OutsideClickHandler
      onOutsideClick={() => setShow(false)}
      className="Select"
    >
      <button
        className={cx('Select-select', props.className)}
        onClick={() => setShow(!show)}
      >
        <div className="Select-content">
          {props.value}
        </div>
        <div className="Select-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </button>
      <div
        className={cx('Select-options', { hide: !show })}
        onClick={() => setShow(false)}
      >
        {props.children}
      </div>
    </OutsideClickHandler>
  )
}

Select.propTypes = {
  className: PropTypes.string,
  selected: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onChange: PropTypes.func,
};
