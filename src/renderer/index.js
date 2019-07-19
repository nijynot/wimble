import React from 'react';
import ReactDOM from 'react-dom';
import { remote } from 'electron';
import fs from 'fs-extra';

import App from './views/App';
import HomePage from './views/pages/Home/HomePage';
require('./views/reset.css');
require('./views/index.scss');

fs.pathExists(`/${remote.app.getPath('home')}/.wimble/main/wallet_data/wallet.seed`, (err, exists) => {
  if (err) console.error(err);
  ReactDOM.render(
    <App wallet={exists} />,
    document.getElementById('react-root')
  );
});
