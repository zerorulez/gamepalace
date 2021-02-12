<template>
  <div class="thread">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="thread-wrapper">
            <div class="thread-image" @click="openImage()" v-if="thread.image" :style="{ 'background-image' : 'url(' + imagePath + thread.image + ')'}"></div>
            <div class="thread-content">
              <!-- <div class="thread-header">
                <div class="header-wrapper">
                  <h1>{{ thread.title }}</h1>
                </div>
              </div> -->
              <div class="thread-description">
                <div v-html="blocksToHTML(thread.description)"></div>
              </div>
              <div class="thread-footer">
                <!-- <span class="replies" v-if="thread.Replies">{{ thread.Replies.length }} respostas</span> -->
                <span class="date" v-if="thread.createdAt">{{ thread.createdAt | moment("H:mm - D MMMM YYYY") }}</span>
                <div @click="goToProfile(thread.User.username)" class="user">
                  <span class="username" v-if="thread.User">{{ thread.User.username }}</span>
                  <!-- <div class="avatar-image" v-if="thread.User" :style="{ 'background-image' : 'url(' + avatarPath + thread.User.avatar + ')'}"></div> -->
                  <div class="avatar-image default-avatar" v-if="thread.User"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="replies">
            <div class="replies-header">
              <h2>Respostas</h2>
            </div>

            <div v-if="$store.state.token && replyFormStatus" class="reply-form">
              <form @submit.prevent="newReply()" action="">
                <!-- <div class="form-group text-left">
                  <label for="avatar">Imagem</label>
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="customFile" ref="file" v-on:change="handleFileUpload()" accept="image/gif, image/jpeg, image/png">
                    <label class="custom-file-label" for="customFile">{{ fileName }}</label>
                  </div>
                </div> -->
                <div class="form-group text-left">
                  <label for="description">Responder</label>
                  <textarea name="description" class="form-control" id="description" v-model="reply.description" cols="30" rows="5"></textarea>
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

            <Reply v-for="(reply, index) in thread.Replies" :key="index" :reply="reply" />

            <div v-if="thread.Replies && thread.Replies.length == 0">
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

.ce-inline-toolbar__actions {
  input {
    color: white;
  }
}

.thread {
  margin-bottom: auto;
  
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
      border: 1px solid $lighter-gray;
      border-radius: 7px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }
  
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
        padding-bottom: 15px;

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
      }

      .thread-description {
        white-space: pre-wrap;
        iframe {
          border: 0;
        }
      }

      .thread-footer {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        padding-top: 15px;
        align-items: flex-end;

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
      }
      .reply-toogle {
        // cursor: pointer;
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
        border: 1px solid $lighter-gray;
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
// import edjsHTML from 'editorjs-html'

export default {
  name: 'Thread',
  data() {
    return {
      thread: {},
      reply: {},
      file: '',
      fileName: 'Escolher arquivo...',
      errors: [],
      replyFormStatus: true,
      imagePath: process.env.VUE_APP_API + '/images/posts/',
      avatarPath: process.env.VUE_APP_API + '/images/avatars/thumbnail_',
      // edjsParser: edjsHTML(),
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
        
        // let formData = new FormData()

        // if (this.file !== '') {
        //   formData.append('file', this.file)
        // }

        // if (this.reply.description) {
        //   formData.append('description', this.reply.description)
        // }
        
        let headers = {
          Authorization: 'Bearer ' + this.$store.state.token
        }

        axios.post(process.env.VUE_APP_API + '/reply/' + this.thread.id, { description: this.reply.description }, { headers }).then( res => {
          this.thread = res.data
          this.reply.description = ''
          this.file = ''
          // this.fileName = 'Escolher arquivo...'
          
          setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
          }, 250);

        }).catch( (err) => {
          this.errors.push(err.response.data.error)
        })

      }
    },
    blocksToHTML(data) {
      if (data) {
        let json = JSON.parse(data)
        var convertedHtml = "";
        json.blocks.map(block => {
          switch (block.type) {
            case "header":
              convertedHtml += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
              break;
            case "embed":
              convertedHtml += `<div class="embed-responsive embed-responsive-16by9 my-2"><iframe class="embed-responsive-item" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
              break;
            case "paragraph":
              convertedHtml += `<p>${block.data.text}</p>`
              convertedHtml = convertedHtml.replaceAll('<a', '<a target="_blank"')
              break;
            case "delimiter":
              convertedHtml += "<hr />";
              break;
            case "image":
              convertedHtml += `<img class="img-fluid my-2" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
              break;
            case "list":
              convertedHtml += `<ul class="mt-2">`;
              block.data.items.forEach(function(li) {
                convertedHtml += `<li>${li}</li>`;
              });
              convertedHtml += "</ul>";
              break;
            default:
              console.log("Unknown block type", block.type);
              break;
          }
        });
        return convertedHtml;
      }
    },
    validate() {
      if (!this.reply.description) {
        this.errors.push('Uma mensagem é obrigatória.');
      }
    },
    // openImage() {
    //   this.$store.commit('setLightbox', { image: this.thread.image, type: 'image' })
    //   this.$store.commit('toogleLightbox')
    // },
    goToProfile(username) {
      this.$router.push('/perfil/' + username)
    },
    toggleFormStatus() {
      this.replyFormStatus = !this.replyFormStatus
    },
    // setHTML(data) {
    //   console.log(data)
    //   if (data) {
    //     let json = JSON.parse(data)
    //     let result = this.edjsParser.parse(json)
    //     let html = ''
    //     result.map( item => {
    //       html += item
    //     })
    //     return html
    //   }
    // }
  },
  components: {
    Reply
  }
}
</script>
