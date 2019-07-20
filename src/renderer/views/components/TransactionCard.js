import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import fs from 'fs-extra';
import { get } from 'lodash';
import { useSpring, animated } from 'react-spring';
import { clipboard, remote } from 'electron';
import { withRouter } from 'react-router-dom';

import grin from 'client/grin';
import {
  formatTxType,
  formatNumber,
  txNetDifference,
  toGrin,
  toUSD,
  formatTxStatus,
  classNameTxStatus,
  retrieveSlate,
  formatSlateFilename,
  isCancelled,
} from 'utils/util';
import { app } from 'utils/app';
import ToastContext from 'contexts/ToastContext';
import useHistory from 'hooks/useHistory';
import Spinner from 'svg/Spinner';
require('./TransactionCard.scss');

function TransactionCard({ tx, ...props }) {
  const history = useHistory(props.history);
  const toasts = useContext(ToastContext);

  const [loadingRepost, setLoadingRepost] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [expand, setExpand] = useState(false);
  const [outputs, setOutputs] = useState([]);
  const [slate, setSlate] = useState(null);
  const springExpand = useSpring({
    opacity: expand ? 1 : 0,
    height: expand ? `${document.getElementById('expand').clientHeight}px` : '0px',
  });

  // Overwrites the filename with the transaction slate.
  const onClickSave = () => {
    remote.dialog.showSaveDialog({
      defaultPath: formatSlateFilename(tx.tx_slate_id),
    }, (filename) => {
      if (filename) {
        fs.outputJsonSync(filename, retrieveSlate(tx.tx_slate_id), { spaces: 2 });
      }
    });
  };

  const onClickCancel = () => {
    if (!cancelled) {
      setLoadingCancel(true);
      grin.wallet.cancelTx(tx.id).then((res) => {
        if (res) {
          setTimeout(() => {
            setLoadingCancel(false);
            setCancelled(true);
          }, 200);
        }
      }).catch((e) => {
        console.log(e);
        setLoadingCancel(false);
        toasts.push({
          text: 'Failed to cancel transaction.',
          className: 'error',
        });
      });
    }
  };

  const onClickRepost = () => {
    if (!loadingRepost) {
      setLoadingRepost(true);
      const slate = retrieveSlate(tx.tx_slate_id);
      grin.wallet.postTx(slate, true).then((res) => {
        if (res) {
          setTimeout(() => setLoadingRepost(false), 200);
        } else {
          toasts.push({
            text: 'Failed to repost transaction.',
            className: 'error',
          });
          setTimeout(() => setLoadingRepost(false), 200);
        }
      }).catch((e) => {
        console.log(e);
        setLoadingRepost(false);
        toasts.push({
          text: 'Failed to repost transaction.',
          className: 'error',
        });
      });
    }
  };

  useEffect(() => {
    if (tx && typeof parseInt(tx.id) === 'number') {
      grin.wallet.retrieveOutputs(true, true, tx && tx.id).then((res) => {
        setOutputs(res.reverse());
      });

      const rawSlate = retrieveSlate(tx.tx_slate_id);
      if (rawSlate) {
        setSlate(Buffer.from(JSON.stringify(rawSlate)).toString('base64'));
      }
    }
  }, [tx]);

  const height = get(outputs, '[0].output.height', null);

  return (
    <>
      <div className="TransactionCard">
        <div className="TransactionCard_header">
          <strong>{formatTxType(tx && tx.tx_type)}</strong>
          <span className="grey">
            {height ? (
              <>&nbsp;&bull;&nbsp;Height #{formatNumber(parseInt(height, 10))}</>
            ) : <>&nbsp;&bull;&nbsp; ID: {tx && tx.id}</>}
          </span>
          <span className="TransactionCard_timestamp">
            {moment(tx && tx.creation_ts).fromNow()}
          </span>
        </div>
        <div className="TransactionCard_details">
          <div className="TransactionCard_detail">
            <h2>${tx && toUSD(toGrin(txNetDifference(tx)))}</h2>
            <div className="grey">{tx && toGrin(txNetDifference(tx))} GRIN</div>
          </div>
          <div className={cx('TransactionCard_status', tx && classNameTxStatus(tx))}>
            {tx && formatTxStatus(tx)}
          </div>
        </div>
        <div className="TransactionCard_line"></div>
        <small className="TransactionCard_slate-heading">TRANSACTION SLATE</small>
        <div className="TransactionCard_slate">
          <div className="TransactionCard_inner-slate">
            {(slate) ? slate : 'No slate was found.'}
          </div>
          <div className="TransactionCard_actions">
            <div
              onClick={() => onClickSave()}
              className="TransactionCard_action"
            >Save</div>
            <div
              onClick={() => clipboard.writeText(slate)}
              className="TransactionCard_action"
            >Copy</div>
          </div>
        </div>
        <animated.div style={{
          ...springExpand,
          overflow: 'hidden',
        }}>
          <div id="expand" className={cx('TransactionCard_expansion', { hide: !expand })}>
            <div className="TransactionCard_table">
              <div className="TransactionCard_row">
                <label>ID / UUID</label>
                <div className="TransactionCard_cell">
                  ID: {tx && tx.id}<br />
                  UUID: {tx && tx.tx_slate_id}
                </div>
              </div>
              <div className="TransactionCard_row">
                <label>OUTPUTS {tx && `(IN: ${tx.num_inputs}, OUT: ${tx.num_outputs})`}</label>
                <div className="TransactionCard_cell">
                  {(outputs.length > 0) ? outputs.map((output, i) => (
                    <div key={output.commit} className="TransactionCard_output">[{i}]: {output.commit}</div>
                  )) : 'N/A'}
                </div>
              </div>
              <div className="TransactionCard_row">
                <label>FEE</label>
                <div className="TransactionCard_cell">{tx && tx.fee && toGrin(tx.fee) || 'N/A'}</div>
              </div>
            </div>
            {(tx && !tx.confirmed) && (
              <button
                className={cx('TransactionCard_repost-btn')}
                onClick={() => onClickRepost()}
              >
                {(!loadingRepost) ? 'Repost without Dandelion' : <Spinner active />}
              </button>
            )}
            {(tx && !tx.confirmed && !isCancelled(tx)) && (
              <button
                className={cx('TransactionCard_cancel-btn')}
                onClick={() => onClickCancel()}
              >
                {(!loadingCancel && !cancelled) && 'Cancel transaction'}
                {(loadingCancel) && <Spinner active />}
                {cancelled && 'Cancelled'}
              </button>
            )}
          </div>
        </animated.div>
        <div
          className="TransactionCard_three-dots"
          onClick={() => setExpand(!expand)}
        >
          <div className={cx('TransactionCard_dot', { hide: expand })}></div>
          <div className="TransactionCard_dot"></div>
          <div className={cx('TransactionCard_dot', { hide: expand })}></div>
        </div>
      </div>
      {!expand && <div className="TransactionCard_hint">{props.hint}</div>}
    </>
  );
}
export default withRouter((props) => <TransactionCard {...props} />);

TransactionCard.propTypes = {
  tx: PropTypes.object,
  hint: PropTypes.string,
};
