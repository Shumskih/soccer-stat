import axios from 'axios'

const API_KEY = 'd510ed103a7b46b4ac8392d3ea75bb39'

export function getLeagues () {
  return axios
    .get('https://api.football-data.org/v2/competitions?plan=TIER_ONE', {
      headers: {
        'X-Auth-Token': API_KEY
      }
    })
    .then((response) => {
      return response.data.competitions
    })
}

export function request (year = null, $route, team = false) {
  return axios
    .get(getUrl(year, $route, team), {
      headers: {
        'X-Auth-Token': API_KEY
      }
    })
    .then((response) => {
      return response.data
    })
}

function getUrl (year, $route, team) {
  let url

  if (team) {
    url = 'https://api.football-data.org/v2/teams/' + $route.params.id + '/matches'
  } else {
    url = 'https://api.football-data.org/v2/competitions/' + $route.params.id + '/matches'
  }

  if (year) {
    url += '?season=' + year
  }

  return url
}

export function getTeams () {
  return axios
    .get('https://api.football-data.org/v2/teams?plan=TIER_ONE', {
      headers: {
        'X-Auth-Token': API_KEY
      }
    })
    .then((response) => {
      return response.data.teams
    })
}

export function getTeam ($route, range) {
  return axios
    .get(getUrl($route, range), {
      headers: {
        'X-Auth-Token': API_KEY
      }
    })
    .then((response) => {
      return response.data
    })

  function getUrl ($route, range) {
    let url = 'https://api.football-data.org/v2/teams/' + $route.params.id + '/matches'

    if (range && range[0] !== null && range[1] !== null) {
      url += '?dateFrom=' + range[0] + '&dateTo=' + range[1]
    }

    return url
  }
}
