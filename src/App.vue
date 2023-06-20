<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import ApexCharts from 'apexcharts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import { Bar } from "vue-chartjs";
import * as chartConfig from "./chartConfig.js";
import * as barConfig from "./barConfig.js";
import * as sunConfig from "./sunConfig.js";
import * as donutConfig from "./donutConfig.js";


const temp = ref(0);
const type = ref(null);
const icon = ref('./src/assets/main_clear.png');
const bgvideo = ref('./src/assets/clear.mp4');
const secondicon = ref('./src/assets/second_clear.png');
const data = ref(null);
const error = ref(null);
const wind = ref(null);
const humidity = ref(null);
const visibility = ref(null);
const feels = ref(null);
const uv = ref([]);
const condition_text = ref(null);
const pressure = ref(null);
const wind_dir = ref(null);
const sunrise = ref(null);
const sunset = ref(null);
const currDiffValue = ref(null);
const sundiff = ref(null);
const currSunPos = ref([]);
const foreCast = ref(null);
const filterForcast = ref([]);

fetch('http://api.openweathermap.org/data/2.5/forecast?lat=23.8103&lon=90.4125&appid=8b45b895d7edc8b009174de9a74d6213&units=metric')
  .then((res) => res.json())
  .then((json) => {
    foreCast.value = json.list;
    const latestDateTimesByDate = {};

    json.list.forEach(di => {
      let dateKey = di.dt_txt.substring(0, 10);
      //console.log(dateKey);
      if (!latestDateTimesByDate[dateKey] || di.dt_txt > latestDateTimesByDate[dateKey].dt_txt) {
        latestDateTimesByDate[dateKey] = di;
      }
    });
    Object.keys(latestDateTimesByDate).forEach(key => filterForcast.value.push(latestDateTimesByDate[key]));
  });

fetch('http://api.weatherapi.com/v1/current.json?key=025d1754d6bf41768cc45730231206&q=dhaka')
  .then((res) => res.json())
  .then((json) => {
    uv.value = json.current.uv;
    condition_text.value = json.current.condition.text;
    wind_dir.value = json.current.wind_dir;
  });

fetch('https://api.openweathermap.org/data/2.5/weather?lat=23.8103&lon=90.4125&appid=8b45b895d7edc8b009174de9a74d6213&units=metric')
  .then((res) => res.json())
  .then((json) => {
    temp.value = Math.round(json.main.temp);
    feels.value = Math.round(json.main.feels_like);
    type.value = json.weather[0].description;
    wind.value = Math.round(json.wind.speed);
    humidity.value = json.main.humidity;
    visibility.value = json.visibility / 1000;
    pressure.value = json.main.pressure;
    sunrise.value = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunset.value = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // const diff = (json.sys.sunset.getTime() - json.sys.sunrise.getTime()) / 1000;
    sundiff.value = Math.ceil(((new Date(json.sys.sunset * 1000).getTime() - new Date(json.sys.sunrise * 1000).getTime()) / 1000) / 3600);
    currDiffValue.value = Math.ceil(new Date().getHours() - ((new Date(json.sys.sunrise * 1000).getTime() / 1000) / 3600) / 86400);
    currSunPos.value = Math.ceil(100 / (sundiff.value / currDiffValue.value));

    if (json.weather[0].icon == '09d' || json.weather[0].icon == '10d') {
      icon.value = './src/assets/main_heavy_rain.png',
        secondicon.value = './src/assets/second_rain.png',
        bgvideo.value = './src/assets/rain.mp4'
    }
    else if (json.weather[0].icon == '01d') {
      icon.value = './src/assets/main_clear.png',
        secondicon.value = './src/assets/second_clear.png',
        bgvideo.value = './src/assets/clear.mp4'
    }
    else if (json.weather[0].icon == '02d' || json.weather[0].icon == '03d' || json.weather[0].icon == '04d') {
      icon.value = './src/assets/main_few_cloud.png',
        secondicon.value = './src/assets/second_cloud.png',
        bgvideo.value = './src/assets/cloud.mp4'
    }

    else if (json.weather[0].icon == '11d') {
      icon.value = './src/assets/rain_icon.png',
        secondicon.value = './src/assets/second_thunder.png',
        bgvideo.value = './src/assets/thunder.mp4'
    }

    else if (json.weather[0].icon == '50d') {
      icon.value = './src/assets/main_haze.png',
        secondicon.value = './src/assets/second_haze.png',
        bgvideo.value = './src/assets/haze.mp4'
    }

    else if (json.weather[0].icon == '13d') {
      icon.value = './src/assets/main_mist.png',
        secondicon.value = './src/assets/second_mist.png',
        bgvideo.value = './src/assets/mist.mp4'
    }

  })
  .catch((err) => (error.value = err));


const getCurrent = function () {
  return data.weather[0].icon;
}

const getDate = new Date().toDateString();

const now = ref({});
function tick() {
  now.value = new Date().toLocaleTimeString();
  // console.log(now.value);
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
  Legend
);

onMounted(() => {
  chartConfig;
  barConfig;
  sunConfig;
  getCurrent;
  window.setInterval(tick, 1000);
});

const chartOptions = {
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

const sunChartOptions = {


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

</script>

<template>
  <div class="container mx-auto mt-10">
    <div class="grid grid-cols-4">
      <div class="col-span-1">
        <div class="">

          <div class="text-white max-w-xs my-auto mx-auto  rounded-xl relative">
            <video :key="bgvideo" autoplay loop muted class="-z-20 h-full w-full absolute object-cover rounded-xl">
              <source :src="bgvideo" type="video/mp4" />
            </video>

            <div class="z-30 p-4">
              <div class="flex justify-between">
                <div>
                  <img :src="icon" />
                  <p class="text-6xl font-bold">{{ temp }}&#8451;</p>
                </div>
              </div>
              <div class="mt-5 flex gap-2 items-center w-52">
                <img class="w-6" :src="secondicon" />
                <span class="text-sm text-gray-200 font-semibold">
                  {{ type }}
                </span>
              </div>
              <div class="mt-5 border-t border-gray-200">
                <div class="flex gap-2 pt-4">
                  <img class="w-4" src="./assets/location.png" />
                  <span class="text-xs text-gray-200 font-semibold">
                    Dhaka
                  </span>
                </div>
                <div class="flex gap-2 mt-2">
                  <img class="w-4" src="./assets/calendar.png" />
                  <span class="text-xs text-gray-200 font-semibold">
                    {{ getDate }}
                  </span>
                  <span class="text-xs font-bold"> {{ now }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3 text-white bg-gradient-to-r from-cyan-900 to-gray-500 p-4 py-5 px-5 rounded-xl">
        <p class="text-sm font-semibold">Today's Highlight</p>

        <div class="grid grid-cols-3 gap-4 mt-4">
          <div class="col-span-1 bg-black bg-opacity-10 rounded-xl py-2">
            <p class="text-sm text-gray-200 font-semibold px-4">Wind Status</p>
            <div class="h-[80px] px-4">
              <Line :data="chartConfig.data" :options="chartConfig.options" />
            </div>
            <div class="flex justify-between px-4">
              <div class="flex gap-1 items-end">
                <p class="text-4xl font-bold"> {{ wind }} </p>
                <span class="text-xs text-gray-400 font-semibold mb-1">km/h</span>
              </div>
              <div class="flex items-end">
                <p class="text-xs font-semibold text-gray-400 mb-1">{{ now }}</p>
              </div>
            </div>
          </div>

          <div class="col-span-1 bg-black bg-opacity-10 rounded-xl py-2">
            <p class="text-sm text-gray-200 font-semibold px-4">UV Index</p>
            <div class="h-[80px] px-4">
              <!-- <Bar :data="barConfig.data" :options="barConfig.options" /> -->

              <apexchart type="radialBar" :options="chartOptions" :series="[uv * 10]"></apexchart>
            </div>
            <div class="flex justify-center items-center px-4">
              <div class="flex gap-1 items-end">
                <p class="text-4xl font-bold">{{ uv }}.0</p>
                <span class="text-xs text-gray-400 font-semibold mb-1">uv </span>
              </div>
            </div>
          </div>
          <div class="col-span-1 bg-black bg-opacity-10 rounded-xl py-2">
            <p class="text-sm text-gray-200 font-semibold px-4"> Sunrise & Sunset</p>

            <div class="h-[80px] px-4">
              <apexchart type="radialBar" :options="sunChartOptions" :series="[currSunPos]"></apexchart>
            </div>
            <div class="flex justify-between px-4">
              <div class="px-2">
                <img class="w-4" src="./assets/sunrise_y.png" />
                <p class="text-xs font-semibold text-white mb-1">{{ sunrise }}</p>
              </div>
              <div class="px-2">
                <img class="w-4" src="./assets/sunset_y.png" />
                <p class="text-xs font-semibold text-white mb-1">{{ sunset }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 mt-2">
          <div class="col-span-1 bg-black bg-opacity-10 rounded-xl py-2 px-4">
            <div class="grid grid-cols-2">
              <div>
                <p class="text-xs text-gray-300 font-semibold">Humidity</p>
                <p class="text-2xl font-bold mt-2">
                  {{ humidity }}<span class="text-xs text-gray-300 font-semibold">%</span>
                </p>
              </div>
              <div class="mt-4">
                <img class="w-4" src="./assets/wind_dir.png" />
                <p class="text-xs text-gray-300 font-semibold">
                  Wind direction is {{ wind_dir }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-span-1 bg-black bg-opacity-10 rounded-xl py-2 px-4">
            <div class="grid grid-cols-2">
              <div>
                <p class="text-xs text-gray-300 font-semibold">Visibility</p>
                <p class="text-2xl font-bold mt-2">
                  {{ visibility }}<span class="text-xs text-gray-300 font-semibold"> km</span>
                </p>
              </div>
              <div class="mt-4">
                <img class="w-4" src="./assets/pressure.png" />
                <p class="text-xs text-gray-300 font-semibold">
                  Pressure is {{ pressure }}hPa
                </p>
              </div>
            </div>
          </div>
          <div class="col-span-1 bg-black bg-opacity-10 rounded-xl py-2 px-4">
            <div class="grid grid-cols-2">
              <div>
                <p class="text-xs text-gray-300 font-semibold">Feels Like</p>
                <div class="flex items-center">
                  <img class="h-6" src="./assets/thermo.png" />
                  <p class="text-2xl font-bold mt-2 mb-2">{{ feels }}&deg</p>
                </div>
              </div>
              <div class="mt-4">
                <img class="w-4" src="./assets/condition.png" />
                <p class="text-xs text-gray-300 font-semibold">
                  {{ condition_text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 mt-10">
      <div class="col-span-1">
        <div class="">
          <div
            class="text-white max-w-xs my-auto mx-auto bg-gradient-to-r from-cyan-600 to-gray-700 p-4 py-5 px-5 rounded-xl">
            <p class="text-sm font-semibold">5 days Forecast</p>
            <div v-for="(day, index) in filterForcast" :key="index">
              <div class="flex justify-between items-center mt-2">
                <img class="w-10" src="./assets/sun.png" />
                <p class=" text-white font-semibold text-lg">{{ day.main.temp_max }}&#8451/
                  <span class=" text-gray-300 font-semibold text-sm">{{ day.main.temp_min }}</span>
                </p>
                <p class=" text-gray-300 font-semibold text-xs">{{ day.dt_txt }}</p>
                <p class=" text-gray-300 font-semibold text-xs">Tuesday</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-3 text-white bg-gradient-to-r from-cyan-900 to-gray-500 p-4 py-5 px-5 rounded-xl">
        <p class="text-sm font-semibold">Weather conditon map</p>
        <div class=" mt-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.908814593184!2d90.4220142102161!3d23.79272668488235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70a7610d4f1%3A0x73d8f4d04735bc67!2sAmari%20Dhaka!5e0!3m2!1sen!2sbd!4v1681803147458!5m2!1sen!2sbd"
            width="100%" height="270" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>


