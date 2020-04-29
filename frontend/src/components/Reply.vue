<template>
  <div class="reply border rounded mb-2 p-2">
    <img :src="url + reply.filename" alt="" class="img-fluid rounded">
    <p class="description py-2">{{ reply.description }}</p>
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
    
    img {
      max-height: 300px;
      margin: auto;
    }
  }
</style>