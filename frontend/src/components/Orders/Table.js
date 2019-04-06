import React from 'react';
import PropTypes from 'prop-types';
import Items from './Items';

import './index.css';

export default function Table(props) {
  return (
    <div>
      <h2 className="text-center my-5">{props.tableName}</h2>
      <table className="table table-striped my-5 border offset-md-2 col-sm-8">
        <thead>
          <tr>
            <th>ID заказа</th>
            <th>Дата создания</th>
            <th>Цена</th>
            <th>Статус оплаты</th>
            <th>Статус доставки</th>
            <th>Просмотр заказанных товаров</th>
            <th>Удаление заказа</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map(order => {
            return (
              <>
                <tr key={order.orderDetails.id} colSpan={0}>
                  <td>{order.orderDetails.id}</td>
                  <td>{order.orderDetails.created_at}</td>
                  <td>{order.orderDetails.price || 'Не выставлена'}</td>
                  <td>{order.orderDetails.payment_status}</td>
                  <td>{order.orderDetails.delivery_status}</td>
                  <td>
                    <button
                      className="btn btn-primary collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target={`#order${order.orderDetails.id}`}
                      aria-expanded="false"
                      aria-controls={`order${order.orderDetails.id}`}
                    />
                  </td>
                  <td>
                    <button className="btn btn-outline-danger">Удалить</button>
                  </td>
                </tr>
                <tr className="collapse" id={`order${order.orderDetails.id}`}>
                  <td colSpan={7}>
                    <Items
                      items={order.orderedItems}
                      tableName={'Заказанные товары'}
                    />{' '}
                  </td>
                </tr>
                <tr>
                  <th>ID заказа</th>
                  <th>Дата создания</th>
                  <th>Цена</th>
                  <th>Статус оплаты</th>
                  <th>Статус доставки</th>
                  <th>Просмотр заказанных товаров</th>
                  <th>Удаление заказа</th>
                </tr>
              </>
            );
          })}
        </tbody>
        <thead>
          <tr>
            <th>ID заказа</th>
            <th>Дата создания</th>
            <th>Цена</th>
            <th>Статус оплаты</th>
            <th>Статус доставки</th>
            <th>Просмотр заказанных товаров</th>
            <th>Удаление заказа</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

Table.propTypes = {
  orders: PropTypes.array,
  tableName: PropTypes.string
};
