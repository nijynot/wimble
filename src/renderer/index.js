import React from 'react';
import ReactDOM from 'react-dom';

import App from './views/App';
import HomePage from './views/pages/Home/HomePage';
require('./views/reset.css');
require('./views/index.scss');

ReactDOM.render(
  <App />,
  document.getElementById('react-root')
);
