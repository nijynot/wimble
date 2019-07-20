exports.app = (function() {
  if (typeof window === 'undefined') {
    return require('electron').app;
  } else {
    return require('electron').remote.app;
  }
})();
