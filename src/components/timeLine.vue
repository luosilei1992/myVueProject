<template>
  <div class="time-box">
    <ul class="timePlan-box">
      <li
        v-for="(item, index) in props.timeRange"
        :key="index"
        :style="{
          width: item.percentage * 100 + '%',
        }"
        :class="selectTimeRangeIndex == index ? 'active-time-range' : ''"
        class="time-range-box"
        :title="item.startTime + '-' + item.endTime"
        @click="clickTimeRange(item, index)"
      >
        <span class="start-time-label">{{ item.startTime }}</span>
        <span
          class="end-time-label"
          v-if="index == props.timeRange.length - 1"
          >{{ item.endTime }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref, defineProps, defineEmits, toRefs} from "vue";
const selectTimeRangeIndex = ref(-1);
const props = defineProps({
    timeRange: {
        type: Array,
        default: []
    },
    defaultSelect: {
        type: Number,
        default: 0
    }
})
const emit = defineEmits(['change']);
const { defaultSelect } = toRefs(props);
selectTimeRangeIndex.value = defaultSelect.value;

const clickTimeRange = (item, index) => {
    selectTimeRangeIndex.value = index;
    emit('change', {startTime: item.startTime, endTime: item.endTime});
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
.time-box {
  margin: 4vh 0 2vh;
  width: 99.2%;
  cursor: pointer;
  position: relative;
}

.timePlan-box {
  display: flex;
  color: #fff;
  border: 0.01rem solid #1a1a1a;
}

.active-time-range {
  background-color: rgb(97, 235, 225);
}

.time-range-box {
  height: 2.575vh;
  background-color: #25323f;
  text-align: left;
}
.time-range-box:not(:last-child) {
  border-right: 0.01rem solid #1a1a1a;
  cursor: pointer;
  /* box-sizing: border-box; */
}
.active-time-range {
  background-color: rgb(97, 235, 225);
}
.start-time-label {
  display: inline-block;
  position: relative;
  top: -2vh;
  left: -1.4vw;
  color: #000000;
  font-size: 0.728vw;
}
.time-range-box:first-child .start-time-label {
  left: 0;
}
.end-time-label {
  display: inline-block;
  width: fit-content;
  text-align: right;
  position: absolute;
  top: -2vh;
  right: -0.8vw;
  color: #000000;
  font-size: 0.728vw;
}
.time-range-box:last-child .end-time-label {
  right: 0;
}
</style>