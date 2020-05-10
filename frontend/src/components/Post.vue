<template>
  <div class="post-container border-gray rounded mb-2 p-2">
    <router-link class="no-link" :to="'/post/' + post._id">
      <div class="post">
        <div class="media">
          <img :src="url + post.filename" :alt="post.title" class="img-fluid" v-if="post.filename">
          <div class="embed-responsive embed-responsive-16by9" v-if="post.embed">
            <iframe class="embed-responsive-item" :src="post.embed" allowfullscreen></iframe>
          </div>
        </div>
        <div class="pt-3 pt-xl-0 pl-xl-3 info">
          <div class="post-header">
            <strong class="d-block font-primary">{{ post.title }}</strong>
            <p class="date font-secondary pl-3">{{ post.createdAt | moment("DD/MM/YYYY HH:mm:ss") }}</p>
          </div>
          <p class="description font-primary">{{ post.description }}</p>
        </div>
      </div>
      <div class="stats font-secondary pt-2">
        <strong class="replys">{{ post.replys.length }} Replies</strong>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: Object
  },
  data() {
    return {
      url: process.env.VUE_APP_UPLOAD_URL
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .post-container {
    .post {
      display: flex;
      flex-direction: column;
      word-break: break-word;

      @media (min-width: 1200px) {
        flex-direction: row;
      }

      .media {
        display: flex;
        justify-content: center;
        img {
          max-width: 300px;
          max-height: 200px;
        }
        div {
          @media (min-width: 1200px) {
            min-width: 300px;
          }
        }
      }

      .info {
        width: 100%;
        .post-header {
          display: flex;
          justify-content: space-between;
          .date {
            font-size: 14px;
            min-width: 150px;
            text-align: right;
          }
        }
        
        .description {
        }
      }
    }

    .stats {
      .replys {
        font-size: 14px;
      }
    }
  }
</style>