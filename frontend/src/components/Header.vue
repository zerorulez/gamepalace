<template>
  <div class="header">
    <nav class="navbar">
      <router-link to="/" class="navbar-brand">GAMEPALACE</router-link>
      <router-link to="/login" v-if="!$store.state.token" class="btn btn-default">Login</router-link>
      <router-link to="/perfil" v-if="$store.state.token" class="btn btn-default">Perfil</router-link>
    </nav>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import '../styles/variables.scss';

.header {
  background-color: $light-gray;
  margin-bottom: 1rem;

  .navbar {
    display: flex;
    justify-content: space-between;

    .navbar-brand {
      font-weight: bold;
      color: white !important;
      font-size: 20px;
    }
  }
}
</style>

<script>
export default {
  name: 'Header',
  data() {
    return {
      token: localStorage.getItem('token')
    }
  }
}
</script>
