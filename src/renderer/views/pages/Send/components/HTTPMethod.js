import React, { useState } from 'react';
import cx from 'classnames';

import Input from 'components/Input';

export default function HTTPMethod() {
  const [addr, setAddr] = useState('');
  const [loading, setLoading] = useState(false);

  function send() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="HTTPMethod">
      <label className="Send-label">To</label>
      <Input
        rootClassName="Send-amount"
        className="Send-amount-ctrl"
        placeholder="Send address..."
        value={addr}
        onChange={(e) => setAddr(e.target.value)}
      />
      <div className="FileMethod-footer">
        <button
          className={cx('FileMethod-end-btn')}
          disabled={(!addr)}
          onClick={() => send()}
        >
          Send Grin
          <svg
            className={cx('spinner', {
              active: loading,
            })}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            version="1.1"
          >
            <circle className="circle" cx="9" cy="9" r="7" strokeLinecap="round" strokeWidth="2" stroke="#fff" fill="none" />
          </svg>
        </button>
      </div>
    </div>
  );
}
