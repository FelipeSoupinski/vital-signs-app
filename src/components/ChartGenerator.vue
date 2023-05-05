<script>
  import Chart from 'chart.js'

  export default {
    props: {
      value: {
        type: Array,
        required: true
      }
    },
    data: () => ({
      chartData: null,
      myChart: null
    }),
    watch: {
      value: {
        handler() {
          this.updateChartData()
        },
        deep: true
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
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        };

        this.myChart = new Chart(ctx, {
          type: this.chartData.type,
          data: this.chartData.data,
          options: this.chartData.options
        });

        this.$emit('input', this.value);
      },
      updateChartData() {
        this.chartData.data.labels = this.value.map(data => data.month)
        this.chartData.data.datasets[0].data = this.value.map(data => data.answer_rate)

        this.myChart.update();

        this.$emit('input', this.value);
      }
    }
}
</script>

<template>
  <canvas ref="myChart"></canvas>
</template>
