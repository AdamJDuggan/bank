// React
import React from "react";

// Styles
import styles from "./index.module.scss";

/** Component describtion */
function Loading(props) {
  return (
    <main className={styles.loadingPage}>
      <header className={styles.loadingText}>
        <h1 className="size-6 bold textWhite">Loading</h1>
      </header>
    </main>
  );
}

Loading.propTypes = {
  /**  */
};

export { Loading };
