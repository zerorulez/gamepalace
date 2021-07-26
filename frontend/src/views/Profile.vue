<template>
  <div class="profile">
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
              <div class="avatar" @click="openImage()" v-if="user.filename" :style="{ 'background-image' : 'url(' + avatarPath + user.filename + ')'}"></div>
              <div class="avatar default-avatar" v-if="!user.filename"></div>
              <h1 class="text-center">{{ user.username }}</h1>
              <small v-if="user.createdAt">Registro: {{ user.createdAt | moment("DD/MM/YYYY") }}</small>
            </div>
            <form @submit.prevent="update()" class="container">
              <!-- <div class="form-group text-left">
                <label for="user">Usuário</label>
                <input type="text" v-model="user.username" class="form-control" name="user" id="user" disabled>
              </div> -->
              <div class="form-group text-left">
                <label for="user">Usuário</label>
                <input type="text" v-model="user.username" class="form-control" name="user" id="user" disabled>
              </div>
              <div class="form-group text-left">
                <label for="email">Email</label>
                <input type="text" v-model="user.email" class="form-control" name="email" id="email" disabled>
              </div>
              <div class="form-group text-left">
                <label for="avatar">Avatar</label>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="customFile" ref="file" v-on:change="handleFileUpload()" accept="image/gif, image/jpeg, image/png">
                  <label class="custom-file-label" for="customFile">{{ fileName }}</label>
                </div>
              </div>
              <!-- <div class="form-group text-left">
                <label for="password">Senha Atual</label>
                <input type="password" v-model="user.password" class="form-control" name="password" id="password" autocomplete="on">
              </div>
              <div class="form-group text-left">
                <label for="passwordNew">Nova Senha</label>
                <input type="password" v-model="user.newPassword" class="form-control" name="passwordNew" id="passwordNew" autocomplete="on">
              </div>
              <div class="form-group text-left">
                <label for="passwordConfirm">Confirmar Nova Senha</label>
                <input type="password" v-model="user.confirmPassword" class="form-control" name="passwordConfirm" id="passwordConfirm" autocomplete="on">
              </div> -->
              <div class="buttons">
                <button type="button" class="btn btn-red" @click="logoff()">Fazer Logoff</button>
                <button type="submit" class="btn btn-default">Salvar</button>
              </div>
            </form>
            <p class="sucess" v-if="sucess">Perfil atualizado com sucesso!</p>
            <div class="errors-wrapper">
              <p class="errors" v-if="errors.length">
                <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
                <ul>
                  <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">

@import '../styles/variables.scss';

.profile {
  .avatar-wrapper {
    background-color: $light-gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1rem;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;

    .default-avatar {
      background-image: url("../assets/avatar.png");
    }

    .avatar {
      width: 220px;
      height: 220px;
      border-radius: 100%;
      border: 3px solid $lighter-gray;
      background-color: #000000;
      background-position: center;
      background-size: cover;
      cursor: pointer;
    }

    h1 {
      margin-top: 1rem;
      margin-bottom: 0;
      font-weight: bold;
    }
  }

  .form {
    margin-top: .5rem;
    padding: 1rem 0;
    background-color: $light-gray;
    border-radius: 1rem;

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }

    .custom-file-label {
      background-color: $dark-gray;
      border: 1px solid $lighter-gray;
      overflow: hidden;
    }

    .custom-file-input:lang(en)~.custom-file-label::after {
      content: "Procurar";
      background-color: $light-gray;
    }

    .sucess {
      margin-top: 15px;
      text-align: center;
    }

    .errors-wrapper {
      display: flex;
      justify-content: center;
      .errors {
        color: white;
        margin-top: 15px !important;

        ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
      }
    }

  }
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'Profile',
  data() {
    return {
      user: {},
      file: '',
      fileName: 'Escolher arquivo...',
      errors: [],
      sucess: false,
      avatarPath: process.env.VUE_APP_API + '/images/user/'
    }
  },
  mounted() {
    let headers = {
      Authorization: 'Bearer ' + this.$store.state.token
    }

    axios.get(process.env.VUE_APP_API + '/profile', { headers }).then( res => {
      this.user = res.data
    }).catch( () => {
      this.$router.push('/login')
    })
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.fileName = this.$refs.file.files[0].name
    },
    update() {
      
      this.errors = []
      this.sucess = false

      this.validate()

      if (!this.errors.length) {

        let formData = new FormData()

        
        formData.append('username', this.user.username)

        if (this.file) {
          formData.append('image', this.file)
        }
        
        if (this.user.password && this.user.newPassword) {
          formData.append('password', this.user.password)
          formData.append('newPassword', this.user.newPassword)
        }

        let headers = {
          Authorization: 'Bearer ' + this.$store.state.token
        }

        axios.put(process.env.VUE_APP_API + '/profile', formData, { headers }).then( res => {
          this.sucess = true
          this.user = res.data
        }).catch( err => {
          this.errors.push(err.response.data.error)
        })
      }
    },
    validate() {
      if (this.user.username == '') {
        this.errors.push('O usuário é obrigatório.');
      }
      if (this.user.username && this.user.username.length < 3) {
        this.errors.push('O usuário deve conter pelo menos 3 dígitos.');
      }
      // if (this.user.password && this.user.password.length < 6) {
      //   this.errors.push('A senha deve conter pelo menos 6 dígitos.');
      // }
      // if (this.user.newPassword && this.user.newPassword.length < 6) {
      //   this.errors.push('A nova senha deve conter pelo menos 6 dígitos.');
      // }
      // if (this.user.newPassword !== this.user.confirmPassword) {
      //   this.errors.push('A nova senha e a confirmação de nova senha devem ser iguais.');
      // }
    },
    logoff() {
      localStorage.removeItem('token')
      this.$store.commit('setToken', '')
      this.$router.push('/login')
    },
    openImage() {
      this.$store.commit('setLightbox', { image: this.user.filename, type: 'user' })
      this.$store.commit('toogleLightbox')
    }
  },
  components: {
  }
}
</script>
