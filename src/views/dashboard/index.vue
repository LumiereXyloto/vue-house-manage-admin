<template>
  <div class="container">
    <img src="@/assets/images/timg.jpg"/>
    <p class="title">欢迎来到家诚房屋中介管理系统</p>
    <p>使用说明：</p>
    <p>1.点击左侧折叠面板进行相应功能的选组</p>
    <p>2.用户可点击右上角进行退出操作以及返回首页</p>
    <p>3.格式化数据后不可恢复</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container{
    width: 1000px;
    margin: 0 auto;
    position: relative;
  }
  .container img{
    width: 100%;
    position:relative;
    top: 10px;
  }
  .title{
    font-size: 32px;
    font-weight: bold;
    color: #3F3F3F;
    width: 800px;
    text-align: center;
    left: 100px;
    top: 20px;
    position: absolute;
  }
</style>
