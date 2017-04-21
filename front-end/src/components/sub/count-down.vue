<style scoped>
  .text {
    background-color: #000000;
    color: #ffffff;
    padding: 3px 2px;
    border-radius: 2px;
  }
</style>

<template>
  <div>
    <span class="text" :style="{ backgroundColor: bgColor, color: color }">{{hour}}</span><span :style="{ color: bgColor }">:</span><span
    class="text" :style="{ backgroundColor: bgColor, color: color }">{{minute}}</span><span :style="{ color: bgColor }">:</span><span
    class="text" :style="{ backgroundColor: bgColor, color: color }">{{second}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      date: Number,
      bgColor: {
        default: '#3399ff'
      },
      color: {
        default: '#FFFFFF'
      }
    },

    data () {
      return {
        hour: '00',
        minute: '00',
        second: '00',
        count: 0,
        interval: null
      }
    },

    mounted () {
      const self = this;
      function checkDate () {
        var timer;
        if(self.date == undefined){
          timer = setTimeout(checkDate, 200)
        }else{
          clearTimeout(timer)
          self.count = new Date().getTime() + self.date * 60 * 1000 - new Date().getTime()
          self.start();
        }
      }

      checkDate()
    },

    methods: {
      start () {
        this.interval = setInterval(() => {
          this.count = this.count - 1000
          if (this.count <= 0) {
            this.second = '00'
            clearInterval(this.interval)
            this.timeDown()
            return
          }
          this.hour = parseInt(this.count / (60 * 60 * 1000)) + ''
          if (this.hour < 10) {
            this.hour = '0' + this.hour
          }
          // console.log('hour-->' + this.hour)
          let n = this.count % (60 * 60 * 1000)
          this.minute = parseInt(n / (60 * 1000)) + ''
          if (this.minute < 10) {
            this.minute = '0' + this.minute
          }
          // console.log('minute-->' + this.minute)
          let n2 = n % (60 * 1000)
          this.second = parseInt(n2 / 1000) + ''
          if (this.second < 10) {
            this.second = '0' + this.second
          }
          // console.log('second-->' + this.second)
        }, 1000)
      },
      timeDown () {
        this.$emit('timeDown')
      }
    },
    computed: {}
  }
</script>