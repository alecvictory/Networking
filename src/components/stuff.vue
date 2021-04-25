<template>
  <div class="stuff">
    <!-- <router-link :to="{name: 'Post', params: { id: posts.id }}"> -->
    <div class="card shadow">
      <div class="card-body flex-column">
        <div>
          <img class="w-100" :src="stuffs.tall" alt="Stuff Photo">
        </div>
      </div>
    </div>
    <!-- </router-link> -->
  </div>
</template>

<script>
export default {
  name: 'Stuff',
  props: {
    stuffs: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
