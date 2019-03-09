import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function DelayedComponent(props) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (props.isMounted) {
      setShouldRender(true);
      setTimeout(() => {
      }, 0);
    } else {
      setTimeout(() => {
        setShouldRender(false);
      }, props.delay);
    }
  });

  return (shouldRender) ? (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  ) : null;
}

DelayedComponent.propTypes = {
  delay: PropTypes.number,
  isMounted: PropTypes.bool,
};
