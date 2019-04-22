<template>
  <div class="container">
    <p>修改密码</p>
    <el-form class="demo-ruleForm">
      <el-form-item>
        <el-input type="password" auto-complete="off" placeholder="请输入原始密码" v-model="oldPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" auto-complete="off" placeholder="请设置新的密码" v-model="newPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="this.changePassword">提交</el-button>
        <el-button @click="this.reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Password',
  data () {
    return {
      sessionPassword: sessionStorage.getItem('password'),
      oldPassword: '',
      newPassword: ''
    }
  },
  methods: {
    checkValid () {
      if (this.oldPassword && this.newPassword) {
        return true
      } else {
        this.$message({
          type: 'warning',
          message: '请先输入原密码和新密码'
        })
        return false
      }
    },
    changePassword () {
      let check = this.checkValid()
      if (check) {
        if (this.oldPassword !== this.sessionPassword) {
          this.$message({
            type: 'warning',
            message: '原始密码错误，请重试'
          })
          return false
        } else {
          this.axios.put('/user/update', {
            password: this.newPassword,
            userId: sessionStorage.getItem('userId')
          })
            .then((res) => {
              // console.log(res)
              if (res.data.status === 200) {
                this.$message({
                  type: 'success',
                  message: res.data.message
                })
                sessionStorage.setItem('password', this.newPassword)
                this.reset()
              } else {
                this.$message.error('修改失败')
              }
            })
        }
      }
    },
    reset () {
      this.oldPassword = '',
      this.newPassword = ''
    }
  }
}
</script>

<style scoped>
  p{
    font-size: 24px;
  }
  .container{
    width:40%;
    margin: 50px auto 0;
  }
</style>
