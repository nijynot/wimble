import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { formatTxType } from 'utils/util';
require('./TransactionCard.scss');

export default function TransactionCard(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="TransactionCard">
        <div className="TransactionCard_header">
          <strong>{formatTxType(props.tx && props.tx.tx_type)}</strong>
          <span className="grey">&nbsp;&bull;&nbsp;Height #145,234</span>
          <span className="TransactionCard_timestamp">Just now</span>
        </div>
        <div className="TransactionCard_details">
          <div className="TransactionCard_detail">
            <h2>$432</h2>
            <div className="grey">53.24 GRIN</div>
          </div>
          <div className="TransactionCard_status">
            Waiting for<br />
            response slate
          </div>
        </div>
        <div className="TransactionCard_line"></div>
        <small className="TransactionCard_slate-heading">TRANSACTION SLATE</small>
        <div className="TransactionCard_slate">
          <div className="TransactionCard_inner-slate">
            ewogICAgIm51bV9wYXJ0aWNpcGFudHMiOiAyLAogICAgImlkIjogIjhiOTc1OWI2LWQ3ZTEtNDg4Yi1izLTc2MTRjODQzZWY0ZSIsCiAgICAidHgiOiB7CiAgICAgICJvZmZzZXQiOiBbMTY1XSwKICAgICAgImJvZHkiOiB7CiAgICAgICAgImlucHV0cyI6IFsKICAgICAgICAgIHsKICAgICAgICZmZzZXQiOiBbMTY1XSwKICAgICAgImJvZHkiOiB7CiAgICAgICAgImlucHV0cyI6IFsKICAgICAgICAgIHsKICAgICAgICAgIHsKICAgICAgICAgIHsKIC...
          </div>
          <div className="TransactionCard_actions">
            <div className="TransactionCard_action">Save</div>
            <div className="TransactionCard_action">Copy</div>
          </div>
        </div>
        <div className={cx('TransactionCard_expansion', { hide: !show })}>
          <div className="TransactionCard_table">
            <div className="TransactionCard_row">
              <label>UUID</label>
              <div className="TransactionCard_cell">856c3c85-0cb9-4951-9f33-124f032ac21e</div>
            </div>
            <div className="TransactionCard_row">
              <label>OUTPUTS</label>
              <div className="TransactionCard_cell">08ad4948a215e22e37f7909c7e36460afa5e38d6696361b0a27b983b38e78540c5</div>
            </div>
            <div className="TransactionCard_row">
              <label>INPUTS</label>
              <div className="TransactionCard_cell">08ad4948a215e22e37f7909c7e36460afa5e38d</div>
            </div>
            <div className="TransactionCard_row">
              <label>FEE</label>
              <div className="TransactionCard_cell">0.006 GRIN</div>
            </div>
          </div>
          <button className="TransactionCard_cancel-btn">Cancel transaction</button>
        </div>
        <div
          className="TransactionCard_three-dots"
          onClick={() => setShow(!show)}
        >
          <div className={cx('TransactionCard_dot', { hide: show })}></div>
          <div className="TransactionCard_dot"></div>
          <div className={cx('TransactionCard_dot', { hide: show })}></div>
        </div>
      </div>
      {!show && <div className="TransactionCard_hint">{props.hint}</div>}
    </>
  );
}

TransactionCard.propTypes = {
  tx: PropTypes.object,
  hint: PropTypes.string,
};
