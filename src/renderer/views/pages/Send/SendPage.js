import React, { useState } from 'react';
import cx from 'classnames';

require('./SendPage.scss');

const tx = {
  "num_participants": 5,
  "id": "3d4fc46c-dffd-4275-b0ad-dea6ae195d",
  "tx": {
    "offset": [
      14,
      66,
      19,
      67,
      129,
      46,
      58,
      52,
    ],
  },
};

export default function SendPage() {
  const [addr, setAddr] = useState('');

  return (
    <div className="Send">
      <div className="Send-content">
        <h4>Send Grin</h4>
        <div className="Send-row">
          <div className="Send-wrap">
            <small>Amount</small>
            <input
              className="Send-amount-ipt"
              placeholder="0.00"
            />
          </div>
          <div className="Send-sign"><span className="jp">ツ</span></div>
        </div>
        <div className="Send-row">
          <div className="Send-wrap">
            <small>To address</small>
            <input
              className="Send-addr-ipt"
              placeholder="192.168.0.1"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
            />
          </div>
        </div>
        <div className="Send-column">
          <div className="Send-wrap slate">
            <small>By slate</small>
            <div
              className={cx('Send-slate', { disabled: (addr.length === 0) })}
            >
              {JSON.stringify(tx, null, 2)}
              <div className="Send-copy-wrap">
                <button className="Send-copy-btn" disabled={(addr.length > 0)}>
                  Copy to clipboard
                </button>
              </div>
            </div>
          </div>
          <button className="Send-file-btn" disabled={(addr.length > 0)}>
            Save as file
          </button>
        </div>
      </div>
    </div>
  );
}
