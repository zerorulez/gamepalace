<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>LOGIN</h2>
        </div>
        <div class="col-12 offset-lg-3 col-lg-6">
          <form @submit.prevent="login()">
            <div class="form-group text-left">
              <label for="email">Email</label>
              <input type="email" v-model="user.email" class="form-control" name="email" id="email">
            </div>
            <div class="form-group text-left">
              <label for="password">Senha</label>
              <input type="password" v-model="user.password" class="form-control" name="password" id="password" autocomplete="on">
            </div>
            <button type="submit" class="btn btn-default">Entrar</button>
          </form>
        </div>
        <div class="col-12">
          <div class="errors-wrapper">
            <p class="errors" v-if="errors.length">
              <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
              <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
            </p>
          </div>
          <div class="options">
            <p>Não tem conta? <router-link to="/registrar">Registrar</router-link></p>
            <!-- <p><router-link to="/registrar">Esqueci a Senha</router-link></p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.login {
  text-align: center;

  h2 {
    color: white;
    font-weight: bold;
    margin-bottom: 30px;
  }

  button {
    margin-bottom: 30px;
  }

  .options {
    p {
      padding-bottom: 15px
    }
  }
  
  .errors-wrapper {
    display: flex;
    justify-content: center;
    .errors {
      color: white;
      margin-bottom: 30px !important;

      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
    }
  }
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      user: {},
      errors: []
    }
  },
  methods: {
    login() {
      this.errors = []

      this.validate()

      if (!this.errors.length) {
        axios.post(process.env.VUE_APP_API + '/signin', this.user).then( res => {
          this.$store.commit('setToken', res.data.token)
          this.$router.push('/')
        }).catch( err => {
          this.errors.push(err.response.data.error)
        })
      }
    },
    validate() {
      if (!this.user.email) {
        this.errors.push('O email é obrigatório.');
      }
      if (!this.user.password) {
        this.errors.push('A senha é obrigatória.');
      }
      if (this.user.password && this.user.password.length < 6) {
        this.errors.push('A senha deve conter pelo menos 6 dígitos.');
      }
    }
  },
  components: {
  }
}
</script>
