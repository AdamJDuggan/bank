// React
import React from "react";
//Hooks
import useForm from "../../hooks/useForm";
//3rd party
import classnames from "classnames";
//Components
import { Button } from "../Button";

/** Component describtion */
function UseFormHook(props) {
  const formFields = {
    email: { name: "email", value: "" },
    password: {
      name: "password",
      value: "",
      validation: {
        required: "Please enter a pasword",
        minLength: [2],
        maxLength: [6, "Password must be no more than six characters"],
      },
    },
    test: {
      name: "test",
      value: "",
      validation: {
        custom: (value) => (value !== 4 ? "Wrong answer" : null),
      },
    },
  };

  const submit = () => {
    if (!errors) alert("Successful submission");
  };

  const {
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting,
    formProps,
  } = useForm(formFields, submit);

  return (
    <main className="center p-4">
      <header className="row mb-5">
        <h1 className="size-5 bold ">useForm Hook</h1>
      </header>
      <form {...formProps}>
        <input
          name="email"
          value={values.email}
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
          type="password"
          onBlur={handleBlur}
          autoComplete="off"
          onChange={handleChange}
          className={classnames(errors.password && "borderTertiary", "input")}
          placeholder="Password"
        />
        <p className="textTertiary mb-2">
          {errors.password ? errors.password : ""}
        </p>
        <br />
        <p>What is 2 + 2?</p>
        <input
          name="test"
          value={values.test}
          type="test"
          onBlur={handleBlur}
          autoComplete="off"
          onChange={handleChange}
          className={classnames(errors.test && "borderTertiary", "input")}
          placeholder=""
        />
        <p className="textTertiary mb-2">{errors.test ? errors.test : ""}</p>
        <Button
          value={values.password}
          disabled={isSubmitting}
          type="submit"
          tertiary
          size="large"
          label={"Submit"}
        />
      </form>
    </main>
  );
}

export { UseFormHook };
