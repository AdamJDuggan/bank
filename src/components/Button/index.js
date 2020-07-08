// React
import React from "react";

// 3rd Party
import classnames from "classnames";

// Styles
import styles from "./index.module.scss";

function Button(props) {
  const hasPadding = (props.padding || props.label) && !props.noPadding;
  return (
    <button
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
      disabled={props.disabled}
      className={classnames(
        styles.button,
        props.className,
        hasPadding && styles.padding,
        props.primary && styles.primary,
        props.secondary && styles.secondary,
        props.tertiary && styles.tertiary,
        props.disabled && styles.disabled,
        props.size && styles[props.size]
      )}
    >
      {props.label}
    </button>
  );
}

export { Button };
