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
import {getTeam} from '../api'
import {computed, errorHandler, variables} from '../mixins'

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
  mixins: [variables, computed, errorHandler],
  data () {
    return {
      teamName: null
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
    resetVariables () {
      this.matches = []
      this.loading = false
      this.forbidden = false
      this.filterError = false
      this.notFound = false
      this.noData = false
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
