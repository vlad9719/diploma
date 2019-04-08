import React from 'react';
import PropTypes from 'prop-types';
import Items from './Items';

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
            return (
              <tbody key={order.orderDetails.id} className="border-dark">
                <tr>
                  <th>ID заказа</th>
                  <th>Дата создания</th>
                  <th>Цена, BYN</th>
                  <th>Статус оплаты</th>
                  <th>Статус доставки</th>
                  <th colSpan={3} className="text-center">
                    Действия с заказом
                  </th>
                </tr>
                <tr key={order.orderDetails.id} colSpan={0}>
                  <td className="border">{order.orderDetails.id}</td>
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
                  <th colSpan={3} className="d-flex justify-content-end">
                    {order.orderDetails.payment_status === 'Не оплачен' &&
                      order.orderDetails.price !== null && (
                        <td>
                          <button
                            className="btn btn-outline-success"
                            onClick={() =>
                              props.onReportPaymentButtonClick(
                                order.orderDetails.id
                              )
                            }>
                            Сообщить об оплате
                          </button>
                        </td>
                      )}
                    {order.orderDetails.delivery_status === 'Отправлен' && (
                      <td>
                        <button
                          className="btn btn-outline-success"
                          onClick={() =>
                            props.onReportReceptionButtonClick(
                              order.orderDetails.id
                            )
                          }>
                          Сообщить о получении
                        </button>
                      </td>
                    )}
                    <td>
                      <button
                        className="btn btn-primary collapsed text-center"
                        type="button"
                        data-toggle="collapse"
                        data-target={`#order${order.orderDetails.id}`}
                        aria-expanded="false"
                        aria-controls={`order${order.orderDetails.id}`}>
                        Просмотр
                      </button>
                    </td>
                  </th>
                </tr>
                <tr className="collapse" id={`order${order.orderDetails.id}`}>
                  <td colSpan={7}>
                    <Items
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
  onReportPaymentButtonClick: PropTypes.func,
  onReportReceptionButtonClick: PropTypes.func,
  tableName: PropTypes.string
};
