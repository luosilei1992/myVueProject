<template>
  <div class="cross-table" id="crosstable">
    <div class="search-head">
      <div class="warn-type-radio">
        <el-radio-group v-model="warningType">
          <el-radio label="1" size="large">最大绿报警</el-radio>
          <el-radio label="2" size="large">固定值报警</el-radio>
        </el-radio-group>
      </div>
      <div class="warn-num-input" v-if="warningType == '2'">
        <input
          type="number"
          class="nameInputS"
          v-model="fixedGreen"
          placeholder=""
        />
      </div>
      <div @click="stopGetTableData()">暂停</div>
      <div @click="startGetTableData()">开始</div>
      <div @click="startHoloControl()">开启单点全息</div>
      <div @click="stopHoloControl()">关闭单点全息</div>
    </div>
    <div class="table-main">
      <div class="table-box">
        <el-table
          :data="tableData"
          style="width: 100%"
          :max-height="tableBodyHeight"
          class="style-table"
          :row-class-name="tableRowClassName"
          @mousemove="handleMouseMove"
          @mouseenter="handleMouseEnter"
          @selection-change="handleSelectionChange"
          @sort-change="handleChangeSort"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="关注路口" width="80">
            <template #default="scope">
              <div class="focus-icon">
                <img
                  :src="isFocusImg"
                  alt=""
                  v-if="scope.row.isCare"
                  @click="changeFocus(0, scope.row)"
                />
                <img
                  :src="noFocusImg"
                  alt=""
                  v-else
                  @click="changeFocus(1, scope.row)"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="crossID" label="路口编号" sortable width="120">
            <template #default="scope">
              <span class="crossid-box" title="点击查看路口信控详情" @click="jumpToDetail(scope.row)">{{ scope.row.crossID }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="crossName"
            label="路口名称"
            show-overflow-tooltip
            width="150"
          />
          <el-table-column label="控制方式" width="160">
            <template #default="scope">
              <span
                :style="{
                  color: judgeColorByControlMode(scope.row.modeType),
                }"
                >{{ scope.row.modeTypeName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="cycleTime"
            label="周期时长"
            sortable
            width="120"
          />
          <el-table-column
            prop="phaseTime"
            label="当前相位"
            sortable
            width="120"
          >
            <template #default="scope">
              <span>{{ scope.row.phaseTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="相位列表" width="700">
            <template #default="scope">
              <div class="phase-out-box">
                <span
                  class="phase-box"
                  :class="item.isCurrent ? 'is-current-phase' : ''"
                  v-for="item in scope.row.phaseCycleInstances
                    ? scope.row.phaseCycleInstances[0]?.details
                    : []"
                  :key="item"
                >
                  {{ item.phaseName }}({{ item.phaseInfoID }})/{{
                    item.isCurrent ? item.phaseDetail.duration : item.duration
                  }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="异常结束" width="80">
            <template #default="scope">
              <span
                :class="scope.row.exception ? 'unexpect-box' : 'expect-box'"
                >{{ scope.row.exception ? "是" : "否" }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="stopReason"
            label="结束原因"
            width="110"
          />
          <el-table-column fixed="right" label="操作" width="150">
            <template #default="scope">
              <el-switch
                size="small"
                v-model="scope.row.isStartHolo"
                :before-change="beforeChange"
              />
              <span class="opration-label">{{
                scope.row.isStartHolo ? "关闭单点全息" : "开启单点全息"
              }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <audio :src="warnAudio" type="video/mp3" ref="audioRef">
      对不起，您的破浏览器不支持我们的视频播放模块
    </audio>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch, nextTick, onUnmounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import isFocusImg from "@/assets/image/isfocus.png";
import noFocusImg from "@/assets/image/nofocus.png";
import { tableMockData } from "./mockData.js";
import { judgePhaseCycleInstanceStyle } from "@/api/common.js";
import warnAudio from "@/assets/audio/boatAudio.mp3";

const router = useRouter();

const warningType = ref("1");
const fixedGreen = ref(50);
const tableData = ref([]);
const audioRef = ref(null);
const weather = ref("晴天");
const tableTimer = ref(null);
const multipleSelection = ref([]);
const defalutOrderKey = ref(null);
const defalutOrder = ref(null);
const tableBodyHeight = ref(0);
class Timer {
  constructor(callback, interval = 1000) {
    this.timerId = null;
    this.elapsedSeconds = 0;
    this.callback = callback;
    this.interval = interval;
  }
  start() {
    // this.callback(this.elapsedSeconds);
    this.timerId = setInterval(() => {
      this.elapsedSeconds++;
      if (typeof this.callback === "function") {
        this.callback(this.elapsedSeconds);
      }
    }, this.interval);
  }
  pause() {
    clearInterval(this.timerId);
    this.timerId = null;
  }
}

// tableMockData.forEach((item) => {
//   item.isStartHolo = item.modeType == "24" ? true : false;
//   item.phaseCycleInstances &&
//     item.phaseCycleInstances[0].details?.forEach((phaseItem) => {
//       phaseItem.phaseName = judgePhaseCycleInstanceStyle(
//         phaseItem.phaseInfoID
//       ).imgDescText;
//     });
// });
// tableData.value = tableMockData;
const handleSelectionChange = (val) => {
  multipleSelection.value = val.map((item) => item.crossCode);
};
const handleChangeSort = ({ column, prop, order }) => {
  defalutOrderKey.value = prop;
  defalutOrder.value = order;
};
const startHoloControl = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage({
      message: "请先选择要开启单点全息的路口",
      type: "warning",
      offset: 4,
      center: true,
      showClose: false,
      duration: 1500,
    });
    return;
  } else {
    return;
    // startHolo(multipleSelection.value);
  }
};
const stopHoloControl = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage({
      message: "请先选择要关闭单点全息的路口",
      type: "warning",
      offset: 4,
      center: true,
      showClose: false,
      duration: 1500,
    });
    return;
  } else {
    return;
    // stopHolo(multipleSelection.value);
  }
};
const beforeChange = () => {};
// 获取路口实时信息
const getCrossState = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://13.148.129.14:9010/api/phaseCycleDailyPlan/getcrossallstate",
        {
          crossID: "",
          isCare: null,
          modeType: "",
          stopReason: "",
        }
      )
      .then((response) => {
        resolve(response.data.data);
        // console.log(response.data.data);
        // response.data.data.forEach((item) => {
        //   item.isStartHolo = item.modeType == "24" ? true : false;
        //   item.phaseCycleInstances &&
        //     item.phaseCycleInstances[0].details?.forEach((phaseItem) => {
        //       phaseItem.phaseName = judgePhaseCycleInstanceStyle(
        //         phaseItem.phaseInfoID
        //       ).imgDescText;
        //     });
        // });
        // tableData.value = response.data.data;
        // 处理返回的数据
      })
      .catch((error) => {
        reject(error);
        console.error(error);
        // 处理错误
      });
  });
};

getCrossState()
  .then((res) => {
    res.forEach((item) => {
      item.isStartHolo = item.modeType == "24" ? true : false;
      item.phaseCycleInstances &&
        item.phaseCycleInstances[0].details?.forEach((phaseItem) => {
          phaseItem.phaseName = judgePhaseCycleInstanceStyle(
            phaseItem.phaseInfoID
          ).imgDescText;
        });
    });
    tableData.value = res;
  })
  .catch((error) => {
    // console.log(error);
  });
const getCrossStateBySecond = () => {
  getCrossState()
    .then((res) => {
      res.forEach((item, index) => {
        item.isStartHolo = item.modeType == "24" ? true : false;
        item.phaseCycleInstances &&
          item.phaseCycleInstances[0].details?.forEach((phaseItem) => {
            phaseItem.phaseName = judgePhaseCycleInstanceStyle(
              phaseItem.phaseInfoID
            ).imgDescText;
          });
        let targetObj = tableData.value.find(
          (tableItem) => tableItem.crossID == item.crossID
        );
        if (targetObj) {
          targetObj.isCare = item.isCare;
          targetObj.modeTypeName = item.modeTypeName;
          targetObj.modeType = item.modeType;
          targetObj.cycleTime = item.cycleTime
            ? Number(item.cycleTime)
            : item.cycleTime;
          targetObj.phaseTime = item.phaseTime
            ? Number(item.phaseTime)
            : item.phaseTime;
          targetObj.phaseCycleInstances = item.phaseCycleInstances;
          targetObj.exception = item.exception;
          targetObj.stopReason = item.stopReason;
        } else {
          tableData.value.splice(index, 0, item);
        }
        if (item.crossID == "13070200013") {
          console.log(item.modeTypeName, item.modeType);
        }
      });
      defalutOrderKey.value &&
        defalutOrder.value &&
        tableData.value.sort(
          customSort(defalutOrderKey.value, defalutOrder.value)
        );
    })
    .catch((error) => {
      console.log(error);
    });
};
const customSort = (key, order = "descending") => {
  return function (a, b) {
    if (order == "ascending") {
      if (a[key] > b[key]) return 1;
      if (a[key] < b[key]) return -1;
      return 0;
    } else if (order === "descending") {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
      return 0;
    } else {
      console.log(
        'Invalid order parameter. Please specify "ascending" or "descending".'
      );
      return 0;
    }
  };
};
// 批量开启单点全息
const startHolo = (data) => {
  axios
    .post(
      "http://13.148.129.14:9010/api/CrossingSignalStateMachine/StartHolographicSinglePointCoordination/list",
      {
        signalCodes: data,
      }
    )
    .then((response) => {
      console.log(response);
      // 处理返回的数据
    })
    .catch((error) => {
      console.error(error);
      // 处理错误
    });
};
// 批量关闭单点全息
const stopHolo = (data) => {
  axios
    .post(
      "http://13.148.129.14:9010/api/CrossingSignalStateMachine/StopHolographicSinglePointCoordination/list",
      {
        signalCodes: data,
      }
    )
    .then((response) => {
      console.log(response);
      // 处理返回的数据
    })
    .catch((error) => {
      console.error(error);
      // 处理错误
    });
};

tableTimer.value = new Timer(getCrossStateBySecond);
tableTimer.value.start();
const stopGetTableData = () => {
  tableTimer.value && tableTimer.value.pause();
};
const startGetTableData = () => {
  tableTimer.value && tableTimer.value.start();
};
const changeFocus = (val, row) => {
  row.isCare = val;
};
const tableRowClassName = (row) => {
  if (warningType.value == 1) {
    let intMaxGreen = null;
    row.row.phaseCycleInstances &&
      row.row.phaseCycleInstances[0].details?.forEach((item) => {
        if (item.isCurrent) {
          intMaxGreen = item.maxGreen;
        }
      });
    if (intMaxGreen && row.row.phaseTime > intMaxGreen) {
      if (row.rowIndex % 2 === 0) {
        return "odd-row alert-box";
      } else {
        return "even-row alert-box";
      }
    } else {
      if (row.rowIndex % 2 === 0) {
        return "odd-row";
      } else {
        return "even-row";
      }
    }
  } else {
    if (row.row.phaseTime > fixedGreen.value) {
      if (row.rowIndex % 2 === 0) {
        return "odd-row alert-box";
      } else {
        return "even-row alert-box";
      }
    } else {
      if (row.rowIndex % 2 === 0) {
        return "odd-row";
      } else {
        return "even-row";
      }
    }
  }
  // if (
  //   (warningType.value == 1 && row.row.phaseTime > row.row.maxGreen) ||
  //   (warningType.value == 2 && row.row.phaseTime > fixedGreen.value)
  // ) {
  //   if (row.rowIndex % 2 === 0) {
  //     return "odd-row alert-box";
  //   } else {
  //     return "even-row alert-box";
  //   }
  // } else if (row.rowIndex % 2 === 0) {
  //   return "odd-row";
  // } else {
  //   return "even-row";
  // }
};
const judgeColorByControlMode = (modeType) => {
  switch (+modeType) {
    case 24:
      return "#6EDB84";
    case 54:
      return "#F0B45B";
    case 99:
      return "rgba(255,255,255,0.5)";
    case 32:
      return "#28BBFF";
    default:
      break;
  }
};

// const judgeColorByWarn = (row, warningType, fixedGreen) => {
//   if (warningType == 1) {
//     return row.phaseTime > row.maxGreen ? "#FF7575" : "";
//   } else {
//     return row.phaseTime > fixedGreen ? "#FF7575" : "";
//   }
// };
const handleMouseEnter = (e) => {
  removeTableHover();
};
const handleMouseMove = () => {
  removeTableHover();
};
const removeTableHover = () => {
  setTimeout(() => {
    let el = document.getElementsByClassName("hover-row");
    if (!el || el.length == 0) {
      return;
    }
    for (let i = 0; i < el.length; i++) {
      el[i].classList.remove("hover-row");
      console.log("清除");
    }
  }, 60);
};
watch(
  tableData,
  (old, newVal) => {
    // setTimeout(() => {
    //   document.getElementById("crosstable").click();
    //   try {
    //     audioRef.value.play();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }, 50);
    // nextTick(() => {
    //   debugger
    // })
  },
  //深度监听
  { deep: true }
);
onMounted(() => {
  nextTick(() => {
    tableBodyHeight.value =
      window.innerHeight - window.innerHeight * 0.157 - 20;
  });
});
onUnmounted(() => {
  tableTimer.value && tableTimer.value.pause();
  tableTimer.value = null;
})
</script>

<script>
export default {
  name: "crossTable",
  // 省略其他代码
};
</script>
<style scoped>
.cross-table {
  width: 100%;
  height: 100%;
  background-color: #293846;
  padding-top: 2.06vh;
}
.search-head {
  width: 98%;
  margin-left: auto;
  margin-right: auto;
  height: 6.18vh;
  background-color: #3b4b5d;
  color: #ffffff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.table-main {
  width: 98%;
  margin-top: 2.06vh;
  margin-left: auto;
  margin-right: auto;
  max-height: 88%;
  /* overflow-y: scroll; */
  /* height: 82.52vh; */
  background-color: #3b4b5d;
  border-radius: 4px;
}
.table-box {
  margin-left: auto;
  margin-right: auto;
  width: 98%;
  /* height: 100%; */
}
.style-table {
  background-color: #3b4b5d !important;
}
.style-table ::v-deep .el-table th.el-table__cell,
::v-deep .el-table th,
::v-deep .el-table tr {
  background-color: #3b4b5d;
}
.style-table
  ::v-deep
  .el-table__header-wrapper
  tr
  th.el-table-fixed-column--right {
  background-color: #3b4b5d;
}
::v-deep .style-table .even-row .el-table-fixed-column--right {
  background-color: #3b4b5d;
}
::v-deep .style-table .odd-row .el-table-fixed-column--right {
  background-color: #314151;
}
/* ::v-deep .style-table .alert-box .el-table-fixed-column--right {
  animation: alert 1s infinite;
} */
::v-deep .style-table .el-table__body tr.hover-row > td.el-table__cell {
  background-color: #3b4b5d !important;
}
::v-deep .style-table .el-table__inner-wrapper::before {
  background-color: #3b4b5d !important;
}
::v-deep .table-box .el-table td.el-table__cell,
::v-deep .table-box .el-table th.el-table__cell.is-leaf {
  border-bottom: 1px solid #3b4b5d !important;
}
::v-deep .table-box .el-table {
  color: #ffffff;
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
}
::v-deep .table-box .el-table thead {
  color: #bed3e6;
}
::v-deep .table-box .el-table .cell {
  height: 23px;
}
::v-deep .table-box .el-table .odd-row {
  background-color: #314151;
}
::v-deep .style-table .el-switch.is-checked .el-switch__core {
  background-color: #51b0c0;
  border-color: #51b0c0;
}
::v-deep .style-table .el-checkbox__inner {
  background-color: #899cac;
  border: 1px solid #899cac;
}
::v-deep .style-table .el-checkbox__input.is-indeterminate .el-checkbox__inner,
::v-deep .style-table .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #61ebe1;
  border: 1px solid #61ebe1;
}
::v-deep .table-box .el-table .ascending .sort-caret.ascending {
  border-bottom-color: #61ebe1;
}
::v-deep .table-box .el-table .descending .sort-caret.descending {
  border-top-color: #61ebe1;
}
.crossid-box {
  text-decoration: underline;
  cursor: pointer;
}
.crossid-box:hover {
  color: #61ebe1;
}

.phase-out-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
}
.phase-box {
  margin-right: 15px;
  width: 100px;
  display: block;
  height: 100%;
}
.is-current-phase {
  color: #60cfd3;
}
.unexpect-box {
  color: #ff7575;
}
.expect-box {
  color: #ffffff;
}
.focus-icon {
  display: flex;
  align-items: center;
  height: 100%;
}
.opration-label {
  margin-left: 0.416vw;
}
@keyframes alert {
  0% {
    background-color: rgb(253, 2, 2, 0.3);
  }
  10% {
    background-color: rgb(253, 2, 2, 0.4);
  }
  20% {
    background-color: rgb(253, 2, 2, 0.5);
  }
  30% {
    background-color: rgb(253, 2, 2, 0.6);
  }
  40% {
    background-color: rgb(253, 2, 2, 0.7);
  }
  50% {
    background-color: rgb(253, 2, 2, 0.8);
  }
  60% {
    background-color: rgb(253, 2, 2, 0.7);
  }
  70% {
    background-color: rgb(253, 2, 2, 0.6);
  }
  80% {
    background-color: rgb(253, 2, 2, 0.5);
  }
  90% {
    background-color: rgb(253, 2, 2, 0.4);
  }
  100% {
    background-color: rgb(253, 2, 2, 0.3);
  }
}
::v-deep .table-box .el-table .alert-box {
  /* animation: alert 1s infinite; */
  background-color: rgba(255, 0, 0, 0.5);
}
</style>

<style>
.wrapper {
  height: calc(100% - 40px);
}
</style>