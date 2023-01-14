import React from "react";

import ExpenseItem from "./ExpenseItem";

import classes from "./ExpensesList.module.css";

const ExpensesList = (props) => {
  if (props.items.length === 0) {
    return (
      <h2 className={classes["expenses-list__fallback"]}>
        Found no expenses for {props.month}.
      </h2>
    );
  }

  let expenses = [];
  props.items.map((expense) => {
    expenses.push(expense);
    return expenses;
  });

  expenses.sort(function(a, b) {
    return a.date - b.date;
  });

  return (
    <ul className={classes["expenses-list"]}>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          id={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          onDelete={props.onDeleteItem}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
