<template>
  <div class="new-post container py-2">
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="newPost()">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" v-model="post.title" required>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" id="description" rows="3" v-model="post.description" required></textarea>
          </div>
          <div class="form-group">
            <label for="type">Type</label>
            <select class="form-control" id="type" v-model="type" @change="clear()">
              <option value="p">Picture</option>
              <option value="e">Embed (Youtube & Twitch)</option>
            </select>
          </div>
          <div class="form-group" v-if="type == 'p'">
            <label for="picture">Picture</label>
            <input type="file" class="form-control-file" id="picture" @change="processFile($event)" required>
          </div>
          <div class="form-group" v-if="type == 'e'">
            <label for="embed">Embed</label>
            <input type="text" class="form-control" id="embed" v-model="post.embed" required>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
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
      formData.append('file', this.file);
      formData.append('embed', this.post.embed);

      axios.post(process.env.VUE_APP_API_URL + '/posts', formData).then( (res) => {
        
        this.post.title = ''
        this.post.description = ''
        this.file = ''
        this.post.embed = ''

        this.$router.push('/post/' + res.data._id)
      })
    }
  }
}
</script>
