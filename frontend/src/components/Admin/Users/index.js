import React from 'react';
import Table from './Table';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAllUsers } from '../../../redux/actions/admin';

class AdminUsers extends React.Component {
  componentDidMount() {
    this.props.getAllUsers();
    this.onViewUserOrdersButtonClick = this.onViewUserOrdersButtonClick.bind(
      this
    );
  }

  onViewUserOrdersButtonClick(userId) {
    this.props.history.push(`orders/${userId}`);
  }

  render() {
    if (this.props.admin.users.length) {
      return (
        <Table
          users={this.props.admin.users}
          tableName="Все пользователи"
          onViewUserOrdersButtonClick={this.onViewUserOrdersButtonClick}
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
  getAllUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminUsers));

AdminUsers.propTypes = {
  admin: PropTypes.object,
  getAllUsers: PropTypes.func,
  history: PropTypes.object
};
