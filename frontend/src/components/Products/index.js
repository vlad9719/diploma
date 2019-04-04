import React from 'react';
import Table from './Table';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProducts } from '../../redux/actions/products';

class Products extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const category = this.props.match.params.category;
    this.props.getProducts(category);
  }

  render() {
    if (this.props.products.items.length) {
      return (
        <Table
          products={this.props.products.items}
          category={this.props.match.params.category}
          isAuthenticated={this.props.user.isAuthenticated}
        />
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  products: state.products,
  user: state.user
});

const mapDispatchToProps = {
  getProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Products));

Products.propTypes = {
  products: PropTypes.array,
  getProducts: PropTypes.func,
  match: PropTypes.object,
  user: PropTypes.object
};
