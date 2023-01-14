import classes from "./Budget.module.css";

import Button from "../UI/Button/Button";
import Card from "../UI/Card";

const Budget = (props) => {
  return (
    <Card className={classes.budget}>
      <span>Budget: ${props.budget}</span>
      <Button onClick={props.handleEditClick}>Edit</Button>
    </Card>
  );
};

export default Budget;
