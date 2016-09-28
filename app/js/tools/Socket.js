// import io from '../../node_modules/socket.io-client/socket.io.js';
import cfg from '../cfg.js';
const SO = {
  socket: null,
};

SO.init = () => {
  // 连接websocket后端服务器
  SO.socket = io.connect(cfg.wsUrl);

  // SO.listen("login", function(data){
  // 	console.log('--- login ---');
  // 	console.log(JSON.stringify(data));
  // });

  // SO.listen("logout", function(data){
  // 	console.log('--- logout ---');
  // 	console.log(JSON.stringify(data));
  // });

  // SO.listen('message', function(data){
  // 	console.log('--- message ---');
  // 	console.log(JSON.stringify(data));
  // });

};

SO.send = (cmd, data) => {
  SO.socket.emit(cmd, data);
};

SO.listen = (cmd, cb) => {
  SO.socket.on(cmd, cb);
};

export default SO;

// // 告诉服务器端有用户登录
// this.socket.emit('login', { userid: this.userid, username: this.username });

// // 监听新用户登录
// this.socket.on('login', function (o) {
//   CHAT.updateSysMsg(o, 'login');
// });

// // 监听用户退出
// this.socket.on('logout', function (o) {
//   CHAT.updateSysMsg(o, 'logout');
// });

// // 监听消息发送
// this.socket.on('message', function (obj) {
//   var isme = (obj.userid == CHAT.userid) ? true : false;
//   var contentDiv = '<div>' + obj.content + '</div>';
//   var usernameDiv = '<span>' + obj.username + '</span>';

//   var section = d.createElement('section');
//   if (isme) {
//     section.className = 'user';
//     section.innerHTML = contentDiv + usernameDiv;
//   } else {
//     section.className = 'service';
//     section.innerHTML = usernameDiv + contentDiv;
//   }
//   CHAT.msgObj.appendChild(section);
//   CHAT.scrollToBottom();
// });
