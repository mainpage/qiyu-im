import Vue from 'vue'
import Vuex from 'vuex'
import push from './push'

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
  currentSessionId: null,
  sessions: {
    /*
    id: {
      id,
      msgs: [...ids],
      lastMessage
    }
    */
  },
  msgs: {
    /*
    id: {
      id,
      sessionId,
      content,
      timestamp
    }
    */
  }
}

const mutations = {
  setSocket: function(state, socket){
    state.socket = socket;
  },
  setStatus: function(state, status){
    state.status = status;
  },
  addSession: function(state, session){
    session.msgs = [];
    //state.sessions[session.id] = session;
    //
    Vue.set(state.sessions, session.id, session);
    state.currentSessionId = session.id;
  },
  addMsg: function(state, msg){
    if(!msg || !msg.id) return;
    let sessionId = msg.id.split('#')[0],
        session = state.sessions[sessionId];
    if(!session) return;
    doFormatMsg(msg);
    //state.msgs[msg.idClient] = msg;
    Vue.set(state.msgs, msg.id, msg);
    session.msgs.push(msg.id);
  }
}

const actions = {
  sendMessage: async function({commit}, msg){
    let ret = await sendMessage(msg);
    commit('addMsg', ret);
  }
}

const getters = {
  user: state => state.user,
  socket: state => state.socket,
  status: state => state.status,
  currentSession: state => state.sessions[state.currentSessionId],
  currentMsgList: state => {
    let session = getters.currentSession(state);
    if(!session) return;
    return session.msgs.map(id => state.msgs[id])
  }
}

const doFormatMsg = (function(){
  let fmap = {
    'text': function(msg){
      msg.content = msg.text || '';
    }
  }
  return function(msg){
    let func = fmap[msg.type];
    if(_.isFunction(func)){
      func(msg);
    }
  } 
})();

const sendMessage = function(msg){
  return new Promise((resolve, reject) => {
    msg.done = (err, ret) => {
      if(err){
        reject(err)
      }else{
        msg.id = state.currentSessionId + '#' + ret.idClient;
        resolve(msg);
      }
    }
    push.sendMessage(msg);
  })
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})