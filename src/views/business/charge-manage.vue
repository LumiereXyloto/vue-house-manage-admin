<template>
  <div>
    <div id="main"></div>
    <div style="margin-top: 15px;" class="input">
      <el-input placeholder="请输入单笔出租收费" v-model="price.rentPrice" class="input-with-select">
        <template slot="prepend">出租收费</template>
      </el-input>
      <el-input placeholder="请输入单笔求租收费" v-model="price.seekPrice" class="input-with-select">
        <template slot="prepend">求租收费</template>
      </el-input>
      <el-input placeholder="请输入单笔成交收费" v-model="price.tradingPrice" class="input-with-select">
        <template slot="prepend">成交收费</template>
      </el-input>
      <el-button type="primary" @click="this.getPaint">确认</el-button>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'ChargeManage',
  data () {
    return {
      amount: {
        rentNum: 0,
        seekNum: 0,
        trading: 0
      },
      price: {
        rentPrice: 200,
        seekPrice: 100,
        tradingPrice: 500
      }
    }
  },
  methods: {
    getPaint() {
      let _this = this
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '数量', '总金额(单位：千)'],
            ['出租收费', _this.amount.rentNum, _this.amount.rentNum * _this.price.rentPrice / 1000],
            ['求租收费', _this.amount.seekNum, _this.amount.seekNum * _this.price.seekPrice / 1000],
            ['成交收费', _this.amount.trading, _this.amount.trading * _this.price.tradingPrice / 1000]
          ]
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            {type: 'bar'},
            {type: 'bar'}
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getData () {
      this.axios.get('/business/getTrading', {
        params: {
          userId: sessionStorage.getItem('userId')
        }
      })
        .then((res) => {
          // console.log(res)
          if (res.data.status === 200) {
            this.amount = res.data.data
            this.getPaint()
          }
        })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style>
  #main{
    margin: 50px 0 0 200px;
    width: 700px;
    height: 500px;
  }
  .input{
    width: 700px;
    margin-left: 230px;
  }
  .input-with-select{
    width: 25%;
  }
</style>
