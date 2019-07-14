import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

require('./Close.scss');

export default function Close(props) {
  return (
    <button
      className={cx('Close', props.className)}
      onClick={props.onClick}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.70711 0.292893C1.31658 -0.0976311 0.683418 -0.0976311 0.292893 0.292893C-0.0976311 0.683418 -0.0976311 1.31658 0.292893 1.70711L1.70711 0.292893ZM11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.2929 12.7071ZM12.7071 1.70711C13.0976 1.31658 13.0976 0.683418 12.7071 0.292893C12.3166 -0.0976311 11.6834 -0.0976311 11.2929 0.292893L12.7071 1.70711ZM0.292893 11.2929C-0.0976311 11.6834 -0.0976311 12.3166 0.292893 12.7071C0.683418 13.0976 1.31658 13.0976 1.70711 12.7071L0.292893 11.2929ZM0.292893 1.70711L11.2929 12.7071L12.7071 11.2929L1.70711 0.292893L0.292893 1.70711ZM11.2929 0.292893L0.292893 11.2929L1.70711 12.7071L12.7071 1.70711L11.2929 0.292893Z" fill="black" />
      </svg>
    </button>
  );
}

Close.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};
