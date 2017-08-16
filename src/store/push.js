import store from './index'
import _ from 'lodash'

const socketOption = {
  syncTeams: !1,
  syncFriends: !1,
  syncRoamingMsgs: !1,
  syncTeamMembers: !1,
  syncFilter: !0,
  onconnect: onConnect,
  /*onerror: onConnectError,
  ondisconnect: onDisConnect,*/
  onmsg: onMsg,
  oncustomsysmsg: function(msg){
  	onCustomSysMsg(msg);
  } 
}

function initSocket(){
	let user = store.getters.user;
	let socket = new NIM(Object.assign(socketOption, user));
	store.commit('setSocket', socket);
}

function onConnect(data){
	store.commit('onConnect');
}

function onMsg(msg){
	msg.fromUser = 0;
	msg.id = msg.idClient;
	if(msg.type == 'custom'){
		onCustomMsg(msg);
		return;
	}
	store.commit('addMsg', msg);
}

var onCustomMsg = (function(){
	const fmap = {
		65: function(content, msg){
			msg.type = 'rich';
			msg.content = content.content;
		}
	}
	return function(msg){
		let content = msg.content;
		try{
			content = JSON.parse(content);
		}catch(err){
			content = {};
		}
		if(!content.cmd) return;
		let func = fmap[content.cmd];
		if(_.isFunction(func)){
			func(content, msg);
			store.commit('addMsg', msg);
		}
	}
})();

var onCustomSysMsg = (function(){
	const fmap = {
		// 申请客服结果
		2: function(content, msg){
			store.commit('setStatus', 'success');
			let session = {
				id: content.sessionid
			}
			store.commit('addSession', session);
		}
	};
	return function(msg){
		let content = msg.content;
		try{
			content = JSON.parse(content);
		}catch(err){
			content = {};
		}
		if(!content.cmd) return;
		let func = fmap[content.cmd];
		if(_.isFunction(func)){
			func(content, msg);
		}
	}
})();

export default {
	initSocket: initSocket
}



