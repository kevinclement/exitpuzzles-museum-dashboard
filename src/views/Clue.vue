<template>
  <div>
    <img class="clue" :src='imgSrc' />
    {{currentClue}}
  </div>
</template>

<script>
export default {
  name: 'clue',
  data () {
    return {
    }
  },
  computed: {
    currentClue: function() {
      return this.$root.$data.clue
    },
    imgSrc: function() {
      return `clues/${this.currentClue.file}`
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style scoped>
.clue {
  height: 774px;
}
</style>
