<template>
  <div class="capp">
    <img v-if="adhoc == ''" class="clue" :src='imgSrc' />
    <div v-else class="adhoc">
      {{currentClue}}
    </div>
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
    },
    adhoc: function() {
      return this.$root.$data.adhoc
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
.capp {
  background: url("../../public/clues/empty.jpg");
  height: 768px;
}
.adhoc {
  position: absolute;
  height: 100px;
  background:green;
  top: 175px;
  left: 200px;
  right: 200px;
  text-align: left;
  font-family: 'blackadder'
}
</style>
