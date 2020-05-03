<template>
  <div class="reply border rounded mb-2 p-2">
    <div class="reply-header">
      <p class="date text-secondary">{{ reply.createdAt | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</p>
    </div>
    <div class="media">
      <img :src="url + reply.filename" alt="" class="img-fluid my-2" v-if="reply.filename">
      <div class="embed-responsive embed-responsive-16by9" v-if="reply.embed">
        <iframe class="embed-responsive-item" :src="reply.embed" allowfullscreen autoplay="false"></iframe>
      </div>
    </div>
    <p class="description py-2" v-if="reply.description != ''">{{ reply.description }}</p>
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .reply {
    display: flex;
    flex-direction: column;
    overflow-wrap: break-word;

    .reply-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .date {
        font-size: 14px;
      }
    }
    
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
  }
</style>