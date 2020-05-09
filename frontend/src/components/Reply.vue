<template>
  <div class="reply border rounded mb-2 p-2" :class="{'flex-column' : photoRow }" :id="reply._id">
    <div class="media">
      <img :src="url + reply.filename" :alt="reply.title" class="img-fluid" v-if="reply.filename" @click="tooglePhoto()" :class="{ 'max-image' : !photoRow }">
      <div class="embed-responsive embed-responsive-16by9" v-if="reply.embed">
        <iframe class="embed-responsive-item" :src="reply.embed" allowfullscreen></iframe>
      </div>
    </div>
    <div class="info" :class="{'pl-3' : !photoRow && (reply.filename || reply.embed), 'pt-2' : photoRow }">
      <div class="reply-header mb-2">
        <router-link class="d-block reply-to-this" :to="$route.params.id + '/reply/' + reply._id">Reply</router-link>
        <p class="date text-secondary pl-3">{{ reply.createdAt | moment("DD/MM/YYYY HH:mm:ss") }}</p>
      </div>
      <span v-if="reply.reply_id" class="reply-to-this d-block" @click="scrollMeTo(reply.reply_id)">>>{{ reply.reply_id }}</span>
      <p class="description">{{ reply.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reply',
  props: {
    reply: Object
  },
  data() {
    return {
      url: process.env.VUE_APP_UPLOAD_URL,
      photoRow: false,
    }
  },
  methods: {
    tooglePhoto() {
      this.photoRow = !this.photoRow;
    },
    scrollMeTo(refName) {
      var element = document.getElementById(refName)
      element.style.backgroundColor = '#f8f9fa'
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .reply {
    display: flex;
    word-break: break-all;

    .media {
      display: flex;
      justify-content: center;

      .max-image {
        max-width: 300px;
        max-height: 200px;
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
      .reply-header {
        display: flex;
        justify-content: space-between;

        .date {
          font-size: 14px;
          min-width: 150px;
          text-align: right;
        }
      }

      .reply-to-this {
        font-size: 14px;
        cursor: pointer;
        text-decoration: underline;
        color: #0056b3;
      }
    }
  }
</style>