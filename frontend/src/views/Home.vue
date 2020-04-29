<template>
  <div class="home container py-2">
    <div class="row">
      <div class="col-12">
        <Post v-for="(post, index) in posts" :post="post" v-bind:key="index"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Post
  },
  data() {
    return {
      posts: Object
    }
  },
  mounted() {
    axios.get(process.env.VUE_APP_API_URL + '/posts').then( res => {
      this.posts = res.data
      console.log(this.posts)
    })
  }
}
</script>
