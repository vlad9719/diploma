import React from 'react';
import Table from './Table';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAllOrders, getAllUsers, deleteOrder } from '../../../../redux/actions/admin';

class AdminOrders extends React.Component {
  constructor(props) {
    super(props);
    this.onEditOrderButtonClick = this.onEditOrderButtonClick.bind(this);
  }

  componentDidMount() {
    this.props.getAllUsers().then(() => {
      this.props.getAllOrders();
    });
  }

  onEditOrderButtonClick(orderId) {
    this.props.history.push(`/admin/order/${orderId}`);
  }

  render() {
    if (this.props.admin.orders.length) {
      return (
        <Table
          orders={this.props.admin.orders}
          users={this.props.admin.users}
          onEditOrderButtonClick={this.onEditOrderButtonClick}
          deleteOrder={this.props.deleteOrder}
          tableName="Все заказы"
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
  getAllOrders,
  getAllUsers,
  deleteOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminOrders));

AdminOrders.propTypes = {
  admin: PropTypes.object,
  getAllOrders: PropTypes.func,
  getAllUsers: PropTypes.func,
  deleteOrder: PropTypes.func,
  history: PropTypes.object
};
