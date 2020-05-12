import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function SaveBtn(props) {
  return (
    <span className="save-btn btn btn-success" {...props} role="button" tabIndex="0">
      save
    </span>
  );
}
export function DeleteBtn(props) {
  return (
    <span className="delete-btn" {...props} role="button" tabIndex="0">
      remove ✗
    </span>
  );
}
