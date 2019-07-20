import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { withRouter } from 'react-router-dom';

import grin from 'client/grin';
import { animations } from 'utils/animations';
import Wimble from 'svg/Wimble';
import Close from 'svg/Close';
import TransactionCard from 'components/TransactionCard';
require('./ResultPage.scss');

function ResultPage({ match, ...props }) {
  const [tx, setTx] = useState(null);
  const spring = useSpring({ delay: 400, ...animations.springIn });

  useEffect(() => {
    let id;
    if (match && typeof match.params.id === 'string' && match.params.id.length === 36) {
      grin.wallet.retrieveTxs(null, id).then((res) => {
        setTx(res.reverse()[0]);
      });
    } else {
      id = match && match.params.id || null;
      grin.wallet.retrieveTxs(parseInt(id, 10)).then((res) => {
        setTx(res.reverse()[0]);
      });
    }
  }, []);

  return (
    <div className="ResultPage">
      <Wimble />
      <Close onClick={props.close} />
      <animated.div style={spring}>
        <TransactionCard tx={tx} hint="" />
      </animated.div>
    </div>
  );
}
export default withRouter((props) => <ResultPage {...props} />);

ResultPage.propTypes = {
  id: PropTypes.string.isRequired,
  close: PropTypes.func,
};
