import React, { useState, useEffect } from 'react';
import cx from 'classnames';

require('./Scale.scss');

export default function Scale(props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    // return () => {
    //   setActive(false);
    // };
  }, []);

  return (
    <div className={cx('Scale', { active: active })}>
      {props.children}
    </div>
  );
}
