<template>
    <div id="main-body">
        <router-view />
    </div>
</template>

<style scoped>
#main-body {
    position: absolute;
    left: 0;
    top: 5.4vh;
    height: calc(100% - 5.4vh);
    width: 100%;
    /* background: #3B4B5D; */
}
</style>