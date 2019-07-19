exports.app = (function() {
  if (typeof window === 'undefined') {
    return require('electron').app;
  } else {
    return require('electron').remote.app;
  }
})();

// exports.app = {
//   app: (typeof window === 'undefined') ? require('electron').app : require('electron').remote.app,
// };
