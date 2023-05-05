<script>
  import axios from "axios"

  export default {
    name: 'ProjectListScheduler',

    data: () => ({
      headers: [
        {
          text: 'Project Name',
          align: 'start',
          filterable: true,
          value: 'name',
        },
        { 
          text: 'Tag in Stack Overflow',
          align: 'start',
          filterable: true,
          value: 'tag_so'
        },
      ],
      projects: [],
    }),

    async mounted() {
      const apiResponse = await axios.get(
        `${process.env.VUE_APP_API_HOST}/projects`
      )
      this.projects.push(...apiResponse.data.projects)
    },

    methods: {
      changeRoute(element) {
        this.$router.push('/projects/' + element.tag_so)
      },
      async schedule() {
        const apiResponse = await axios.get(
          `${process.env.VUE_APP_API_HOST}/schedule`
        )
        if (apiResponse.data.success) {
          this.$showAlert({
            title: 'Scheduled projects',
            icon: 'success'
          })
        } else {
          this.$showAlert({
            title: 'Error on scheduled projects',
            icon: 'error'
          })
        }
      },
    }
  }
</script>

<template>
  <v-container>
    <div class="float-right">
      <v-btn color="blue darken-1" dark @click="schedule">
        <v-icon>mdi-calendar</v-icon>
        <span class="ml-2">Schedule</span>
      </v-btn>
    </div>
    <v-card class="mt-15">
      <v-data-table
        :headers="headers"
        :items="projects"
        @click:row="changeRoute($event)"
        data-cy="projects-list"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>
