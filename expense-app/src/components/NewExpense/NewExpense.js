import classes from "./NewExpense.module.css";

import Button from "../UI/Button/Button";

const NewExpense = (props) => {
  return (
    <div className={classes["new-expense"]}>
      <Button onClick={props.onShowForm}>Add New Expense</Button>
    </div>
  );
};

export default NewExpense;
