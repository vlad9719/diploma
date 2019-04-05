import React from 'react';
import ProductsTable from '../common/ProductsTable';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
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
        <div>
          <ProductsTable
            products={this.props.products.items}
            tableName={`Запчасти группы "${this.props.match.params.category}"`}
            isAuthenticated={this.props.user.isAuthenticated}
          />
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  products: state.products,
  user: state.user,
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
