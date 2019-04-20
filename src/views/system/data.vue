<template>
  <div class="container">
    <el-button type="primary" plain @click="open2">点击清空所有数据</el-button>
  </div>
</template>

<script>
export default {
  name: 'Data',
  methods: {
    open2() {
      this.$confirm('此操作将永久清空所有数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('api/user/format', {
          params: {
            userId: sessionStorage.getItem('userId')
          }
        })
          .then((res) => {
            if (res.data.status === 200) {
              this.$message({
                type: 'success',
                message: res.data.message
              });
            } else {
              this.$message.error('操作失败')
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  }
}
</script>

<style scoped>
  .container{
    margin: 50px 100px;
  }
</style>
