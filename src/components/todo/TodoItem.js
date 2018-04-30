import PropTypes from "prop-types";
import React from "react";

export const TodoItem = props => {
  return (
    <li>
      <input type="checkbox" defaultChecked={props.isComplete} />
      {props.name}
    </li>
  );
};

TodoItem.propTypes = {
  name: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  id: PropTypes.number.isRequired
};
