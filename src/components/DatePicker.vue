<script>
  export default {
    props: {
      value: {
        type: String,
        default: null,
      },
      label: {
        type: String,
        default: 'Date',
      },
      type: {
        type: String,
        default: 'date',
      },
    },
    data: () => ({
      date: null,
      showDatePicker: false
    }),
    mounted() {
      if (this.value) {
        this.date = new Date(this.value).toISOString().slice(0, 10)
      } else {
        this.date = new Date().toISOString().slice(0, 10)
      }
    },
    computed: {
      formattedDate() {
        if (!this.date) return ''
        const date = new Date(this.date)
        const timezoneOffset = date.getTimezoneOffset()
        const newDate = new Date(date.getTime() + timezoneOffset * 60 * 1000)
        if (this.type === 'month') {
          return newDate.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
        }
        return newDate.toLocaleDateString()
      }
    },
    methods: {
      updateValue() {
        this.showDatePicker = false
        this.$emit('input', this.date)
      },
    },
  }
</script>

<template>
  <div>
    <v-text-field 
      v-model="formattedDate" 
      :label="label" 
      @click="showDatePicker = true" 
      readonly 
    />
    <v-dialog 
      v-model="showDatePicker"
      content-class="dialog-date-picker"
    >
      <v-date-picker 
        v-model="date"
        :type="type" 
        @input="updateValue"
      ></v-date-picker>
    </v-dialog>
  </div>
</template>

<style>
  .dialog-date-picker {
    max-width: 320px;
  }
</style>
