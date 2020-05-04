<template>
  <div class="reply border rounded mb-2 p-2" :class="{'flex-column' : photoRow }">
    <div class="media">
      <img :src="url + reply.filename" :alt="reply.title" class="img-fluid" v-if="reply.filename" @click="tooglePhoto()" :class="{ 'max-300' : !photoRow }">
      <div class="embed-responsive embed-responsive-16by9" v-if="reply.embed">
        <iframe class="embed-responsive-item" :src="reply.embed" allowfullscreen></iframe>
      </div>
    </div>
    <div class="info" :class="{'pl-3' : !photoRow && (reply.filename || reply.embed), 'pt-2' : photoRow }">
      <div class="reply-header">
        <strong class="d-block">{{ reply.title }}</strong>
        <p class="date text-secondary">{{ reply.createdAt | moment("DD/MM/YYYY HH:mm:ss") }}</p>
      </div>
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .reply {
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
      .reply-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .date {
          font-size: 14px;
        }
      }
    }
  }
</style>