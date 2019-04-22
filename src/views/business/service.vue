<template>
  <div class="container">
    <div>
      <el-button type="primary" @click="dialogFormVisible=true">新增售后记录</el-button>
      <el-dialog title="新增售后记录" :visible.sync="dialogFormVisible" center width="40%">
        <el-form :model="form">
          <el-form-item label="售后事件" :label-width="formLabelWidth">
            <el-input v-model="form.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="售后详情" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.info" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="客户名字" :label-width="formLabelWidth">
            <el-input v-model="form.customerName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="客户电话" :label-width="formLabelWidth">
            <el-input v-model="form.customerPhone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="处理人" :label-width="formLabelWidth">
            <el-input v-model="form.handlerName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="处理状态" :label-width="formLabelWidth">
            <el-select v-model="form.status" placeholder="请选择处理状态">
              <el-option label="未处理" value="未处理"></el-option>
              <el-option label="处理中" value="处理中"></el-option>
              <el-option label="已处理" value="已处理"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addService">确 定</el-button>
        </div>
      </el-dialog>

      <el-table
        class="table"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="售后事件"
          width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="事件详情"
          width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.info }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="顾客名字"
          width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.customerName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="顾客电话"
          width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.customerPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="处理人"
          width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.handlerName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="处理状态"
          width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
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

      <el-dialog title="编辑记录" :visible.sync="editFormVisible" center width="40%">
        <el-form :model="editForm">
          <el-form-item label="售后事件" :label-width="formLabelWidth">
            <el-input v-model="editForm.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="事件详情" :label-width="formLabelWidth">
            <el-input v-model="editForm.info" auto-complete="off" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="顾客名字" :label-width="formLabelWidth">
            <el-input v-model="editForm.customerName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="顾客电话" :label-width="formLabelWidth">
            <el-input v-model="editForm.customerPhone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="处理人" :label-width="formLabelWidth">
            <el-input v-model="editForm.handlerName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="处理状态" :label-width="formLabelWidth">
            <el-select v-model="editForm.status" placeholder="请选择处理状态">
              <el-option label="未处理" value="未处理"></el-option>
              <el-option label="处理中" value="处理中"></el-option>
              <el-option label="已处理" value="已处理"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="this.confirmEdit">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      dialogFormVisible: false,
      editFormVisible: false,
      form: {
        title: '',
        info: '',
        customerName: '',
        customerPhone: '',
        handlerName: '',
        status: ''
      },
      formLabelWidth: '120px',
      tableData: [
        // {
        //   title: 'title',
        //   info: 'info',
        //   customerName: 'customerName',
        //   customerPhone: 'customerPhone',
        //   handlerName: 'handlerName',
        //   status: 'status',
        //   reactId: 1
        // }
      ],
      editForm: {}
    }
  },
  methods: {
    getData () {
      this.axios.get('/react/showReacts', {
        params: {
          userId: sessionStorage.getItem('userId')
        }
      })
        .then((res) => {
          // console.log(res)
          if (res.data.status === 200) {
            this.tableData = res.data.data
          }
        })
    },
    checkValid (obj) {
      for(var key in obj){
        if (obj[key] != '0' && !obj[key]) {
          return false
        }
      }
      return true
    },
    addService () {
      let flag = this.checkValid(this.form)
      if (flag) {
        this.axios.post('/react/addReact', {
          title: this.form.title,
          info: this.form.info,
          customerName: this.form.customerName,
          customerPhone: this.form.customerPhone,
          handlerName: this.form.handlerName,
          status: this.form.status,
          userId: this.userId
        })
          .then((res) => {
            // console.log(res)
            if (res.data.status === 200) {
              this.dialogFormVisible = false
              this.$message({
                type: 'success',
                message: res.data.message
              })
            }
          })
      } else {
        this.$message({
          type: 'warning',
          message: '请先填入完整信息'
        })
      }
    },
    handleEdit(index, row) {
      // console.log(index, row)
      this.editFormVisible = true
      this.editForm = row
    },
    confirmEdit () {
      let flag = this.checkValid(this.editForm)
      // console.log(this.editForm)
      if (flag) {
        this.axios.put('/react/updateReact', {
          title: this.editForm.title,
          info: this.editForm.info,
          customerName: this.editForm.customerName,
          customerPhone: this.editForm.customerPhone,
          handlerName: this.editForm.handlerName,
          status: this.editForm.status,
          userId: this.userId,
          reactId: this.editForm.reactId
        })
          .then((res) => {
            console.log(res)
            if (res.data.status === 200) {
              // this.getTableData()
              this.$message({
                type: 'success',
                message: res.data.message
              })
              this.editFormVisible = false
            } else {
              this.$message.error(res.data.message)
            }
          })
      } else {
        this.$message({
          type: 'warning',
          message: '请先填写完整兼职'
        })
      }
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/react/deleteReact', {
          params: {
            reactId: row.reactId
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
  mounted() {
    this.getData()
  }
}
</script>

<style scoped>
  .container{
    margin: 10px;
  }
</style>
