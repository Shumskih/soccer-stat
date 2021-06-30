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
    if (this.setFilterValue() && localStorage.getItem('year')) {
      this.$emit('year', this.year)
    }
    if (!this.setFilterValue()) {
      this.$emit('year', 'empty')
    }
  },
  methods: {
    resetFilter () {
      let url = new URL(document.location.href)
      let params = ''

      url.searchParams.delete('season')

      let count = 0
      url.searchParams.forEach(function (value, key) {
        (count === 0) ? params += '?' + key + '=' + value : params += '&' + key + '=' + value
        count++
      })

      window.history.pushState(null, '', document.location.href.replace(document.location.search, params))
      localStorage.removeItem('year')
    },
    setUrlParameters () {
      let url = new URL(document.location.href)
      let params = '?season=' + this.year

      url.searchParams.forEach(function (value, key) {
        if (key !== 'season') {
          params += '&' + key + '=' + value
        }
      })

      window.history.pushState(null, '', params)
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
