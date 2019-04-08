import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AdminItems from '../../../common/AdminItems';

export default function Table(props) {
  return (
    <div>
      <h2 className="text-center my-5">{props.tableName}</h2>
      <table className="table table-striped my-5 offset-sm-1 col-sm-10">
        {props.orders
          .sort((orderA, orderB) => {
            return orderA.orderDetails.id < orderB.orderDetails.id;
          })
          .map(order => {
            const userId = order.orderDetails.user_id;
            const orderId = order.orderDetails.id;
            return (
              <tbody key={orderId} className="border-dark">
                <tr>
                  <th>ID заказа</th>
                  <th>Клиент</th>
                  <th>Дата создания</th>
                  <th>Цена, BYN</th>
                  <th>Статус оплаты</th>
                  <th>Статус доставки</th>
                  <th colSpan={3} className="text-center">
                    Действия с заказом
                  </th>
                </tr>
                <tr key={orderId} colSpan={0}>
                  <td className="border">{orderId}</td>
                  <td className="border">
                    <Link to={`orders/${userId}`}>
                      {
                        props.users.find(user => {
                          return userId === user.id;
                        }).name
                      }
                    </Link>
                  </td>
                  <td className="border">{order.orderDetails.created_at}</td>
                  <td className="border">
                    {order.orderDetails.price || 'Не выставлена'}
                  </td>
                  <td className="border">
                    {order.orderDetails.payment_status}
                  </td>
                  <td className="border">
                    {order.orderDetails.delivery_status}
                  </td>
                  <th colSpan={3} className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary collapsed text-center"
                      type="button"
                      data-toggle="collapse"
                      data-target={`#order${orderId}`}
                      aria-expanded="false"
                      aria-controls={`order${orderId}`}>
                      Просмотреть
                    </button>
                    <button
                      className="btn btn-outline-success text-center"
                      type="button"
                      onClick={() => props.onEditOrderButtonClick(orderId)}>
                      Редактировать
                    </button>
                    <button
                      className="btn btn-outline-danger text-center"
                      type="button"
                      onClick={() => props.deleteOrder(orderId)}>
                      Удалить
                    </button>
                  </th>
                </tr>
                <tr className="collapse" id={`order${orderId}`}>
                  <td colSpan={7}>
                    <AdminItems
                      items={order.orderedItems}
                      tableName={'Заказанные товары'}
                    />{' '}
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
}

Table.propTypes = {
  orders: PropTypes.array,
  users: PropTypes.array,
  tableName: PropTypes.string,
  onEditOrderButtonClick: PropTypes.func,
  deleteOrder: PropTypes.func
};
