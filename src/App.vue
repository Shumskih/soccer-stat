<template>
  <div>
    <MyHeader @runSearch="runSearch($event)" @year="emitYear($event)"/>
    <div class="container">
      <router-view :search="search" :year="year" />
    </div>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader'

export default {
  name: 'App',
  components: {
    MyHeader
  },
  data () {
    return {
      search: '',
      year: ''
    }
  },
  methods: {
    runSearch (event) {
      this.search = event
    },
    emitYear (year) {
      this.year = year
    }
  }
}
</script>

<style>

</style>
