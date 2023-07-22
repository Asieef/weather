export const chartOptions = {
  theme: {
    monochrome: {
      enabled: true,
      color: '#5F9EA0',
      shadeTo: 'light',
      shadeIntensity: 0.65
    }
  },

  chart: {
    type: 'radialBar',
    colors: ['#fff'],
    offsetY: -20,
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      background: '#bbb',
      endAngle: 90,

      track: {
        strokeWidth: '10%',
        margin: 5, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          color: '#999',
          opacity: 1,
          blur: 4
        }
      },
      dataLabels: {
        enabled: true,
        name: {
          show: true
        },
        value: {
          offsetY: -2,
          fontSize: '22px',
          show: false
        }
      }
    }
  },
  grid: {
    padding: {
      top: -10
    }
  },
  fill: {
    type: 'gradient',

    gradient: {
      shade: 'light',
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 5, 7, 9]
    },
  },
  labels: [''],
}
