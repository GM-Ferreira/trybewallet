import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/carteira">
            <Wallet />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default connect()(App);
