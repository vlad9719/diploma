import React, { Component } from 'react';
import Register from 'components/Register';
import Login from 'components/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';

import Home from 'components/Home';
import Layout from 'components/Layout';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
