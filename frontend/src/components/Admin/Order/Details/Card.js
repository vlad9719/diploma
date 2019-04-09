import React from 'react';
import PropTypes from 'prop-types';
import AdminItems from '../../../common/AdminItems';

import './index.css';

export default function Card(props) {
  const orderDetails = props.order.orderDetails;
  const orderedItems = props.order.orderedItems;
  const userName = props.userName;
  return (
    <div className="offset-md-2 col-sm-8">
      <h3 className="text-center my-5">{`Заказ №${
        orderDetails.id
      } пользователя ${userName}`}</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID заказа</th>
            <th>Дата создания</th>
            <th>Цена, BYN</th>
            <th>Статус оплаты</th>
            <th>Статус доставки</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetails.id}</td>
            <td>{orderDetails.created_at}</td>
            <td>{orderDetails.price || 'Не выставлена'}</td>
            <td>{orderDetails.payment_status}</td>
            <td>{orderDetails.delivery_status}</td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        {orderDetails.delivery_status === 'Обрабатывается' && (
          <button
            className="btn btn-outline-success text-center update-status-button"
            type="button"
            onClick={() =>
              props.updateOrderDeliveryStatus(orderDetails.id, 'Собран')
            }>
            Сообщить о сборке заказа
          </button>
        )}

        {orderDetails.delivery_status === 'Собран' && (
          <button
            className="btn btn-outline-success text-center update-status-button"
            type="button"
            onClick={() => {
              props.updateOrderDeliveryStatus(orderDetails.id, 'Отправлен');
            }}>
            Сообщить об отправке заказа
          </button>
        )}

        {!orderDetails.price && (
          <form className="form border p-2">
            <div className="form-group">
              <label htmlFor="price">Выставьте цену на заказ</label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Цена, BYN"
                step="0.01"
                onChange={props.handleChange}
                required={true}
              />
            </div>
            <button
              className="btn btn-outline-warning text-center"
              type="submit"
              onClick={event => props.handleSubmit(event, orderDetails.id)}
              >
              Выставить цену
            </button>
          </form>
        )}

        {orderDetails.payment_status === 'Оплата произведена' && (
          <button
            className="btn btn-outline-warning text-center ml-auto"
            type="button"
            onClick={() =>
              props.updateOrderPaymentStatus(
                orderDetails.id,
                'Оплата подтверждена'
              )
            }>
            Подтвердить получение оплаты
          </button>
        )}
      </div>
      <AdminItems tableName="Заказанные товары" items={orderedItems} />
    </div>
  );
}

Card.propTypes = {
  order: PropTypes.object,
  userName: PropTypes.string,
  updateOrderDeliveryStatus: PropTypes.func,
  updateOrderPaymentStatus: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func
};
