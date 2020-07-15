// React
import React from "react";

// 3rd Party
import classnames from "classnames";

//Components
import { Button } from "../Button";

// Styles
import styles from "./index.module.scss";

/** Component describtion */
function BudgetForm(props) {
  const [budget, setBudget] = React.useState({
    uid: props.id,
    income: props.budget.income || [{ id: 1, name: "", value: null }],
    expenditure: props.budget.expenditure || [{ id: 1, name: "", value: null }],
  });

  const updateBudget = () => {
    setBudget({
      uid: props.id,
      income: props.budget.income || [{ id: 1, name: "", value: null }],
      expenditure: props.budget.expenditure || [
        { id: 1, name: "", value: null },
      ],
    });
  };

  React.useEffect(() => {
    updateBudget();
  }, [props.budget]);

  const addRow = (type) => {
    if (type === "income") {
      setBudget((prevBudget) => ({
        ...prevBudget,
        income: [
          ...prevBudget.income,
          { id: budget.income.length + 1, name: "", value: null },
        ],
      }));
    }
    if (type === "expenditure") {
      setBudget((prevBudget) => ({
        ...prevBudget,
        expenditure: [
          ...prevBudget.expenditure,
          { id: budget.expenditure.length + 1, name: "", value: null },
        ],
      }));
    }
  };

  const removeRow = (id, type) => {
    if (type === "income") {
      setBudget((prevBudget) => ({
        ...prevBudget,
        income: budget.income.filter((i) => i.id !== id),
      }));
    }
    if (type === "expenditure") {
      setBudget((prevBudget) => ({
        ...prevBudget,
        expenditure: budget.expenditure.filter((i) => i.id !== id),
      }));
    }
  };

  const updateIncomeRow = (id, name, value) => {
    const index = budget.income.findIndex((source) => source.id === id);
    const updatedBudget = [...budget.income];
    updatedBudget[index] = { id, name, value };
    setBudget((prev) => ({ ...prev, income: updatedBudget }));
  };

  const updateExpenditureRow = (id, name, value) => {
    const index = budget.expenditure.findIndex((source) => source.id === id);
    const updatedBudget = [...budget.expenditure];
    updatedBudget[index] = { id, name, value };
    setBudget((prev) => ({ ...prev, expenditure: updatedBudget }));
  };

  const rowSum = (type) => {
    let sources = [];
    if (type === "income")
      budget.income.map((source) => {
        if (source.value) sources.push(Number(source.value));
      });
    else if (type === "expenditure")
      budget.expenditure.map((source) => {
        if (source.value) sources.push(Number(source.value));
      });
    const sum = Math.round(sources.reduce((a, b) => a + b, 0));
    return sum;
  };
  const expenditureSum = () => {
    let sources = [];
    budget.expenditure.map((source) => sources.push(parseInt(source.value)));
    const sum = sources.reduce((a, b) => a + b, 0);
    return sum;
  };

  const saveBudget = () => props.saveBudget(budget);
  return (
    <div className="mv-4">
      <h3>Budget Form</h3>
      <div className={styles.forms}>
        <div className={classnames(styles.formCard, "card alignStart")}>
          <p className="size-4 mb-4">Monthly Income</p>
          {budget.income.map((source, index) => (
            <div key={index} className="row mb-2">
              <input
                onChange={(e) =>
                  updateIncomeRow(source.id, e.target.value, source.value)
                }
                defaultValue={source.name}
                className={classnames(styles.textInput, "input mr-2")}
              />
              <input
                className={classnames(styles.numberInput, "input mr-3")}
                type="number"
                pattern="^\d*(\.\d{0,2})?$"
                defaultValue={source.value}
                onChange={(e) =>
                  updateIncomeRow(source.id, source.name, e.target.value)
                }
              />
              <Button
                onClick={() => removeRow(source.id, "income")}
                icon="fas fa-times textTertiary size-3 pointerCursor"
              />
            </div>
          ))}

          <br />
          <Button
            onClick={() => addRow("income")}
            primary
            label="Add row"
            iconRight="fas fa-plus pointerCursor"
          />
          <br />
          <br />
          <br />
          <br />
          <hr />
          <p className="bold">Total : £{rowSum("income")}</p>
        </div>

        <div className={classnames(styles.formCard, "card alignStart")}>
          <p className="size-4 mb-4">Monthly Expenditure</p>
          {budget.expenditure.map((source, index) => (
            <div key={index} className="row mb-2">
              <input
                onChange={(e) =>
                  updateExpenditureRow(source.id, e.target.value, source.value)
                }
                defaultValue={source.name}
                className={classnames(styles.textInput, "input mr-2")}
              />
              <input
                className={classnames(styles.numberInput, "input mr-3")}
                type="number"
                pattern="^\d*(\.\d{0,2})?$"
                defaultValue={source.value}
                onChange={(e) =>
                  updateExpenditureRow(source.id, source.name, e.target.value)
                }
              />
              <Button
                onClick={() => removeRow(source.id, "expenditure")}
                icon="fas fa-times textTertiary size-3 pointerCursor"
              />
            </div>
          ))}

          <br />
          <Button
            onClick={() => addRow("expenditure")}
            primary
            label="Add row"
            iconRight="fas fa-plus pointerCursor"
          />
          <br />
          <br />
          <br />
          <br />
          <hr />
          <p className="bold">Total : £{rowSum("expenditure")}</p>
        </div>
      </div>
      <div className=" row center mt-10"></div>
      <Button onClick={saveBudget} tertiary size="large" label="Save" />
    </div>
  );
}

export { BudgetForm };
