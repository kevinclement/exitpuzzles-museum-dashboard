<template>
  <div class="capp">
    <img v-if="adhoc == '' && $root.$data.clue != ''" class="clue" :src='imgSrc' />
    <div v-else class="adhoc">
      <div class="adhocText" v-html="adhoc"></div>
    </div>
    <audio ref="clueSnd" preload="true">
      <source src="../../public/sounds/clue.1s_silence.wav" type="audio/wav"/>
    </audio>
  </div>
</template>

<script>
export default {
  name: 'clue',
  computed: {
    imgSrc: function() {
      return `https://firebasestorage.googleapis.com/v0/b/exitpuzzles-admin.appspot.com/o/museum%2Fclues%2F${this.$root.$data.clue}.full.png?alt=media`
    },
    adhoc: function() {
      let html = this.$root.$data.adhoc.replace(new RegExp("\n", 'g'), "<br/>")
      return html
    }
  },
  created() {
    this.$root.$data.ref.on('value', (snapshot) => {
      let dash = snapshot.val()

      // allow for button to replay notice sound
      if (dash.notice) {
        this.playNoticeSound()
        snapshot.ref.update( { notice: null } )
      }
    })
  },
  mounted() {
    this.playNoticeSound()
  },
  methods: {
    playNoticeSound() {
      // chrome blocks this so try/catch to prevent error on console
      // to fix you either interact with page, or you turn off in flags
      var promise = this.$refs.clueSnd.play();
      if (promise) {
        promise.catch(function(error) {  });
      }
    }
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
  font-size:85px;
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
