<script>
  import axios from "axios"

  export default {
    name: 'ProjectRegister',

    data: () => ({
      valid: true,
      form: {
        name: '',
        tag_so: null,
        link_gh: null,
        is_dead: false,
        death_date: null,
      }
    }),

    methods: {
      async createProject () {
        if (!this.$refs.form.validate()) {
          return false
        }
        const apiResponse = await axios.post(
          `${process.env.VUE_APP_API_HOST}/project`,
          this.form
        )
        if (apiResponse.data.success) {
          this.$showAlert({
            title: 'Project added',
            icon: 'success'
          })
          this.$router.push('/projects')
        } else {
          this.$showAlert({
            title: 'Error on add project',
            icon: 'error'
          })
        }
      },
      required: (v) => !!v || 'This field is required',
      isBeforeNow: (d) => new Date(d) <= new Date()
    },
  }
</script>

<template>
  <v-container class="form-container">
    <v-form 
      ref="form"
      v-model="valid"
      class="form"
      lazy-validation
    >

      <v-row class="justify-center text-center">
        <v-col cols="8">
          <h2>Submit a new Project</h2>
        </v-col>
      </v-row>

      <v-row class="justify-center text-center mt-5">
        <v-col cols="8" data-cy="project-name-container">
          <v-text-field
            v-model="form.name"
            :rules="[required]"
            data-cy="project-name"
          >
            <template #label>
              <span>Project Name</span>
              <span class="mandatory">*</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row class="justify-center text-center mt-5">
        <v-col cols="8" data-cy="project-tag-so-container">
          <v-text-field
            v-model="form.tag_so"
            :rules="[required]"
            data-cy="project-tag-so"
          >
            <template #label>
              <span>Tag in Stack Overflow</span>
              <span class="mandatory">*</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row class="justify-center text-center mt-5">
        <v-col cols="8" data-cy="project-link-gh-container">
          <v-text-field
            v-model="form.link_gh"
            :rules="[required]"
            data-cy="project-link-gh"
          >
            <template #label>
              <span>Link in GitHub</span>
              <span class="mandatory">*</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row class="justify-center text-center mt-5">
        <v-col cols="8" data-cy="project-is-dead-container">
          <v-switch
            v-model="form.is_dead"
            label="This project is dead?"
            data-cy="project-is-dead"
          ></v-switch>
        </v-col>
      </v-row>

      <v-row v-if="form.is_dead" class="justify-center text-center mt-5">
        <v-col cols="8" data-cy="project-death-date-container">
          <v-label>
            <span>Select the project death date</span>
            <span class="mandatory">*</span>
          </v-label><br/>
          <v-date-picker
            v-model="form.death_date"
            :rules="[required]"
            :allowed-dates="isBeforeNow"
            data-cy="project-death-date"
          ></v-date-picker>
        </v-col>
      </v-row>

      <v-row class="justify-center text-center mt-5">
        <v-col cols="8">
          <v-btn
            color="success"
            class="float-right"
            @click="createProject()"
            data-cy="btn-submit"
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>

    </v-form>
  </v-container>
</template>

<style lang="scss" scoped>
  .form-container {
    height: 100%;
    .form {
      margin-top: 5%;
      .mandatory {
        color: red;
        margin-left: 5px;
      }
    }
  }
</style>
