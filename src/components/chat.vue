<template>
  <div class="chat">
    <p class="state">{{status}}</p>
    <ul class="msg-list" ref="msgList">
      <li class='msg' v-for="msg in currentMsgList" :class="[msg.type, {msg_right: msg.fromUser}]">
        <span class="name" v-if="!msg.fromUser">客服</span>
        <div class="content">
          <div v-if="msg.type=='rich'" v-html="msg.content"></div>
          <span v-else>{{msg.content}}</span>
        </div>
        <span class="name" v-if="msg.fromUser">我</span>
      </li>
    </ul>
    <div class="editor">
      <textarea v-model="input" placeholder="请输入..." @keydown.enter.prevent @keyup.enter.prevent="send()"></textarea>
      <div class="action">
        <button class="send" @click="send()">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  name: 'chat',
  data () {
    return {
      input: ''
    }
  },
  computed: {
    ...mapGetters([
      'status',
      'currentSession',
      'currentMsgList'
    ])
  },
  watch: {
    currentMsgList(){
      this.$nextTick(() => {
        let list = this.$refs['msgList'];
        list.scrollTop = list.scrollHeight;
      })
      //this.$refs['msgList'].scrollTop = this.$refs['msgList'].scrollTop * 2 + 50;
    }
  },
  created: function(){
    
  },
  methods: {
    ...mapActions([
      'sendMessage'
    ]),
    send() {
      if(!this.input) return;
      let msg = {
        id: this.currentSession.id + '#'+ _.uniqueId(),
        text: this.input,
        fromUser: 1,
        type: 'text'
      };
      this.sendMessage(msg);
      this.input = '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  type="text/css" lang="scss">
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
  flex: 1;
  display: flex;
  flex-direction: column;
}
.msg-list{
  flex: 1;
  list-style: none;
  overflow: auto;
  .msg{
    display: block;
    margin: 10px 30px;
    text-align: left;
    .name{
      font-style: italic;
      font-size: 14px;
    }
    .content{
      display: inline-block;
      max-width: 60%;
      margin: 0 5px;
      padding: 6px 10px 7px 12px;
      color: #222;
      font-size: 14px;
      line-height: 1.5;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
      background-color: #f7f7f7;
    }
  }
  .msg_right{
    text-align: right;
    .content{
      background-color: #f16964;
      color: #fff;
      border: none;
    }
  }
  .rich{
    img{
      width: auto;
      height: auto;
      max-width: 275px;
      max-height: 400px;
      cursor: pointer;
    }
  }
}
.editor{
  height: 100px;
  padding: 10px 10px 15px 10px;
  border-top: 1px solid #ccc;
  textarea{
    width: 100%;
    height: 58px;
    padding: 10px;
    border: none;
    font-size: 14px;
    resize: none;
    box-sizing: border-box;
    &:focus{
      border: none;
    }
  }
  .action{
    text-align: right;
  }
  .send{
    margin-right: 10px;
    padding: 10px 20px;
    border: 0;
    border-radius: 3px;
    font-size: 14px;
    color: #fff;
    background-color: #f16964;
    cursor: pointer;
  }
}

</style>
