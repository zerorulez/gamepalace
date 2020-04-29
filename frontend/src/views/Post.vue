<template>
  <div class="post container py-2">
    <div class="row">
      <div class="col-12">
        <div class="post-container border rounded mb-2 p-2">
          <div class="post">
            <div class="post-header">
              <strong class="d-block">{{ post.title }}</strong>
              <p class="date text-secondary">{{ post.createdAt }}</p>
            </div>
            <img :src="url + post.filename" v-if="post.filename" alt="" class="img-fluid my-2 rounded">
            <p class="description">{{ post.description }}</p>
          </div>
          <div class="stats text-secondary">
            <strong class="replys" v-if="post.replys">{{ post.replys.length }} Replys</strong>
          </div>
        </div>

        <Reply v-for="(reply, index) in post.replys" :reply="reply" v-bind:key="index"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Reply from '@/components/Reply.vue'
import axios from 'axios'

export default {
  name: 'Post',
  components: {
    Reply
  },
  data() {
    return {
      id: this.$route.params.id,
      url: process.env.VUE_APP_UPLOAD_URL,
      post: Object
    }
  },
  mounted() {
    axios.get(process.env.VUE_APP_API_URL + '/posts/' + this.id).then( res => {
      this.post = res.data
    })
  }
}
</script>

<style scoped lang="scss">
  .post-container {
    .post {
      display: flex;
      flex-direction: column;
      overflow-wrap: break-word;

      img {
        max-height: 300px;
        margin: auto;
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