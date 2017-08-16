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
  onConnect: function(state){
    state.status = 'connected';
    this.commit('applyKefu');
  },
  applyKefu: function(state){
    state.status = 'applying';
    applyKefu(state);
  },
  addSession: function(state, session){
    session.msgs = [];
    //state.sessions[session.id] = session;
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
  sendMessage: async function({commit, state}, msg){
    let ret = await sendMessage(state, msg);
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

/**
 * 申请客服
 * @param  {object} state
 * @return {void}
 */
function applyKefu(state){
  sendCustomSysMsg(state, {
    content: JSON.stringify({
      cmd: 1,
      deviceid: 'return'
    })
  });
}
/**
 * 发送普通消息
 * @param  {object} state
 * @param  {object} msg
 * @return {void}
 */
const sendMessage = function(state, msg){
  return new Promise((resolve, reject) => {
    msg.done = (err, ret) => {
      if(err){
        reject(err)
      }else{
        msg.id = state.currentSessionId + '#' + ret.idClient;
        resolve(msg);
      }
    }
    let status = state.status;
    if(status != 'success') return;
    let socket = state.socket;
    socket.sendText(Object.assign({
      cc: true,
      filter: true,
      scene: 'p2p',
      to: -1
    }, msg));
  })
}
/**
 * 发送自定义系统消息
 * @param  {object} state 
 * @param  {object} msg
 * @return {void}
 */
function sendCustomSysMsg(state, msg){
  let socket = state.socket,
    user = state.user;
  socket.sendCustomSysMsg(Object.assign({
    to: user.exchange[0],
    cc: true,
    filter: true,
    scene: 'p2p',
    done: function(err, msg){
      if(!!err) console.error('sendCustomSysMsg error', err);
    }
  }, msg))
}
/**
 * 消息格式化
 * @param  {Object} msg
 * @return {void}
 */
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

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
