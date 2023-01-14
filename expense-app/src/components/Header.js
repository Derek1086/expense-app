import classes from "./Header.module.css";

import github from "./github.png";

const Header = () => {
  const openWindow = () => {
    window.open("https://github.com/Derek1086/React-Budget-Manager/blob/main/README.md", "_blank", "noreferrer");
  };

  return (
    <div className={classes.head}>
      <h1>Click "Add New Expense" to add an expense</h1>
      <img onClick={openWindow} className={classes.logo} src={github} alt="Github" />
      <h1>Click on the expense item to remove it</h1>
    </div>
  );
};

export default Header;
