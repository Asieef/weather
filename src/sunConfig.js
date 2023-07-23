export const ChartOptions = {
  theme: {
    monochrome: {
      enabled: true,
      color: '#fcc42c',
      shadeTo: 'light',
      shadeIntensity: 0.65
    }
  },

  chart: {
    type: 'radialBar',
    offsetY: -20,
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      background: '#bbb',
      endAngle: 90,
      inverseOrder: true,
      offsetX: 0,
      offsetY: 0,

      hollow: {
        margin: 5,
        size: '65%',
        background: 'transparent',
        image: undefined,
        imageWidth: 150,
        imageHeight: 150,
        imageOffsetX: 0,
        imageOffsetY: 0,
        imageClipped: true,
        position: 'front',
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 3,
          opacity: 0.5
        },
      },

      track: {
        strokeWidth: '5%',
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
    colors: undefined,
    opacity: 0.9,
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: "horizontal",
      shadeIntensity: 0.5,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 0, 0],
      colorStops: []
    },

    image: {
      src: ['./assets/senset.png'],
      width: 10,
      height: 10
    },
  },
  stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'round',
    colors: undefined,
    width: 2,
    dashArray: 0,
  },
  labels: [''],
}