import React from 'react';
import Table from './Table';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCurrentUserOrders } from '../../redux/actions/orders';
import { me } from '../../redux/actions/user';

class Orders extends React.Component {
  componentDidMount() {
    this.props.me().then(() => {
      const userId = this.props.user.userInfo.id;
      this.props.getCurrentUserOrders(userId);
    });
  }

  render() {
    if (!this.props.user.userInfo.id) {
      return null;
    }
    return <Table orders={this.props.orders.items} tableName="Ваши заказы" />;
  }
}

const mapStateToProps = state => ({
  user: state.user,
  orders: state.orders
});

const mapDispatchToProps = {
  getCurrentUserOrders,
  me
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Orders));

Orders.propTypes = {
  user: PropTypes.object,
  getCurrentUserOrders: PropTypes.func,
  me: PropTypes.func,
  orders: PropTypes.object
};
