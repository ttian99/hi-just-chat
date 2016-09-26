import React from 'react';
import {Container, List, NavBar, Group, View, Field, Button, Card, Grid, Col } from 'amazeui-touch'; 
import {Link, } from 'react-router';
import _ from 'lodash';

export default class MsgList extends React.Component {
  static defaultProps = {
    transition: 'rfr',
    txtList: [],
  };

  // 挂载完成后立刻调用
  componentDidMount = () => {
    // window.scrollTo(0, 200);
  } 

  render() {
    const btn = (<Button hollow amStyle="primary">Send</Button>)
    return (
      <List>
        {
          _.map(this.props.txtList, (item, id) => {
            // const msg = 
            return(
              <List.Item key={id}>
                <span>{"【" + item.user.username + "】：" +  item.user.msg}</span>
              </List.Item>
            )
          })
        }
      </List>
    );
  }
}
