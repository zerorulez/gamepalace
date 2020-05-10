<template>
  <div id="app">

    <nav class="navbar">
      <router-link class="navbar-brand" to="/">GamePalace</router-link>
      <router-link class="btn btn-gamepalace my-2 my-sm-0" to="/post/new" v-if="$route.name == 'Home'">New Post</router-link>
      <router-link class="btn btn-gamepalace my-2 my-sm-0" :to="'/post/' + $route.params.id + '/reply'" v-if="$route.name == 'Post'">New Reply</router-link>
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
  @import 'styles/variables.scss';

  html {
    background-color: $background;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    background-color: $background;
    color: white;

    a {
      color: $link;
    }

    a.no-link {
      color: inherit;
      text-decoration: none;
    }

    p {
      margin-bottom: 0 !important;
    }

    .navbar {
      background-color: $navbar;
      .navbar-brand {
        color: $button;
      }
    }

    .btn-gamepalace {
      color: $button;
      border: 1px solid $button;
      &:hover {
        background-color: $button;
        color: white;
      }
    }

    .font-primary {
      color: white !important;
    }

    .font-secondary {
      color: $gray !important;
    }

    .border-gray {
      border: 1px solid $gray;
    }
  }
</style>
