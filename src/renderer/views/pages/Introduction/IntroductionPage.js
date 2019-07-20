import React from 'react';

import Wimble from 'svg/Wimble';
require('./IntroductionPage.scss');

export default function IntroductionPage() {
  return (
    <div className="Introduction">
      <Wimble />
      <h2>
        Your wallet has<br />
        been created!
      </h2>
      <p>
        Enjoy Wimble and Grin.<br />
      </p>
      <span className="Introduction_contact">
        For any bugs or suggestions, please file issues at the nijynot/wimble repo on GitHub.
      </span>
    </div>
  );
}
