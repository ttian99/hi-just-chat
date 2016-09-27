import React from 'react';
import {Container, List, NavBar, Group, View, Field, Button, Card, Grid, Col } from 'amazeui-touch'; 
import {Link, } from 'react-router';
import MsgList from './MsgList';
import SO from '../tools/socket.js';
import _ from 'lodash';
// import dataMgr from '../tools/dataMgr.js';
import loc from '../tools/loc.js';

export default class ChatRoom extends React.Component {
  constructor(props, state) {
    super(props);
    const tmp = this.props.location.state;
    this.state={
      onlineList: tmp.onlineList,
      onlineCount: tmp.onlineCount,
      txtList: [
      {type: 'msg', username:'嘻嘻哈哈1', msg:'你要咋地', color: '#ff9090'},
      {type: 'msg', username:'嘻嘻哈哈3', msg:'你要舒服的地方的第三方咋地', color: '#90ff90'},
      {type: 'msg', username:'嘻嘻哈哈', msg:'你要咋地多福多寿', color: '#9090ff'},
      {type: 'msg', username:'嘻嘻哈哈8', msg:'你要咋地胜多负少发阿发的说法', color: '#aa9090'},
      {type: 'msg', username:'嘻嘻哈哈3', msg:'你要咋地121dsfasfadfadfadsfadsfa', color: '#9cc090'},
      {type: 'msg', username:'嘻嘻哈哈6', msg:'你要咋地', color: '#90dd90'},
      {type: 'msg', username:'嘻嘻哈哈7', msg:'你要咋地sdfa', color: '#909ee0'}],
      txtValue: '',
    };
  }
  static defaultProps = {
    transition: 'rfr'
  };

  // 挂载完成后立刻调用
  componentWillMount = () => {
    SO.listen('login', (data) => {
      console.log('-- login : ' + JSON.stringify(data));      
      const username = data.user.username;
      const msg = "=== " + username + ' is login! ===';
      const color = data.user.color || '';
      const msgObj = {
        type: 'login',
        username: username,
        msg: msg,
        color: color,
      }
      this.createMsg(msgObj, true);
    });

    SO.listen('logout', (data) => {
      console.log('-- logout ：' + JSON.stringify(data));
      const username = data.user.username;
      const msg = "=== " + user + ' is logout! ===';
      const color = data.user.color || '';
      const msgObj = {
        type: 'logout',
        username: username,
        msg: msg,
        color: color,
      }
      this.createMsg(msgObj, true);
    });

    SO.listen('message', (data) => {
      console.log('-- message: ' + JSON.stringify(data));
      const username = data.user.username;
      const msg = data.user.msg;
      const color = data.user.color || "";
      console.log('-- msg = ' + msg);
      const msgObj = {
        type: 'msg',
        username: username,
        msg: msg,
        color: color,
      }
      this.createMsg(msgObj);
    });
  } 

  // 组件销毁之前
  componentWillUnMount = () => {
    console.log("-------- call componentWillMount ----- ");
    const json = loc.get("self");
    const username = json.username;
    console.log('disconnect '+ username); 
    const data = {
      username: username,
    }
    SO.send('disconnect', data);
  }

  sendMsg = () => {
    console.log('----- sendMsg ----- ');
    const txt = this.refs.chatTxt.getValue();
    this.setInputValue("");
    const json = loc.get("self");
    const username = json.username;
    console.log('sendMsg '+ username);
    console.log('txt = ' +　txt);
    const data = {
      username: username,
      msg: txt
    }
    console.log(JSON.stringify(data));
    SO.send('message', data);
  }

  createMsg = (msgObj, needUpdateCount) => {
    console.log("--createMsg --");
    const tmpList = this.state.txtList;
    console.log("msgObj = " + JSON.stringify(msgObj));
    // console.log("list = " + JSON.stringify(tmpList));
    // var tmpObj = {};
    // tmpObj.type = type;
    // tmpObj.user = {};
    // tmpObj.user=data.user;
    // // _.merge(tmpObj, data);
    tmpList.push(msgObj);
    if (needUpdateCount) {
      console.log('-------- needUpdateCount : ' + needUpdateCount);
      this.setState({
        txtList: tmpList,
        onlineCount: msgObj.onlineCount,
        onlineList: msgObj.onlineList
      });
    } else {
      console.log('-------- needUpdateCount : ' + needUpdateCount);
      this.setState({txtList: tmpList});
    }
  }

  // 键盘按键抬起回调
  handleKeyUp = (evt) => {
    evt.keyCode === 13 && this.sendMsg()
  }
  // 文字输入监听
  handleInput = (event) => {
    const value = this.refs.chatTxt.getValue();
    // console.log('value = '+value)
    this.setInputValue(value);
  }
  // 设置输入框的值
  setInputValue(value) {
    this.setState({txtValue: value }); 
  }

  getOnlineUser() {
    let str = "";
    const head = "当前在线用户("+ this.state.onlineCount +" 人 ) : "; 
    str += head;
    _.mapValues(this.state.onlineList, user => str +="【" + user + '】 ');
    // console.log('str = ' + str);
    return str;
  }

  render() {
    const info = this.getOnlineUser();
    const btn = (<Button hollow amStyle="primary" onClick={this.sendMsg.bind(this)}>Send</Button>)
    const colorList = {
      "red": "#",
      "green": "#",
      "yellow": "#",
      "black": "#",
      "blue": "#",
      "pink": "#",
      "orange": "#",
    }
    return (
      <View>
        <NavBar amStyle="primary"title="Just-Chat"/>
        <Group className="headInfo">
          <span>{info}</span>
        </Group> 
        <Container className="msg-list-cnt" scrollable>
        <MsgList txtList={this.state.txtList}/>
        </Container>
          <Grid>
            <Col cols={6}>
             <input type="color"/>
            </Col>
            <Col cols={5}>
              <Field ref="chatTxt" className="chatTxt" placeholder="" type="textarea" onKeyUp={this.handleKeyUp.bind(this)}
                onInput={this.handleInput.bind(this)} value={this.state.txtValue}
              /> 
            </Col>
            <Col cols={1}>
              {btn}
            </Col>
        </Grid>
      </View>
    );
  }
}
