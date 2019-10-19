<template>
  <div class="capp">
    <img v-if="adhoc == ''" class="clue" :src='imgSrc' />
    <div v-else class="adhoc">
      <div class="adhocText">{{adhoc}}</div>
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
  top: 175px;
  bottom: 170px;
  left: 300px;
  right: 300px;
  text-align: left;
  font-family: 'blackadder';
  font-size:75px;
  opacity:.65;
  vertical-align: middle;
  text-align: center;
  display: table-cell;
}
.adhocText {
  vertical-align: middle;
  display: table-cell;
  height: 424px;
  width: 765px;
}
</style>
