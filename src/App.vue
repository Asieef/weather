<script setup>
import { ref, onMounted, reactive, computed } from "vue";

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
});
</script>

<template>
  <div class="container mx-auto mt-10">
    <div class="grid grid-cols-4">
      <div class="col-span-1">
        <div class="">
          <div
            class="text-white max-w-xs my-auto mx-auto bg-gradient-to-r from-cyan-900 to-cyan-500 p-4 py-5 px-5 rounded-xl"
          >
            <div class="flex justify-between">
              <div>
                <img src="./assets/rain_icon.png" />
                <p class="text-6xl font-bold">28&#8451;</p>
              </div>
            </div>
            <div class="mt-5 flex gap-2 items-center w-52">
              <img class="w-6" src="./assets/rain_icon_small.png" />
              <span class="text-sm text-gray-200 font-semibold">
                Rainy Storm Clouds
              </span>
            </div>
            <div class="mt-5 border-t border-gray-200">
              <div class="flex gap-2 pt-4">
                <img class="w-4" src="./assets/location.png" />
                <span class="text-xs text-gray-200 font-semibold">
                  Tejaon, Dhaka
                </span>
              </div>
              <div class="flex gap-2 mt-2">
                <img class="w-4" src="./assets/calendar.png" />
                <span class="text-xs text-gray-200 font-semibold">
                  12 April, 2023
                </span>
                <span class="text-xs font-bold"> 11:55 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-span-3 text-white bg-gradient-to-r from-cyan-900 to-gray-500 p-4 py-5 px-5 rounded-xl"
      >
        <p class="text-sm font-semibold">Today's Highlight</p>

        <div class="grid grid-cols-3 gap-4 mt-4">
          <div class="col-span-1 bg-black bg-opacity-10 rounded-xl py-2">
            <p class="text-sm text-gray-200 font-semibold px-4">Wind Status</p>
            <div class="h-[80px] px-4">
              <Line :data="chartConfig.data" :options="chartConfig.options" />
            </div>
            <div class="flex justify-between px-4">
              <div class="flex gap-1 items-end">
                <p class="text-4xl font-bold">7.80</p>
                <span class="text-xs text-gray-400 font-semibold mb-1"
                  >km/h</span
                >
              </div>
              <div class="flex items-end">
                <p class="text-xs font-semibold text-gray-400 mb-1">11:55 AM</p>
              </div>
            </div>
          </div>

          <div class="col-span-1 bg-black bg-opacity-10 rounded-xl py-2">
            <p class="text-sm text-gray-200 font-semibold px-4">UV Index</p>
            <div class="h-[80px] px-4">
              <Bar :data="barConfig.data" :options="barConfig.options" />
            </div>
            <div class="flex justify-center items-center px-4">
              <div class="flex gap-1 items-end">
                <p class="text-4xl font-bold">5.0</p>
                <span class="text-xs text-gray-400 font-semibold mb-1">uv</span>
              </div>
            </div>
          </div>
          <div class="col-span-1 bg-black bg-opacity-10 rounded-xl">
            <p class="text-sm text-gray-200 font-semibold p-2">
              Sunrise & Sunset
            </p>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 mt-2">
          <div class="col-span-1 bg-black bg-opacity-10 rounded-xl py-2 px-4">
            <div class="grid grid-cols-2">
              <div>
                <p class="text-xs text-gray-300 font-semibold">Humidity</p>
                <p class="text-2xl font-bold mt-2">
                  75<span class="text-xs text-gray-300 font-semibold">%</span>
                </p>
              </div>
              <div class="mt-4">
                <img class="w-4" src="./assets/dew.png" />
                <p class="text-xs text-gray-300 font-semibold">
                  The dew point is 27% right now
                </p>
              </div>
            </div>
          </div>
          <div class="col-span-1 bg-black bg-opacity-10 rounded-xl py-2 px-4">
            <div class="grid grid-cols-2">
              <div>
                <p class="text-xs text-gray-300 font-semibold">Visibility</p>
                <p class="text-2xl font-bold mt-2">
                  05<span class="text-xs text-gray-300 font-semibold"> km</span>
                </p>
              </div>
              <div class="mt-4">
                <img class="w-4" src="./assets/eye.png" />
                <p class="text-xs text-gray-300 font-semibold">
                  Haze is affecting Visibility
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
                  <p class="text-2xl font-bold mt-2 mb-2">38&deg</p>
                </div>
              </div>
              <div class="mt-4">
                <p class="text-xs text-gray-300 font-semibold">
                  Humidity is making it feel hotter
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
