<template>
  <div class="contract_container">
    <h3>新增出租记录</h3>
    <el-form class="form" label-width="80px">
      <el-form-item label="房产名称" :label-width="labelWidth">
        <el-input v-model="form.houseName"></el-input>
      </el-form-item>
      
      <el-form-item label="房产面积" :label-width="labelWidth">
        <el-input type="textarea" v-model="form.houseArea"></el-input>
      </el-form-item>

      <el-form-item label="房屋地址" :label-width="labelWidth">
        <el-input v-model="form.houseAddress"></el-input>
      </el-form-item>

      <el-form-item label="房间数量" :label-width="labelWidth">
        <el-input v-model="form.houseBeds"></el-input>
      </el-form-item>
      <el-form-item label="厕所数量" :label-width="labelWidth">
        <el-input v-model="form.houseBaths"></el-input>
      </el-form-item>
      <el-form-item label="客厅数量" :label-width="labelWidth">
        <el-input v-model="form.houseHall"></el-input>
      </el-form-item>
      <el-form-item label="房产信息" :label-width="labelWidth">
        <el-input v-model="form.houseInfo"></el-input>
      </el-form-item>
      <el-form-item label="出租价格" :label-width="labelWidth">
        <el-input v-model="form.housePrice"></el-input>
      </el-form-item>
      <el-form-item label="出租人姓名" :label-width="labelWidth">
        <el-input v-model="form.renterName"></el-input>
      </el-form-item>
      <el-form-item label="出租人电话" :label-width="labelWidth">
        <el-input v-model="form.renterPhone"></el-input>
      </el-form-item>
      <el-form-item label="出租人邮箱" :label-width="labelWidth">
        <el-input v-model="form.renterEmail"></el-input>
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
          houseAddress: '',
          houseArea: '',
          houseBaths: '',
          houseBeds: '',
          houseHall: '',
          houseInfo: '',
          houseName: '',
          housePrice: '',
          renterName: '',
          renterPhone: '',
          renterEmail: ''
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
          this.axios.post('/api/rent/addRent', {
            userId: this.form.userId,
            houseAddress: this.form.houseAddress,
            houseArea: parseInt(this.form.houseArea),
            houseBaths: parseInt(this.form.houseBaths),
            houseBeds: parseInt(this.form.houseBeds),
            houseHall: parseInt(this.form.houseHall),
            houseInfo: this.form.houseInfo,
            houseName: this.form.houseName,
            housePrice: this.form.housePrice,
            renterName: this.form.renterName,
            renterPhone: this.form.renterPhone,
            renterEmail: this.form.renterEmail
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
                this.form.houseAddress = '',
                this.form.houseArea ='',
                this.form.houseBaths = '',
                this.form.houseBeds = '',
                this.form.houseHall = '',
                this.form.houseInfo = '',
                this.form.houseName = '',
                this.form.housePrice = '',
                this.form.renterName = '',
                this.form.renterPhone = '',
                this.form.renterEmail = ''
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
