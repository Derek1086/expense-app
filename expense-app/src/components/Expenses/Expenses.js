import React, { useState, useContext, useEffect } from "react";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpenseForm from "../NewExpense/ExpenseForm";
import NewExpense from "../NewExpense/NewExpense";
import PieChart from "../Chart/PieChart";

import Budget from "../Budget/Budget";
import EditBudget from "../Budget/EditBudget";
import Remaining from "../Budget/Remaining";
import Total from "../Budget/Total";
import { BudgetContext } from "../context/budget-context";

import classes from "./Expenses.module.css";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    try {
      const fetchExpenses = async () => {
        const response = await fetch(
          "https://react-practice-9e728-default-rtdb.firebaseio.com/expenses.json"
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();

        const loadedExpenses = [];

        for (const key in data) {
          loadedExpenses.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount,
            date: new Date(data[key].date),
          });
        }
        setExpenses(loadedExpenses);
      };

      fetchExpenses();
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const { budget, dispatch } = useContext(BudgetContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (value) => {
    dispatch({
      type: "SET_BUDGET",
      payload: value,
    });
    setIsEditing(false);
  };

  const [formIsShown, setFormIsShown] = useState(false);

  const showFormHandler = () => {
    setFormIsShown(true);
  };

  const hideFormHandler = () => {
    setFormIsShown(false);
  };

  const [filteredMonth, setFilteredMonth] = useState("January");

  const filterChangeHandlerMonth = (selectedMonth) => {
    setFilteredMonth(selectedMonth);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return month[expense.date.getMonth()] === filteredMonth;
  });

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  const deleteItemHandler = (expenseId) => {
    setExpenses((prevExpense) => {
      const updatedExpenses = prevExpense.filter(
        (expense) => expense.id !== expenseId
      );
      return updatedExpenses;
    });
  };

  const totalExpenses = filteredExpenses.reduce((total, item) => {
    return (total = total + item.amount);
  }, 0);

  return (
    <div>
      {formIsShown && (
        <ExpenseForm
          onAddExpense={addExpenseHandler}
          onCancel={hideFormHandler}
        />
      )}
      <Card className={classes.expenses}>
        <ExpensesFilter
          selectedMonth={filteredMonth}
          onChangeFilterMonth={filterChangeHandlerMonth}
        />
        <div className={classes.mainbody}>
          <div className={classes.manager}>
            {isEditing ? (
              <EditBudget handleSaveClick={handleSaveClick} budget={budget} />
            ) : (
              <Budget handleEditClick={handleEditClick} budget={budget} />
            )}
            <Remaining budget={budget} expenseItems={filteredExpenses} />
            <Total expenseItems={filteredExpenses} />
          </div>
          <div className={classes.pie}>
            {!error && <PieChart
              data={filteredExpenses}
              month={filteredMonth}
              remaining={budget - totalExpenses}
            />}
            {error && <p>{error}</p>}
          </div>
          <div className={classes.list}>
            <ExpensesList
              items={filteredExpenses}
              month={filteredMonth}
              onDeleteItem={deleteItemHandler}
            />
            <NewExpense
              onShowForm={showFormHandler}
              onHideForm={hideFormHandler}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Expenses;
