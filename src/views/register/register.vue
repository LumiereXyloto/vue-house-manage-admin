<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="form" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">家诚房屋中介管理系统用户注册</h3>
      <el-form-item>
        <el-input v-model="form.userName" type="text" auto-complete="on" placeholder="设置用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :type="pwdType"
          placeholder="设置密码"
          v-model="form.password"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.realName" type="text" auto-complete="on" placeholder="输入真实姓名" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.sex" placeholder="请选择性别" class="select">
          <el-option value="男"></el-option>
          <el-option value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.idNumber" type="text" auto-complete="on" placeholder="输入身份证号" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.education" type="text" auto-complete="on" placeholder="输入学历" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.job" type="text" auto-complete="on" placeholder="输入工作" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.birthDate" type="text" auto-complete="on" placeholder="输入生日" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.phoneNumber" type="text" auto-complete="on" placeholder="输入电话号码" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.homeAddress" type="text" auto-complete="on" placeholder="输家庭住址" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.email" type="text" auto-complete="on" placeholder="输入邮件地址" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRegister">
          注 册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data() {
    return {
      form: {
        userName: '',
        password: '',
        sex: '',
        idNumber: '',
        education: '',
        job: '',
        birthDate: '',
        phoneNumber: '',
        homeAddress: '',
        email: '',
        realName: ''
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleRegister() {
      if (this.form.userName && this.form.password && this.form.sex && this.form.idNumber && this.form.education && this.form.job && this.form.birthDate && this.form.phoneNumber && this.form.homeAddress &&this.form.email) {
        this.loading = true
        this.axios.post('/user/register', {
          userName: this.form.userName,
          password: this.form.password,
          sex: this.form.sex,
          idNumber: this.form.idNumber,
          education: this.form.education,
          job: this.form.job,
          birthDate: this.form.birthDate,
          phoneNumber: this.form.phoneNumber,
          homeAddress: this.form.homeAddress,
          email: this.form.email,
          realName: this.form.realName
        }, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
          .then((res) => {
            console.log(res)
            if (res.data.status === 200) {
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.loading = false
              sessionStorage.setItem('userId', res.data.data.userId)
              sessionStorage.setItem('password', res.data.data.password)
              this.$router.replace('/dashboard')
            } else {
              this.$message.error(res.data.message)
              this.loading = false
            }
          })
      } else {
        this.$message({
          message: '请先完善个人信息！',
          type: 'warning'
        });
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 40px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 0 auto 0;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 10px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .select{
    width: 100%;
  }
  .el-form-item {
    margin-bottom: 6px;
  }
}
</style>
