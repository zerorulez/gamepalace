<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="forum-header">
            <h1>Tópicos</h1>
            <router-link class="btn btn-default" v-if="$store.state.token" to="/novo-topico">Novo Tópico</router-link>
          </div>
        </div>
        <div class="col-12">
          <div class="forum-threads">
            <Thread v-for="(thread, index) in threads" :key="index" :thread="thread"/>
            <div v-if="threads.length == 0">
              <p>Nenhum tópico encontrado...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.home {
  .forum-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-weight: bold;
      font-size: 20px;
      margin: 0;
      color: white;
    }
  }

  .forum-threads {
    padding-top: 15px;
  }
}
</style>

<script>
// @ is an alias to /src
import Thread from '@/components/Thread.vue'
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      threads: []
    }
  },
  mounted() {
    axios.get(process.env.VUE_APP_API + '/post').then( res => {
      this.threads = res.data
    })
  },
  components: {
    Thread
  }
}
</script>
