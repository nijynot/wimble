import path from 'path';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import fs from 'fs-extra';
import { remote } from 'electron';

import { isBase64, isJSON } from 'utils/util';
import { animations } from 'utils/animations';
import Wimble from 'svg/Wimble';
import Close from 'svg/Close';
import TransactionCard from 'components/TransactionCard';
require('./FinalizePage.scss');

function FinalizePage({ history, ...props }) {
  const [filePath, setFilePath] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const slate = fs.readJsonSync(file.path);
    setFilePath(file.path);
    props.setFinalizeSlate(slate);
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
      setFilePath(file);
      props.setFinalizeSlate(slate);
    });
  };

  const onChangeTextarea = (slate) => {
    if (isBase64(slate) && isJSON(slate)) {
      props.setFinalizeSlate(JSON.parse(Buffer.from(slate, 'base64')));
    } else if (isJSON(slate)) {
      props.setFinalizeSlate(JSON.parse(slate));
    } else {
      props.setFinalizeSlate(null);
    }
  }

  return (
    <div className="FinalizePage">
      <Wimble />
      <Close onClick={props.close} />
      <div className="Finalize_slate">
        <small>FINALIZE TRANSACTION SLATE</small>
        <textarea
          className="Finalize_textarea"
          placeholder="Paste slate here..."
          onChange={(e) => onChangeTextarea(e.target.value)}
        ></textarea>
        <div className="Finalize_separator">
          <div className="Finalize_line"></div>
          <div className="Finalise_separator-text">OR</div>
          <div className="Finalize_line"></div>
        </div>
        {!filePath ? (
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
        ) : (
          <div className="Finalize_uploaded-file">
            {path.basename(filePath)}<br />
            <button
              className="Finalize_remove-file-btn"
              onClick={() => {
                setFilePath('');
                props.setFinalizeSlate(null);
              }}
            >Undo file</button>
          </div>
        )}
      </div>
      <div className="FinalizePage_hint">Paste or upload the response slate.</div>
    </div>
  );
}
export default withRouter((props) => <FinalizePage {...props} />);

FinalizePage.propTypes = {
  close: PropTypes.func,
  setFinalizeSlate: PropTypes.func,
};
