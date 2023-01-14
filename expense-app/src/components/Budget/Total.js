import classes from "./Total.module.css";

import Card from "../UI/Card";

const Total = (props) => {
  const total = props.expenseItems.reduce((total, item) => {
    return (total += item.amount);
  }, 0);

  return (
    <Card className={classes.total}>
      <span>Total Spent: ${total.toFixed(2)}</span>
    </Card>
  );
};

export default Total;
