<template>
  <div id="app">
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
  color: $ligther-gray;
  
  input {
    background-color: $dark-gray;
    border: 1px solid $ligther-gray;
  }

  textarea {
    background-color: $dark-gray;
    border: 1px solid $ligther-gray;
  }

  p {
    margin-bottom: 0;
    overflow-wrap: anywhere;
  }

  a {
    color: $blue;
  }

  .text-blue {
    color: $blue;
  }

  .btn-default {
    border: 1px solid $ligther-gray;
    color: $ligther-gray;
    &:hover {
      border: 1px solid $blue;
      background-color: $blue;
      color: white;
    }
  }

  .btn-gray {
    border: 1px solid $ligther-gray;
    color: $ligther-gray;
    &:hover {
      border: 1px solid $ligther-gray;
      background-color: $ligther-gray;
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

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>
