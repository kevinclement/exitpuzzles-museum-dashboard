<template>
  <div class="home">
    <img class="logo" src="../assets/logo.png" />
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped>
  .logo {
    width: 1100px;
    
  }
  .home {
    background-image: url("../assets/background.png");
    width: 1728px;
    height: 979px;
    text-align:center;
    background-repeat: no-repeat; /* Do not repeat the image */
  
  }
  
</style>
