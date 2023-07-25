<script setup>
import { ref, onMounted } from "vue";

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
import * as chartConfig from "./chartConfig.js";
import * as barConfig from "./barConfig.js";
import * as sunConfig from "./sunConfig.js";
import * as donutConfig from "./donutConfig.js";
import * as windChart from "./windChart.js";
import * as uvChart from "./uvChart.js";


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
const filterForcast = ref([]);
const windday11 = ref(null);
const windday12 = ref(null);
const windday13 = ref(null);
const windday21 = ref(null);
const windday22 = ref(null);
const windday23 = ref(null);
const windday31 = ref(null);
const windday32 = ref(null);
const windday33 = ref(null);
const windHistory = ref([]);
const condition = ref([]);

fetch('https://api.weatherapi.com/v1/forecast.json?key=025d1754d6bf41768cc45730231206&q=dhaka&days=3')
  .then((res) => res.json())
  .then((json) => {
    filterForcast.value = json.forecast.forecastday;
  });

function getDayName(dateStr, locale) {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: 'long' });
}

let threeDate = new Date(new Date().getTime() + (-2 * 24 * 60 * 60 * 1000));
let endDate = threeDate.toISOString().split('T')[0];
let toDaysDate = new Date().toISOString().split('T')[0];


fetch('https://api.weatherapi.com/v1/history.json?key=025d1754d6bf41768cc45730231206&q=dhaka&aqi=yes&dt=' + endDate + '&end_dt=' + toDaysDate)
  .then((res) => res.json())
  .then((json) => {
    windday11.value = json.forecast.forecastday[0].hour[0].wind_kph;
    windday12.value = json.forecast.forecastday[0].hour[7].wind_kph;
    windday13.value = json.forecast.forecastday[0].hour[15].wind_kph;
    windday21.value = json.forecast.forecastday[1].hour[0].wind_kph;
    windday22.value = json.forecast.forecastday[1].hour[7].wind_kph;
    windday23.value = json.forecast.forecastday[1].hour[15].wind_kph;
    windday31.value = json.forecast.forecastday[2].hour[0].wind_kph;
    windday32.value = json.forecast.forecastday[2].hour[7].wind_kph;
    windday33.value = json.forecast.forecastday[2].hour[15].wind_kph;
    windHistory.value = [{
      data: [windday11.value, windday12.value, windday13.value, windday21.value, windday22.value, windday23.value, windday31.value, windday32.value, windday33.value]
    }];
    condition.value = json.forecast.forecastday[1].hour;
  });

fetch('https://api.weatherapi.com/v1/current.json?key=025d1754d6bf41768cc45730231206&q=dhaka&aqi=yes')
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
};


</script>

<template>
  <div class="container mx-auto lg:mt-10">
    <div class="grid lg:grid-cols-4">
      <div class="col-span-1">
        <div class="text-white max-w-xs my-auto mx-auto  lg:rounded-xl relative">
          <video :key="bgvideo" autoplay loop muted class="-z-20 h-full w-full absolute object-cover lg:rounded-xl">
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
      <div class="lg:col-span-3 text-white bg-gradient-to-r from-cyan-900 to-gray-500 p-4 py-5 px-5 lg:rounded-xl">
        <p class="text-sm font-semibold">Today's Highlight</p>
        <div class="grid lg:grid-cols-3 gap-4 mt-4">
          <div class="col-span-1 bg-black bg-opacity-10 rounded-xl py-2">
            <p class="text-sm text-gray-200 font-semibold px-4">Wind Status</p>
            <div class="h-[80px] px-4">
              <apexchart type="line" height="110" :options="windChart.chartOptions" :series="windHistory"></apexchart>
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
              <apexchart type="radialBar" :options="uvChart.chartOptions" :series="[uv * 10]"></apexchart>
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

            <div class="h-[80px] px-4 py-2">
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

        <div class="grid lg:grid-cols-3 gap-4 mt-2">
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

    <div class="grid lg:grid-cols-4 lg:mt-10">
      <div class="col-span-1">
        <div class="">
          <div
            class="text-white max-w-xs my-auto mx-auto bg-gradient-to-r from-gray-700 to-gray-500 p-4 py-5 px-5 lg:rounded-xl">
            <p class="text-sm font-semibold">Weather Forecast</p>
            <div v-for="(day, index) in filterForcast" :key="index">
              <div class="grid grid-cols-4 mt-2 items-center justify-items-center">
                <img class="w-10 col-span-1" :src="day.day.condition.icon" />
                <p class=" col-span-1 text-white font-semibold text-lg">{{ Math.round(day.day.maxtemp_c) }}&#8451/
                  <span class=" text-gray-300 font-semibold text-sm">{{ Math.round(day.day.mintemp_c) }}</span>
                </p>
                <p class=" col-span-1 text-gray-300 font-semibold text-xs">{{ new Date(day.date).getDate() }}
                  {{ new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(day.date)) }}</p>
                <p class=" col-span-1 text-gray-300 font-semibold text-xs">
                  {{ getDayName(day.date, "en-US").substring(0, 3) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-3 text-white bg-gradient-to-r from-cyan-900 to-gray-500 py-5 px-5 lg:rounded-xl">
        <p class="text-sm font-semibold">Today's Weather</p>
        <div class="mt-2">
          <div class="lg:flex">
            <template v-for="(hour, index) in condition" :key="index">
              <div v-if="(index % 3 === 0) && index != 0" class="text-white bg-black bg-opacity-10 lg:rounded-xl border-b-2 border-gray-600 py-2 
              inline-block w-full ml-2 ">
                <p class="text-center font-semibold text-sm">{{ hour.time.slice(11) }}</p>
                <img :src=hour.condition.icon class="lg:mx-10 m-auto" />
                <p class="text-center font-semibold text-lg"> {{ Math.round(hour.temp_c) }}&#8451 </p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


