<template>
  <div class="menuBox">
    <div class="menu-item" v-for="item in menuList" :key="item">
        <div class="menu-name" @click="changePageMenu(item)">{{item.name}}</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
// const route = useRoute();
const router = useRouter();

const menuList = [
  {
    name: "钉钉滚动",
    path: "dingscroll",
  },
  {
    name: "列表无限滚动",
    path: "infinitescroll",
  },
];

const changePageMenu = (item) => {
  if (item.path == "infinitescroll") {
    router.push({
        path: item.path,
        query: {
          id: "13070300052"
        }
    })
  } else {
    router.push({
        path: item.path
    })
  }
}

</script>

<style scoped>
.menuBox {
  height: 5.4vh;
  width: 100%;
  display: flex;
  align-items: center;
}
.menu-item {
    display: flex;
    height: 40%;
    align-items: center;
    border-right: 1px solid black;
    padding: 0 20px;
}
.menu-name {
    border-radius: 2px;
    padding: 2px 5px;
    cursor: pointer;
}
.menu-name:hover {
    background-color: rgba(40,44,52,0.5);
}
</style>
