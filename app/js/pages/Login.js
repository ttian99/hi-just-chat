import React from 'react';
import {Container, List, NavBar, Group, View, Field, Button, Card, Grid, Col } from 'amazeui-touch';
import {Link, history } from 'react-router';
import SO from '../tools/socket.js';

export default class Login extends React.Component {
  static defaultProps = { transition: 'rfr' };

  login() {
    console.log('----- login ------');
    console.log(this.refs.nick.getValue())
    console.log(this.refs.pwd.getValue())
    const nick = this.refs.nick.getValue();
    const password = this.refs.pwd.getValue();
    SO.listen('login', (data)=> {
      console.log('-- login : ' + JSON.stringify(data));
      // const onlineList = 
      if(data.user.username === nick){
        this.props.history.pushState(null, '/chatroom')
      }
    });
    const data = {
      username: nick,
      pwd: password + ''
    }
    SO.send('login', data);
    // history.replaceState(null, '/chatroom')
  }

  // 键盘按键抬起回调
  handleKeyUp = (evt) => {
    evt.keyCode === 13 && this.login()
  }

  render() {
    const btn = (<Button hollow amStyle="primary">Send</Button>)
    return (
      <View>
        <NavBar amStyle="primary"title="Just-Chat"/>
        <Group header="输入信息">
          <div className="form-set">
            <Field labelBefore="昵称" ref="nick"/>
            <Field labelBefore="密码" ref="pwd"  onKeyUp={this.handleKeyUp.bind(this)}/>
          </div>

          <Button
            onClick={this.login.bind(this)}
            amStyle="primary" 
            block>
          登陆
          </Button>
        </Group>
      </View>
    );
  }
}
