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
                <!-- <div class="form-group text-left">
                  <label for="avatar">Imagem</label>
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="customFile" ref="file" v-on:change="handleFileUpload()" accept="image/gif, image/jpeg, image/png">
                    <label class="custom-file-label" for="customFile">{{ fileName }}</label>
                  </div>
                </div> -->
                <div class="form-group text-left">
                  <label for="description">Mensagem</label>
                  <div id="editorjs"></div>
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
  #editorjs {
    background-color: #0E0E10;
    border: 1px solid #707070;
    padding: .375rem .75rem;
    border-radius: .25em;
  }
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
      //     border: 1px solid $lighter-gray;
      //     border-radius: 7px;
      //     background-repeat: no-repeat;
      //     background-position: center;
      //     background-size: cover;
      //   }
      // }
    }
    .custom-file-label {
      background-color: $dark-gray;
      border: 1px solid $lighter-gray;
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
import axios from 'axios'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Image from '@editorjs/image';
import Paragraph from '@editorjs/paragraph';

export default {
  name: 'NewThread',
  data() {
    return {
      thread: {},
      file: '',
      // fileName: 'Escolher arquivo...',
      errors: [],
      editor: null
    }
  },
  mounted() {
    this.editor = new EditorJS({
      tools: {
        header: {
          class: Header,
          inlineToolbar: false
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: [
            'bold',
            'italic',
            'link'
          ]
        },
        list: {
          class: List,
          inlineToolbar: [
            'bold'
          ]
        },
        embed: {
          class: Embed,
          inlineToolbar: false
        },
        image: {
          class: Image,
          config: {
            endpoints: {
              byFile: `${process.env.VUE_APP_API}/image`, // Your backend file uploader endpoint
              byUrl: `${process.env.VUE_APP_API}/image-by-url`, // Your endpoint that provides uploading by Url
            }
          }
        },
      }
    })
  },
  methods: {
    // handleFileUpload() {
    //   this.file = this.$refs.file.files[0];
    //   this.fileName = this.$refs.file.files[0].name
    // },
    newThread() {
      
      this.errors = []
      
      this.validate()
      
      if (!this.errors.length) {
        // let formData = new FormData()

        // formData.append('title', this.thread.title)
        // formData.append('file', this.file)
        // formData.append('description', this.thread.description)

        this.editor.save().then( data => {
          console.log(data)

          if (data.blocks.length > 0) {
            let headers = {
              Authorization: 'Bearer ' + this.$store.state.token
            }

            axios.post(process.env.VUE_APP_API + '/post', { title: this.thread.title, description: JSON.stringify(data) }, { headers }).then( res => {
              this.$router.push('/topico/' + res.data.id)
            }).catch( (err) => {
              this.errors.push(err.response.data.error)
            })
          } else {
            this.errors.push('Uma mensagem é obrigatória.');
          }
        }).catch( err => {
          console.log(err)
        })
      }
    },
    validate() {
      if (!this.thread.title) {
        this.errors.push('O título é obrigatório.');
      }
    },
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  components: {
  }
}
</script>
