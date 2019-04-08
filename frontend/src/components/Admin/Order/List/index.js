import React from 'react';
import Table from './Table';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAllOrders } from '../../../../redux/actions/admin';

class AdminOrders extends React.Component {
  componentDidMount() {
    this.props.getAllOrders();
  }

  render() {
    if (this.props.admin.orders.length) {
      return (
        <Table
          orders={this.props.admin.orders}
          tableName="Заказы пользователей"
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
  getAllOrders
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminOrders));

AdminOrders.propTypes = {
  admin: PropTypes.object,
  getAllOrders: PropTypes.func
};
