import { Fragment } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
  let arrLabels = [];
  let arrData = [];
  if (props.data && props.data.length > 0) {
    let remaining = props.remaining;
    if (remaining > 0) {
      arrData.push(remaining);
      arrLabels.push("Remaining");
    }
    props.data.map((expense) => {
      arrLabels.push(expense.title);
      arrData.push(expense.amount);
      return arrLabels;
    });
  } else {
    return null;
  }

  return (
    <Fragment>
      <Pie
        data={{
          labels: arrLabels,
          datasets: [
            {
              label: "",
              data: arrData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(255, 159, 64, 0.5)",
                "rgba(255, 132, 99, 0.5)",
                "rgba(54, 235, 162, 0.5)",
                "rgba(255, 86, 206, 0.5)",
                "rgba(192, 192, 192, 0.5)",
                "rgba(153, 255, 102, 0.5)",
                "rgba(255, 64, 159, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 132, 99, 1)",
                "rgba(54, 235, 162, 1)",
                "rgba(255, 86, 206, 1)",
                "rgba(192, 192, 192, 1)",
                "rgba(153, 255, 102, 1)",
                "rgba(255, 64, 159, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Budget",
            },
          },
        }}
      />
    </Fragment>
  );
};

export default PieChart;
