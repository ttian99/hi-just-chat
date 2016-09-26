import React from 'react';
import {Container, List, NavBar, Group, View, Field, Button, Card, Grid, Col } from 'amazeui-touch'; 
import {Link, } from 'react-router';
import MsgList from './MsgList';
import SO from '../tools/socket.js';
import _ from 'lodash';

export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      onlineList: this.props.onlineList,
      onlineCount: this.props.onlineCount,
      txtList: [
      {type: 'msg', user: {username:'嘻嘻哈哈1', msg:'你要咋地'},},
      {type: 'msg', user: {username:'嘻嘻哈哈3', msg:'你要舒服的地方的第三方咋地'},},
      {type: 'msg', user: {username:'嘻嘻哈哈', msg:'你要咋地多福多寿'},},
      {type: 'msg', user: {username:'嘻嘻哈哈8', msg:'你要咋地胜多负少发阿发的说法'},},
      {type: 'msg', user: {username:'嘻嘻哈哈3', msg:'你要咋地121dsfasfadfadfadsfadsfa'},},
      {type: 'msg', user: {username:'嘻嘻哈哈6', msg:'你要咋地'},},
      {type: 'msg', user: {username:'嘻嘻哈哈7', msg:'你要咋地sdfa'},}],
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
      const user = data.user;
      const msg = 'is login';
      this.createMsg('sys', user, msg);
    });

    SO.listen('logout', (data) => {
      console.log('-- logout ：' + JSON.stringify(data));
      const user = data.user;
      const msg = 'is logout';
      this.createMsg('sys', user, msg);
    });

    SO.listen('message', (data) => {
      console.log('-- message: ' + JSON.stringify(data));
      const user = data.user;
      const msg = data.msg;
      this.createMsg('msg', user, msg);
    });
  } 

  sendMsg = () => {
    console.log('-- sendMsg --');
    const txt = this.refs.chatTxt.getValue();
    this.setInputValue("");
    console.log('txt = ' +　txt);
    const data = {
      username: 'xixihaha',
      msg: txt
    }
    SO.send('message', data);
  }

  createMsg = (type, user, msg) => {
    console.log("--createMsg --");
    const tmpList = this.state.txtList;
    var tmpObj = {};
    tmpObj.type = type;
    tmpObj.user = {};
    tmpObj.user.username=user;
    tmpObj.user.msg=msg;
    // _.merge(tmpObj, data);
    tmpList.push(tmpObj);
    this.setState({txtList: tmpList});
  }

  // 键盘按键抬起回调
  handleKeyUp = (evt) => {
    evt.keyCode === 13 && this.sendMsg()
  }
  // 文字输入监听
  handleInput = (event) => {
    const value = this.refs.chatTxt.getValue();
    console.log('value = '+value)
    this.setInputValue(value);
  }
  // 设置输入框的值
  setInputValue(value) {
    this.setState({txtValue: value }); 
  }

  render() {
    const btn = (<Button hollow amStyle="primary" onClick={this.sendMsg.bind(this)}>Send</Button>)
    return (
      <View>
        <NavBar amStyle="primary"title="Just-Chat"/>
        <Group className="headInfo">
          <span>当前在线用户:</span>
        </Group> 
        <Container className="msg-list-cnt" scrollable>
        <MsgList txtList={this.state.txtList}/>
        </Container>
          <Grid>
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
