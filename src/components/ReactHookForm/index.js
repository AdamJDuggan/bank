// React
import React from "react";
import { useForm, Controller } from "react-hook-form";
//3rd party
import classnames from "classnames";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Components
import { Standard } from "./Standard";
import { Yup } from "./Yup";
// Styles
import styles from "./index.module.scss";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** React Hooks Form example */
function ReactHookForm(props) {
  return (
    <main className="center secondary p-4">
      <header className="row  mb-5">
        <h1 className="size-5 bold ">React Hook Form</h1>
      </header>
      {/* <Standard /> */}
      <Yup />
    </main>
  );
}

export { ReactHookForm };
