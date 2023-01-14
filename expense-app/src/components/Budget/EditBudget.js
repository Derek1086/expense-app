import React, { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button/Button";

import classes from "./Budget.module.css";


const EditBudget = (props) => {
  const [value, setValue] = useState(props.budget);
  return (
    <Card className={classes.budget}>
      <input
        required="required"
        type="number"
        id="name"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button onClick={() => props.handleSaveClick(value)}>
        Save
      </Button>
    </Card>
  );
};

export default EditBudget;
