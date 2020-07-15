// React
import React from "react";

// 3rd Party
import classnames from "classnames";

//Components
import { Button } from "../Button";

// Styles
import styles from "./index.module.scss";

/** Component describtion */
function Header(props) {
  const sum = (data) => {
    if (data) {
      let incomeSources = [];
      data.map((source) => {
        if (source.value) incomeSources.push(Number(source.value));
      });
      return Math.round(incomeSources.reduce((a, b) => a + b, 0));
    }
  };
  let income = sum(props.budget.income);
  let expenditure = sum(props.budget.expenditure);
  let difference = income - expenditure;

  const [header, setHeader] = React.useState("Monthly");
  if (props.budget)
    return (
      <div className="mv-4">
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
              Spend &nbsp;&nbsp;({Math.round((expenditure / income) * 100)}%)
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
              Save&nbsp;&nbsp;({Math.round((difference / income) * 100)}%)
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
      </div>
    );
}

export { Header };
