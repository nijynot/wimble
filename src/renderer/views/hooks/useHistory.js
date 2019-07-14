export default function useHistory(history) {
  const { push, ...rest } = history;
  return {
    push: (pathname, state) => {
      history.replace(history.location.pathname, state);
      setImmediate(() => {
        history.push(pathname, state);
      });
    },
    ...rest,
  };
};
