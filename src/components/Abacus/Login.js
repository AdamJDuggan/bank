// React
import React, { useEffect } from "react";

//Redux
import AuthStore from "../../store/AuthStore";
import { useDispatch } from "react-redux";

//Hooks
import useFormValidation2 from "../../hooks/useFormValidation2";

//3rd Party
import classnames from "classnames";

//Components
import { Button } from "../Button";

/** Component describtion */
// TODO: Turn of html inout noValidation
// TODO: rename to on from handle
// Have fileds object which you pass validation rules which get mapped through
// Config in - Fields out
// Better to read off object name not hard tpe name="email" to get match

function Login(props) {
  const dispatch = useDispatch();
  //Toggle whether to show login or register functionality
  const [login, toggleLogin] = React.useState(true);
  //Set initial state for this form
  //const INITIAL_STATE = { name: "", email: "", password: "" };
  const INITIAL_STATE2 = {
    email: { name: "email", value: "" },
    password: {
      name: "password",
      value: "",
      validation: {
        required: "Please enter a pasword!!!!",
        minLength: [2, "MIN LENGTH OF 2!"],
      },
    },
  };

  const [firebaseError, setFirebaseError] = React.useState(null);

  const authenticateUser = async () => {
    try {
      login
        ? await dispatch(AuthStore.login(values))
        : await dispatch(AuthStore.register(values));
    } catch (err) {
      setFirebaseError(err.message);
    }
  };

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting,
  } = useFormValidation2(INITIAL_STATE2, authenticateUser);

  return (
    <form onSubmit={handleSubmit} className="flex-column ">
      <p className="mb-7 size-5">{login ? "Login" : "Register"}</p>
      {!login && (
        <input
          name="name"
          value={values.name}
          // name={values.name.name}
          // value={values.name.value}
          onBlur={handleBlur}
          onChange={handleChange}
          type="text"
          className={classnames(errors.name && "borderTertiary", "input")}
          placeholder="Name"
        />
      )}
      {!login && (
        <p className="textTertiary mb-2">{errors.name ? errors.name : ""}</p>
      )}

      <input
        name="email"
        value={values.email}
        // name={values.email.name}
        // value={values.email.value}
        type="email"
        onBlur={handleBlur}
        autoComplete="off"
        onChange={handleChange}
        className={classnames(errors.email && "borderTertiary", "input")}
        placeholder="Email"
      />
      <p className="textTertiary mb-2">{errors.email ? errors.email : ""}</p>

      <input
        name="password"
        value={values.password}
        // name={values.password.name}
        // value={values.password.value}
        onBlur={handleBlur}
        onChange={handleChange}
        autoComplete="off"
        type="password"
        className={classnames(errors.password && "borderTertiary", "input")}
        placeholder="Password"
      />
      <p className="textTertiary mb-2">
        {errors.password ? errors.password : ""}
      </p>
      <p className="textTertiary mb-2">{firebaseError ? firebaseError : ""}</p>

      <Button
        value={values.password}
        disabled={isSubmitting}
        type="submit"
        tertiary
        size="large"
        label={login ? "Login" : "Sign Up"}
      />
      <p
        onClick={() => toggleLogin(!login)}
        className="mt-5  size-2 pointerCursor underline"
      >
        {login ? "Do not have an account?" : "Already have an account?"}
      </p>
    </form>
  );
}

export { Login };
