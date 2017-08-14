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
	let user = store.getters.user;
	store.commit('setStatus', 'connected');
	applyKefu();
}

function onMsg(msg){
	store.commit('addMsg', msg);
}

var onCustomSysMsg = (function(){
	const fmap = {
		// 申请客服结果
		2: function(content, msg){
			store.commit('setStatus', 'success');
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

function applyKefu(){
	store.commit('setStatus', 'applying');
	sendCustomSysMsg({
		content: JSON.stringify({
			cmd: 1,
			deviceid: 'return'
		})
	});
}

function sendCustomSysMsg(msg){
	let socket = store.getters.socket,
		user = store.getters.user;
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

export default {
	initSocket: initSocket
}



