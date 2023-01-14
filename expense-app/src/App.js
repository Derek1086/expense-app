import { BudgetProvider } from "./components/context/budget-context";
import Expenses from "./components/Expenses/Expenses";
import Header from "./components/Header";

const App = () => {
  return (
    <BudgetProvider>
      <Header />
      <Expenses />
    </BudgetProvider>
  );
};

export default App;
