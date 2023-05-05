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
      },
      project: {
        type: Object,
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
        const ctx = this.$refs.myChart.getContext('2d')

        this.chartData = {
          type: 'line',
          data: {
            labels: this.value.map(data => data.month),
            datasets: [{
              label: 'Answer Rate',
              data: this.value.map(data => data.answer_rate),
              backgroundColor: 'transparent',
              borderColor: 'blue',
              borderWidth: 1,
              pointBackgroundColor: this.value.map(() => 'transparent'),
              pointBorderColor: this.value.map(() => 'blue'),
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

        if (this.project.is_dead && this.project.death_date) {
          const projectDeathDate = new Date(this.project.death_date).toISOString().slice(0, 10)
          const monthIndex = this.chartData.data.labels.indexOf(projectDeathDate)
          if (monthIndex !== -1) {
            this.chartData.data.datasets[0].pointBackgroundColor[monthIndex] = 'red'
            this.chartData.data.datasets[0].pointBorderColor[monthIndex] = 'red'
          }
        }

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
      clearFilter() {
        this.valueFiltered = null
      },
    }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-end">
      <div class="col col-4">
        <h2>{{ this.project.name }}</h2>
      </div>
      <div class="col col-6 col-lg-2 col-md-2 col-sm-3">
        <date-picker
          v-model="startDate"
          :label="'Start Month'"
          :type="'month'"
        ></date-picker>
      </div>
      <div class="col col-6 col-lg-2 col-md-2 col-sm-3">
        <date-picker
          v-model="endDate"
          :label="'End Month'"
          :type="'month'"
        ></date-picker>
      </div>
      <div class="col col-6 col-lg-2 col-md-2 col-sm-3 pt-5">
        <v-btn color="blue darken-1" dark @click="filterDateRange">
          <v-icon>mdi-filter</v-icon>
          Filter
        </v-btn>
      </div>
      <div class="col col-6 col-lg-2 col-md-2 col-sm-3 pt-5">
        <v-btn color="red darken-1" dark @click="clearFilter">
          <v-icon>mdi-close</v-icon>
          Clear
        </v-btn>
      </div>
    </div>
    <div class="row">
      <div class="col col-12">
        <canvas ref="myChart"></canvas>
        <div v-if="project.is_dead" class="chart-legend">
          <span class="legend-dot"></span>
          <span class="legend-label">
            Death date 
            {{ project.death_date.slice(0, 10).split('-').reverse().join('/') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .justify-content-end {
    justify-content: flex-end;
  }
  
  .chart-legend {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
  
  .legend-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
    background-color: red;
  }
  
  .legend-label {
    font-size: 14px;
    font-weight: bold;
  }
</style>
