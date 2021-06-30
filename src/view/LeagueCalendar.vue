<template>
  <div>
    <h1 class="mb-5">
      <u>{{ leagueName }}</u>
    </h1>

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
          :competitionName="leagueName"
          :matchStatus="match.status"
          :gameDate="match.utcDate | formatDate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader'
import RangeFilter from '../components/RangeFilter'
import TeamCard from '../components/TeamCard'
import {request} from '../api'

export default {
  name: 'LeagueCalendar',
  components: {
    Loader,
    RangeFilter,
    TeamCard
  },
  props: {
    search: String,
    year: String
  },
  data () {
    return {
      matches: null,
      leagueName: null,
      loading: true,
      noData: false,
      forbidden: false,
      filterError: false,
      notFound: false
    }
  },
  watch: {
    year (newVal, oldVal) {
      this.resetVariables()
      this.loading = true

      if (newVal === 'empty') {
        request(null, this.$route)
          .then(data => {
            this.leagueName = data.competition.name
            this.matches = data.matches

            if (data.matches) {
              this.loading = false
            }
          })
          .catch((error) => {
            this.resetVariables()
            this.errorHandler(error)
          })
      } else {
        request(newVal, this.$route).then(data => {
          this.leagueName = data.competition.name
          this.matches = data.matches

          if (data.matches) {
            this.loading = false
          }
        })
          .catch((error) => {
            this.resetVariables()
            this.errorHandler(error)
          })
      }
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
    }
  }
}
</script>

<style scoped>

</style>
