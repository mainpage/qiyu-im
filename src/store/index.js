import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  socket: null,
  status: 'connecting',
  user: {
    "token": "9df0ea144fe24cdf80eb29f4ef4df147",
    "account": "132501d1f3770f3f36bc81e90366d9ce",
    "exchange": [
      "-1"
    ],
    "appKey": "f02d1806710709ba1eda23e841e96fce",
    "lbsUrl": "https://webtest.netease.im/lbs/webconf.jsp?devflag=qytest"
  },
  msgList: []
}

const mutations = {
  setSocket: function(state, socket){
    state.socket = socket;
  },
  setStatus: function(state, status){
    state.status = status;
  },
  addMsg: function(state, msg){
    state.msgList.push(msg);
  }
}

const actions = {

}

const getters = {
  user: state => state.user,
  socket: state => state.socket,
  state: state => state.status,
  msgList: state => state.msgList
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
