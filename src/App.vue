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
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import * as chartConfig from "./chartConfig.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

onMounted(() => {
  chartConfig;
});

computed({
  myStyles() {
    return {
      height: "50px",
      position: "relative",
    };
  },
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
              <span class="text-sm text-gray-200 font-light">
                Rainy Storm Clouds
              </span>
            </div>
            <div class="mt-5 border-t border-gray-200">
              <div class="flex gap-2 pt-4">
                <img class="w-4" src="./assets/location.png" />
                <span class="text-xs text-gray-200 font-light">
                  Tejaon, Dhaka
                </span>
              </div>
              <div class="flex gap-2 mt-2">
                <img class="w-4" src="./assets/calendar.png" />
                <span class="text-xs text-gray-200 font-light">
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
          <div class="col-span-1 bg-black bg-opacity-10 rounded-xl h-48">
            <p class="text-sm text-gray-200 font-normal p-2">Wind Status</p>
            <div>
              <Line
                :style="myStyle"
                :data="chartConfig.data"
                :options="chartConfig.options"
              />
            </div>
          </div>
          <div class="col-span-1 bg-black bg-opacity-10 rounded-xl h-48">
            <p class="text-sm text-gray-200 font-normal p-2">UV Index</p>
          </div>
          <div class="col-span-1 bg-black bg-opacity-10 rounded-xl h-48">
            <p class="text-sm text-gray-200 font-normal p-2">
              Sunrise & Sunset
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
