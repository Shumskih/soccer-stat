<template>
  <div>
    <h1 class="mb-5"><u>Список лиг</u></h1>

    <Loader v-if="loading" />

    <div
      v-if="leagues"
      class="d-flex flex-row justify-content-between flex-wrap"
    >
      <Card
        v-for="league in filteredList"
        :key="league.id"
        :name="league.name"
        :area-name="league.areaName"
        :img="getImage(league.id, league.emblemUrl)"
        :url="'/calendar/leagues/' + league.id"
      />
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader'
import Card from '../components/Card'
import {getLeagues} from '../api'
import {leaguesImages} from '../../static/leaguesImages'

export default {
  name: 'LeaguesList',
  components: {
    Loader,
    Card
  },
  props: {
    search: String
  },
  data () {
    return {
      leagues: null,
      loading: true
    }
  },
  computed: {
    filteredList () {
      const search = this.search
      return this.leagues.filter(function (league) {
        return league.name.toLowerCase().indexOf(search.toLowerCase()) > -1
      })
    }
  },
  created: function () {
    this.loading = true
    getLeagues().then(data => {
      this.leagues = data
      this.loading = false
    })
  },
  methods: {
    getImage (leagueId, emblem) {
      if (emblem === null) {
        return leaguesImages[leagueId]
      }

      return emblem
    }
  }
}
</script>

<style scoped>

</style>
