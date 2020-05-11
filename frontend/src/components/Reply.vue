<template>
  <div class="reply border-gray rounded mb-2 p-2" :class="{'flex-column' : photoRow }" :id="reply._id">
    <div class="media">
      <img :src="url + reply.filename" :alt="reply.title" class="img-fluid" v-if="reply.filename" @click="tooglePhoto()" :class="{ 'max-image' : !photoRow }">
      <div class="embed-responsive embed-responsive-16by9" v-if="reply.embed">
        <iframe class="embed-responsive-item" :src="reply.embed" allowfullscreen></iframe>
      </div>
    </div>
    <div class="pt-3 info" :class="{'pl-xl-3' : !photoRow, 'pt-xl-0': !photoRow }">
      <div class="reply-header mb-2">
        <router-link class="d-block reply-to-this" :to="$route.params.id + '/reply/' + reply._id">Reply</router-link>
        <p class="date font-secondary pl-3">{{ reply.createdAt | moment("DD/MM/YYYY HH:mm:ss") }}</p>
      </div>
      <span v-if="reply.reply_id" class="reply-to-this d-block" @click="scrollMeTo(reply.reply_id)">>>{{ reply.reply_id }}</span>
      <p class="description font-primary">{{ reply.description }}</p>
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
      element.style.backgroundColor = '#3b3f44'
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../styles/variables.scss';
  .reply {
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

      .description {
        white-space: pre-line;
      }

      .reply-to-this {
        font-size: 14px;
        cursor: pointer;
        text-decoration: underline;
        color: $link;
      }
    }
  }
</style>