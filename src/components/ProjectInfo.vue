<script>
  import axios from "axios"
  import ChartAnswerRate from './ChartAnswerRate.vue'

  export default {
    name: 'ProjectInfo',
    components: {
      ChartAnswerRate
    },
    data: () => ({
      answerRates: []
    }),

    computed: {
      getProjectName() {
        const projectName = this.$route.path.split('/')[2] || ''
        return projectName[0].toUpperCase() + projectName.slice(1)
      }
    },

    async mounted() {
      const projectTag = this.$route.path.split('/')[2] || ''
      const apiResponse = await axios.get(
        `${process.env.VUE_APP_API_HOST}/answer-rate/${projectTag}`
      )
      this.answerRates = apiResponse.data.answer_rates
    },

    methods: {

    }
  }
</script>

<template>
  <v-container>
    <div class="text-center">
      <h1>{{ getProjectName }}</h1>
    </div>
    <div class="row mt-5" data-cy="project-info-chart">
      <div class="col col-12">
        <chart-answer-rate v-model="answerRates"></chart-answer-rate>
      </div>
    </div>

  </v-container>
</template>
