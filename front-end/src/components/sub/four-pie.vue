<style lang="scss" scoped>

</style>
<template>
  <Row>
    <Col span="12" offset="6">
      <canvas ref="pieChart" height="200"></canvas>
    </Col>
  </Row>
</template>
<script>
import Chart from 'chart.js'

export default {
  data () {
    return {
    }
  },

  props: ['pie'],

  mounted () {
  },

  watch: {
    pie: function (val, oldVal) {
      const pie = this.pie;
      var data = {
          labels: [
              "单选题",
              "多选题",
              "填空题",
              "判断题",
              "未得分"
          ],
          datasets: [
              {
                  data: [pie.single, pie.mutiple, pie.blank, pie.judgement, pie.lost],
                  backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#00CE26",
                      "#CFCE56"
                  ],
                  hoverBackgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#00CE26",
                      "#CFCE56"
                  ]
              }]
      };

      new Chart(this.$refs.pieChart, {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true
        }
      })
    }
  },

  methods: {
  }
}
</script>
