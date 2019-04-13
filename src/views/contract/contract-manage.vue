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
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="合同标题"
        width="350">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>合同详情: {{ scope.row.contractInfo }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.title }}</el-tag>
            </div>
          </el-popover>
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

    <el-dialog title="编辑合同" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="合同标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="合同详情" :label-width="formLabelWidth">
          <el-input v-model="form.contractInfo" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
        form: {
          title: '标题',
          contractInfo: '详情'
        },
        tableData: [{
          createTime: '2019-4-13',
          title: '住房签约合同',
          contractInfo: '合同详情'
        }, {
          createTime: '2019-4-13',
          title: '住房签约合同',
          contractInfo: '合同详情'
        }, {
          createTime: '2019-4-13',
          title: '住房签约合同',
          contractInfo: '合同详情'
        }, {
          createTime: '2019-4-13',
          title: '住房签约合同',
          contractInfo: '合同详情'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogFormVisible = true
      },
      handleDelete(index, row) {
        this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        console.log(index, row);
      },
      getTableData() {
      this.axios.get('/contract')
        .then((res) => {
          if (res.data.status === 200) {
            this.tableData = res.data.data
          }
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
