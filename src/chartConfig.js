export const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "",
      backgroundColor: "#fff",
      data: [40, 30, 40, 40, 50, 40, 40],
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
};
