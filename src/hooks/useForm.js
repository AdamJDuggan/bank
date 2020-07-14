import React from "react";

//This is function to test each field
const checkErrors = (config, values) => {
  //Array of errors
  const errors = {};
  //For each field in config...
  Object.values(config).forEach((field) => {
    //pull out its name (string) amd validation rules (object)
    const { name, validation } = field;
    //First provide this test for email fields
    if (
      name === "email" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    )
      errors.email = "Invalid email address";
    //If there is an object of validation rules..
    if (validation) {
      //the 2nd test is required. If required is set to true return the hardcoded response message, otherwise if a string return the string passed in
      if (validation.required && !values[name])
        errors[name] =
          typeof validation.required === "string"
            ? validation.required
            : "This field is required";
      //the 3rd test looks for a min length. if the value of the input field (being tracked in useState) is less than the minLength[0] then return the custom minLength error message. If no message was passed in then return the hardcoded one below
      else if (
        validation.minLength &&
        values[name].length < validation.minLength[0]
      )
        errors[name] =
          validation.minLength[1] ||
          "Field must be at least" + validation.minLength[0] + "long";
      //Same for max length
      else if (
        validation.maxLength &&
        values[name].length > validation.maxLength[0]
      )
        errors[name] =
          validation.maxLength[1] ||
          "Field must be no more than" + validation.minLength[0] + "long";
      //If there is a custom function passed into the validation for this field then run it and if it resolves (ie does not return null) put that returned error message in the error state
      else if (validation.custom) {
        const result = validation.custom(name);
        if (result) errors[name] = result;
      }
    }
  });
  //Return errors
  return errors;
};

function useForm(config, authenticate) {
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

export default useForm;
