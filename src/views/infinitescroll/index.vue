<template>
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
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import timeLine from "@/components/timeLine.vue";
import carPlate from "@/components/carPlate.vue";
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
</style>