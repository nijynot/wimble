import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import cx from 'classnames';
import fs from 'fs-extra';
import { remote } from 'electron';

import { animations } from 'utils/animations';
import Wimble from 'svg/Wimble';
import Close from 'svg/Close';
import TransactionCard from 'components/TransactionCard';
require('./FinalizePage.scss');

export default function FinalizePage(props) {
  const [dragOver, setDragOver] = useState(false);
  const tx = {
    amount_credited: '60000000000',
    amount_debited: '0',
    confirmation_ts: '2019-01-15T16:01:26Z',
    confirmed: true,
    creation_ts: '2019-01-15T16:01:26Z',
    fee: null,
    id: 0,
    messages: null,
    num_inputs: 0,
    num_outputs: 1,
    parent_key_id: '0200000000000000000000000000000000',
    stored_tx: null,
    tx_slate_id: null,
    tx_type: 'ConfirmedCoinbase',
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const slate = fs.readJsonSync(file.path);
  };

  const onDragEnter = (e) => {
    e.preventDefault();
  };

  const onDragLeave = (e) => {
    e.preventDefault();
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onClickFile = () => {
    remote.dialog.showOpenDialog({
      properties: ['openFile'],
    }, (files) => {
      const file = files[0];
      const slate = fs.readJsonSync(file);
    });
  };

  return (
    <div className="FinalizePage">
      <Wimble />
      <Close onClick={props.close} />
      <div className="Finalize_slate">
        <small>FINALIZE TRANSACTION SLATE</small>
        <textarea
          className="Finalize_textarea"
          placeholder="Paste slate here..."
        ></textarea>
        <div className="Finalize_separator">
          <div className="Finalize_line"></div>
          <div className="Finalise_separator-text">OR</div>
          <div className="Finalize_line"></div>
        </div>
        <div
          id="drop-area"
          className={cx('Finalize_droparea', { active: dragOver })}
          onDrop={onDrop}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
        >
          <div>Drag and drop a slate</div>
          <div>
            <button
              className="Finalize_file-btn"
              onClick={onClickFile}
            >
              Or choose a file
            </button>
          </div>
        </div>
      </div>
      <div className="FinalizePage_hint">Paste or upload the response slate.</div>
    </div>
  );
}

FinalizePage.propTypes = {
  close: PropTypes.func,
};
