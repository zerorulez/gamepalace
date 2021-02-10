<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-12 offset-lg-2 col-lg-8">
          <h1 class="text-center">Inscrever-se</h1>
          <form @submit.prevent="register()">
              <div class="form-group text-left">
                <label for="user">Usuário</label>
                <input type="text" v-model="user.username" class="form-control" name="user" id="user">
              </div>
              <div class="form-group text-left">
                <label for="email">Email</label>
                <input type="text" v-model="user.email" @keydown.space.prevent class="form-control" name="email" id="email">
              </div>
              <div class="form-group text-left">
                <label for="password">Senha</label>
                <input type="password" v-model="user.password" @keydown.space.prevent class="form-control" name="password" id="password" autocomplete="on">
              </div>
              <div class="form-group text-left">
                <label for="confirmPassword">Confirmar Senha</label>
                <input type="password" v-model="user.confirmPassword" @keydown.space.prevent class="form-control" name="confirmPassword" id="confirmPassword" autocomplete="on">
              </div>
              <div class="custom-control custom-checkbox text-center">
                <input type="checkbox" v-model="user.terms" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">
                  Aceito os <router-link to="#">Termos de Uso</router-link> e <router-link to="#">Políticas de privacidade</router-link>
                </label>
              </div>
            <div class="text-center">
              <button type="submit" class="btn btn-default">Registrar</button>
            </div>
          </form>
          
          <div class="errors-wrapper">
            <p class="errors" v-if="errors.length">
              <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
              <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
            </p>
          </div>

          <p class="text-center">Já tem conta? <router-link to="/login">Login</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
@import '../styles/variables.scss';

.register {
  h1 {
    font-weight: bold;
    color: white;
    margin-bottom: 30px;
  }

  button {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .custom-control {
    margin-top: 30px;
  }

  .custom-control-input:checked~.custom-control-label::before {
    border-color: $blue;
    background-color: $blue;
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
  name: 'Register',
  data() {
    return {
      user: {},
      errors: []
    }
  },
  methods: {
    register() {
      this.errors = []

      this.validate()

      if (!this.errors.length) {
        axios.post(process.env.VUE_APP_API + '/signup', this.user).then( res => {
          localStorage.setItem('token', res.data.token)
          this.$store.commit('setToken')
          this.$router.push('/perfil')
        }).catch( err => {
          this.errors.push(err.response.data.error)
        })
      }
      
    },
    validate() {
      if (!this.user.username) {
        this.errors.push('O nome de usuário é obrigatório.');
      }
      if (!this.user.email) {
        this.errors.push('O Email é obrigatório.');
      }
      if (!this.user.password) {
        this.errors.push('A senha é obrigatória.');
      }
      if (this.user.password && this.user.password.length < 6) {
        this.errors.push('A senha deve conter pelo menos 6 dígitos.');
      }
      if (!this.user.confirmPassword) {
        this.errors.push('Confirmar a senha é obrigatório.');
      }
      if (!this.user.terms) {
        this.errors.push('Você deve aceitar os termos de uso.');
      }
      if (this.user.password !== this.user.confirmPassword) {
        this.errors.push('A senha e a confirmação de senha devem ser iguais.');
      }
    }
  },
  components: {
  }
}
</script>
