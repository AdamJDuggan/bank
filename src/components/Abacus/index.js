// React
import React, { useEffect } from "react";

//Redux
import AuthStore from "../../store/AuthStore";
import { useDispatch, useSelector } from "react-redux";

//3rd Party
import classnames from "classnames";

//Components
import { Button } from "../Button";
import { Login } from "./Login";
import { Budget } from "./Budget";

/** Component */
function Abacus(props) {
  const { name, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AuthStore.watch());
  }, [dispatch]);

  return (
    <main className="p-4">
      <div className="row">
        <p className="size-5 bold">Abacus Express</p>
        <div className="pull-right" />

        {isLoggedIn && (
          <Button
            styles={"has-text-primary"}
            onClick={() => dispatch(AuthStore.logout())}
            size="large"
            label="Logout"
          />
        )}
      </div>

      <div className="center">
        {isLoggedIn ? <Budget name={name} /> : <Login />}
      </div>
    </main>
  );
}

export { Abacus };
