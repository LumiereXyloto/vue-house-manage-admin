<template>
  <div id="main"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Volume',
  methods: {
    getPaint() {
      // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
          title : {
            text: '交易成交量统计',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['出租数量','求租数量','成交数量']
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:335, name:'出租数量'},
                {value:310, name:'求租数量'},
                {value:234, name:'成交数量'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
  },
  mounted() {
    this.getPaint()
  }
}
</script>

<style>
  #main{
    margin: 50px 0 0 200px;
    width: 700px;
    height: 500px;
  }
</style>
