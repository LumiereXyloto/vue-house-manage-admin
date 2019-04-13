<template>
  <div class="container">
    <h3>新增合同记录</h3>
    <el-form class="form" :model="form" label-width="80px">
      <el-form-item label="活动标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      
      <el-form-item label="合同详情">
        <el-input type="textarea" v-model="form.contractInfo"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          title: '',
          contractInfo: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>
  .container{
    margin-top: 50px;
    text-align: center;
  }
  .form{
    width:40%;
    margin: 0 auto 30px;
  }
  h3{
    color: #3F3F3F;
    text-align: center;
    margin-bottom: 40px;
  }
</style>
