import React from 'react'; 
import {render, } from 'react-dom'; 
import {Router, Route, Link, IndexRoute, hashHistory, withRouter, } from 'react-router'; 
import {Container, TabBar, } from 'amazeui-touch';

class App extends React.Component {
  static contextTypes = {router: React.PropTypes.object.isRequired, };
  render() {
    const {location, params, children, ...props, } = this.props; 
    const {router } = this.context; 
    const transition = children.props.transition || 'sfr';

    return (
      <Container direction="column" id="sk-container">
        <Container transition={transition} > 
          {React.cloneElement(children, {key: location.key})}
        </Container>
      </Container>
    );
  }
}

// Pages
// import Index from './pages/Index';
import Login from './pages/Login';
import ChatRoom from './pages/ChatRoom';
// import Page from './pages/Page';

// withRouter HoC
// @see https://github.com/reactjs/react-router/blob/0616f6e14337f68d3ce9f758aa73f83a255d6db3/upgrade-guides/v2.4.0.md#v240-upgrade-guide
const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login} />
      <Route path="/chatroom" component={ChatRoom} />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', () => {
  render(routes, document.getElementById('root'));
});


// <Route path=":page" component={Page} />

// <TabBar
//           amStyle="primary"
//         >
//           <TabBar.Item
//             component={Link}
//             icon="list"
//             title="组件"
//             selected={router.isActive('/', true)}
//             to="/"
//             onlyActiveOnIndex
//           />
//           <TabBar.Item
//             component={Link}
//             icon="info"
//             title="关于"
//             badge="404"
//             // @see https://github.com/reactjs/react-router/blob/0616f6e14337f68d3ce9f758aa73f83a255d6db3/docs/API.md#isactivepathorloc-indexonly
//             selected={router.isActive('/about', true)}
//             to="/about"
//             onlyActiveOnIndex
//           />
//         </TabBar>
