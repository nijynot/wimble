import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { withRouter } from 'react-router-dom';

import grin from 'client/grin';
import { animations } from 'utils/animations';
import Wimble from 'svg/Wimble';
import Back from 'svg/Back';
import TransactionCard from 'components/TransactionCard';
require('./TransactionPage.scss');

function TransactionPage({ id, match, ...props }) {
  const [tx, setTx] = useState(null);
  const spring = useSpring({ delay: 100, ...animations.springIn });

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
    <div className="TransactionPage">
      <Wimble />
      <Back onClick={props.back} />
      <animated.div style={spring}>
        <TransactionCard tx={tx} hint="" />
      </animated.div>
    </div>
  );
}
export default withRouter((props) => <TransactionPage {...props} />);

TransactionPage.propTypes = {
  id: PropTypes.string.isRequired,
  back: PropTypes.func,
};
