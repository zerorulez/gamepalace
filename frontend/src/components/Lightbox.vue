<template>
  <div @click="toogleLightbox()" class="lightbox">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="image-wrapper">
            <div class="close">
              <span>X</span>
            </div>
            <div class="image">
              <img :src="($store.state.lightbox.type == 'image' ? imagePath : avatarPath) + $store.state.lightbox.image" alt="" class="img-fluid">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lightbox',
  data() {
    return {
      imagePath: process.env.VUE_APP_API + '/images/posts/',
      avatarPath: process.env.VUE_APP_API + '/images/avatars/'
    }
  },
  methods: {
    toogleLightbox() {
      this.$store.commit('toogleLightbox')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import '../styles/variables.scss';

.lightbox {
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

  .image-wrapper {
    display: flex;
    flex-direction: column;

    .image {
      display: flex;
      justify-content: center;
    }

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
  }

}
</style>
