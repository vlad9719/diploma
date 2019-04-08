import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from './Card';
import {
  getAllOrders,
  getAllUsers,
  updateOrderDeliveryStatus,
  updateOrderPaymentStatus,
  setPrice
} from '../../../../redux/actions/admin';

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAllUsers();
    this.props.getAllOrders();
  }

  handleChange(event) {
    const price = event.target.value;
    this.setState({
      price: price
    });
  }

  handleSubmit(event, orderId) {

    event.preventDefault();
    this.props.setPrice(orderId, this.state.price);
  }

  render() {
    const orderId = parseInt(this.props.match.params.id);
    if (this.props.admin.orders.length && this.props.admin.users.length) {
      const order = this.props.admin.orders.find(order => {
        return order.orderDetails.id === orderId;
      });

      if (!order) {
        return null;
      }

      const user = this.props.admin.users.find(user => {
        return user.id === order.orderDetails.user_id;
      });

      return (
        <Card
          order={order}
          userName={user.name}
          updateOrderDeliveryStatus={this.props.updateOrderDeliveryStatus}
          updateOrderPaymentStatus={this.props.updateOrderPaymentStatus}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  admin: state.admin
});

const mapDispatchToProps = {
  getAllUsers,
  getAllOrders,
  updateOrderPaymentStatus,
  updateOrderDeliveryStatus,
  setPrice
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderDetails));

OrderDetails.propTypes = {
  admin: PropTypes.object,
  getAllOrders: PropTypes.func,
  getAllUsers: PropTypes.func,
  updateOrderDeliveryStatus: PropTypes.func,
  updateOrderPaymentStatus: PropTypes.func,
  setPrice: PropTypes.func,
  match: PropTypes.object
};
