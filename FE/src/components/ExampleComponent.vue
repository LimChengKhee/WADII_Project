<template>
  <div>
    <p>suck</p>
  </div>
</template>
<script>
//  import statements
// import example from '@/utils/string_formatter'

export default {
  name: '',
  components: {
    // importing components from other places
  },
  data () {
    // local repository of information
    return {
      example: "hello world"
    }
  },
  computed: {
    // computed

  },

  // start of lifecycle
  async mounted () {
    await this.getPasswordFieldOptions()
  },

  methods: {
    // methods defined by ourselves
    example () {

    },
  },
}

</script>

<style scoped>

</style>
