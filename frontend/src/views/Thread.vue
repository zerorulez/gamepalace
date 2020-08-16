<template>
  <div class="thread">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="thread-wrapper">
            <div class="thread-image" @click="openImage()" v-if="thread.image" :style="{ 'background-image' : 'url(' + imagePath + thread.image + ')'}"></div>
            <div class="thread-content">
              <div class="thread-header">
                <div class="header-wrapper">
                  <!-- <span class="game text-blue">Streets of Rage</span> -->
                  <h1>{{ thread.title }}</h1>
                </div>
                <div @click="goToProfile(thread.user._id)" class="user">
                  <span class="username" v-if="thread.user">{{ thread.user.username }}</span>
                  <div class="avatar-image" v-if="thread.user && thread.user.avatar" :style="{ 'background-image' : 'url(' + avatarPath + thread.user.avatar + ')'}"></div>
                  <div class="avatar-image default-avatar" v-if="thread.user && !thread.user.avatar"></div>
                </div>
              </div>
              <div class="thread-description">
                <p v-html="thread.description" class="pb-4"></p>
              </div>
              <div class="thread-footer">
                <span class="replies" v-if="thread.replies">{{ thread.replies.length }} respostas</span>
                <span class="date" v-if="thread.createdAt">{{ thread.createdAt | moment("H:mm - D MMMM") }}</span>
              </div>
            </div>
          </div>

          <div class="replies">
            <div class="replies-header">
              <h2>Respostas</h2>
              <div class="reply-toogle" @click="toggleFormStatus()">
                <strong class="pr-2">Responder</strong>
                <img src="../assets/reply-icon.svg" alt="reply icon" class="img-fluid">
              </div>
            </div>

            <div v-if="$store.state.token && replyFormStatus" class="reply-form">
              <form @submit.prevent="newReply()" action="">
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
                    v-model="reply.description"
                    :init="{
                      height: 300,
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
                </div>
                <div class="buttons">
                  <!-- <button class="btn btn-gray">Adicioanr Imagem</button> -->
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

            <Reply v-for="(reply, index) in thread.replies" :key="index" :reply="reply" />

            <div v-if="thread.replies && thread.replies.length == 0">
              <p>Nenhuma resposta encontrada...</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">

@import '../styles/variables.scss';

.thread {
  .thread-wrapper {
      background-color: $light-gray;
      border-radius: 10px;
      margin-bottom: 30px;

    .thread-image {
      border-radius: 10px 10px 0 0;
      background-color: #000;
      height: 150px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      cursor: pointer;
      
      @media (min-width: 992px) {
        height: 250px;
      }

    }
    .thread-content {
      padding: 15px;
      width: 100%;

      .thread-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 30px;

        .game {
          font-size: 13px;
        }

        h1 {
          color: white;
          font-size: 20px;
          font-weight: bold;
          margin: 0;
          text-transform: uppercase;
        }

        .user {
          display: flex;
          align-items: center;
          padding-left: 30px;
          flex-shrink: 0;
          cursor: pointer;
          .username {
            font-weight: bold;
            padding-right: 15px;
            display: none;
            font-size: 15px;

            @media (min-width: 992px) {
              display: block;
            }
          }
          
          .default-avatar {
            background-image: url("../assets/avatar.png");
          }
          
          .avatar-image {
            width: 40px;
            height: 40px;
            border: 1px solid $ligther-gray;
            border-radius: 7px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
        }
      }

      .thread-description {
        white-space: pre-wrap;
      }

      .thread-footer {
        display: flex;
        justify-content: space-between;
        font-size: 12px;

        .date {
          text-transform: capitalize;
        }
      }
    }
  }

  .replies {
    .replies-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      h2 {
        font-weight: bold;
        font-size: 20px;
        margin: 0;
        color: white;
      }
      .reply-toogle {
        cursor: pointer;
      }
    }

    .reply-form {
      background-color: $light-gray;
      padding: 15px;
      border-radius: 10px;
      margin-bottom: 15px;
      .buttons {
        display: flex;
        justify-content: flex-end;

        button {
          margin-left: 15px;
        }
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
  }
}
</style>

<script>
import Reply from '@/components/Reply.vue'
import axios from 'axios'
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'Thread',
  data() {
    return {
      thread: {},
      reply: {},
      file: '',
      fileName: 'Escolher arquivo...',
      errors: [],
      replyFormStatus: false,
      TinyMCEKey: process.env.VUE_APP_TINYMCE_KEY,
      imagePath: process.env.VUE_APP_API + '/images/posts/',
      avatarPath: process.env.VUE_APP_API + '/images/avatars/thumbnail_'
    }
  },
  mounted() {

    axios.get(process.env.VUE_APP_API + '/post/' + this.$route.params.id).then( res => {
      this.thread = res.data
    })
    
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.fileName = this.$refs.file.files[0].name
    },
    newReply() {
      
      this.errors = []
      
      this.validate()
      
      if (!this.errors.length) {
        
        let formData = new FormData()

        if (this.file !== '') {
          formData.append('file', this.file)
        }

        if (this.reply.description) {
          formData.append('description', this.reply.description)
        }
        
        let headers = {
          Authorization: 'Bearer ' + this.$store.state.token
        }

        axios.post(process.env.VUE_APP_API + '/reply/' + this.thread._id, formData, { headers }).then( res => {
          this.thread = res.data
          this.reply = {}
          this.file = ''
          this.fileName = 'Escolher arquivo...'
          
          setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
          }, 250);

        }).catch( (err) => {
          this.errors.push(err.response.data.error)
        })

      }
    },
    validate() {
      if (!this.reply.description && this.file == '') {
        this.errors.push('Uma mensagem ou imagem são obrigatórios.');
      }
    },
    openImage() {
      this.$store.commit('setLightbox', { image: this.thread.image, type: 'image' })
      this.$store.commit('toogleLightbox')
    },
    goToProfile(id) {
      this.$router.push('/perfil/' + id)
    },
    toggleFormStatus() {
      this.replyFormStatus = !this.replyFormStatus
    }
  },
  components: {
    Reply,
     'editor': Editor
  }
}
</script>
