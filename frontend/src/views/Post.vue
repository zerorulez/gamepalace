<template>
  <div class="post-page container py-2">
    <div class="row">
      <div class="col-12">
        <div class="post-container border-gray rounded mb-2 p-2">
          <div class="post" :class="{'flex-column' : photoRow }">
            <div class="media">
              <img :src="url + post.filename" :alt="post.title" class="img-fluid" v-if="post.filename" @click="tooglePhoto()" :class="{ 'max-image' : !photoRow }">
              <div class="embed-responsive embed-responsive-16by9" v-if="post.embed">
                <iframe class="embed-responsive-item" :src="post.embed" allowfullscreen></iframe>
              </div>
            </div>
            <div class="pt-3 info" :class="{'pl-xl-3' : !photoRow, 'pt-xl-0': !photoRow }">
              <div class="post-header">
                <strong class="d-block font-primary">{{ post.title }}</strong>
                <p class="date font-secondary pl-3">{{ post.createdAt | moment("DD/MM/YYYY HH:mm:ss") }}</p>
              </div>
              <div class="description font-primary" v-html="post.description"></div>
            </div>
          </div>
          <div class="stats font-secondary pt-2" v-if="post.replys">
            <strong class="replys">{{ post.replys.length }} Replies</strong>
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
      word-break: break-word;
      flex-direction: column;

      @media (min-width: 1200px) {
        flex-direction: row;
      }

      .media {
        display: flex;
        justify-content: center;

        .max-image {
          max-height: 200px;
        }

        img {
          cursor: pointer;
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