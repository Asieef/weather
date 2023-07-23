let threeDate = new Date(new Date().getTime() + -2 * 24 * 60 * 60 * 1000);
let endDate = threeDate.toISOString().split("T")[0];
let toDaysDate = new Date().toISOString().split("T")[0];
let middle = new Date(new Date().valueOf() - 1000 * 3600 * 24)
  .toISOString()
  .split("T")[0];

var dateObj = new Date();
var day = dateObj.getUTCDate();
console.log(day);

export const chartOptions = {
  maintainAspectRatio: false,

  theme: {
    mode: "light",
    palette: "palette4",
  },

  tooltip: {
    enabled: false,
  },
  chart: {
    type: "line",
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
      tools: {
        download: false,
      },
    },
    selection: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  grid: {
    show: false,
  },
  xaxis: {
    categories: [, "", "", , "", "", , "", ""],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    lines: {
      show: false,
    },
  },
};
