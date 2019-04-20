<template>
  <div class="contract_container">
    <h3>新增求租记录</h3>
    <el-form class="form" label-width="80px">
      <el-form-item label="求租人姓名" :label-width="labelWidth">
        <el-input v-model="form.seekerName"></el-input>
      </el-form-item>
      
      <el-form-item label="求租人电话" :label-width="labelWidth">
        <el-input v-model="form.seekerPhone"></el-input>
      </el-form-item>

      <el-form-item label="求租人邮箱" :label-width="labelWidth">
        <el-input v-model="form.seekerEmail"></el-input>
      </el-form-item>

    </el-form>
    <el-button type="primary" @click="onSubmit">立即新增</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userId: sessionStorage.getItem('userId'),
        form: {
          seekerName: '',
          seekerPhone: '',
          seekerEmail: ''
        },
        labelWidth: '100px'
      }
    },
    methods: {
      checkValid (obj) {
        for(var key in obj){
          if (obj[key] != '0' && !obj[key]) {
            return false
          }
        }
        return true
      },
      onSubmit() {
        let flag = this.checkValid(this.form)
        if (flag) {
          this.axios.post('/api/seek/addSeek', {
            userId: this.userId,
            seekerName: this.form.seekerName,
            seekerPhone: this.form.seekerPhone,
            seekerEmail: this.form.seekerEmail
          }, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
            }
          })
            .then((res) => {
              // console.log(res)
              if (res.data.status === 200) {
                this.$message({
                  message: res.data.message,
                  type: 'success'
                })
                this.form.seekerName = '',
                this.form.seekerPhone = '',
                this.form.seekerEmail = ''
              } else {
                this.$message.error('失败')
              }
            })
        } else {
          this.$message({
            message: '请先输入完整信息',
            type: 'warning'
          })
        }
      }
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
