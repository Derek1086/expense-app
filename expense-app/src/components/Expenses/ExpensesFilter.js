import React from "react";

import classes from "./ExpensesFilter.module.css";

const ExpensesFilter = (props) => {
  const dropdownChangeHandlerMonth = (event) => {
    props.onChangeFilterMonth(event.target.value);
  };

  return (
    <div className={classes["expenses-filter"]}>
      <div className={classes["expenses-filter__control"]}>
        <label>Filter by month:</label>
        <select value={props.selectedMonth} onChange={dropdownChangeHandlerMonth}>
          <option value="January">Jan</option>
          <option value="February">Feb</option>
          <option value="March">Mar</option>
          <option value="April">Apr</option>
          <option value="May">May</option>
          <option value="June">Jun</option>
          <option value="July">Jul</option>
          <option value="August">Aug</option>
          <option value="September">Sep</option>
          <option value="October">Oct</option>
          <option value="November">Nov</option>
          <option value="December">Dec</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
