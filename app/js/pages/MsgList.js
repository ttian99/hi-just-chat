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
    return (
      <List>
        {
          _.map(this.props.txtList, (item, id) => {
            const color = item.color || '#696969';
            return(
              <List.Item key={id}>
                <Grid collapse={true} wrap="wrap">
                  <Col className="username" style={{"color": color}} cols={6}>
                    <span>{"【" + item.username + "】"}</span>
                  </Col>
                  <Col className="message" cols={6} style={{"color": color}}>
                    <span>{item.msg}</span>
                  </Col>
                </Grid>
              </List.Item>
            )
          })
        }
      </List>
    );
  }
}
