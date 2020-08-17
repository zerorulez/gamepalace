<template>
  <div class="reply">
    <div class="reply-wrapper">
      <!-- <div class="reply-image" @click="openImage()" v-if="reply.image" :style="{ 'background-image' : 'url(' + imagePath + reply.image + ')'}"></div> -->
      <div class="reply-content">
        <div class="reply-header">
          <p v-if="reply.description" v-html="reply.description"></p>
          <img @click="openImage()" v-if="reply.image" :src="imagePath + reply.image" :alt="reply.description" class="img-fluid mt-4 reply-image-max">
        </div>
        <div class="reply-footer pt-2">
          <span class="date" v-if="reply.createdAt">{{ reply.createdAt | moment("H:mm - D MMMM") }}</span>
          <div @click="goToProfile(reply.user._id)" class="user">
            <span class="username" v-if="reply.user">{{ reply.user.username }}</span>
            <div class="avatar-image" v-if="reply.user && reply.user.avatar" :style="{ 'background-image' : 'url(' + avatarPath + reply.user.avatar + ')'}"></div>
            <div class="avatar-image default-avatar" v-if="reply.user && !reply.user.avatar"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">

@import '../styles/variables.scss';

.reply {
  .reply-wrapper {
      background-color: $light-gray;
      border-radius: 10px;
      margin-bottom: 15px;

    .reply-image {
      border-radius: 10px 10px 0 0;
      background-color: #000;
      height: 125px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      cursor: pointer;
      
      @media (min-width: 992px) {
        height: 250px;
      }

    }
    .reply-content {
      padding: 15px;
      width: 100%;

      .reply-header {
        white-space: pre-wrap;
        .reply-image-max {
          max-width: 300px;
          max-height: 300px;
        }
      }

      .reply-footer {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 12px;

        .date {
          text-transform: capitalize;
        }

        .user {
          display: flex;
          align-items: center;
          cursor: pointer;
          .username {
            font-weight: bold;
            padding-right: 15px;
            font-size: 15px;
          }
          .default-avatar {
            background-image: url("../assets/avatar.png");
          }
          .avatar-image {
            width: 40px;
            height: 40px;
            border: 1px solid $lighter-gray;
            border-radius: 7px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
        }
      }
    }
  }
}
</style>

<script>

export default {
  name: 'Reply',
  props: ['reply'],
  data() {
    return {
      imagePath: process.env.VUE_APP_API + '/images/posts/',
      avatarPath: process.env.VUE_APP_API + '/images/avatars/thumbnail_'
    }
  },
  methods: {
    openImage() {
      this.$store.commit('setLightbox', { image: this.reply.image, type: 'image' })
      this.$store.commit('toogleLightbox')
    },
    goToProfile(id) {
      this.$router.push('/perfil/' + id)
    }
  },
  components: {
  }
}
</script>
