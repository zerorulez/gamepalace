<template>
  <div id="app">
    <b-navbar toggleable="lg">
      <router-link class="navbar-brand p-0" to="/">GamePalace</router-link>

      <b-navbar-toggle class="hamburguer" target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="boards">
          <router-link to="/random">Random</router-link>
          <router-link to="/games">Games</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link class="btn btn-gamepalace btn-sm" :to="$route.params.categorie + '/post/new'" v-if="$route.name == 'Board'">New Post</router-link>
          <router-link class="btn btn-gamepalace btn-sm" :to="'/post/' + $route.params.id + '/reply'" v-if="$route.name == 'Post'">New Reply</router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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
    letter-spacing: 1px;

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
      min-height: 50px;
      background-color: $navbar;
      .navbar-brand {
        &:hover {
          color: $button;
        }
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

    .boards {
      a {
        padding-right: 15px;
        text-decoration: none;

        &:hover {
          color: $button;
        }
      }
    }

    .hamburguer {
      color: $button;
      border-color: $button;
      .navbar-toggler-icon {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(13, 168, 238, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
      }
    }
  }
</style>
