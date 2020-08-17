<template>
  <div id="app">
    <ModalHome v-if="!$store.state.firstTime" />
    <Lightbox v-if="$store.state.lightbox.active" />
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<style lang="scss">
@import 'styles/variables.scss';
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');


#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $dark-gray;
  min-height: 100vh;
  display:flex; 
  flex-direction:column; 
  justify-content: space-between;
  color: $lighter-gray;
  overflow-wrap: anywhere;

  // SKIN TINYMCE
  .tox .tox-edit-area__iframe {
    background-color: inherit;
  }

  .tox .tox-toolbar__primary {
    background: $light-gray;
    border-bottom: 1px solid $dark-gray;
  }

  .tox .tox-statusbar {
    background-color: $light-gray;
    border-top: 1px solid $dark-gray;
  }

  .tox-tinymce {
    border: 1px solid $dark-gray;
  }

  .tox:not([dir=rtl]) .tox-toolbar__group:not(:last-of-type) {
    border-right: 1px solid $dark-gray;
  }

  .tox .tox-tbtn svg {
    fill: $lighter-gray;
  }

  .tox .tox-split-button:hover {
    box-shadow: 0 0 0 1px $lighter-gray inset;
  }

  .tox .tox-tbtn:hover {
    background: $lighter-gray;
    svg {
      fill: $dark-gray;
    }
  }

  .tox .tox-statusbar__wordcount, .tox .tox-statusbar__path-item {
    color: $lighter-gray;
  }

  .tox .tox-tbtn--enabled {
    background: $lighter-gray;
    svg {
      fill: $dark-gray;
    }
  }

  // FIM SKIN TINYMCE

  // BORDA EMBED THREAD
  .thread-description {
    iframe {
      border: 0;
    }
  }
  // FIM BORDA EMBED THREAD

  input {
    background-color: $dark-gray;
    border: 1px solid $lighter-gray;
  }

  textarea {
    background-color: $dark-gray;
    border: 1px solid $lighter-gray;
  }

  p {
    margin-bottom: 0;
  }

  a {
    color: $blue;
  }

  .text-blue {
    color: $blue;
  }

  .btn-default {
    border: 1px solid $lighter-gray;
    color: $lighter-gray;
    &:hover {
      border: 1px solid $blue;
      background-color: $blue;
      color: white;
    }
  }

  .btn-gray {
    border: 1px solid $lighter-gray;
    color: $lighter-gray;
    &:hover {
      border: 1px solid $lighter-gray;
      background-color: $lighter-gray;
      color: white;
    }
  }

  .btn-red {
    border: 1px solid $red;
    color: $red;
    &:hover {
      border: 1px solid $red;
      background-color: $red;
      color: white;
    }
  }

}

</style>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Lightbox from '@/components/Lightbox.vue'
import ModalHome from '@/components/ModalHome.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Lightbox,
    ModalHome
  }
}
</script>
