// React
import React from "react";

// 3rd Party
import classnames from "classnames";

//Components
import { Button } from "../Button";

// Styles
import styles from "./index.module.scss";

/** Component describtion */
function CreateBudget(props) {
  const dummyData = {
    income: 100,
    expenditure: 70,
    difference: 100 - 70,
  };

  const [header, setHeader] = React.useState("Monthly");
  const { income, expenditure, difference } = dummyData;
  return (
    <div>
      <div className={styles.headGrid}>
        <div className={classnames(styles.headCard, "secondary")}>
          <p className="bold size-5">Earn</p>
          <p className="bold size-3">
            £{header === "Weekly" && Math.round(income / 4)}
            {header === "Monthly" && income}
            {header === "Annualy" && Math.round(income * 12)}
          </p>
          <div className="row center">
            <p
              onClick={() => setHeader("Weekly")}
              className={classnames(
                header === "Weekly" && "bold",
                "mh-2 pointerCursor"
              )}
            >
              Weekly
            </p>
            <p
              onClick={() => setHeader("Monthly")}
              className={classnames(
                header === "Monthly" && "bold",
                "mh-2 pointerCursor"
              )}
            >
              Monthly
            </p>
            <p
              onClick={() => setHeader("Annualy")}
              className={classnames(
                header === "Annualy" && "bold",
                "mh-2 pointerCursor"
              )}
            >
              Annualy
            </p>
          </div>
        </div>
        <div className={classnames(styles.headCard, "tertiary textWhite")}>
          <p className="bold size-5">
            Spend &nbsp;&nbsp;({(expenditure / income) * 100}%)
          </p>
          <p className="bold size-3">
            £{header === "Weekly" && Math.round(expenditure / 4)}
            {header === "Monthly" && expenditure}
            {header === "Annualy" && Math.round(expenditure * 12)}
          </p>
          <div className="row center">
            <p
              onClick={() => setHeader("Weekly")}
              className={classnames(
                header === "Weekly" && "bold",
                "mh-2 pointerCursor"
              )}
            >
              Weekly
            </p>
            <p
              onClick={() => setHeader("Monthly")}
              className={classnames(
                header === "Monthly" && "bold",
                "mh-2 pointerCursor"
              )}
            >
              Monthly
            </p>
            <p
              onClick={() => setHeader("Annualy")}
              className={classnames(
                header === "Annualy" && "bold",
                "mh-2 pointerCursor"
              )}
            >
              Annualy
            </p>
          </div>
        </div>
        <div className={classnames(styles.headCard, "quaternary textWhite")}>
          <p className="bold size-5">
            Save&nbsp;&nbsp;({(difference / income) * 100}%)
          </p>
          <p className="bold size-3">
            £{header === "Weekly" && Math.round(difference / 4)}
            {header === "Monthly" && difference}
            {header === "Annualy" && Math.round(difference * 12)}
          </p>
          <div className="row center">
            <p
              onClick={() => setHeader("Weekly")}
              className={classnames(
                header === "Weekly" && "bold",
                "mh-2 pointerCursor"
              )}
            >
              Weekly
            </p>
            <p
              onClick={() => setHeader("Monthly")}
              className={classnames(
                header === "Monthly" && "bold",
                "mh-2 pointerCursor"
              )}
            >
              Monthly
            </p>
            <p
              onClick={() => setHeader("Annualy")}
              className={classnames(
                header === "Annualy" && "bold",
                "mh-2 pointerCursor"
              )}
            >
              Annualy
            </p>
          </div>
        </div>
      </div>
      <div className={styles.forms}>
        <div className={classnames(styles.formCard, "card alignStart")}>
          <p className="size-4 mb-4">Earn</p>
          <div className="row mb-2">
            <input className="input mr-2" />
            <input
              className={classnames(styles.numberInput, "input mr-3")}
              type="number"
            />
            <Button icon="fas fa-times textTertiary size-3 pointerCursor" />
          </div>

          <br />
          <Button
            primary
            label="Add row"
            iconRight="fas fa-plus pointerCursor"
          />
          <br />
          <br />
          <Button tertiary label="Save" />
          <br />
          <br />
          <hr />
          <p className="bold">Total : £100</p>
        </div>
      </div>
    </div>
  );
}

export { CreateBudget };
