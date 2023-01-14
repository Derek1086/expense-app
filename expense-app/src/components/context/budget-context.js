import { createContext, useReducer } from "react";

export const BudgetContext = createContext();

const BudgetReducer = (state, action) => {
  switch (action.type) {
    case "SET_BUDGET":
      return {
        ...state,
        budget: action.payload,
      };
    default:
      return state;
  }
};

export const BudgetProvider = (props) => {
  const initialState = {
    budget: 2000,
    remaining: 2000,
  };

  const [state, dispatch] = useReducer(BudgetReducer, initialState);
  return (
    <BudgetContext.Provider
      value={{
        budget: state.budget,
        remaining: state.remaining,
        dispatch,
      }}
    >
      {props.children}
    </BudgetContext.Provider>
  );
};
