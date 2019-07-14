import querystring from 'querystring';

export const animationPaths = {
  zoomInZoomOut: [
  ],
  zoomInFadeOut: [
    '/send',
  ],
  fadeInFadeOut: [
    '/tx',
    '/tx/:id',
    '/finalize',
  ],
};

export const animations = {
  zoomInZoomOut: {
    config: {
      mass: 1,
      tension: 450,
      friction: 40,
      velocity: 5,
    },
    from: {
      background: 'white',
      zIndex: 10000,
      position: 'absolute',
      opacity: 0,
      transform: 'scale(1.15)',
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)',
    },
    leave: {
      opacity: 0,
      transform: 'scale(1.15)',
    },
  },
  zoomInFadeOut: {
    config: {
      mass: 1,
      tension: 450,
      friction: 40,
      velocity: 5,
    },
    from: {
      background: 'white',
      zIndex: 10000,
      position: 'absolute',
      opacity: 0,
      transform: 'scale(1.15)',
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)',
    },
    leave: (item) => {
      if (item.transition === 'zoom') {
        return {
          opacity: 0,
          transform: 'scale(1.15)',
        };
      } else if (item.transition === 'fade') {
        return {
          opacity: 0,
        };
      } else {
        return {
          opacity: 0,
        };
      }
    },
  },
  fadeInFadeOut: {
    config: {
      mass: 1,
      tension: 400,
      friction: 40,
      velocity: 5,
    },
    from: {
      background: 'white',
      zIndex: 10000,
      position: 'absolute',
      transform: 'scale(1)',
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: (item) => {
      if (item.transition === 'fade') {
        return {
          opacity: 0,
        };
      } else if (item.transition === 'zoom') {
        return {
          opacity: 0,
          transform: 'scale(1.15)',
        };
      } else {
        return {
          opacity: 0,
        };
      }
    },
  },
  springIn: {
    from: {
      position: 'relative',
      opacity: 0,
      bottom: '-24px',
      transform: 'scale(0.97)',
    },
    to: {
      opacity: 1,
      transform: 'scale(1)',
      bottom: '0px',
    },
  }
};
