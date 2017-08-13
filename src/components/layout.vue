<template>
  <div class="layout">
    <h1>layout</h1>
    <router-view name="shop"></router-view>
    <router-view name="chat"></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'layout',
  data () {
    return {
      
    }
  },
  computed: mapGetters([
    'user'
  ]),
  created: function(){
    var nopt = {
      syncTeams: !1,
      syncFriends: !1,
      syncRoamingMsgs: !1,
      syncTeamMembers: !1,
      syncFilter: !0,
      onconnect: function(res){
        applyKefu();
      }
    };
    window.nim = new NIM(Object.assign(nopt, this.user));
    function applyKefu(){
      nim.sendCustomSysMsg({
        to: -1,
        cc: !0,
        filter: !0,
        scene: 'p2p',
        content: JSON.stringify({
          cmd: 1,
          deviceid: '122222222222',
          exchange: -1,
          fromType: 'WEB',
        }),
        //
        done: function (error, data) {
          if (!error) {
            console.log(data)
          }
        }
      });
    }
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
