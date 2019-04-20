<template>
  <div class="contract_container">
    <h3>新增合同记录</h3>
    <el-form class="form" label-width="80px">
      <el-form-item label="合同标题" :label-width="labelWidth">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      
      <el-form-item label="合同详情" :label-width="labelWidth">
        <el-input type="textarea" v-model="form.contractInfo"></el-input>
      </el-form-item>

      <el-form-item label="出租人姓名" :label-width="labelWidth">
        <el-input v-model="form.renterName"></el-input>
      </el-form-item>

      <el-form-item label="租客姓名" :label-width="labelWidth">
        <el-input v-model="form.seekerName"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="onSubmit">立即新增</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          userId: sessionStorage.getItem('userId'),
          title: '',
          contractInfo: '',
          renterName:'',
          seekerName: ''
        },
        labelWidth: '100px'
      }
    },
    methods: {
      onSubmit() {
        if (this.form.title && this.form.contractInfo && this.form.renterName && this.form.seekerName) {
          this.axios.post('/api/contract/addContract', {
            userId: this.form.userId,
            title: this.form.title,
            contractInfo: this.form.contractInfo,
            renterName: this.form.renterName,
            seekerName: this.form.seekerName
          }, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
            }
          })
            .then((res) => {
              if (res.data.status === 200) {
                this.$message({
                  message: res.data.message,
                  type: 'success'
                })
                this.form.title = '',
                this.form.contractInfo = '',
                this.form.renterName = '',
                this.form.seekerName = ''
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
