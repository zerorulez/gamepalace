<template>
  <div class="new-post container py-2">
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="checkForm()">
          <p v-if="errors.length">
            <b>Please, fix the following errors:</b>
            <ul>
              <li v-for="(error, index) in errors" v-bind:key="index">{{ error }}</li>
            </ul>
          </p>
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" v-model="post.title">
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" id="description" rows="3" v-model="post.description"></textarea>
          </div>
          <div class="form-group">
            <label for="type">Type</label>
            <select class="form-control" id="type" v-model="type" @change="clear()">
              <option value="p">Picture</option>
              <option value="e">Embed (Youtube, Twitch, Vimeo)</option>
            </select>
          </div>
          <div class="form-group" v-if="type == 'p'">
            <label for="picture">Picture</label>
            <input type="file" class="form-control-file" id="picture" @change="processFile($event)">
          </div>
          <div class="form-group" v-if="type == 'e'">
            <label for="embed">Embed</label>
            <input type="text" class="form-control" id="embed" v-model="post.embed">
          </div>
          <button type="submit" class="btn btn-gamepalace">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"

export default {
  name: 'NewPost',
  data() {
    return {
      errors: [],
      post: {
        title: '',
        description: '',
        embed: ''
      },
      type: 'p',
      file: ''
    }
  },
  methods: {
    processFile(event) {
      this.file = event.target.files[0]
    },
    clear() {
      this.file = ''
      this.post.embed = ''
    },
    newPost() {
      let formData = new FormData();
      formData.append('title', this.post.title);
      formData.append('description', this.post.description);
      formData.append('categorie', this.$route.params.categorie);
      formData.append('file', this.file);
      formData.append('embed', this.post.embed);

      axios.post(process.env.VUE_APP_API_URL + '/posts', formData).then( (res) => {
        
        if (res.data._id) {
          this.post.title = ''
          this.post.description = ''
          this.file = ''
          this.post.embed = ''

          this.$router.push('/post/' + res.data._id)
        } else {
          this.errors = []
          
          if (res.data.error) {
            this.errors.push(res.data.error)
          }
        }

      }).catch( () => {
        this.errors = []
          
        this.errors.push('File size too big! Max 2mb')
      })
    },
    checkForm() {
      if (this.post.title && this.post.description && (this.post.embed || this.file)) {
        this.newPost()
        return true
      }

      this.errors = []

      if (!this.post.title) {
        this.errors.push('Title is required')
      }
      if (!this.post.description) {
        this.errors.push('Description is required')
      }
      if (!this.post.embed || !this.file) {
        this.errors.push('File or embed are required')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .description {
    background-color: white;
    border-radius: .25rem;
    color: #495057;
    // cursor: text;
  }
</style>