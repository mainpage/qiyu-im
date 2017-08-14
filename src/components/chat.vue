<template>
  <div class="chat">
    <h2>chat</h2>
    <p class="state">{{state}}</p>
    <ul class="msglist">
      <li v-for="msg in msgList">{{msg.content}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'chat',
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters([
      'state',
      'msgList'
    ])
  },
  created: function(){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.chat{

}
</style>
