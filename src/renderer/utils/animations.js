import querystring from 'querystring';

export const animationPaths = [
  '/result',
  '/result/:id',
  '/tx',
  '/txs',
  '/tx/:id',
  '/finalize',
  '/send',
  '/receive',
  '/welcome',
  '/seed',
  '/introduction',
  '/restore',
  '/settings',
  '/password',
];

const fade = {
  enter: {
    opacity: 1,
  },
  leave: {
    opacity: 0,
  },
};

const zoom = {
  enter: {
    opacity: 1,
    transform: 'scale(1)',
  },
  leave: {
    opacity: 0,
    transform: 'scale(1.15)',
  },
};

export const animations = {
  animation: {
    config: {
      mass: 1,
      tension: 400,
      friction: 40,
      velocity: 5,
    },
    from: (item) => {
      const scale = (item.state && item.state.scale) ? item.state.scale : '1';
      return {
        background: 'white',
        zIndex: 10000,
        position: 'absolute',
        opacity: 0,
        transform: `scale(${scale})`,
      };
    },
    enter: (item) => {
      if (item.state && item.state.enter === 'zoom') {
        return zoom.enter;
      } else {
        return fade.enter;
      }
    },
    leave: (item) => {
      if (item.state && item.state.leave === 'zoom') {
        return zoom.leave;
      } else {
        return fade.leave;
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
  },
  standardSlideInFromBottom: {
    from: {
      opacity: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      position: 'absolute',
      bottom: '-58px',
    },
    to: {
      opacity: 1,
      left: '50%',
      transform: 'translateX(-50%)',
      position: 'absolute',
      bottom: '0px',
    },
  },
};
