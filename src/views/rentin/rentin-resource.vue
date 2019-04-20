<template>
  <div>
    <el-table
      class="table"
      :data="tableData"
      style="width: 100%">

      <el-table-column
        label="求租人姓名"
        width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.seekerName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="求租人电话"
        width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.seekerPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="求租人邮箱"
        width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.seekerEmail }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑" :visible.sync="dialogFormVisible" center top="15vh" width="40%">
      <el-form>
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
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="this.confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RentoutResource',
  data () {
    return {
      tableData: [],
      form: {
        userId: sessionStorage.getItem('userId'),
        seekerName: '',
        seekerPhone: '',
        seekerEmail: ''
      },
      labelWidth: '100px',
      dialogFormVisible: false
    }
  },
  methods: {
    getData () {
      this.axios.get('/api/seek/showSeeks')
        .then((res) => {
          // console.log(res.data.data)
          if (res.data.status === 200) {
            this.tableData = res.data.data
          }
        })
    },
    handleEdit(index, row) {
      // console.log(index, row)
      this.dialogFormVisible = true
      this.form = row
      // console.log(this.form)
    },
    checkValid (obj) {
      for(var key in obj){
        if (obj[key] != '0' && !obj[key]) {
          return false
        }
      }
      return true
    },
    confirmEdit () {
      if (this.checkValid(this.form)) {
        this.axios.put('/api/seek/updateSeek', {
          userId: this.form.userId,
          seekerName: this.form.seekerName,
          seekerPhone: this.form.seekerPhone,
          seekerEmail: this.form.seekerEmail
        })
          .then((res) => {
            // console.log(res)
            if (res.data.status === 200) {
              this.getData()
              this.$message({
                type: 'success',
                message: res.data.message
              })
              this.dialogFormVisible = false
            } else {
              this.$message.error(res.data.message)
            }
          })
      } else {
        this.$message({
          type: 'warning',
          message: '请先填写完整信息'
        })
      }
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/api/seek/deleteSeek', {
          params: {
            seekId: row.seekId
          }
        })
          .then((res) => {
            if (res.data.status === 200) {
              this.tableData.splice(index, 1)
              this.$message({
                type: 'success',
                message: res.data.message
              })
            } else {
              this.$message.error(res.data.message)
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
      // console.log(index, row);
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style>
  
</style>