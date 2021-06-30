<template>
  <div class="d-flex justify-content-end align-items-center">
    <date-picker v-model="range" type="date" range placeholder="Диапазон дат" :lang="lang" value-type="YYYY-MM-DD" format="DD-MM-YYYY" class="mx-2"></date-picker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ru'
import { format } from 'date-fns'

export default {
  name: 'RangeFilter',
  data () {
    return {
      range: null,
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        }
      }
    }
  },
  components: {
    DatePicker
  },
  watch: {
    range () {
      if (!this.range[0] && !this.range[1]) {
        this.$emit('range', 'empty')
      } else {
        this.$emit('range', this.range)
      }

      if (this.range[0] && this.range[1]) {
        this.setUrlParameters()
      } else {
        this.resetFilter()
      }
    }
  },
  created () {
    if (!this.setFilterValue()) {
      this.$emit('range', 'empty')
    }
  },
  methods: {
    resetFilter () {
      window.history.pushState(null, '', document.location.href.replace(document.location.search, ''))
    },
    setUrlParameters () {
      window.history.pushState(null, '', '?dateFrom=' + this.range[0] + '&dateTo=' + this.range[1])
    },
    setFilterValue () {
      if (Object.keys(this.$route.query).length !== 0) {
        if (this.$route.query.dateFrom && this.$route.query.dateTo) {
          let dateFrom = this.$route.query.dateFrom.split('-')
          let dateTo = this.$route.query.dateTo.split('-')
          this.range = [
            format(new Date(dateFrom.toString()), 'yyyy-MM-dd'),
            format(new Date(dateTo.toString()), 'yyyy-MM-dd')
          ]

          return true
        }
      }

      return false
    }
  }
}
</script>

<style scoped></style>
