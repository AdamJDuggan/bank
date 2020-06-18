// React
import React from "react";

// 3rd Party
import PropTypes from "prop-types";
import classnames from "classnames";

// Styles
import styles from "./index.module.scss";

function Button(props) {
  const hasPadding = (props.padding || props.label) && !props.noPadding;
  return (
    <button
      onClick={props.onClick}
      className={classnames(
        styles.button,
        hasPadding && styles.padding,
        props.primary && styles.primary,
        props.secondary && styles.secondary,
        props.disabled && styles.disabled
      )}
    >
      {props.label}
    </button>
  );
}

Button.defaultProps = {};

Button.propTypes = {};

export { Button };
