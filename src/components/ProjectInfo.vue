<script>
  import axios from "axios"
  import ChartAnswerRate from './ChartAnswerRate.vue'

  export default {
    name: 'ProjectInfo',
    components: {
      ChartAnswerRate
    },
    data: () => ({
      answerRates: [],
      project: { name: '' }
    }),
    async mounted() {
      const projectTag = this.$route.path.split('/')[2] || ''
      const apiResponseProject = await axios.get(
        `${process.env.VUE_APP_API_HOST}/project/${projectTag}`
      )
      this.project = apiResponseProject?.data?.project
      const apiResponseAnswerRates = await axios.get(
        `${process.env.VUE_APP_API_HOST}/answer-rate/${projectTag}`
      )
      this.answerRates = apiResponseAnswerRates?.data?.answer_rates
    },
  }
</script>

<template>
  <v-container>
    <div class="row mt-5" data-cy="project-info-chart">
      <div class="col col-12">
        <chart-answer-rate 
          v-model="answerRates"
          :project="project"
        ></chart-answer-rate>
      </div>
    </div>

  </v-container>
</template>
