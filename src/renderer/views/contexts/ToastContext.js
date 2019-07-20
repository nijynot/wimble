import React from 'react';

const ToastContext = React.createContext({
  toasts: [],
  push: () => {},
  // clear: () => {},
  // remove: () => {},
});
export default ToastContext;
