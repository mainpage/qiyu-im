<template>
  <div class="g-main">
    <div class="g-hd">
      <h2>访客端</h2>
    </div>
    <div class="g-bd">
      <!-- <router-view name="shop"></router-view> -->
      <router-view name="chat"></router-view>
    </div>
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
<style type="text/css" lang="scss">

*{
  margin: 0;
  padding: 0;
  outline: none;
  font-family: Microsoft YaHei;
}
.g-main{
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 760px;
  margin: 20px auto;
  box-shadow: 0 1px 5px 2px #ccc;
}
.g-hd{
  position: relative;
  width: 100%;
  height: 45px;
  color: #fff;
  line-height: 45px;
  font-size: 14px;
  background-color: #f16964;
}
.g-bd{
  flex: 1;
  display: flex;
  flex-direction: column;
}

</style>
