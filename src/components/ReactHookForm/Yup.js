// React
import React from "react";
import { useForm, Controller } from "react-hook-form";
//3rd party
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

//Components
import { Button } from "../Button";
// Styles
import styles from "./index.module.scss";

const Field = (props) => (
  <div className={styles.field}>
    <label className={styles.label}>{props.label}</label>
    {props.children}
    <p className="textTertiary mb-2">
      {props.errors ? props.errors.message : ""}
    </p>
  </div>
);

/** React Hooks Form example */
function Yup(props) {
  const { register, errors, handleSubmit, reset, watch } = useForm({
    mode: "onBlur",
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required("Email needed")
          .email("Not an email address"),
        password: yup
          .string()
          .required("Password required")
          .min(2, "Min 2 characters")
          .max(6, "Max 6 characters"),
        custom: yup
          .string()
          .test("custom", "Wrong answer", (value) => value === "4"),
        age: yup
          .number("A number please")
          .positive("Alive!")
          .integer("Real number!")
          .required("Enter an age")
          .oneOf([2, 5, 7, 36], "That is not correct"),
      })
    ),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <main>
      <header className="row center  mb-5">
        <h1 className="size-4 bold">Yup</h1>
      </header>
      <form className="flex-column" onSubmit={handleSubmit(onSubmit)}>
        <Field label="Email" errors={errors.email}>
          <input
            className={classnames(
              errors.exampleRequired && "borderTertiary",
              "input"
            )}
            name="email"
            ref={register}
          />
        </Field>
        <Field label="Password" errors={errors.password}>
          <input
            className={classnames(
              errors.exampleRequired && "borderTertiary",
              "input"
            )}
            name="password"
            ref={register}
          />
        </Field>
        <Field label="What is 2 + 2" errors={errors.custom}>
          <input
            className={classnames(
              errors.exampleRequired && "borderTertiary",
              "input"
            )}
            name="custom"
            ref={register}
          />
        </Field>
        <Field label="Enter age of a family member" errors={errors.age}>
          <input
            className={classnames(
              errors.exampleRequired && "borderTertiary",
              "input"
            )}
            name="age"
            type="number"
            ref={register}
          />
        </Field>
        <Button type="submit" tertiary size="large" label={"Submit"} />
      </form>
    </main>
  );
}

export { Yup };
