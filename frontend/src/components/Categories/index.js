import React from 'react';
import Table from './Table';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategories } from '../../redux/actions/categories';

class Categories extends React.Component {
  componentDidMount() {
    const brand = this.props.match.params.brand;
    this.props.getCategories(brand);
  }

  render() {
    if (this.props.categories.items.length) {
      return (
        <Table
          categories={this.props.categories.items}
          brand={this.props.match.params.brand}
        />
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});

const mapDispatchToProps = {
  getCategories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Categories));

Categories.propTypes = {
  categories: PropTypes.array,
  getCategories: PropTypes.func,
  match: PropTypes.object
};
