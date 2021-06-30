<template>
  <a :href="url" class="mb-5">
    <div class="card" style="width: 18rem">
      <img
        v-if="img"
        :src="img"
        class="card-img-top league-logo"
        alt="..."
      />
      <img
        v-else
        src="../assets/images/placeholder.png"
        class="card-img-top league-logo"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-text">{{ name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">
          {{ areaName }}
        </h6>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'Card',
  props: {
    name: String,
    areaName: String,
    img: String,
    url: String
  }
}
</script>

<style scoped></style>
