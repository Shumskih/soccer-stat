<template>
  <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <router-link :to="{ name: 'LeaguesList' }" class="nav-link px-2 link-secondary">Список лиг</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'TeamsList' }" class="nav-link px-2 link-secondary">Список команд</router-link>
          </li>
        </ul>

        <div class="d-flex flex-column flex-sm-row flex-md-row">
          <input v-model="search" type="search" class="form-control mb-3 mb-sm-0" placeholder="Поиск..." aria-label="Поиск"/>
          <div>
            <YearFilter @year="emitYear($event)"/>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import YearFilter from './YearFilter'

export default {
  name: 'MyHeader',
  data () {
    return {
      dateRange: null,
      search: null,
      rangeEvent: null
    }
  },
  components: {
    DatePicker,
    YearFilter
  },
  watch: {
    search () {
      this.$emit('runSearch', this.search)
    }
  },
  methods: {
    emitYear (year) {
      this.$emit('year', year)
    }
  }
}
</script>
