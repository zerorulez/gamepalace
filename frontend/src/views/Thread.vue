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
                <div class="user">
                  <span class="username" v-if="thread.user">{{ thread.user.username }}</span>
                  <div class="avatar-image" v-if="thread.user" :style="{ 'background-image' : 'url(' + avatarPath + thread.user.avatar + ')'}"></div>
                </div>
              </div>
              <div class="thread-description">
                <p>{{ thread.description }}</p>
              </div>
              <div class="thread-footer">
                <span class="replies" v-if="thread.replies">{{ thread.replies.length }} respostas</span>
                <span class="date">{{ thread.createdAt | moment("H:mm - D MMMM") }}</span>
              </div>
            </div>
          </div>

          <div class="replies">
            <h2>Respostas</h2>

            <div v-if="$store.state.token" class="reply-form">
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
                  <textarea name="description" class="form-control" id="description" v-model="reply.description" cols="30" rows="10"></textarea>
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
              <p>Nenhuma resposta encontrado...</p>
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
      background-size: cover;
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
          .username {
            font-weight: bold;
            padding-right: 15px;
            display: none;
            font-size: 15px;

            @media (min-width: 992px) {
              display: block;
            }
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
        padding-top: 30px;
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
    h2 {
      font-weight: bold;
      font-size: 20px;
      margin: 0;
      color: white;
      padding-bottom: 15px;
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

export default {
  name: 'Thread',
  data() {
    return {
      thread: {},
      reply: {},
      file: '',
      fileName: 'Escolher arquivo...',
      errors: [],
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
    }
  },
  components: {
    Reply
  }
}
</script>
