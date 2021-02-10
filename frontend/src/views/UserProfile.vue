<template>
  <div class="user-profile">
    <div class="container">
      <div class="row">
        <!-- <div class="col-12 offset-lg-2 col-lg-8">
          <div class="avatar-wrapper">
            <div class="cover"></div>
            <div class="avatar" :style="{ 'background-image' : 'url(' + avatarPath + user.avatar + ')'}"></div>
            <h1 class="text-center">{{ user.username }}</h1>
            <p>Registro: {{ user.createdAt }}</p>
          </div>
        </div> -->
        <div class="col-12 offset-lg-2 col-lg-8">
          <div class="form">
            <div class="avatar-wrapper">
              <div class="cover"></div>
              <!-- <div class="avatar cursor-pointer" @click="openImage()" v-if="user.avatar" :style="{ 'background-image' : 'url(' + avatarPath + user.avatar + ')'}"></div> -->
              <div class="avatar default-avatar" v-if="!user.avatar"></div>
              <h1 class="text-center">{{ user.username }}</h1>
              <p class="pb-2">{{ user.about }}</p>
              <p v-if="user.createdAt">Registro: {{ user.createdAt | moment("DD/MM/YYYY") }}</p>
              <button @click="$router.go(-1)" class="btn btn-default">Voltar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">

@import '../styles/variables.scss';

.user-profile {
  .avatar-wrapper {
    background-color: $light-gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1rem;
    padding-top: 1rem;
    border-radius: 1rem;

    .default-avatar {
      background-image: url("../assets/avatar.png");
    }

    .cursor-pointer {
      cursor: pointer;
    }

    .avatar {
      width: 220px;
      height: 220px;
      border-radius: 100%;
      border: 3px solid $lighter-gray;
      background-color: #000000;
      background-position: center;
      background-size: cover;
    }

    h1 {
      margin-top: 1rem;
      font-weight: bold;
    }

    button {
      margin-top: 15px;
    }
  }
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'UserProfile',
  data() {
    return {
      user: {},
      avatarPath: process.env.VUE_APP_API + '/images/avatars/'
    }
  },
  mounted() {
    axios.get(process.env.VUE_APP_API + '/profile/' + this.$route.params.id).then( res => {
      this.user = res.data
    }).catch( () => {
      this.$router.push('/')
    })
  },
  methods: {
    openImage() {
      this.$store.commit('setLightbox', { image: this.user.avatar, type: 'avatar' })
      this.$store.commit('toogleLightbox')
    }
  },
  components: {
  }
}
</script>
