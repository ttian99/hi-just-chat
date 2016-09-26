import React from 'react';
import {Container, List, NavBar, Group, View, Field, Button, Card, Grid, Col } from 'amazeui-touch';
import {Link, } from 'react-router';
// import Socket from './tools/Socket';

export default class Login extends React.Component {
  static defaultProps = { transition: 'rfr' };

  login() {
    console.log('----- login ------');
  }

  render() {
    const btn = (<Button hollow amStyle="primary">Send</Button>)
    return (
      <View>
        <NavBar amStyle="primary"title="Just-Chat"/>
        <Group header="输入信息">
          <div className="form-set">
            <Field labelBefore="昵称" />
            <Field labelBefore="密码" />
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
