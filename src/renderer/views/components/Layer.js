import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import DelayedComponent from 'components/DelayedComponent';
import Scale from 'components/Scale';

require('./Layer.scss');

export default function Layer(props) {
  return (
    <DelayedComponent delay={props.delay} isMounted={props.isMounted}>
      <div className="Layer">
        <Scale>
          {props.children}
        </Scale>
      </div>
    </DelayedComponent>
  )
  // <div className="Layer">
  //
  // </div>
}
