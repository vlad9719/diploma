import React from 'react';
import ProductsListing from '../common/ProductsListing';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProducts } from '../../redux/actions/products';

class Products extends React.Component {
  componentDidMount() {
    const category = this.props.match.params.category;
    this.props.getProducts(category);
  }

  render() {
    if (this.props.products.items.length) {
      return (
        <div>
          <ProductsListing
            products={this.props.products.items}
            tableName={`Запчасти группы "${this.props.match.params.category}"`}
            isAuthenticated={this.props.user.isAuthenticated}
            isAdmin={this.props.user.userInfo.isAdmin}
          />
        </div>
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
  products: PropTypes.object,
  getProducts: PropTypes.func,
  match: PropTypes.object,
  user: PropTypes.object
};
