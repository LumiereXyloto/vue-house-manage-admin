<template>
  <div class="contract_container">
    <h3>我的个人信息</h3>
    <el-form class="form" label-width="80px">
      <el-form-item label="用户名称" :label-width="labelWidth">
        <el-input v-model="data.userName" :disabled="disabledFlag"></el-input>
      </el-form-item>
      <el-form-item label="用户ID" :label-width="labelWidth">
        <el-input v-model="data.userId" :disabled="disabledFlag"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" :label-width="labelWidth">
        <el-input v-model="data.realName" :disabled="disabledFlag"></el-input>
      </el-form-item>
      <el-form-item label="用户生日" :label-width="labelWidth">
        <el-input v-model="data.birthDate" :disabled="disabledFlag"></el-input>
      </el-form-item>
      <el-form-item label="用户职业" :label-width="labelWidth">
        <el-input v-model="data.job" :disabled="disabledFlag"></el-input>
      </el-form-item>
      <el-form-item label="用户学历" :label-width="labelWidth">
        <el-input v-model="data.education" :disabled="disabledFlag"></el-input>
      </el-form-item>
      <el-form-item label="用户电话" :label-width="labelWidth">
        <el-input v-model="data.phoneNumber" :disabled="disabledFlag"></el-input>
      </el-form-item>
      <el-form-item label="身份证" :label-width="labelWidth">
        <el-input v-model="data.idNumber" :disabled="disabledFlag"></el-input>
      </el-form-item>
      <el-form-item label="用户性别" :label-width="labelWidth">
        <el-input v-model="data.sex" :disabled="disabledFlag"></el-input>
      </el-form-item>
      <el-form-item label="用户住址" :label-width="labelWidth">
        <el-input v-model="data.homeAddress" :disabled="disabledFlag"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" :label-width="labelWidth">
        <el-input v-model="data.email" :disabled="disabledFlag"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      data: {},
      labelWidth: '100px',
      disabledFlag: true
    }
  },
  methods: {
    getData () {
      this.axios.get('/user/getUserById', {
        params: {
          userId: this.userId
        }
      })
        .then((res) => {
          // console.log(res.data.data)
          if (res.data.status === 200) {
            this.data = res.data.data
          }
        })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>
  .contract_container{
    margin-top: 10px;
    text-align: center;
  }
  .form{
    width:40%;
    margin: 0 auto 20px;
  }
  h3{
    color: #3F3F3F;
    text-align: center;
    margin-bottom: 40px;
  }
</style>
