import React from 'react';
import PropTypes from 'prop-types';

export default function CartButton(props) {
  if (props.productIsInTheCart(props.product)) {
    return <span>Товар в корзине</span>;
  }

  return (
    <button
      className="btn btn-outline-primary col-sm-12"
      onClick={() => props.onAddToCartButtonClick(props.product)}>
      Добавить в корзину
    </button>
  );
}

CartButton.propTypes = {
  onAddToCartButtonClick: PropTypes.func,
  productIsInTheCart: PropTypes.func,
  product: PropTypes.object
};
