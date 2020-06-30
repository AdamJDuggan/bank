import React from "react";
import { Link } from "react-router-dom";

// Components
import { Sport } from "../Sport";
import { Elements } from "../Elements";
import { Hooks } from "../Hooks";
import { Abacus } from "../Abacus";

// Routes
import routes from "../../routes/routes";

// Styles
import styles from "./index.module.scss";

/** Component describtion */
function Home(props) {
  return (
    <main className="center">
      <div className="grid gapless">
        <Link className="noDecoration" to={routes.SPORT}>
          <section>
            <Sport />
          </section>
        </Link>
        <Link className="noDecoration" to={routes.ABACUS}>
          <section>
            <Abacus />
          </section>
        </Link>
        <Link className="noDecoration" to={routes.HOOKS}>
          <section>
            <Hooks />
          </section>
        </Link>
        <Link className="noDecoration" to={routes.ELEMENTS}>
          <section>
            <Elements />
          </section>
        </Link>
      </div>
    </main>
  );
}

export { Home };
