let threeDate = new Date(new Date().getTime() + (-2 * 24 * 60 * 60 * 1000));
let endDate = threeDate.toISOString().split('T')[0];
let toDaysDate = new Date().toISOString().split('T')[0];
let middle = new Date((new Date()).valueOf() - 1000 * 3600 * 24).toISOString().split('T')[0];

var dateObj = new Date();
var day = dateObj.getUTCDate();
console.log(day);

export const chartOptions = {
  chart: {
    type: 'line',
    zoom: {
      enabled: false
    },
    toolbar: {
      show: false,
      tools: {
        download: false
      }
    },
    selection: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  grid: {
    row: {
      colors: ['#ffffff', 'red'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {
    categories: [endDate, '', '', middle, '', '', toDaysDate, '', ''],
  }
}


