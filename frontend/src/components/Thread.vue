<template>
  <div class="thread">
    <div class="thread-wrapper">
      <!-- <div class="thread-image-wrapper">
      </div> -->
      <div class="thread-content" @click="goToThread(thread.id)">
        <div class="thread-header">
          <div class="header-wrapper">
            <!-- <span class="game text-blue">Streets of Rage</span> -->
            <h2 class="mb-4">{{ thread.title }}</h2>
            <!-- <div class="carousel-wrapper">
              <carousel :per-page="1" :adjustableHeight="true" :centerMode="true" :paginationPosition="'bottom-overlay'">
                <slide class="thread-image" v-for="(image, index) in thread.images" :key="index">
                  <img :src="getImagePath(image.filename)" :alt="image.filename" class="img-fluid">
                </slide>
              </carousel>
            </div> -->
            <img v-for="(image, index) in thread.images" :key="index" :src="imagePath + image.filename" :alt="image.filename" class="img-fluid">
            <p class="mt-4">{{  thread.description }}</p>
          </div>
          <div class="user">
            <span class="username" v-if="thread.user">{{ thread.user.username }}</span>
            <div class="avatar-image" v-if="thread.user && thread.user.filename" :style="{ 'background-image' : 'url(' + avatarPath + thread.user.filename + ')'}"></div>
            <div class="avatar-image default-avatar" v-if="thread.user && !thread.user.filename"></div>
          </div>
        </div>
        <div class="thread-footer">
          <!-- <span class="replies">{{ thread.replies.length }} respostas</span> -->
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
      imagePath: process.env.VUE_APP_IMAGE_POST + '/thumbnail_',
      avatarPath: process.env.VUE_APP_IMAGE_USER + '/thumbnail_'
    }
  },
  mounted() {
  },
  methods: {
    goToThread(id) {
      this.$router.push('/topico/' + id)
    },
    getImagePath(filename) {
      return this.imagePath + filename
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
    transition: all .2s ease-in-out;

    &:hover {
      box-shadow: 3px 3px 5px rgba(black, .5);
    }

    /* .thread-image-wrapper {
      border-radius: 10px 0 0 10px;
      overflow: hidden;
      display: flex;
      max-width: 300px;
      
      .thread-image {
        height: auto;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
    } */

    .thread-content {
      cursor: pointer;
      padding: 15px;
      width: 100%;

      .thread-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

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
            border: 1px solid $lighter-gray;
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
