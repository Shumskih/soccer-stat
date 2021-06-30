import Vue from 'vue'
import Router from 'vue-router'
import TeamsList from '../view/TeamsList'
import LeaguesList from '../view/LeaguesList'
import TeamCalendar from '../view/TeamCalendar'
import LeagueCalendar from '../view/LeagueCalendar'

Vue.use(Router)

export default new Router({
  base: '/',
  mode: 'history',
  linkExactActiveClass: 'link-dark',
  routes: [
    {
      path: '/',
      name: 'LeaguesList',
      component: LeaguesList
    },
    {
      path: '/calendar/leagues/:id',
      name: 'LeagueCalendar',
      component: LeagueCalendar
    },
    {
      path: '/teams',
      name: 'TeamsList',
      component: TeamsList
    },
    {
      path: '/calendar/teams/:id',
      name: 'TeamCalendar',
      component: TeamCalendar
    }
  ]
})
