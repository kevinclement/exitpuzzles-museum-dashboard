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
      hours: -1,
      minutes: -1,
    }
  },
  computed: {
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
    console.log(`created`)

    this.$root.$data.ref.on('value', (snapshot) => {
        let dash = snapshot.val()
        if (dash == null) return

        this.minutes = dash.minutes
        this.hours = dash.hours

        // if (dash.reload === true) {
        //   // RELOAD CLIENT
        //   console.log(`Reloading client...`);
        //   // setTimeout(()=>{
        //   //   window.location.replace(window.location.origin)
        //   // }, 500)
        // }
    })
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
