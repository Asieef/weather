export const data = {
  labels: ["Sunrise", "", "", "", "Sunset"],
  datasets: [
    {
      backgroundColor: "#fcc42c",
      borderColor: "#fcc42c",
      data: [1.01, 0, 0, 0, 1.06],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      //   display: false,
      ticks: {
        color: "#fcc42c",
      },
      borderColor: "#fcc42c",
    },
    y: {
      display: false,
      ticks: {
        color: "#fcc42c",
      },
      borderColor: "#fcc42c",
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
