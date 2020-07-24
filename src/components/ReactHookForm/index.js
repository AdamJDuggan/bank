// React
import React from "react";
import { useForm } from "react-hook-form";
//3rd party
import classnames from "classnames";
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
function ReactHookForm(props) {
  const { register, errors, handleSubmit, reset } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => console.log(data);
  const streetFighter = (value) =>
    value === "karin" || value === "chunli" || value === "ryu";
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  React.useEffect(() => {
    setTimeout(() => {
      reset({
        async: "Data",
      });
    }, 2000);
  }, [reset]);

  return (
    <main className="center secondary p-4">
      <header className="row  mb-5">
        <h1 className="size-5 bold ">React Hook Form</h1>
      </header>
      <form className="flex-column" onSubmit={handleSubmit(onSubmit)}>
        <Field label="Email" errors={errors.email}>
          <input
            className={classnames(
              errors.exampleRequired && "borderTertiary",
              "input"
            )}
            name="email"
            ref={register({
              required: "An email is required",
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
        </Field>
        <Field label="Between 2 and 6 characters" errors={errors.number}>
          <input
            className={classnames(
              errors.exampleRequired && "borderTertiary",
              "input"
            )}
            name="number"
            ref={register({
              required: "Please enter a number",
              minLength: {
                value: 2,
                message: "Min length is 2",
              },
              maxLength: {
                value: 6,
                message: "Max length is 6",
              },
            })}
          />
        </Field>
        <Field
          label="Custom: Who is the greatest Street Fighter character?"
          errors={errors.custom}
        >
          <input
            className={classnames(
              errors.exampleRequired && "borderTertiary",
              "input"
            )}
            name="custom"
            ref={register({
              validate: (input) => input.toLowerCase() === "karin",
            })}
          />
        </Field>
        <Field
          label="Custom2: Name one of top 3 Street Fighter characters?"
          errors={errors.custom2}
        >
          <input
            className={classnames(
              errors.exampleRequired && "borderTertiary",
              "input"
            )}
            name="custom2"
            ref={register({
              validate: (input) => streetFighter(input),
            })}
          />
        </Field>
        <Field
          label="Async: field populates after 2 seconds..."
          errors={errors.async}
        >
          <input
            className={classnames(
              errors.exampleRequired && "borderTertiary",
              "input"
            )}
            ref={register}
            name="async"
          />
        </Field>
        <Field
          label="Async2: field takes 2 seconds to validate..."
          errors={errors.async2}
        >
          <input
            className={classnames(
              errors.exampleRequired && "borderTertiary",
              "input"
            )}
            ref={register({
              validate: async (value) => {
                await sleep(3000);
                return value === "async2";
              },
            })}
            name="async2"
          />
        </Field>
        <Button type="submit" tertiary size="large" label={"Submit"} />
      </form>
    </main>
  );
}

export { ReactHookForm };
