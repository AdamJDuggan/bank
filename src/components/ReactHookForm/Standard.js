// React
import React from "react";
import { useForm, Controller } from "react-hook-form";
//3rd party
import classnames from "classnames";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const streetFighter = (value) =>
  value === "karin" || value === "chunli" || value === "ryu"
    ? null
    : "Wrong choice";

const normalizeCardNumber = (value) => {
  return (
    value
      .replace(/\s/g, "")
      .match(/.{1,4}/g)
      .join(" ")
      .substr(0, 19) || ""
  );
};

/** React Hooks Form example */
function Standard(props) {
  const { register, errors, handleSubmit, reset, control, watch } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => console.log(data);

  React.useEffect(() => {
    setTimeout(() => {
      reset({
        async: "Data",
      });
    }, 2000);
  }, [reset]);

  const dateReceived = watch("date");
  console.log(dateReceived);

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
            //defaultValue="adamduggan17@gmail.com"
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
            defaultValue="3"
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
              validate: (input) =>
                input.toLowerCase() === "karin" ? null : "Wrong character",
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
                if (value !== "async2") return "Write out async2";
              },
            })}
            name="async2"
          />
        </Field>
        <Field label="Credit Card Number" errors={errors.cardNumber}>
          <input
            className={classnames(
              errors.exampleRequired && "borderTertiary",
              "input"
            )}
            placeholder="0000 0000 0000 0000"
            inputMode="numeric"
            id="cardNumber"
            ref={register}
            name="cardNumber"
            onChange={(event) => {
              const { value } = event.target;
              event.target.value = normalizeCardNumber(value);
            }}
          />
        </Field>
        <Field label="Enter a date" errors={errors.date}>
          <Controller
            as={
              <ReactDatePicker
                dateFormat="d MMM yyyy"
                className={styles.input}
                minDate={new Date()}
                selected={
                  dateReceived?.value ? new Date(dateReceived.value) : null
                }
                showTimeSelect={false}
                todayButton="Today"
                dropdownMode="select"
                isClearable
                placeholderText="Click to select time"
                shouldCloseOnSelect
              />
            }
            errors={errors.date}
            control={control}
            register={register({
              required: "Please enter a date",
              validate: (value) =>
                value ===
                "Tue Jul 28 2020 00:00:00 GMT+0100 (British Summer Time)"
                  ? null
                  : "Not today",
            })}
            name="date"
            onChange={([selected]) => {
              return { date: selected };
            }}
          />
        </Field>
        <Button type="submit" tertiary size="large" label={"Submit"} />
      </form>
    </main>
  );
}

export { Standard };
