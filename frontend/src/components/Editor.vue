<template>
  <div class="editor">
    <editor
       api-key="no-api-key"
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
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }"
     />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default {
  components: {
     'editor': Editor
  },
  props: ['description'],
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
</style>