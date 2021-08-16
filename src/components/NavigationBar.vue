<template>
  <b-navbar id="bd-navbar" class="nav">
    <img src="../assets/Robot.png">
    <ul class="navigation">
      <li><router-link class="link hvr-underline-from-left" :to="{name: 'Home'}">To Do</router-link></li>
      <li><router-link class="link hvr-underline-from-left" :to="{name: 'Done'}">Done</router-link></li>
    </ul>
  </b-navbar>
</template>

<script>
export default {

}
</script>

<style scoped>

  .nav {
    background-color: black;
  }

  .link {
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
  }
  .link:hover {
    color: #cd5447;
  }
  
  img {
    height: 50px;
    margin-left: 10px;
  }

  .navigation {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
    margin: 0;
    max-width: 90%;
  }
  .hvr-underline-from-left:before {
    background-color: #cd5447;
  }

  ul,
  .link {
    font-weight: bold;
    color: #fff;
    list-style: none;
    text-decoration: none;
  }

  li {
    text-transform: uppercase;
    padding: 16px;
    margin-left: 16px;
  }

</style>