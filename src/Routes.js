import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Discover from './pages/Discover/Discover';
import Detail from './pages/Detail/Detail';
import Cart from './pages/Cart/Cart';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/discover/:id" component={Discover} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default Routes;
