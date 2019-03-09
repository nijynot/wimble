import React, { useState } from 'react';
import cx from 'classnames';

require('./FileMethod.scss');

export default function FileMethod(props) {
  const exSlate = {
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
  const [slate, setSlate] = useState('');
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState('slate');

  function generateSlate() {
    setLoading(true);
    setTimeout(() => {
      setSlate(JSON.stringify(exSlate, null, 2));
      setLoading(false);
      setStage('finalize');
    }, 1500);
  }

  function toFinalize() {

  }

  return (
    <div className="FileMethod">
      <label className="Send-label">Slate</label>
      <div className="FileMethod-slate">
        <div className={cx('FileMethod-copy', {
          active: (slate) ? true : false,
        })}>
          <pre className="FileMethod-json">
            {slate || 'Empty'}
          </pre>
          <button
            className="FileMethod-copy-btn"
            disabled={(slate) ? false : true}
          >
            Copy to clipboard
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
          </button>
        </div>
        {(slate) ? <div className="FileMethod-save">
          <button className="FileMethod-save-btn">
            Save as File
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
          </button>
        </div> : null}
      </div>
      <div className="FileMethod-footer">
        <button
          className={cx('FileMethod-end-btn', {
            finalize: stage === 'finalize',
          })}
          onClick={() => generateSlate()}
          disabled={(!props.amount)}
        >
          {(stage === 'slate') ? 'Generate Slate' : 'Continue to Finalize ' + String.fromCharCode(8594)}
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
