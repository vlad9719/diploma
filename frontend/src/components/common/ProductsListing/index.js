import React from 'react';
import Table from './Table';
import { addToCart } from '../../../redux/actions/cart';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ProductsListing extends React.Component {
  constructor(props) {
    super(props);
    this.onAddToCartButtonClick = this.onAddToCartButtonClick.bind(this);
  }

  onAddToCartButtonClick(product) {
    this.props.addToCart(product);
  }

  render() {
    return (
      <Table
        {...this.props}
        onAddToCartButtonClick={this.onAddToCartButtonClick}
      />
    );
  }
}
const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = {
  addToCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductsListing));
