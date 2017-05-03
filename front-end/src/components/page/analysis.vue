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
      <four-pie :pie="pie"></four-pie>
    </Col>
  </Row>
</template>
<script>
import StudentNav from '../sub/student-nav'
import FourPie from '../sub/four-pie'
import NAME from '../../router/name'
import $ from 'jquery'
import PaperIO from '../../io/PaperIO'
import moment from 'moment'
import Chart from 'chart.js'

export default {
  data () {
    return {
      exams: null,
      pies: [],
      pie: null
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
      const scoreData = [];
      self.exams.forEach((exam) => {
        const tmp = {
          single: 0,
          mutiple: 0,
          blank: 0,
          judgement: 0,
          lost: 0,
        }

        labels.push(exam.name);
        scoreData.push(exam.score);

        exam.singleQuestions.forEach(question => {
          if(question.result === true){
            tmp.single += question.score
          }else{
            tmp.lost += question.score
          }
        })

        exam.mutipleQuestions.forEach(question => {
          if(question.result === true){
            tmp.mutiple += question.score
          }else{
            tmp.lost += question.score
          }
        })

        exam.blankQuestions.forEach(question => {
          if(question.result === true){
            tmp.blank += question.score
          }else{
            tmp.lost += question.score
          }
        })

        exam.judgementQuestions.forEach(question => {
          if(question.result === true){
            tmp.judgement += question.score
          }else{
            tmp.lost += question.score
          }
        })

        self.pies.push(tmp);
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
        data: data,
        options: {
          responsive: true
        }
      })

      self.$refs.lineChart.onclick = function(evt){
        var activePoint = lineChart.getElementsAtEvent(evt)[0];
        if(typeof activePoint !== 'undefined'){
          self.pie = self.pies[activePoint._index]
        }else{
          return
        }
      }
    },

    paperCarHide () {
      $('.container-paper-car').hide()
    }
  },
  
  components: {
    StudentNav,
    FourPie
  }
}
</script>
