<script>
  import Chart from 'chart.js'

  export default {
    props: {
      chartData: {
        type: Array,
        required: true
      }
    },
    mounted() {
      const chartData = this.chartData
      const ctx = this.$refs.myChart.getContext('2d')
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.map(data => data.month),
          datasets: [{
            label: 'Answer Rate',
            data: chartData.map(data => data.answer_rate),
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
      }
    )
  },
}
</script>

<template>
  <canvas ref="myChart"></canvas>
</template>
