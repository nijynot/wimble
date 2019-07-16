import React from 'react';
import { withRouter } from 'react-router-dom';

import Wimble from 'svg/Wimble';
import Back from 'svg/Back';
require('./RestorePage.scss');

function RestorePage(props) {
  return (
    <div className="Restore">
      <Wimble />
      <Back onClick={() => props.history.goBack()} />
      <h2>Restore wallet</h2>
      <p>Enter your recovery phrase.</p>
      <textarea
        className="Restore_textarea"
        placeholder="Enter your seed phrase..."
      ></textarea>
      <div className="Restore_hint">
        Separate each word by a space.<br />
        The recovery phrase should be 24- or 12 words.
      </div>
    </div>
  );
}
export default withRouter((props) => <RestorePage {...props} />);
