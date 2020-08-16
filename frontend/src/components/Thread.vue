<template>
  <div class="thread">
    <div class="thread-wrapper" @click="goToThread(thread._id)">
      <div class="thread-image-wrapper">
        <div class="thread-image" v-if="thread.image" :style="{ 'background-image' : 'url(' + imagePath + thread.image + ')'}"></div>
      </div>
      <div class="thread-content">
        <div class="thread-header">
          <div class="header-wrapper">
            <!-- <span class="game text-blue">Streets of Rage</span> -->
            <h2>{{ thread.title }}</h2>
          </div>
          <div class="user">
            <span class="username">{{ thread.user.username }}</span>
            <div class="avatar-image" v-if="thread.user && thread.user.avatar" :style="{ 'background-image' : 'url(' + avatarPath + thread.user.avatar + ')'}"></div>
            <div class="avatar-image default-avatar" v-if="thread.user && !thread.user.avatar"></div>
          </div>
        </div>
        <div class="thread-footer">
          <span class="replies">{{ thread.replies.length }} respostas</span>
          <span class="date" v-if="thread.createdAt">{{ thread.createdAt | moment("H:mm - D MMMM") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Thread',
  props: ['thread'],
  data() {
    return {
      imagePath: process.env.VUE_APP_API + '/images/posts/thumbnail_',
      avatarPath: process.env.VUE_APP_API + '/images/avatars/thumbnail_'
    }
  },
  methods: {
    goToThread(id) {
      this.$router.push('/topico/' + id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import '../styles/variables.scss';

.thread {
  margin-bottom: 15px;
  
  .thread-wrapper {
    background-color: $light-gray;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      margin-left: 7.5px;
      margin-right: -7.5px;
    }

    .thread-image-wrapper {
      border-radius: 10px 0 0 10px;
      overflow: hidden;
      display: flex;
      
      .thread-image {
        width: 100px;
        height: auto;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        @media (min-width: 992px) {
          width: 300px;
        }
      }
    }

    .thread-content {
      padding: 15px;
      width: 100%;

      .thread-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .game {
          font-size: 13px;
        }

        h2 {
          color: white;
          font-size: 20px;
          font-weight: bold;
          margin: 0;
          text-transform: uppercase;
        }

        .user {
          display: flex;
          align-items: center;
          padding-left: 30px;
          flex-shrink: 0;
          .username {
            font-weight: bold;
            padding-right: 15px;
            display: none;
            font-size: 15px;

            @media (min-width: 992px) {
              display: block;
            }
          }
          
          .default-avatar {
            background-image: url("../assets/avatar.png");
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

      .thread-footer {
        padding-top: 30px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;

        .date {
          text-transform: capitalize;
        }
      }
    }
  }

}
</style>
