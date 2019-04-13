<template>
  <div class="container">
    <p>修改个人信息</p>
    <el-input
      class="name"
      placeholder="请输入姓名"
      v-model="userName"
      clearable>
    </el-input>
    <el-radio v-model="sex" label="男" border>男</el-radio>
    <el-radio v-model="sex" label="女" border>女</el-radio>
    <el-input
      class="other"
      placeholder="请输入电话号码"
      v-model="phone_number"
      clearable>
    </el-input>
    <el-input
      class="other"
      placeholder="请输入邮件地址"
      v-model="email"
      clearable>
    </el-input>
    <el-input
      class="other"
      type="textarea"
      placeholder="请输入自我介绍"
      v-model="introduction"
      clearable>
    </el-input>
    <el-button type="primary" class="btn">确认修改</el-button>
  </div>
</template>

<script>
export default {
  name: 'ChangeUserinfo',
  data () {
    return {
      userName: '',
      sex: '',
      introduction: '',
      phone_number: '',
      email: '',
      avatar: ''
    }
  }
}
</script>

<style>
  p{
    font-size: 24px;
  }
  .container{
    width:40%;
    margin: 50px auto 0;
  }
  .name{
    margin-bottom: 20px;
  }
  .other{
    margin-top: 20px;
  }
  .btn{
    margin-top: 30px;
  }
</style>