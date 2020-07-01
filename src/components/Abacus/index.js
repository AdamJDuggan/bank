// React
import React from "react";

//Redux
import AuthStore from "../../store/AuthStore";

//Hooks
import { useForm } from "../../hooks/useForm";

//3rd Party
import classnames from "classnames";

//Components
import { Button } from "../Button";

const Login = (props) => {
  const [login, toggleLogin] = React.useState(true);
  const [values, handleChange] = useForm({ email: "", password: "" });

  console.log(values);

  return (
    <div className="flex-column ">
      <p className="mb-7 size-5">{login ? "Login" : "Register"}</p>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        type="email"
        className="input mb-5"
        placeholder="Email"
      />
      <input
        name="password"
        value={values.password}
        onChange={handleChange}
        type="password"
        className="input mb-7"
        placeholder="Password"
      />
      <Button
        value={values.password}
        onChange={handleChange}
        onClick={() => AuthStore.login(values)}
        tertiary
        size="large"
        label={login ? "Login" : "Sign Up"}
      />
      <p
        onClick={(prevState) => toggleLogin(!prevState)}
        className="mt-5  size-2 pointerCursor underline"
      >
        {login ? "Do not have an account?" : "Already have an account?"}
      </p>
    </div>
  );
};

const Budget = () => {
  return (
    <div>
      {/* Header */}
      <div className="row center">
        <p className="size-5 ">Isaac Duggan</p>
      </div>
      <div className="grid">
        <div className="secondary">
          <p className="bold size-5">Earn</p>
          <p className="bold size-3">Monthly: 2000</p>
          <div className="row center">
            <p className={classnames("mh-2 pointerCursor")}>Weekly</p>
            <p className={classnames("mh-2 pointerCursor")}>Monthly</p>
            <p className={classnames("mh-2 pointerCursor")}>Annualy</p>
          </div>
        </div>
        <div className="tertiary textWhite">
          <p className="bold size-5">Spend (70%)</p>
          <p className="bold size-3">Monthly: 2000</p>
          <div className="row center">
            <p className={classnames("mh-2 pointerCursor")}>Weekly</p>
            <p className={classnames("mh-2 pointerCursor")}>Monthly</p>
            <p className={classnames("mh-2 pointerCursor")}>Annualy</p>
          </div>
        </div>
        <div className="quaternary textWhite">
          <p className="bold size-5">Save (30%)</p>
          <p className="bold size-3">Monthly: 2000</p>
          <div className="row center">
            <p className={classnames("mh-2 pointerCursor")}>Weekly</p>
            <p className={classnames("mh-2 pointerCursor")}>Monthly</p>
            <p className={classnames("mh-2 pointerCursor")}>Annualy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Component */
function Abacus(props) {
  return (
    <main className="center  p-4">
      <header className="row">
        <p className="size-5 bold  ">Abacus</p>
      </header>
      <Login />
      {/* <Budget /> */}
    </main>
  );
}

Abacus.propTypes = {
  /**  */
};

export { Abacus };
