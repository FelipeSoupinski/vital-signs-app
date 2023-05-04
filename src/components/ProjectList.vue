<script>
  import axios from "axios"

  export default {
    name: 'ProjectList',

    data: () => ({
      search: '',
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
        { 
          text: 'Link in GitHub',
          align: 'start',
          filterable: false,
          value: 'link_gh'
        },
        { 
          text: 'Is dead?',
          align: 'start',
          filterable: false,
          value: 'is_dead',
          getter: (is_dead) => is_dead ? 'Yes' : 'No'
        },
      ],
      projects: [],
    }),

    computed: {
      projectsComputed() {
        return this.projects.map(project => ({
          ...project,
          is_dead: (project.is_dead ? 'Yes' : 'No')
        }))
      },  
    },

    async mounted() {
      const apiResponse = await axios.get(
        `${process.env.VUE_APP_API_HOST}/projects`
      )
      this.projects.push(...apiResponse.data.projects)
    },

    methods: {
      changeRoute(element) {
        this.$router.push('/projects/' + element.tag_so)
      }
    }
  }
</script>

<template>
  <v-container>
    <v-card class="mt-15">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          data-cy="project-search"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="projectsComputed"
        :search="search"
        @click:row="changeRoute($event)"
        data-cy="projects-list"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>
