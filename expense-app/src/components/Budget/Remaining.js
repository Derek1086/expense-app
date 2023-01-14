import classes from "./Remaining.module.css";

import Card from "../UI/Card";

const Remaining = (props) => {
  const totalExpenses = props.expenseItems.reduce((total, item) => {
    return (total = total + item.amount);
  }, 0);

  const alert = totalExpenses > props.budget ? "remaining-alert" : "remaining";

  const remaining = props.budget - totalExpenses;

  return (
    <Card className={classes[alert]}>
      <span>Remaining: ${remaining.toFixed(2)}</span>
    </Card>
  );
};

export default Remaining;
