// React
import React from "react";
import { useForm } from "react-hook-form";

//3rd party
import classnames from "classnames";
//Components
import { Button } from "../Button";

/** Component describtion */
function ReactHookForm(props) {
  const { register, errors, handleSubmit, reset } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => console.log(data);
  const isKarin = (value) => value.toLowerCase() === "karin";
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  React.useEffect(() => {
    // you can do async server request and fill up form
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
        <label>Email</label>
        <input
          className={classnames(
            errors.exampleRequired && "borderTertiary",
            "input"
          )}
          name="email"
          ref={register({
            required: "An email is required",
          })}
        />
        <p className="textTertiary mb-2">
          {errors.email ? errors.email.message : ""}
        </p>
        <br />
        <label>Between 2 and 6 characters</label>
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
        <p className="textTertiary mb-2">
          {errors.number ? errors.number.message : ""}
        </p>
        <br />
        <label>Custom: Who is the greatest Street Fighter character?</label>
        <input
          className={classnames(
            errors.exampleRequired && "borderTertiary",
            "input"
          )}
          name="custom"
          ref={register({
            required: "Please enter a character",
            validate: (input) => isKarin(input), // returns true if valid
          })}
        />

        <p className="textTertiary mb-2">
          {errors.custom ? "Wrong character" : ""}
        </p>
        <br />
        <label>Async: field populates after 2 seconds...</label>
        <input
          className={classnames(
            errors.exampleRequired && "borderTertiary",
            "input"
          )}
          ref={register}
          name="async"
        />
        <br />
        <label>Async2: field takes 2 seconds to validate...</label>
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
        <p className="textTertiary mb-2">
          {errors.async2 ? "Type async2 to pass" : ""}
        </p>
        <br />
        <Button type="submit" tertiary size="large" label={"Submit"} />
      </form>
    </main>
  );
}

export { ReactHookForm };
