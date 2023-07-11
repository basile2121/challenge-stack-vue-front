<template>
   {{this.ingredient}}
    
</template>
<script>
  import { ref } from 'vue'
  import { useField, useForm } from 'vee-validate'
  export default {
    name:"FormIngredient",
    props: {
        ingredient:Object,
    },
    data () {
        
    },
    setup() {
       
    
    return {
      
    }
  }
  }
</script>