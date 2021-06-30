<template>
  <div>
    <h1 class="mb-5">
      <u>{{ teamName }}</u>
    </h1>

    <div class="mb-5">
      <RangeFilter @range="getDateRange($event)" />
    </div>

    <Loader v-if="loading" />

    <div v-else-if="notFound">404 - нет данных</div>

    <div v-else-if="forbidden">Просмотр запрещён</div>

    <div v-else-if="noData">Нет информации</div>

    <div v-else-if="filterError">Ошибка фильтрации. Измените параметры фильтра.</div>

    <div v-else-if="matches">
      <div class="d-flex flex-row justify-content-between flex-wrap">
        <TeamCard
          v-for="match in filteredList"
          :key="match.id"
          :homeTeamName="match.homeTeam.name"
          :awayTeamName="match.awayTeam.name"
          :competitionName="teamName"
          :matchStatus="match.status"
          :gameDate="dateFormatted(match.utcDate)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader'
import RangeFilter from '../components/RangeFilter'
import TeamCard from '../components/TeamCard'
import {getTeam} from '../api'

export default {
  name: 'TeamCalendar',
  components: {
    Loader,
    RangeFilter,
    TeamCard
  },
  props: {
    search: String
  },
  data () {
    return {
      matches: null,
      teamName: null,
      loading: true,
      noData: false,
      forbidden: false,
      filterError: false,
      notFound: false
    }
  },
  computed: {
    filteredList () {
      const search = this.search

      return this.matches.filter(function (match) {
        if (match.awayTeam.name && match.homeTeam.name) {
          return (
            match.awayTeam.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            match.homeTeam.name.toLowerCase().indexOf(search.toLowerCase()) > -1
          )
        }
      })
    }
  },
  methods: {
    getDateRange (range) {
      this.resetVariables()
      this.loading = true

      if (range === 'empty') {
        getTeam(this.$route, null)
          .then(data => {
            this.setVariables(data)
          })
          .catch((error) => {
            this.resetVariables()
            this.errorHandler(error)
          })
      } else {
        getTeam(this.$route, range)
          .then(data => {
            this.setVariables(data)
          })
          .catch((error) => {
            this.resetVariables()
            this.errorHandler(error)
          })
      }
    },
    setVariables (data) {
      if (data.count === 0) {
        this.loading = false
        this.noData = true
      } else {
        this.matches = data.matches
        this.getTeamName(this.matches)
        this.loading = false
      }
    },
    errorHandler (error) {
      switch (error.response.status) {
        case 403:
          this.forbidden = true
          break
        case 400:
          this.filterError = true
          break
        case 404:
          this.notFound = true
          break
        default:
          this.noData = true
          break
      }
    },
    resetVariables () {
      this.matches = []
      this.loading = false
      this.forbidden = false
      this.filterError = false
      this.notFound = false
      this.noData = false
    },
    dateFormatted (date) {
      let dateObject = new Date(date)

      return (
        ('0' + dateObject.getDate()).slice(-2) +
        '.' +
        ('0' + (dateObject.getMonth() + 1)).slice(-2) +
        '.' +
        dateObject.getFullYear()
      )
    },
    getTeamName (matches) {
      let teamNames = []

      for (let i = 0; i <= matches.length - 1; i++) {
        teamNames.push(matches[i].homeTeam.name)
        teamNames.push(matches[i].awayTeam.name)
      }

      let m = teamNames.reduce(function (i, v) {
        if (i[v] === undefined) {
          i[v] = 1
        } else {
          i[v] = i[v] + 1
        }
        return i
      }, {})

      let getMaxRepeated = Math.max(...Object.values(m))
      let duplicateItems = []

      for (let keys in m) {
        // eslint-disable-next-line no-prototype-builtins
        if (m.hasOwnProperty(keys)) {
          if (m[keys] === getMaxRepeated) {
            duplicateItems.push(keys)
          }
        }
      }

      this.teamName = duplicateItems[0]
    }
  }
}
</script>

<style scoped>

</style>
