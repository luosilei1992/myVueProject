<template>
  <div class="car-plate" :id="props.id">
    <div class="car-inner-plate">
      <span class="car-prefix">{{ plateObj.prefix }}</span>
      <span class="car-main">{{ plateObj.mainfix }}</span>
      <span class="car-suffix" v-if="props.type == 5">{{
        plateObj.suffix
      }}</span>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, toRefs, onMounted, reactive } from "vue";
const props = defineProps({
  id: {
    type: String,
    default: "",
  },
  plate: {
    type: String,
    dafault: "",
  },
  type: {
    type: Number,
    dafault: 1,
  },
});
const carPlateMap = {
  0: {
    name: "普通蓝牌",
    prefixColor: "#ffffff",
    mainColor: "#ffffff",
    backGroundColor: "#3267D3",
    borderColor: "#ffffff",
    mainBackgroundColor: "transparent",
  },
  1: {
    name: "单层黄牌",
    prefixColor: "#000000",
    mainColor: "#000000",
    backGroundColor: "#FEBC04",
    borderColor: "#000000",
    mainBackgroundColor: "transparent",
  },
  2: {
    name: "小型新能源汽车",
    prefixColor: "#000000",
    mainColor: "#000000",
    backGroundColor: "linear-gradient(to bottom, #ffffff 5%, #04af47)",
    borderColor: "#000000",
    mainBackgroundColor: "transparent",
  },
  3: {
    name: "大型新能源汽车",
    prefixColor: "#000000",
    mainColor: "#000000",
    backGroundColor: "#FEBC04",
    borderColor: "#000000",
    mainBackgroundColor: "#04af47",
  },
  4: {
    name: "单层军牌",
    prefixColor: "#F2070B",
    mainColor: "#000000",
    backGroundColor: "#ffffff",
    borderColor: "#000000",
    mainBackgroundColor: "transparent",
  },
  5: {
    name: "警牌",
    prefixColor: "#000000",
    mainColor: "#000000",
    backGroundColor: "#ffffff",
    borderColor: "#000000",
    mainBackgroundColor: "transparent",
  },
  6: {
    name: "特殊黑牌",
    prefixColor: "#ffffff",
    mainColor: "#ffffff",
    backGroundColor: "#000000",
    borderColor: "#ffffff",
    mainBackgroundColor: "transparent",
  },
  7: {
    name: "民航车牌",
    prefixColor: "#ffffff",
    mainColor: "#ffffff",
    backGroundColor: "#018F63",
    borderColor: "#ffffff",
    mainBackgroundColor: "transparent",
  },
};
const specialCarPlateMap = {
  5: "警牌",
};
const plateObj = reactive({
  prefix: "",
  mainfix: "",
  suffix: "",
});
const { type, plate, id } = toRefs(props);

const setCarPlateProperty = (carType, plate, id) => {
  if (specialCarPlateMap[carType]) {
    if (carType == 5) {
      plateObj.prefix = plate.charAt(0);
      if (plate.indexOf("警") > -1) {
        plateObj.mainfix = plate.substring(1, plate.length - 1);
        plateObj.suffix = plate.charAt(plate.length - 1);
      } else {
        plateObj.mainfix = plate.substring(1, plate.length);
        plateObj.suffix = "警";
      }
    }
  } else {
    plateObj.prefix = plate.substring(0, 2);
    plateObj.mainfix = plate.substring(2, plate.length);
  }
  const el = document.getElementById(id);
  if (carPlateMap[carType]) {
    el.style.setProperty("--borderColor", carPlateMap[carType].borderColor);
    el.style.setProperty("--backGround", carPlateMap[carType].backGroundColor);
    el.style.setProperty("--prefixColor", carPlateMap[carType].prefixColor);
    el.style.setProperty("--mainColor", carPlateMap[carType].mainColor);
    el.style.setProperty(
      "--mainBackGround",
      carPlateMap[carType].mainBackgroundColor
    );
  }
};

onMounted(() => {
  setCarPlateProperty(type.value, plate.value, id.value);
});
</script>
<style scoped>
.car-plate {
  --borderColor: #000000;
  --backGround: #ffffff;
  --prefixColor: #000000;
  --mainColor: #000000;
  --mainBackGround: "transparent";
  background: var(--backGround);
  padding: 2px;
  width: fit-content;
  box-shadow: 3px 3px 7px 0px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}
.car-inner-plate {
  border-width: 1px;
  border-style: solid;
  border-color: var(--borderColor);
  border-radius: 2px;
  padding: 2px;
  font-size: 14px;
  font-weight: 600;
}
.car-prefix {
  color: var(--prefixColor);
  margin-right: 3px;
}
.car-main {
  color: var(--mainColor);
  background: var(--mainBackGround);
  padding-top: 2px;
  padding-bottom: 1px;
  padding-left: 2px;
  padding-right: 2px;
}
.car-suffix {
  color: #ff4047;
}
</style>