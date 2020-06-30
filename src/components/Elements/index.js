// React
import React from "react";

// Components

/** Component describtion */
function Elements(props) {
  return (
    <main className="center tertiary p-4">
      <header className="row mb-5">
        <h1 className="size-5 bold textWhite ">Elements</h1>
      </header>
      <section className="card white m-5">
        <h3 className="size-3 bold mt-5">Flex Nav row</h3>
        <div className="row pv-3 ph-2">
          <div className=" bold secondary card flex1">
            Flex1 class fills space
          </div>
          <div className="ml-2 bold secondary  card">Remaining space</div>
        </div>
      </section>
      <section className="card white m-5">
        <h3 className="size-3 bold ">Grid breaks on tablet</h3>
        <div className="grid">
          <div className="card secondary">Card</div>
          <div className="card secondary">Card</div>
          <div className="card secondary">Card</div>
        </div>
      </section>
      <section className="card white m-5">
        <h3 className="size-3 bold ">Tile breaks on mobile</h3>
        <div className="tile secondary center">
          <div className="tileElement secondary">TileElement</div>
          <div className="tileElement secondary">TileElement</div>
        </div>
      </section>
    </main>
  );
}

Elements.propTypes = {
  /**  */
};

export { Elements };
