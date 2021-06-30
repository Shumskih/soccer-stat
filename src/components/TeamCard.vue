<template>
  <div class="card mb-5" style="width: 18rem">
    <div class="card-body">
      <div class="d-flex flex-column px-1 w-100 mb-3">
        <div class="d-flex justify-content-center align-items-center">
          <h5 class="card-title">{{ homeTeamName }}</h5>
        </div>
        <div class="d-flex justify-content-center"><h6 class="card-title text-muted">vs</h6></div>
        <div class="d-flex justify-content-center align-items-center">
          <h5 class="card-title">{{ awayTeamName }}</h5>
        </div>
      </div>
      <p>Лига: <span class="text-muted">{{ competitionName }}</span></p>
      <p v-if="areaName">Страна: <span class="text-muted">{{ areaName }}</span></p>
      <p>Дата игры: <span class="text-muted">{{ gameDate }}</span></p>
      <p>Статус: <span class="text-success">{{ matchStatus }}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamCard',
  props: {
    homeTeamName: String,
    awayTeamName: String,
    areaName: String,
    competitionName: String,
    matchStatus: String,
    gameDate: String
  }
}
</script>

<style scoped></style>
