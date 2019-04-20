<template>
  <div>
    <el-table
      class="table"
      :data="tableData"
      style="width: 100%">

      <el-table-column
        label="创建日期"
        width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime.substring(0,10) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="合同标题"
        width="300">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>合同详情: {{ scope.row.contractInfo }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.title }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="出租人"
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.renterName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="租客"
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.seekerName}}</span>
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

    <el-dialog title="编辑合同" :visible.sync="dialogFormVisible" center top="0">
      <el-form :model="editForm">
        <el-form-item label="合同标题" :label-width="formLabelWidth">
          <el-input v-model="editForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="合同详情" :label-width="formLabelWidth">
          <el-input v-model="editForm.contractInfo" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="出租人姓名" :label-width="formLabelWidth">
          <el-input v-model="editForm.renterName" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="租客姓名" :label-width="formLabelWidth">
          <el-input v-model="editForm.seekerName" auto-complete="off" type="textarea"></el-input>
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
    data() {
      return {
        formLabelWidth: '100px',
        dialogFormVisible: false,
        tableData: [],
        editForm: {
          contractInfo: '详情',
          title: '标题',
          renterName: '小王',
          seekerName: '小邓',
          contractId: ''
        },
        userId: sessionStorage.getItem('userId')
      }
    },
    methods: {
      handleEdit(index, row) {
        // console.log(index, row)
        this.dialogFormVisible = true
        this.editForm.contractId = row.contractId
      },
      confirmEdit () {
        if (this.editForm.contractInfo && this.editForm.title && this.editForm.renterName && this.editForm.seekerName) {
          this.axios.put('/contract/updateContract', {
            contractId: this.editForm.contractId,
            title: this.editForm.title,
            renterName: this.editForm.renterName,
            seekerName: this.editForm.seekerName,
            contractInfo: this.editForm.contractInfo,
            userId: this.userId
          })
            .then((res) => {
              console.log(res)
              if (res.data.status === 200) {
                this.getTableData()
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
          this.axios.delete('/contract/deleteContract', {
            params: {
              contractId: row.contractId
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
      },
      getTableData() {
        this.axios.get('/contract/findContractByUserId', {
          params: {
            userId: sessionStorage.getItem('userId')
          }
        })
          .then((res) => {
            if (res.data.status === 200) {
              this.tableData = res.data.data
            }
            // console.log(res)
          })
      }
    },
    mounted() {
      this.getTableData()
    }
  }
</script>

<style>
  .table{
    margin: 20px 50px;
  }
</style>
