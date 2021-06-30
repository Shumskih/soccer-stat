<template>
  <div>
    <h1 class="mb-5"><u>Список команд</u></h1>

    <Loader v-if="loading" />

    <div
      v-if="teams"
      class="d-flex flex-row justify-content-between flex-wrap"
    >
      <Card
        v-for="team in filteredList"
        :key="team.id"
        :name="team.name"
        :area-name="team.area.name"
        :img="team.crestUrl"
        :url="'/calendar/teams/' + team.id"
      />
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader'
import Card from '../components/Card'
import {getTeams} from '../api'

export default {
  name: 'TeamsList',
  components: {
    Loader,
    Card
  },
  props: {
    search: String
  },
  data () {
    return {
      teams: null,
      loading: true
    }
  },
  computed: {
    filteredList () {
      const search = this.search
      return this.teams.filter(function (team) {
        return team.name.toLowerCase().indexOf(search.toLowerCase()) > -1
      })
    }
  },
  created: function () {
    this.loading = true
    getTeams().then(data => {
      this.teams = data
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>
