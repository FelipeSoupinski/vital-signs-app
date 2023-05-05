<script>
  import Chart from 'chart.js'
  import DatePicker from './DatePicker.vue'

  export default {
    components: {
      DatePicker
    },
    props: {
      value: {
        type: Array,
        required: true
      }
    },
    data: () => ({
      valueFiltered: null,
      chartData: null,
      myChart: null,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10)
    }),
    watch: {
      value: {
        handler() {
          this.updateChartData()
        },
        deep: true
      },
      valueFiltered: {
        handler() {
          this.updateChartData()
        },
        deep: true
      },
    },
    computed: {
      answerRatesComputed() {
        return this.valueFiltered ? this.valueFiltered : this.value 
      }
    },
    mounted() {
      this.createChart()
    },
    methods: {
      createChart() {
        const ctx = this.$refs.myChart.getContext('2d');

        this.chartData = {
          type: 'line',
          data: {
            labels: this.value.map(data => data.month),
            datasets: [{
              label: 'Answer Rate',
              data: this.value.map(data => data.answer_rate),
              backgroundColor: 'transparent',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  unit: 'month',
                  displayFormats: {
                    month: 'MM/YYYY'
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Month'
                }
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Answer Rate'
                }
              }]
            }
          }
        }

        this.myChart = new Chart(ctx, {
          type: this.chartData.type,
          data: this.chartData.data,
          options: this.chartData.options
        })

        this.$emit('input', this.value)
      },
      updateChartData() {
        this.chartData.data.labels = this.answerRatesComputed.map(data => data.month)
        this.chartData.data.datasets[0].data = this.answerRatesComputed.map(data => data.answer_rate)

        this.myChart.update()

        this.$emit('input', this.value)
      },
      filterDateRange() {
        const start = new Date(this.startDate)
        const end = new Date(this.endDate)
        this.valueFiltered = this.value.filter(item => {
          const month = new Date(item.month)
          return month >= start && month <= end
        })
      },
    }
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col col-4 col-lg-2 col-md-2 col-sm-3 col-xs-6">
        <date-picker
          v-model="startDate"
          :label="'Start Month'"
          :type="'month'"
        ></date-picker>
      </div>
      <div class="col col-4 col-lg-2 col-md-2 col-sm-3 col-xs-6">
        <date-picker
          v-model="endDate"
          :label="'End Month'"
          :type="'month'"
        ></date-picker>
      </div>
      <div class="col col-4 col-lg-2 col-md-2 col-sm-3 col-xs-6 pt-5">
        <v-btn color="blue darken-1" dark @click="filterDateRange">
          <v-icon>mdi-filter</v-icon>
          Filter
        </v-btn>
      </div>
    </div>
    <div class="row">
      <div class="col col-12">
        <canvas ref="myChart"></canvas>
      </div>
    </div>
  </div>
</template>
