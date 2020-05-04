<template>
  <div class="post-page container py-2">
    <div class="row">
      <div class="col-12">
        <div class="post-container border rounded mb-2 p-2">
          <div class="post" :class="{'flex-column' : photoRow }">
            <div class="media">
              <img :src="url + post.filename" :alt="post.title" class="img-fluid" v-if="post.filename" @click="tooglePhoto()" :class="{ 'max-300' : !photoRow }">
              <div class="embed-responsive embed-responsive-16by9" v-if="post.embed">
                <iframe class="embed-responsive-item" :src="post.embed" allowfullscreen></iframe>
              </div>
            </div>
            <div class="info" :class="{'pl-3' : !photoRow, 'pt-2' : photoRow }">
              <div class="post-header">
                <strong class="d-block">{{ post.title }}</strong>
                <p class="date text-secondary">{{ post.createdAt | moment("DD/MM/YYYY HH:mm:ss") }}</p>
              </div>
              <p class="description">{{ post.description }}</p>
            </div>
          </div>
          <div class="stats text-secondary pt-2" v-if="post.replys">
            <strong class="replys">{{ post.replys.length }} Replys</strong>
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
      photoRow: false,
      post: Object
    }
  },
  mounted() {
    axios.get(process.env.VUE_APP_API_URL + '/posts/' + this.id).then( res => {
      this.post = res.data
    })
  },
  methods: {
    tooglePhoto() {
      this.photoRow = !this.photoRow;
    }
  }
}
</script>

<style scoped lang="scss">
  .post-container {
    .post {
      display: flex;
      overflow-wrap: break-word;

      .media {
        display: flex;
        justify-content: center;

        .max-300 {
          max-width: 300px;
        }

        img {
          cursor: pointer;
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
      }
    }

    .stats {
      .replys {
        font-size: 14px;
      }
    }
  }
</style>