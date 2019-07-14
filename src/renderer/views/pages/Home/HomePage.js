import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import useInterval from 'hooks/useInterval';
import grin from 'client/grin';
import { formatNumber } from 'utils/util';
import { summary, transactions } from 'artifacts/artifacts';
import StandardButton from 'components/StandardButton';
import SmallTransactionCard from 'components/SmallTransactionCard';
import Wimble from 'svg/Wimble';
require('./HomePage.scss');

export default function HomePage(props) {
  const tx = transactions[0];
  const [height, setHeight] = useState(0);
  const [peers, setPeers] = useState(0);
  const [tipHash, setTipHash] = useState('000000');
  const [difficulty, setDifficulty] = useState(0);

  useInterval(() => {
    grin.status().then((res) => {
      setHeight(res.tip.height);
      setTipHash(res.tip.last_block_pushed);
      setPeers(res.connections);
      setDifficulty(res.tip.total_difficulty);
    }).catch((e) => {
      console.error(e);
    });
  }, 10000);

  return (
    <div className="Home">
      <Wimble />
      <div className="Home_header">
        <h1>342</h1>
        <small>GRIN</small>
      </div>
      <div className="Home_transactions">
        <SmallTransactionCard tx={tx} />
        <div className="Home_transaction-layer layer-2"></div>
        <div className="Home_transaction-layer layer-3"></div>
      </div>
      <div className="Home_details">
        <div className="basis-50">
          <div className="Home_detail height">
            <label>Block Height</label>
            <h4>#{formatNumber(height)}</h4>
            {/*<span className="grey">out of #{formatNumber(height)}</span>*/}
            <span className="grey">{tipHash.slice(0, 12)}...</span>
          </div>
          <div className="Home_detail peers">
            <label>Peers</label>
            <h4>{peers}</h4>
          </div>
        </div>
        <div className="basis-50">
          <div className="Home_detail node">
            <label>Node (54%)</label>
            <h6>Downloading headers...</h6>
            <span className="Home_detail-steps grey">Step 1 of 4</span>
            <div className="difficulty">
              <label>Difficulty</label>
              <h6>{difficulty}</h6>
            </div>
          </div>
        </div>
      </div>
      {/*<Link to="/send/amount" className="App_standard-button">Send</Link>*/}
    </div>
  );
}

HomePage.propTypes = {
};
