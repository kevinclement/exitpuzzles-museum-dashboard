<template>
  <div class="home">
    <img class="logo" src="../assets/logo.png" />
    <div class="countdown">CLOSES IN - {{prettyHours}} {{prettyMinutes}}</div>
  </div>
</template>

<script>
export default {
  name: 'home',

  data () {
    return {
      hours: 2,
      minutes: 11,
    }
  },
  computed: {
    prettyHours: function() {
      return `${this.hours}h`
    },
    prettyMinutes: function() {
      return `${this.minutes}m`
    }
  },
  mounted() {
    window.setInterval(() => {
      if (this.minutes == 0) {
        if (this.hours != 0) {
          this.hours--;
          this.minutes = 60
        }
      } else {
        this.minutes--;
      }
      
    }, 1000)
  }
    // show a disconnected bar if
}
</script>

<style scoped>
  .logo {
    height: 655px;
  }
  .countdown {
    padding-top: 10px;
    font-size: 85px;
    opacity:.7;
    font-family: 'BOOK ANTIQUA'
  }
  .home {
    background-image: url("../assets/background.png");
    text-align:center;
    background-repeat: no-repeat; /* Do not repeat the image */
  
  }
  
</style>
