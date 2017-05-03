<style lang="scss" scoped>
.s-paper-table {
  margin: 20px 0 0 0;
}
</style>
<template>
  <Row>
    <Col span="12" offset="6">
      <student-nav activeName="analysis"></student-nav>
      <canvas ref="lineChart"></canvas>
    </Col>
  </Row>
</template>
<script>
import StudentNav from '../sub/student-nav'
import NAME from '../../router/name'
import $ from 'jquery'
import PaperIO from '../../io/PaperIO'
import moment from 'moment'
import Chart from 'chart.js'

export default {
  data () {
    return {
      exams: null
    }
  },

  mounted () {
    const self = this
    this.fetchData(() => {
      self.drawLineChart();
    });
    this.paperCarHide();
  },

  methods: {
    fetchData (cb) {
      const self = this;
      const user = USER;
      new PaperIO().getExam({user}).then(res => {
        self.exams = res.data;
        cb && cb();
      })
    },

    drawLineChart () {
      const self = this;

      const labels = [];
      const scoreData = []
      self.exams.forEach((exam) => {
        labels.push(exam.name);
        scoreData.push(exam.score);
      })

      var data = {
          labels: labels,
          datasets: [
              {
                  label: "历次考试分数",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: scoreData,
                  spanGaps: false,
              }
          ]
      };

      let lineChart = new Chart.Line(self.$refs.lineChart, {
        data: data
      })
    },

    paperCarHide () {
      $('.container-paper-car').hide()
    }
  },
  
  components: {
    StudentNav
  }
}
</script>
