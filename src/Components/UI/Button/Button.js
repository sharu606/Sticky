import React from "react";
import classes from "./Button.module.css";

function Button(props) {
  const classname = classes.button + " " + props.className;

  return (
    <button className={classname} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
