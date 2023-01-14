import { useContext } from "react";

import Modal from "../UI/Modal";
import useInput from "../hooks/use-input";
import { BudgetContext } from "../context/budget-context";
import { v4 as uuidv4 } from "uuid";

import Button from "../UI/Button/Button";

import classes from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  const { dispatch } = useContext(BudgetContext);

  const {
    value: enteredName,
    hasError: nameHasError,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAmount,
    hasError: amountHasError,
    isValid: enteredAmountIsValid,
    valueChangeHandler: amountChangeHandler,
    valueBlurHandler: amountBlurHandler,
    reset: resetAmount,
  } = useInput((value) => value.trim() !== "" && +value > 0);

  const {
    value: enteredDate,
    hasError: dateHasError,
    isValid: enteredDateIsValid,
    valueChangeHandler: dateChangeHandler,
    valueBlurHandler: dateBlurHandler,
    reset: resetDate,
  } = useInput((value) => new Date(value).toString() !== "Invalid Date");

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let dateEntry = new Date(enteredDate);
    dateEntry = new Date(dateEntry.getTime() + dateEntry.getTimezoneOffset() * 60000)

    const expenseData = {
      id: uuidv4(),
      title: enteredName,
      amount: +enteredAmount,
      date: dateEntry,
    };

    dispatch({
      type: "ADD_EXPENSE",
      payload: expenseData,
    });

    saveExpenseDataHandler(expenseData);
    resetName();
    resetAmount();
    resetDate();
    props.onCancel();
  };

  return (
    <Modal onCancel={props.onCancel}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div>
          <div
            className={`${classes.control} ${
              !nameHasError ? "" : classes.invalid
            }`}
          >
            <label>Name</label>
            <input
              type="text"
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
            {nameHasError && <p>Please enter a valid name</p>}
          </div>
          <div
            className={`${classes.control} ${
              !amountHasError ? "" : classes.invalid
            }`}
          >
            <label>Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={enteredAmount}
              onChange={amountChangeHandler}
              onBlur={amountBlurHandler}
            />
            {amountHasError && <p>Please enter a valid amount</p>}
          </div>
          <div
            className={`${classes.control} ${
              !dateHasError ? "" : classes.invalid
            }`}
          >
            <label>Date</label>
            <input
              type="date"
              min="2023-01-01"
              max="2023-12-31"
              value={enteredDate}
              onChange={dateChangeHandler}
              onBlur={dateBlurHandler}
            />
            {dateHasError && <p>Please enter a valid date</p>}
          </div>
        </div>
        <div className={classes.actions}>
          <Button type="button" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              !(
                enteredNameIsValid &&
                enteredAmountIsValid &&
                enteredDateIsValid
              )
            }
          >
            Add Expense
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ExpenseForm;
