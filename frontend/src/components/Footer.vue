<template>
  <div class="footer">
    <p>GAMEPALACE <span class="separator">|</span> Alpha</p>
    <div class="terms">
      <router-link to="#">Termos de Uso</router-link>
      <router-link to="#">Políticas de privacidade</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import '../styles/variables.scss';

.footer {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  background-color: $light-gray;
  padding: .5rem 15px;
  font-size: 14px;

  .separator {
    padding: 0 15px;
  }

  .terms {
    position: absolute;
    right: 15px;
    display: none;

    a {
      padding-left: 30px;
    }
    
    @media (min-width: 992px) {
      display: block;
    }
  }
}
</style>
