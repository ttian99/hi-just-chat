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
    // window.scrollTo(0, 500);
    // w.scrollTo(0, this.msgObj.clientHeight);
  } 

  render() {
    const btn = (<Button hollow amStyle="primary">Send</Button>)
    const getItem = (item, id)=>{
      const color = item.color || '#696969';
      const speaker = item.type === 'sys' ? '== 系统消息 ==' : '【' + item.username + '】';
    
      return (
        <Grid collapse={true} wrap="wrap">
          <Col className="username" style={{ "color": color }} cols={6}>
            <span>{speaker}</span>
          </Col>
          <Col className="message" cols={6} style={{ "color": color }}>
            <span>{item.msg + ''}</span>
          </Col>
        </Grid>
      )
    }
    return (
      <List>
        {
          _.map(this.props.txtList, (item, id) => {
            return(
              <List.Item key={id}>
                {getItem(item, id)}
              </List.Item>
            )
          })
        }
      </List>
    );
  }
}
