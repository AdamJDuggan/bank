import React from "react";

//This is function to test each field
const checkErrors = (config, values) => {
  //Array of errors
  const errors = {};
  //For each field in config
  Object.values(config).forEach((field) => {
    const { name, validation } = field;

    //Deal with email
    if (name === "email") {
      if (!values.email) errors.email = "Email required";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
        errors.email = "Invalid email address";
    }
    //Deal with password
    else if (name === "password") {
      if (!values.password) errors.password = "Password required";
      else if (
        validation &&
        validation.minLength &&
        values[name].length < validation.minLength[0]
      )
        errors.password =
          validation.minLength[1] ||
          "Field must be at least" + validation.minLength[0] + "long!";
      else if (
        validation &&
        validation.maxLength &&
        values[name].length < validation.maxLength[0]
      )
        errors.password =
          validation.maxLength[1] ||
          "Field must be at least" + validation.maxLength[0] + "long!";
    }
    //Deal with other fields (not email or password) and see if required or min-max rules exist
    else {
      //If this field is marked as required and the value with same name is empty then populate the errors object with thr passed in error message or defualt to "Field is required!!"
      if (validation.required && !values[name])
        errors[name] = validation.required || "Field is required!!";
      else if (
        validation.minLength &&
        values[name].length < validation.minLength[0]
      )
        errors[name] =
          validation.minLength[1] ||
          "Field must be at least" + validation.minLength[0] + "long";
      else if (
        validation.maxLength &&
        values[name].length > validation.maxLength[0]
      )
        errors[name] =
          validation.maxLength[1] ||
          "Field must be no more than" + validation.minLength[0] + "long";
    }
  });
  return errors;
};

function useFormValidation(config, authenticate) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        authenticate();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  React.useEffect(() => {
    //useRef on config- does ref = config?
    //JSON.stringify to check if config
    //for every field in the config- check what is currently stored then update then add config to deps
    //run js
    const newObj = {};
    Object.keys(config).forEach((key) => (newObj[key] = config[key].value));
    setValues(newObj);
  }, []);

  function handleChange(event) {
    event.persist();
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  }

  function handleBlur() {
    const validationErrors = checkErrors(config, values);
    setErrors(validationErrors);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = checkErrors(config, values);
    setErrors(validationErrors);
    setSubmitting(true);
    console.log({ values });
  }

  return {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting,
  };
}

export default useFormValidation;
