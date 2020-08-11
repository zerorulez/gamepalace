<template>
  <div class="modal-home">
    <div class="container">
      <div class="row">
        <div class="col-12 offset-lg-2 col-lg-8">
          <div class="modal-wrapper">
            <!-- <div class="close">
              <span>X</span>
            </div> -->
            <div class="about text-center">
              <h1>GAMEPALACE</h1>
              <p>
                Seja bem-vindo!
                <br /><br />
                <!-- O <strong>GAMEPALACE</strong> é uma coleção de tópicos em que é possível escrever anonimamente, sem registro algum. Isso traz uma série de vantagens, como criar uma comunidade unida sem que haja pessoas brigando por atenção e popularidade. -->
                <!-- <br /><br /> -->
                Leia os <router-link to="#">Termos de Uso</router-link> e as <router-link to="#">Políticas de Privacidade</router-link> para mais informações.
                <br /><br />
                Por fim, explore o site! Veja como as coisas funcionam e do que se trata!
              </p>
              <button @click="toogleModal()" class="btn btn-default">Entendi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalHome',
  data() {
    return {
    }
  },
  methods: {
    toogleModal() {
      localStorage.setItem('firstTime', true)
      this.$store.commit('toogleModal')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import '../styles/variables.scss';

.modal-home {
  top: 0;
  left: 0;
  background-color: rgba($dark-gray, .7);
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-wrapper {
    display: flex;
    flex-direction: column;
    background-color: $light-gray;
    border-radius: 1rem;
    padding: 15px;

    .close {
      display: flex;
      justify-content: flex-end;
      span {
        color: white;
        cursor: pointer;
        padding-bottom: 15px;
        display: block;
      }
    }

    .about {
      h1 {
        font-weight: bold;
        color: white;
        margin: 0 0 15px 0;
      }

      button {
        margin-top: 15px;
      }
    }
  }

}
</style>
