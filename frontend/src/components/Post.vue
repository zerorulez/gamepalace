<template>
  <div class="post-container border rounded mb-2 p-2">
    <router-link class="no-link" :to="'/post/' + post._id">
      <div class="post">
        <div class="media">
          <img :src="url + post.filename" :alt="post.title" class="img-fluid" v-if="post.filename">
          <div class="embed-responsive embed-responsive-16by9" v-if="post.embed">
            <iframe class="embed-responsive-item" :src="post.embed" allowfullscreen></iframe>
          </div>
        </div>
        <div class="pl-3 info">
          <div class="post-header">
            <strong class="d-block">{{ post.title }}</strong>
            <p class="date text-secondary">{{ post.createdAt | moment("DD/MM/YYYY HH:mm:ss") }}</p>
          </div>
          <p class="description">{{ post.description }}</p>
        </div>
      </div>
      <div class="stats text-secondary pt-2">
        <strong class="replys">{{ post.replys.length }} Replys</strong>
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
      flex-direction: row;
      overflow-wrap: break-word;

      .media {
        display: flex;
        justify-content: center;
        img {
          max-width: 300px;
          max-height: 200px;
        }
        div {
          min-width: 300px;
        }
      }

      .info {
        width: 100%;
        .post-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .date {
            font-size: 14px;
          }
        }
        
        .description {
          white-space: pre-line;
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