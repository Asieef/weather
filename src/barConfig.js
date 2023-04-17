export const data = {
  labels: ["UV"],
  datasets: [
    {
      backgroundColor: "#5F9EA0",
      borderColor: "#fff",
      data: [5, 6, 2, 3, 4, 1],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
      ticks: {
        color: "#fff",
      },
      borderColor: "#fff",
    },
    y: {
      ticks: {
        color: "#fff",
      },
      borderColor: "#fff",
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
