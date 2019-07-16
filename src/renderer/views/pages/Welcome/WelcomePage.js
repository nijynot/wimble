import React from 'react';

import Wimble from 'svg/Wimble';
require('./WelcomePage.scss');

export default function WelcomePage() {
  return (
    <div className="Welcome">
      <Wimble />
      <h2>
        Welcome to <br />
        Wimble
      </h2>
    </div>
  );
}
