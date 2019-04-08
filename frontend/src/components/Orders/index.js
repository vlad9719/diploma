import React from 'react';
import Table from './Table';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getCurrentUserOrders,
  reportPayment,
  reportReception
} from '../../redux/actions/orders';
import { me } from '../../redux/actions/user';

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.onReportPaymentButtonClick = this.onReportPaymentButtonClick.bind(
      this
    );
    this.onReportReceptionButtonClick = this.onReportReceptionButtonClick.bind(
      this
    );
  }

  updateOrders() {
    const userId = this.props.user.userInfo.id;
    this.props.getCurrentUserOrders(userId);
  }

  componentDidMount() {
    this.props.me().then(() => {
      this.updateOrders();
    });
  }

  onReportPaymentButtonClick(orderId) {
    this.props.reportPayment(orderId).then(() => {
      this.updateOrders();
    });
  }

  onReportReceptionButtonClick(orderId) {
    this.props.reportReception(orderId).then(() => {
      this.updateOrders();
    });
  }

  render() {
    if (!this.props.user.userInfo.id) {
      return null;
    }
    return (
      <Table
        orders={this.props.orders.items}
        onReportPaymentButtonClick={this.onReportPaymentButtonClick}
        onReportReceptionButtonClick={this.onReportReceptionButtonClick}
        tableName="Ваши заказы"
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  orders: state.orders
});

const mapDispatchToProps = {
  getCurrentUserOrders,
  reportPayment,
  reportReception,
  me
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Orders));

Orders.propTypes = {
  user: PropTypes.object,
  getCurrentUserOrders: PropTypes.func,
  reportPayment: PropTypes.func,
  reportReception: PropTypes.func,
  me: PropTypes.func,
  orders: PropTypes.object
};
