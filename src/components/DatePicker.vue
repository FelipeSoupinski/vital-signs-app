<script>
  export default {
    props: {
      label: {
        type: String,
        default: 'Date',
      }
    },
    data: () => ({
      date: null,
      showDatePicker: false
    }),
    mounted() {
      this.date = new Date().toISOString().slice(0, 10)
    },
    computed: {
      formattedDate() {
        if (!this.date) return ''
        const date = new Date(this.date)
        const timezoneOffset = date.getTimezoneOffset()
        const newDate = new Date(date.getTime() + timezoneOffset * 60 * 1000)
        return newDate.toLocaleDateString()
      }
    }
  }
</script>

<template>
  <div>
    <v-text-field v-model="formattedDate" :label="label" @click="showDatePicker = true" readonly />
    <v-dialog v-model="showDatePicker">
      <v-date-picker v-model="date" @input="showDatePicker = false"></v-date-picker>
    </v-dialog>
  </div>
</template>
