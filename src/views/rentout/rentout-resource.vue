<template>
  <div>
    <el-table
      class="table"
      :data="tableData"
      style="width: 100%">

      <el-table-column
        label="房产名称"
        width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.houseName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="房产面积"
        width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.houseArea }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="房产地址"
        width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.houseAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更多详情"
        width="100">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>厕所数量: {{ scope.row.houseBaths }}</p>
            <p>房间数量: {{ scope.row.houseBeds }}</p>
            <p>厅堂数量: {{ scope.row.houseBeds }}</p>
            <p>房屋信息: {{ scope.row.houseInfo }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">查看</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="房产租金"
        width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.housePrice }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="出租人信息"
        width="150">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>出租人邮箱: {{ scope.row.renterEmail }}</p>
            <p>出租人电话: {{ scope.row.renterPhone }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.renterName }}</el-tag>
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

    <el-dialog title="编辑" :visible.sync="dialogFormVisible" center top="3vh" width="40%">
      <el-form>
        <el-form-item label="房产名称" :label-width="labelWidth">
          <el-input v-model="form.houseName"></el-input>
        </el-form-item>
        <el-form-item label="房产面积" :label-width="labelWidth">
          <el-input v-model="form.houseArea"></el-input>
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
      labelWidth: '100px',
      dialogFormVisible: false
    }
  },
  methods: {
    getData () {
      this.axios.get('/api/rent/showRents')
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
      console.log(this.form)
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
        this.axios.put('/api/rent/updateRent', {
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
        this.axios.delete('/api/rent/deleteRent', {
          params: {
            rentId: row.rentId
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