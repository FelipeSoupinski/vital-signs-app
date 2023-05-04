<script>
  import axios from "axios"
  import ChartGenerator from './ChartGenerator.vue'

  export default {
    name: 'ProjectInfo',
    components: {
      ChartGenerator
    },
    data: () => ({
      answerRates: null
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
      console.log('this.answerRates', this.answerRates)
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
    <div class="mt-15" data-cy="project-info-chart">
      <chart-generator :chart-data="answerRates"></chart-generator>
    </div>

  </v-container>
</template>
