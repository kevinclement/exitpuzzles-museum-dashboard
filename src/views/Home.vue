<template>
  <div class="home">
    <img class="logo" src="../assets/logo.png" />
    <div class="countdown"><span class="prefix">{{prefix}}</span><span :class="{ hoursMinsNegative: minutes<0 }" class="hoursMins">{{prettyHoursAndMinutes}}</span></div>
  </div>
</template>

<script>
export default {
  name: 'home',

  data () {
    return {
    }
  },
  computed: {
    minutes: function() {
      return this.$root.$data.minutes
    },
    hours: function() {
      return this.$root.$data.hours
    },
    prettyHoursAndMinutes: function() {
      if (this.hours == -1 || this.hours == 0 && this.minutes == 0) {
        return ''
      }

      let hStr = this.hours > 0 ? `${this.hours}h ` : ''
      let mStr = this.minutes < 10 && this.minutes >= 0 ? `0${this.minutes}m` : `${Math.abs(this.minutes)}m`

      return `${hStr}${mStr}`;
    },
    prefix: function() {
      if (this.hours == -1) {
        return ''
      }

      return this.hours == 0 && this.minutes == 0 ? "CLOSED" : "CLOSES IN - "
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style scoped>
  .logo {
    height: 655px;
    opacity:.4;
  }
  .countdown {
    padding-top: 10px;
    font-size: 85px;
    opacity:.4;
    height: 98px;
    font-family: 'BOOK ANTIQUA';
  }
  .home {
    background-image: url("../assets/background.png");
    text-align:center;
    background-repeat: no-repeat;
  
  }
  .prefix {
    text-align: right;
  }
  .hoursMins {
    text-align: left;
  }
  .hoursMinsNegative {
    color: red;
  }

</style>
