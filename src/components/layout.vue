<template>
  <div class="layout">
    <h1>layout</h1>
    <!-- <router-view name="shop"></router-view> -->
    <router-view name="chat"></router-view>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import push from '../store/push'

export default {
  name: 'layout',
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    ...mapMutations([

    ])
  },
  created: function(){
    push.initSocket();
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
</style>
