<template>
  <div>
    <date-picker v-model="year" type="year" placeholder="Сезон" class="mx-2" value-type="YYYY" format="YYYY"></date-picker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ru'
import {format} from 'date-fns'

export default {
  name: 'YearFilter',
  components: {
    DatePicker
  },
  data () {
    return {
      year: 'empty'
    }
  },
  watch: {
    year () {
      this.$emit('year', this.year)

      if (this.year) {
        localStorage.setItem('year', this.year)
        this.setUrlParameters()
      }
      if (!this.year) {
        this.resetFilter()
      }
    }
  },
  created () {
    if (localStorage.getItem('year')) {
      this.year = localStorage.getItem('year')
      this.setFilterValue()
    }

    this.$emit('year', this.year)
  },
  methods: {
    resetFilter () {
      window.history.pushState(null, '', document.location.href.replace(document.location.search, ''))
      localStorage.removeItem('year')
    },
    setUrlParameters () {
      window.history.pushState(null, '', '?season=' + this.year)
    },
    setFilterValue () {
      if (Object.keys(this.$route.query).length !== 0) {
        if (this.$route.query.season) {
          this.year = format(new Date(this.$route.query.season.toString()), 'yyyy')

          return true
        }

        return false
      }
    }
  }
}
</script>

<style scoped></style>
