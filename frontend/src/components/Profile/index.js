import React from 'react';
import Card from './Card';
import { setUpdatingUserStatus, update } from '../../redux/actions/user';
import { unsetErrors } from '../../redux/actions/error';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEditButtonClick() {
    this.props.setUpdatingUserStatus(true);
  }

  handleChange(event) {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({
      userData: {
        ...this.state.userData,
        [id]: value
      }
    });
  }

  handleSaveButtonClick() {
    this.props.update(this.state.userData);

    if (!this.props.user.isUpdating) {
      this.setState({
        userData: {}
      });
    }
    this.props.unsetErrors();
  }

  render() {
    return (
      <Card
        userInfo={this.props.user.userInfo}
        isUpdating={this.props.user.isUpdating}
        handleEditButtonClick={this.handleEditButtonClick}
        handleChange={this.handleChange}
        handleSaveButtonClick={this.handleSaveButtonClick}
        errors={this.props.errors.update}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

const mapDispatchToProps = {
  setUpdatingUserStatus,
  update,
  unsetErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));

Profile.propTypes = {
  user: PropTypes.object,
  errors: PropTypes.object,
  unsetErrors: PropTypes.func,
  update: PropTypes.func,
  setUpdatingUserStatus: PropTypes.func
};
