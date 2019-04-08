import React, { Component } from 'react';
import Register from 'components/Register';
import Login from 'components/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { connect } from 'react-redux';
import { me } from 'redux/actions/user';
import PropTypes from 'prop-types';
import Profile from 'components/Profile';
import Brands from 'components/Brands';
import Categories from 'components/Categories';
import Products from 'components/Products';
import Search from 'components/Search';
import Cart from 'components/Cart';
import Orders from 'components/Orders';
import AdminOrders from 'components/Admin/Order/List';
import AdminUsers from 'components/Admin/Users';

import Home from 'components/Home';
import Layout from 'components/Layout';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.me();
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/catalog" component={Brands} />
            <Route exact path="/categories/:brand" component={Categories} />
            <Route exact path="/products/:category" component={Products} />
            <Route exact path="/search/:query" component={Search} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/admin/orders" component={AdminOrders} />
            <Route exact path="/admin/users" component={AdminUsers} />
          </Layout>
        </Router>
      </Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const mapDispatchToProps = {
  me
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

App.propTypes = {
  me: PropTypes.func
};
