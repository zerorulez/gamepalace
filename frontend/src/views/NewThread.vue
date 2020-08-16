<template>
  <div class="new-thread">
    <div class="container">
      <div class="row">
        <div class="col-12 offset-lg-2 col-lg-8">
          <div class="thread-wrapper">
            <!-- <div class="thread-image" :style="{ 'background-image' : 'url(' + 'http://picsum.photos/1120/250' + ')'}"></div> -->
            <div class="thread-form">
              <form @submit.prevent="newThread()" class="text-center">
                <div class="form-group text-left form-title">
                  <div class="input">
                    <label for="title">Título</label>
                    <input type="text" v-model="thread.title" class="form-control" name="title" id="title">
                  </div>
                  <!-- <div class="avatar-image" :style="{ 'background-image' : 'url(' + 'http://picsum.photos/70' + ')'}"></div> -->
                </div>
                <div class="form-group text-left">
                  <label for="avatar">Imagem</label>
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="customFile" ref="file" v-on:change="handleFileUpload()" accept="image/gif, image/jpeg, image/png">
                    <label class="custom-file-label" for="customFile">{{ fileName }}</label>
                  </div>
                </div>
                <div class="form-group text-left">
                  <label for="description">Mensagem</label>
                  <editor
                    :api-key="TinyMCEKey"
                    v-model="thread.description"
                    :init="{
                      height: 500,
                      menubar: false,
                      language: 'pt_BR',
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                      toolbar:
                        'undo redo | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                    }"
                  />
                  <!-- <textarea name="description" class="form-control" id="description" v-model="thread.description" cols="30" rows="10"></textarea> -->
                </div>
                <div class="button">
                  <button type="submit" class="btn btn-default">Enviar</button>
                </div>
              </form>
              <div class="errors-wrapper">
                <p class="errors" v-if="errors.length">
                  <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
                  <ul>
                    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">

@import '../styles/variables.scss';

.new-thread {
  .thread-wrapper {
      background-color: $light-gray;
      border-radius: 10px;
    .thread-image {
      border-radius: 10px 10px 0 0;
      background-color: #000;
      height: 125px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      
      @media (min-width: 992px) {
        height: 200px;
      }

    }
    .thread-form {
      padding: 15px;

      .button {
        display: flex;
        justify-content: flex-end;
      }

      // .form-title {
      //   display: flex;
      //   align-items: flex-end;

      //   .avatar-image {
      //     margin-left: 15px;
      //     min-width: 40px;
      //     height: 40px;
      //     border: 1px solid $ligther-gray;
      //     border-radius: 7px;
      //     background-repeat: no-repeat;
      //     background-position: center;
      //     background-size: cover;
      //   }
      // }
    }
    .custom-file-label {
      background-color: $dark-gray;
      border: 1px solid $ligther-gray;
      overflow: hidden;
    }

    .custom-file-input:lang(en)~.custom-file-label::after {
      content: "Procurar";
      background-color: $light-gray;
    }
  }
  
  .errors-wrapper {
    display: flex;
    justify-content: center;
    .errors {
      color: white;
      margin-top: 15px !important;

      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
    }
  }
}
</style>

<script>
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'

export default {
  name: 'NewThread',
  data() {
    return {
      thread: {},
      file: '',
      fileName: 'Escolher arquivo...',
      errors: [],
      TinyMCEKey: process.env.VUE_APP_TINYMCE_KEY
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.fileName = this.$refs.file.files[0].name
    },
    newThread() {
      
      this.errors = []
      
      this.validate()
      
      if (!this.errors.length) {
        let formData = new FormData()

        formData.append('title', this.thread.title)
        formData.append('file', this.file)
        formData.append('description', this.thread.description)
        
        let headers = {
          Authorization: 'Bearer ' + this.$store.state.token
        }

        axios.post(process.env.VUE_APP_API + '/post', formData, { headers }).then( res => {
          this.$router.push('/topico/' + res.data._id)
        }).catch( (err) => {
          this.errors.push(err.response.data.error)
        })
      }
    },
    validate() {
      if (!this.thread.title) {
        this.errors.push('O título é obrigatório.');
      }
      if (this.file == '') {
        this.errors.push('A imagem é obrigatória.');
      }
      if (!this.thread.description) {
        this.errors.push('Uma mensagem é obrigatória.');
      }
    },
    beforeDestroy() {
      // Always destroy your editor instance when it's no longer needed
      this.editor.destroy()
    },
  },
  components: {
     'editor': Editor
  }
}
</script>
