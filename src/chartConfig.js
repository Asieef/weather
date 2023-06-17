export const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      backgroundColor: "#fff",
      borderColor: "#5F9EA0",
      data: [40, 38, 40, 37, 42, 43, 40],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};
