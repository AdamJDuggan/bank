// React
import React from "react";

// Components

/** Component describtion */
function Fetch(props) {
  return (
    <main className="center">
      <header className="row tertiary pv-2 ph-5 mb-5">
        <h1 className="size-5 bold textWhite ">Fetch</h1>
      </header>
      <section className="row p-2">
        <input className="input" type="text" />
      </section>
    </main>
  );
}

Fetch.propTypes = {
  /**  */
};

export { Fetch };
