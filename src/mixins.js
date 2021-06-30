export let variables = {
  data () {
    return {
      matches: null,
      loading: true,
      noData: false,
      forbidden: false,
      filterError: false,
      notFound: false
    }
  }
}

export let computed = {
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
  }
}

export let errorHandler = {
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
    }
  }
}
