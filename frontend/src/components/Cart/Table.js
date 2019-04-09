import React from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';

import './index.css';

export default function Table(props) {
  const rows = props.items.map(item => {
    return {
      name: item.name,
      article: item.article,
      orderCode: item.order_code,
      quantity: (
        <div className="input-group">
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() =>
                props.decrementItemQuantityByOne(item.id, item.quantity)
              }>
              <span className="glyphicon glyphicon-minus">—</span>
            </button>
          </span>
          <input
            type="text"
            id="quantity"
            name="quantity"
            className="form-control input-number col-sm-2"
            value={item.quantity}
            min="1"
            max="100"
            readOnly={true}
          />
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() =>
                props.incrementItemQuantityByOne(item.id, item.quantity)
              }>
              <span className="glyphicon glyphicon-plus arithmetic-sign-font">
                +
              </span>
            </button>
          </span>
        </div>
      ),
      removeItem: (
        <button
          className="btn btn-outline-secondary col-sm-12"
          onClick={() => props.removeItemFromCart(item.id)}>
          Удалить из корзины
        </button>
      )
    };
  });

  let columns = [
    {
      label: 'Наименование товара',
      field: 'name',
      sort: 'asc',
      width: 400
    },
    {
      label: 'Артикул',
      field: 'article',
      sort: 'asc',
      width: 400
    },
    {
      label: 'Код заказа',
      field: 'orderCode',
      sort: 'asc',
      width: 400
    },
    {
      label: 'Количество',
      field: 'Quantity',
      sort: 'asc'
    },
    {
      label: 'Удаление из корзины',
      field: 'removeItem',
      width: 300
    }
  ];

  const tableData = {
    columns,
    rows
  };

  return (
    <div className="offset-sm-1 col-sm-10 my-5">
      <h3 className="text-center my-5">{props.tableName}</h3>
      <MDBDataTable
        striped
        bordered
        small
        data={tableData}
        searchLabel="Поиск в корзине"
        entriesLabel="Строк на странице"
        paginationLabel={['Назад', 'Вперёд']}
        infoLabel={['Строки', '-', 'из']}
        responsiveXl={true}
      />
      <button
        className="btn btn-outline-secondary col-sm-3"
        onClick={props.clearCart}>
        Очистить корзину
      </button>
      <button
        className="btn btn-primary col-sm-3 offset-sm-6"
        onClick={() => props.confirmOrder()}>
        Подтвердить заказ
      </button>
    </div>
  );
}

Table.propTypes = {
  items: PropTypes.array,
  tableName: PropTypes.string,
  incrementItemQuantityByOne: PropTypes.func,
  decrementItemQuantityByOne: PropTypes.func,
  removeItemFromCart: PropTypes.func,
  clearCart: PropTypes.func,
  confirmOrder: PropTypes.func
};
