<template>
  <div class="contract_container">
    <h3>修改个人信息</h3>
    <el-form class="form" label-width="80px">
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
      <el-form-item>
        <el-button type="primary" @click="this.update">提交</el-button>
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
      disabledFlag: false
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
    },
    update () {
      this.axios.put('/user/update', {
        userId: this.data.userId,
        birthDate: this.data.birthDate,
        education: this.data.education,
        // email: this.data.email,
        homeAddress: this.data.homeAddress,
        idNumber: this.data.idNumber,
        job: this.data.job,
        realName: this.data.realName,
        sex: this.data.sex
      })
        .then((res) => {
          if (res.data.status === 200) {
            console.log(res)
            this.$message({
              type: 'success',
              message: res.data.message
            })
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
