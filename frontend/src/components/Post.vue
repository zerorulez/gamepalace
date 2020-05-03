<template>
  <div class="post-container border rounded mb-2 p-2">
    <router-link class="no-link" :to="'/post/' + post._id">
      <div class="post">
        <div class="post-header">
          <strong class="d-block">{{ post.title }}</strong>
          <p class="date text-secondary">{{ post.createdAt | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</p>
        </div>
        <div class="media my-2">
          <img :src="url + post.filename" alt="" class="img-fluid" v-if="post.filename">
          <div class="embed-responsive embed-responsive-16by9" v-if="post.embed">
            <iframe class="embed-responsive-item" :src="post.embed" allowfullscreen autoplay="false"></iframe>
          </div>
        </div>
        <p class="description">{{ post.description }}</p>
      </div>
      <div class="stats text-secondary">
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
    cursor: pointer;
    .post {
      display: flex;
      flex-direction: column;
      overflow-wrap: break-word;

      .media {
        display: flex;
        justify-content: center;
        img {
          max-height: 300px;
        }
        div {
          max-width: 600px;
        }
      }

      .post-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .date {
          font-size: 14px;
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