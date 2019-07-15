import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Fetch(props) {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    query().then((res) => {
      setData(data);
    }).catch((e) => {
      setError(e);
    });
  }, []);

  return (
    <>
      {props.render({ error, data })}
    </>
  )
}

Fetch.propTypes = {
  query: PropTypes.func,
  render: PropTypes.func,
};
