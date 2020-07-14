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
  const [budget, setBudget] = React.useState({
    uid: props.id,
    income: props.budget.income || [{ id: 1, name: "", value: null }],
    expenditure: props.budget.expenditure || [{ id: 1, name: "", value: null }],
  });

  React.useEffect(() => {}, [props.budget]);

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
    const updatedBudget = { ...budget };
    updatedBudget.income[index] = { id, name, value };
    setBudget(updatedBudget);
    console.log(budget);
  };

  const updateExpenditureRow = (id, name, value) => {
    const newRow = budget.expenditure.find((i) => i.id === id);
    newRow.name = name;
    newRow.value = value;
  };

  const createBudget = () => props.createBudget(budget);
  return (
    <div>
      <div className={styles.forms}>
        <div className={classnames(styles.formCard, "card alignStart")}>
          <p className="size-4 mb-4">Income</p>
          {budget.income.map((source, index) => (
            <div key={index} className="row mb-2">
              <input
                onChange={(e) =>
                  updateIncomeRow(source.id, e.target.value, source.value)
                }
                defaultValue={source.name}
                className="input mr-2"
              />
              <input
                className={classnames(styles.numberInput, "input mr-3")}
                type="number"
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
          <p className="bold">Total : £100</p>
        </div>

        <div className={classnames(styles.formCard, "card alignStart")}>
          <p className="size-4 mb-4">Expenditure</p>
          {budget.expenditure.map((source, index) => (
            <div key={index} className="row mb-2">
              <input
                onChange={(e) =>
                  updateExpenditureRow(source.id, e.target.value, source.value)
                }
                defaultValue={source.name}
                className="input mr-2"
              />
              <input
                className={classnames(styles.numberInput, "input mr-3")}
                type="number"
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
          <p className="bold">Total : £100</p>
        </div>
      </div>
      <div className=" row center mt-10"></div>
      <Button
        // onClick={() => props.CreateBudget(budget)}
        onClick={createBudget}
        tertiary
        size="large"
        label="Save"
      />
    </div>
  );
}

export { CreateBudget };
