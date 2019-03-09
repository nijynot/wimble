import React from 'react';

require('./Route.scss');

export default function Route(props) {
  return (
    <div className="Route">
      {props.children}
    </div>
  )
}
