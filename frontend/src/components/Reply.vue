<template>
  <div class="reply">
    <div class="reply-wrapper">
      <div class="reply-image" @click="openImage()" v-if="reply.image" :style="{ 'background-image' : 'url(' + imagePath + reply.image + ')'}"></div>
      <div class="reply-content">
        <div class="reply-header">
          <p>{{ reply.description }}</p>
        </div>
        <div class="reply-footer">
          <span class="date">{{ reply.createdAt | moment("H:mm - D MMMM") }}</span>
          <div class="user">
            <span class="username" v-if="reply.user">{{ reply.user.username }}</span>
            <div class="avatar-image" :style="{ 'background-image' : 'url(' + avatarPath + reply.user.avatar + ')'}"></div>
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
      
      @media (min-width: 992px) {
        height: 250px;
      }

    }
    .reply-content {
      padding: 15px;
      width: 100%;

      .reply-header {
        display: flex;
        justify-content: space-between;
      }

      .reply-footer {
        padding-top: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;

        .date {
          text-transform: capitalize;
        }

        .user {
          display: flex;
          align-items: center;
          .username {
            font-weight: bold;
            padding-right: 15px;
            font-size: 15px;
          }
          .avatar-image {
            width: 40px;
            height: 40px;
            border: 1px solid $ligther-gray;
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
    }
  },
  components: {
  }
}
</script>
