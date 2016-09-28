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
      selfName: tmp.username,
      onlineUsers: {},
      onlineCount: 0,
      txtList: [
        // {type: 'msg', username:'嘻嘻哈哈1', msg:'你要咋地', color: '#ff9090'},
        // {type: 'msg', username:'嘻嘻哈哈3', msg:'你要舒服的地方的第三方咋地', color: '#90ff90'},
        // {type: 'msg', username:'嘻嘻哈哈', msg:'你要咋地多福多寿', color: '#9090ff'},
        // {type: 'msg', username:'嘻嘻哈哈8', msg:'你要咋地胜多负少发阿发的说法', color: '#aa9090'},
        // {type: 'msg', username:'嘻嘻哈哈3', msg:'你要咋地121dsfasfadfadfadsfadsfa', color: '#9cc090'},
        // {type: 'msg', username:'嘻嘻哈哈6', msg:'你要咋地', color: '#90dd90'},
        // {type: 'msg', username:'嘻嘻哈哈7', msg:'你要咋地sdfa', color: '#909ee0'}
      ],
      txtValue: '',
      setColor: '',
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
      const msg = "=== 【" + username + '】 进入聊天室! ===';
      const color = data.user.color || '';
      const msgObj = {
        type: 'sys',
        username: username,
        msg: msg,
        color: color,
        onlineCount: data.onlineCount,
        onlineUsers: data.onlineUsers
      }
      this.createMsg(msgObj, true);
    });

    SO.listen('logout', (data) => {
      console.log('-- logout ：' + JSON.stringify(data));
      const username = data.user.username;
      const msg = "=== 【" + user + '】 离开聊天室! ===';
      const color = data.user.color || '';
      const msgObj = {
        type: 'sys',
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
    console.log("txt = " + txt);
    console.log("txt.lenght = " + txt.length)
    this.setInputValue("");
    
    //排除换行符 
    let tmp = txt;
    tmp = tmp.replace(/<\/?.+?>/g, "");
    tmp = tmp.replace(/[\r\n]/g, "");
    console.log("tmp after= " +tmp)
    if (!tmp) {
      return;
    } else {
      const username = this.state.selfName
      // const color = this.refs.colorSel.getValue();
      // console.log('color = ' + color);
      const color = this.state.setColor
      const data = {
        username: username,
        msg: txt,
        color: color,
      }
      console.log(JSON.stringify(data));
      SO.send('message', data);
    }
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
      this.setState({
        txtList: tmpList,
        onlineCount: msgObj.onlineCount,
        onlineUsers: msgObj.onlineUsers
      });
    } else {
      this.setState({txtList: tmpList});
    }
  }

  // 颜色选择处理
  handleChange = () => {
    // console.log(this.refs);
    // console.log(this.refs.colorSel)
    const value = this.refs.colorSel.getValue();
    console.log('----- select color ---------- ' + value);
    this.setState({"setColor": value});
  }

  // 键盘按键抬起回调
  handleKeyUp = (evt) => {
    if(evt.keyCode === 13 && evt.ctrlKey) {
      this.refs.colorSel.click();
      this.sendMsg()
    }
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
    _.mapValues(this.state.onlineUsers, user => str +="【" + user + '】 ');
    // console.log('str = ' + str);
    return str;
  }

  render() {
    const info = this.getOnlineUser();
    const btn = (<Button hollow amStyle="primary" onClick={this.sendMsg.bind(this)}>Send</Button>);
    return (
      <View>
        <NavBar amStyle="primary"title="Just-Chat"/>
        <Group className="head-info">
          <span>{info}</span>
        </Group> 
        <Container className="msg-list-cnt" scrollable>
        <MsgList txtList={this.state.txtList}/>
        </Container>
            <Grid className="textarea-info" collapse={true}>
            <Col cols={4}><span>《按Ctrl+Enter键发送信息》 选择字体颜色</span></Col>
            <Col cols={1}><Field type="color" ref="colorSel" onChange={this.handleChange.bind(this)}></Field></Col>
            </Grid>
            <Grid className="send-box" >
            <Col cols={5}>
              <Field ref="chatTxt" className="chatTxt" placeholder="" type="textarea" onKeyUp={this.handleKeyUp.bind(this)}
                onInput={this.handleInput.bind(this)} value={this.state.txtValue}
                style={{color: this.state.setColor}}
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

// <input className="color-select" type="color" ref="colorSel" defaultValue="#000000" onSelect={this.handleSelect.bind(this)}></input>
