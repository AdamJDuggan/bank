// React
import React, { useEffect } from "react";

//Redux
import AuthStore from "../../store/AuthStore";
import BudgetStore from "../../store/BudgetStore";

import { useDispatch, useSelector } from "react-redux";

//3rd Party
import classnames from "classnames";

//Components
import { Button } from "../Button";
import { Login } from "./Login";
import { BudgetForm } from "./BudgetForm";
import { Loading } from "../Loading";
import { Header } from "./Header";

/** Component */
function Abacus(props) {
  const { id, name, isLoggedIn } = useSelector((state) => state.auth);
  const budget = useSelector((state) => state.budget);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AuthStore.watch());
    dispatch(BudgetStore.get(id));
  }, [id]);

  const getBudget = () => dispatch(BudgetStore.get(id));

  const saveBudget = (budget) => dispatch(BudgetStore.save(budget));

  return (
    <>
      {/* <Loading /> */}

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
          {isLoggedIn ? (
            <>
              <hr />
              <Header budget={budget} />
              <hr />

              <BudgetForm
                budget={budget}
                saveBudget={saveBudget}
                id={id}
                name={name}
              />
            </>
          ) : (
            <Login />
          )}
        </div>
      </main>
    </>
  );
}

export { Abacus };
