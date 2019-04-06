import React from 'react';
import Table from './Table';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  changeItemQuantity,
  removeItemFromCart,
  clearCart,
  confirmOrder
} from '../../redux/actions/cart';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.incrementItemQuantityByOne = this.incrementItemQuantityByOne.bind(
      this
    );
    this.decrementItemQuantityByOne = this.decrementItemQuantityByOne.bind(
      this
    );
    this.confirmOrder = this.confirmOrder.bind(this);
  }

  incrementItemQuantityByOne(itemId, currentQuantity) {
    if (currentQuantity === 100) {
      return;
    }
    const newQuantity = currentQuantity + 1;
    this.props.changeItemQuantity(itemId, newQuantity);
  }

  decrementItemQuantityByOne(itemId, currentQuantity) {
    if (currentQuantity === 1) {
      return;
    }
    const newQuantity = currentQuantity - 1;
    this.props.changeItemQuantity(itemId, newQuantity);
  }

  confirmOrder() {
    this.props.confirmOrder(this.props.history, this.props.cart.items);
  }

  render() {
    if (this.props.cart.items.length) {
      return (
        <Table
          items={this.props.cart.items}
          incrementItemQuantityByOne={this.incrementItemQuantityByOne}
          decrementItemQuantityByOne={this.decrementItemQuantityByOne}
          removeItemFromCart={this.props.removeItemFromCart}
          clearCart={this.props.clearCart}
          confirmOrder={this.confirmOrder}
          tableName="Ваша корзина"
        />
      );
    }

    if (this.props.cart.orderSaved) {
      return (
        <div className="my-5 text-center col-sm-4 offset-sm-4 bg-light border">
          Ваш заказ принят в обработку. Вы можете отследить его статус на
          странице <Link to="orders">Ваших заказов</Link>
        </div>
      );
    }

    return <h3 className="text-center mt-5">Ваша корзина пуста</h3>;
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = {
  changeItemQuantity,
  removeItemFromCart,
  clearCart,
  confirmOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Cart));

Cart.propTypes = {
  cart: PropTypes.object,
  history: PropTypes.object,
  changeItemQuantity: PropTypes.func,
  removeItemFromCart: PropTypes.func,
  clearCart: PropTypes.func,
  confirmOrder: PropTypes.func
};
