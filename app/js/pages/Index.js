import React from 'react';
import {Container, List, NavBar, Group, View, Field, Button, Card, Grid, Col } from 'amazeui-touch'; 
import {Link, } from 'react-router';

export default class Index extends React.Component {
  static defaultProps = {transition: 'rfr'};
  renderItems() {
    const pages = ['Page1', 'Page2', ];
    return pages.map((item, index) => {
      return (
        <List.Item
          linkComponent={Link}
          // 传递 query 参数
          linkProps={{to: {pathname: `/${item.toLowerCase()}`, query: {q: item}}}}
          title={item}
          key={index}
        />
      );
    });
  }

  render() {
    const btn = (<Button hollow amStyle="primary">Send</Button>)
    return (
      <View>
        <NavBar amStyle="primary"title="Just-Chat"/>
        <Group className="headInfo">
          <span>当前在线用户:</span>
        </Group> 
        <Container scrollable>
        </Container>
          <Grid>
            <Col cols={5}>
              <Field className="chatTxt" placeholder="" type="textarea" 
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
