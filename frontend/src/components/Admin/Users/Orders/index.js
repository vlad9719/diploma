import React from 'react';
import Table from './Table';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getAllUsers,
  getOneUserOrders,
  deleteOrder
} from '../../../../redux/actions/admin';

class AdminOrdersByUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.onEditOrderButtonClick = this.onEditOrderButtonClick.bind(this);
    this.onDeleteOrderButtonClick = this.onDeleteOrderButtonClick.bind(this);
  }

  onEditOrderButtonClick(orderId) {
    this.props.history.push(`/admin/order/${orderId}`);
  }

  onDeleteOrderButtonClick(orderId) {
    this.props.deleteOrder(orderId).then(() => {
      this.props.getOneUserOrders(this.props.match.params.id);
    });
  }

  componentDidMount() {
    this.props.getAllUsers().then(() => {
      this.props.getOneUserOrders(this.props.match.params.id).then(() => {
        this.setState({
          isLoading: false
        });
      });
    });
  }

  render() {
    if (!this.props.admin.users.length) {
      return null;
    }

    const userName = this.props.admin.users.find(user => {
      return user.id === parseInt(this.props.match.params.id);
    }).name;
    if (this.props.admin.userOrders.length && !this.state.isLoading) {
      return (
        <Table
          orders={this.props.admin.userOrders}
          tableName={`Заказы пользователя ${userName}`}
          users={this.props.admin.users}
          deleteOrder={this.onDeleteOrderButtonClick}
          onEditOrderButtonClick={this.onEditOrderButtonClick}
        />
      );
    }

    if (!this.state.isLoading) {
      return (
        <h3 className="text-center my-5">{`У пользователя  ${userName} нет заказов`}</h3>
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
  getOneUserOrders,
  deleteOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminOrdersByUser));

AdminOrdersByUser.propTypes = {
  admin: PropTypes.object,
  getOneUserOrders: PropTypes.func,
  getAllUsers: PropTypes.func,
  deleteOrder: PropTypes.func,
  match: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object,
  users: PropTypes.array,
  updateOrderPaymentStatus: PropTypes.func,
  updateOrderDeliveryStatus: PropTypes.func
};
