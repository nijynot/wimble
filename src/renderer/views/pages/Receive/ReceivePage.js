import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import fs from 'fs-extra';
import { remote } from 'electron';

import { animations } from 'utils/animations';
import Wimble from 'svg/Wimble';
import Close from 'svg/Close';
import TransactionCard from 'components/TransactionCard';
require('./ReceivePage.scss');

function ReceivePage({ history, ...props }) {
  const [dragOver, setDragOver] = useState(false);

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

  const linker = (from, enter, leave) => {
    history.push('/', { from, enter, leave });
  };

  return (
    <div className="FinalizePage">
      <Wimble />
      <Close />
      <button onClick={() => linker('zoom', 'zoom', 'zoom')}>close me</button>
      <div className="Finalize_slate">
        <small>RECEIVE TRANSACTION SLATE</small>
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
      <div className="ReceivePage_hint">Paste or upload the transaction slate.</div>
    </div>
  );
}
export default withRouter((props) => <ReceivePage {...props} />);

ReceivePage.propTypes = {
  close: PropTypes.func,
};
