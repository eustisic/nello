import React from 'react';
import { DateTime } from "luxon";

const Action = ({action}) => {
  let dt = DateTime.fromISO(action.createdAt).toLocaleString()
  
  return (
    <li>
      <div className="member-container">
        <div className="card-member small-size">VR</div>
      </div>
      <p>
        <span className="member-name">Victor Reyes</span> {action.description}
        <small>{dt}</small>
      </p>
    </li>
  )
}

export default Action;