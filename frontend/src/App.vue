<template>
  <div id="app">

    <nav class="navbar navbar-light bg-light">
      <router-link class="navbar-brand" to="/">GamePalace</router-link>
      <router-link class="btn btn-outline-success my-2 my-sm-0" to="/post/new" v-if="$route.name == 'Home'">New Post</router-link>
      <router-link class="btn btn-outline-success my-2 my-sm-0" :to="'/post/' + $route.params.id + '/reply'" v-if="$route.name == 'Post'">New Reply</router-link>
    </nav>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;

    a.no-link {
      color: inherit;
      text-decoration: none;
    }

    p {
      margin-bottom: 0 !important;
    }
  }
</style>
