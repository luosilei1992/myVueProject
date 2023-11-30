<template>
  <div class="rotation-box">
    居中
    <div class="container">
      <input type="radio" name="tabs" id="top" checked />
      <input type="radio" name="tabs" id="middle" />
      <input type="radio" name="tabs" id="bottom" />
      <div class="cube">
        <div class="content">
          <h1>top content</h1>
          <p>this is top content</p>
        </div>
        <div class="content">
          <h1>middle content</h1>
          <p>this is middle content</p>
        </div>
        <div class="content">
          <h1>bottom content</h1>
          <p>this is top bottom</p>
        </div>
      </div>
      <div class="labels">
        <label for="top" class="tab">top</label>
        <label for="middle" class="tab">middle</label>
        <label for="bottom" class="tab">bottom</label>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  name: "rotationBy3d",
};
</script>
<script setup>
</script>
<style scoped>
.rotation-box {
  width: 100%;
  height: 100%;
  background-color: #293846;
}
.container {
  width: 500px;
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-45%, -50%);
  color: #fff;
  text-transform: uppercase;
  perspective: 1300px;
}
input {
  display: none;
}
.labels {
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.tab {
    width: 100px;
    height: 80px;
    line-height: 80px;
    text-align: center;
}
.tab:nth-child(1) {
    background-color: #00b4db;
}
.tab:nth-child(2) {
    background-color: #009bc5;
}
.tab:nth-child(3) {
    background-color: #007ba4;
}
.content {
    width: 95%;
    height: 230px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.cube {
    position: relative;
    flex: 1;
    transform-style: preserve-3d;
    transition: transform 0.5s ease-in;
}
.content h1 {
    font-size: 28px;
}
.content p {
    font-size: 14px;
}
.content:nth-child(1) {
    background-color: #00b4db;
    transform: rotateX(-270deg) translateY(-115px);
    transform-origin: top center;
}
.content:nth-child(2) {
    background-color: #009bc5;
    transform: translateZ(115px);
}
.content:nth-child(3) {
    background-color: #007ba4;
    transform: rotateX(-90deg) translateY(115px);
    transform-origin: bottom center;
}
#top:checked ~ .cube {
    transform: rotateX(-90deg);
}
#middle:checked ~ .cube {
    transform: rotateX(0deg) translateY(10px);
}
#bottom:checked ~ .cube {
    transform: rotateX(90deg);
}
</style>