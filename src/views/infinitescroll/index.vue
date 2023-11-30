<template>
  <div class="main-inner-box">
    <div
      class="infinite-list-wrapper"
      style="overflow: auto"
      @wheel="handleScroll"
    >
      <ul
        v-infinite-scroll="load"
        class="list"
        :infinite-scroll-disabled="disabled"
      >
        <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
      </ul>
      <p v-if="loading">Loading...</p>
      <p v-if="noMore">No more</p>
    </div>
    <div class="icon-list-box">
      <el-icon :size="30">
        <Edit />
      </el-icon>
      <el-icon color="#409EFC" class="no-inherit">
        <Share />
      </el-icon>
      <el-icon>
        <Delete />
      </el-icon>
      <el-icon class="is-loading">
        <Loading />
      </el-icon>
      <el-icon color="#F80606" class="warn-filled"><WarningFilled /></el-icon>
      <el-button type="primary" @click="jumpTo()">
        <el-icon style="vertical-align: middle">
          <Search />
        </el-icon>
        <span style="vertical-align: middle"> Search </span>
      </el-button>
      <el-icon class="star-icon"><Star /></el-icon>
      <i>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <polygon
            points="12,1.8 14.97,8.5 22.26,9.68 16.39,14.32 18.26,21.2 12,17.15 5.74,21.2 7.61,14.32 1.74,9.68 9.03,8.5"
            fill="#FFFFFF"
            stroke="#000000"
            stroke-width="1"
          />
          <polygon
            points="12,1.8 14.97,8.5 22.26,9.68 16.39,14.32 18.26,21.2 12,17.15 5.74,21.2 7.61,14.32 1.74,9.68 9.03,8.5"
            fill="#FFD700"
            stroke="#000000"
            stroke-width="1"
            style="opacity: 0"
            id="star-filled"
          />
        </svg>
      </i>
    </div>
    <div class="demo-image__preview">
      <el-image
        style="width: 100px; height: 100px"
        :src="url"
        :zoom-rate="1.2"
        :preview-src-list="srcList"
        :initial-index="4"
        fit="cover"
      />
    </div>
    <div class="plate-box">
      <div v-for="(item, index) in plate" :key="index">
        <car-plate
          :plate="item.plate"
          :type="item.type"
          :id="'carplate' + index"
        ></car-plate>
      </div>
    </div>
    <div style="width: 100%; display: flex; justify-content: center">
      <time-line
        :timeRange="daliyPlansTimeList"
        :defaultSelect="2"
        @change="changeSelectTimeRange"
      >
      </time-line>
    </div>
    <div style="width: 1500px" table-layout="auto" v-if="false">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column label="关注路口">
          <template #default="scope">
            <div>
              <img :src="isFocusImg" alt="" v-if="scope.row.isFocus" />
              <img :src="noFocusImg" alt="" v-else />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="crossCode" label="路口编号" />
        <el-table-column prop="crossName" label="路口名称" />
        <el-table-column prop="controlMode" label="控制方式" />
        <el-table-column prop="currentCycle" label="当前周期时长(s)" sortable />
        <el-table-column prop="currentPhaseTime" label="当前相位时长(s)" />
        <el-table-column label="相位列表">
          <template #default="scope">
            <span
              class="phase-box"
              :class="item.isCurrentPhase ? 'is-current-phase' : ''"
              v-for="item in scope.row.phaseList"
              :key="item"
            >
              {{ item.phaseName }}({{ item.phaseId }})/{{ item.phaseTime }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="异常结束">
          <template #default="scope">
            <span
              :class="
                scope.row.isUnexpectedStop ? 'unexpect-box' : 'expect-box'
              "
              >{{ scope.row.isUnexpectedStop ? "是" : "否" }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="stopReason" label="结束原因" />
        <el-table-column fixed="right" label="操作">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick"
              >开启单点全息</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-carousel
        height="400px"
        initial-index=0
        direction="vertical"
        type="card"
        :autoplay="true"
        :interval="2000"
      >
        <el-carousel-item v-for="item in 20" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import timeLine from "@/components/timeLine.vue";
import carPlate from "@/components/carPlate.vue";
import isFocusImg from "@/assets/image/isfocus.png";
import noFocusImg from "@/assets/image/nofocus.png";
const router = useRouter();
const count = ref(1);
const loading = ref(false);
const noMore = computed(() => count.value >= 20);
const disabled = computed(() => loading.value || noMore.value);
const shouldLoadMore = ref(false);
const url =
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg";
const srcList = [
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
  "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
  "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
  "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
  "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
  "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
];

const daliyPlansTimeList = ref([]);

const plate = ref([
  {
    plate: "京AF0236",
    type: 0,
  },
  {
    plate: "京A02128",
    type: 1,
  },
  {
    plate: "粤B2W4R8",
    type: 2,
  },
  {
    plate: "赣CD34B7",
    type: 3,
  },
  {
    plate: "鄂B45F4G",
    type: 4,
  },
  {
    plate: "京47863警",
    type: 5,
  },
  {
    plate: "京A0006",
    type: 5,
  },
  {
    plate: "京AI9598",
    type: 6,
  },
  {
    plate: "民航C3096",
    type: 7,
  },
]);
daliyPlansTimeList.value = [
  {
    startTime: "00:00:00",
    endTime: "05:00:00",
    startTimeWithOutDate: "00:00",
    endTimeWithOutDate: "05:00",
    percentage: 0.20833333333333334,
    phaseList: [
      {
        id: 4,
        flag: 0,
        remark: null,
        pid: 3,
        pname: "南北通行",
      },
      {
        id: 8,
        flag: 0,
        remark: null,
        pid: 7,
        pname: "东西通行",
      },
      {
        id: 16,
        flag: 0,
        remark: null,
        pid: 15,
        pname: "东向直左",
      },
    ],
  },
  {
    startTime: "05:00:00",
    endTime: "07:00:00",
    startTimeWithOutDate: "05:00",
    endTimeWithOutDate: "07:00",
    percentage: 0.08333333333333333,
    phaseList: [
      {
        id: 4,
        flag: 0,
        remark: null,
        pid: 3,
        pname: "南北通行",
      },
      {
        id: 8,
        flag: 0,
        remark: null,
        pid: 7,
        pname: "东西通行",
      },
      {
        id: 16,
        flag: 0,
        remark: null,
        pid: 15,
        pname: "东向直左",
      },
    ],
  },
  {
    startTime: "07:00:00",
    endTime: "07:40:00",
    startTimeWithOutDate: "07:00",
    endTimeWithOutDate: "07:40",
    percentage: 0.027777777777777776,
    phaseList: [
      {
        id: 6,
        flag: 0,
        remark: null,
        pid: 5,
        pname: "东向通行",
      },
      {
        id: 9,
        flag: 0,
        remark: null,
        pid: 8,
        pname: "南北直行",
      },
      {
        id: 10,
        flag: 0,
        remark: null,
        pid: 9,
        pname: "东西直行",
      },
    ],
  },
  {
    startTime: "07:40:00",
    endTime: "08:10:00",
    startTimeWithOutDate: "07:40",
    endTimeWithOutDate: "08:10",
    percentage: 0.020833333333333332,
    phaseList: [
      {
        id: 6,
        flag: 0,
        remark: null,
        pid: 5,
        pname: "东向通行",
      },
      {
        id: 9,
        flag: 0,
        remark: null,
        pid: 8,
        pname: "南北直行",
      },
      {
        id: 10,
        flag: 0,
        remark: null,
        pid: 9,
        pname: "东西直行",
      },
    ],
  },
  {
    startTime: "08:10:00",
    endTime: "08:50:00",
    startTimeWithOutDate: "08:10",
    endTimeWithOutDate: "08:50",
    percentage: 0.027777777777777776,
    phaseList: [
      {
        id: 6,
        flag: 0,
        remark: null,
        pid: 5,
        pname: "东向通行",
      },
      {
        id: 9,
        flag: 0,
        remark: null,
        pid: 8,
        pname: "南北直行",
      },
      {
        id: 10,
        flag: 0,
        remark: null,
        pid: 9,
        pname: "东西直行",
      },
    ],
  },
  {
    startTime: "08:50:00",
    endTime: "17:00:00",
    startTimeWithOutDate: "08:50",
    endTimeWithOutDate: "17:00",
    percentage: 0.3402777777777778,
    phaseList: [
      {
        id: 6,
        flag: 0,
        remark: null,
        pid: 5,
        pname: "东向通行",
      },
      {
        id: 9,
        flag: 0,
        remark: null,
        pid: 8,
        pname: "南北直行",
      },
      {
        id: 10,
        flag: 0,
        remark: null,
        pid: 9,
        pname: "东西直行",
      },
    ],
  },
  {
    startTime: "17:00:00",
    endTime: "19:00:00",
    startTimeWithOutDate: "17:00",
    endTimeWithOutDate: "19:00",
    percentage: 0.08333333333333333,
    phaseList: [
      {
        id: 6,
        flag: 0,
        remark: null,
        pid: 5,
        pname: "东向通行",
      },
      {
        id: 9,
        flag: 0,
        remark: null,
        pid: 8,
        pname: "南北直行",
      },
      {
        id: 10,
        flag: 0,
        remark: null,
        pid: 9,
        pname: "东西直行",
      },
    ],
  },
  {
    startTime: "19:00:00",
    endTime: "21:00:00",
    startTimeWithOutDate: "19:00",
    endTimeWithOutDate: "21:00",
    percentage: 0.08333333333333333,
    phaseList: [
      {
        id: 4,
        flag: 0,
        remark: null,
        pid: 3,
        pname: "南北通行",
      },
      {
        id: 8,
        flag: 0,
        remark: null,
        pid: 7,
        pname: "东西通行",
      },
      {
        id: 16,
        flag: 0,
        remark: null,
        pid: 15,
        pname: "东向直左",
      },
    ],
  },
  {
    startTime: "21:00:00",
    endTime: "23:59:00",
    startTimeWithOutDate: "21:00",
    endTimeWithOutDate: "23:59",
    percentage: 0.12430555555555556,
    phaseList: [
      {
        id: 4,
        flag: 0,
        remark: null,
        pid: 3,
        pname: "南北通行",
      },
      {
        id: 8,
        flag: 0,
        remark: null,
        pid: 7,
        pname: "东西通行",
      },
      {
        id: 16,
        flag: 0,
        remark: null,
        pid: 15,
        pname: "东向直左",
      },
    ],
  },
];

const handleClick = () => {
  console.log("click");
};

const tableData = [
  {
    isFocus: true,
    crossCode: "13070300134",
    crossName: "胜利路-盛华大街路口",
    controlMode: "单点全息自适应",
    currentCycle: 165,
    currentPhaseTime: 65,
    phaseList: [
      {
        phaseName: "东西直行",
        phaseId: 2,
        phaseTime: 19,
        isCurrentPhase: false,
      },
      {
        phaseName: "南北直行",
        phaseId: 8,
        phaseTime: 20,
        isCurrentPhase: true,
      },
      {
        phaseName: "东西左转",
        phaseId: 2,
        phaseTime: 20,
        isCurrentPhase: false,
      },
      {
        phaseName: "南北左转",
        phaseId: 4,
        phaseTime: 20,
        isCurrentPhase: false,
      },
    ],
    isUnexpectedStop: 0,
    stopReason: "三方系统结束",
  },
  {
    isFocus: true,
    crossCode: "13070300134",
    crossName: "胜利路-盛华大街路口",
    controlMode: "单点全息自适应",
    currentCycle: 165,
    currentPhaseTime: 65,
    phaseList: [
      {
        phaseName: "东西直行",
        phaseId: 2,
        phaseTime: 19,
        isCurrentPhase: false,
      },
      {
        phaseName: "南北直行",
        phaseId: 8,
        phaseTime: 20,
        isCurrentPhase: true,
      },
      {
        phaseName: "东西左转",
        phaseId: 2,
        phaseTime: 20,
        isCurrentPhase: false,
      },
      {
        phaseName: "南北左转",
        phaseId: 4,
        phaseTime: 20,
        isCurrentPhase: false,
      },
    ],
    isUnexpectedStop: 0,
    stopReason: "三方系统结束",
  },
  {
    isFocus: false,
    crossCode: "23080400568",
    crossName: "中山街-长江路路口",
    controlMode: "多点同步协调",
    currentCycle: 115,
    currentPhaseTime: 35,
    phaseList: [
      {
        phaseName: "东西直行",
        phaseId: 5,
        phaseTime: 30,
        isCurrentPhase: false,
      },
      {
        phaseName: "南北直行",
        phaseId: 2,
        phaseTime: 35,
        isCurrentPhase: true,
      },
      {
        phaseName: "东西左转",
        phaseId: 5,
        phaseTime: 20,
        isCurrentPhase: false,
      },
      {
        phaseName: "南北左转",
        phaseId: 3,
        phaseTime: 30,
        isCurrentPhase: false,
      },
    ],
    isUnexpectedStop: 1,
    stopReason: "设备故障",
  },
  {
    isFocus: true,
    crossCode: "32021100863",
    crossName: "幸福路-和平街路口",
    controlMode: "区域协调",
    currentCycle: 200,
    currentPhaseTime: 75,
    phaseList: [
      {
        phaseName: "东西直行",
        phaseId: 1,
        phaseTime: 40,
        isCurrentPhase: false,
      },
      {
        phaseName: "南北直行",
        phaseId: 6,
        phaseTime: 45,
        isCurrentPhase: true,
      },
      {
        phaseName: "东西左转",
        phaseId: 1,
        phaseTime: 30,
        isCurrentPhase: false,
      },
      {
        phaseName: "南北左转",
        phaseId: 4,
        phaseTime: 45,
        isCurrentPhase: false,
      },
    ],
    isUnexpectedStop: 0,
    stopReason: "三方系统结束",
  },
  {
    isFocus: true,
    crossCode: "11010200394",
    crossName: "王府井-长安街路口",
    controlMode: "单点定时控制",
    currentCycle: 140,
    currentPhaseTime: 40,
    phaseList: [
      {
        phaseName: "东西直行",
        phaseId: 3,
        phaseTime: 30,
        isCurrentPhase: false,
      },
      {
        phaseName: "南北直行",
        phaseId: 1,
        phaseTime: 40,
        isCurrentPhase: true,
      },
      {
        phaseName: "东西左转",
        phaseId: 3,
        phaseTime: 20,
        isCurrentPhase: false,
      },
      {
        phaseName: "南北左转",
        phaseId: 2,
        phaseTime: 30,
        isCurrentPhase: false,
      },
    ],
    isUnexpectedStop: 0,
    stopReason: "三方系统结束",
  },
];
const load = () => {
  return shouldLoadMore.value ? loadData() : null;
};
const loadData = () => {
  loading.value = true;
  setTimeout(() => {
    count.value += 2;
    loading.value = false;
  }, 2000);
};
const handleScroll = () => {
  if (loading.value || noMore.value) return;
  loadData();
};

const changeSelectTimeRange = (val) => {};
const jumpTo = () => {
  router.push({
    path: "infinitescroll",
    query: {
      id: "13070300058",
    },
  });
};
// 监听数据变化
watch(
  () => router.currentRoute,
  (to, from) => {
    location.reload();
  },
  //深度监听
  { deep: true }
);
onMounted(() => {
  const scrollContainer = document.querySelector(".infinite-list-wrapper");
  const list = scrollContainer.querySelector(".list");
  if (scrollContainer.clientHeight < list.clientHeight) {
    shouldLoadMore.value = true;
  }
});
</script>

<script>
export default {
  name: "InfiniteScroll",
  // 省略其他代码
};
</script>
<style scoped>
.main-inner-box {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.infinite-list-wrapper {
  height: 300px;
  text-align: center;
}
.list {
  /* height: 101%; */
}
.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}
.icon-list-box {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.warn-filled:hover {
  color: #1b1818;
}
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
.plate-box {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.star-icon:hover {
  /* background-color: rgb(243, 192, 8); */
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
</style>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>