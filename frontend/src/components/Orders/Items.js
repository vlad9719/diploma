import React from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';

export default function Items(props) {
  const rows = props.items.map(item => {
    return {
      name: item.name,
      article: item.article,
      orderCode: item.order_code,
      quantity: item.quantity
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
      field: 'quantity',
      sort: 'asc'
    }
  ];

  const tableData = {
    columns,
    rows
  };

  return (
    <div>
      <h4 className="text-center my-1">{props.tableName}</h4>
      <MDBDataTable
        striped
        bordered
        small
        data={tableData}
        searching={false}
        paging={false}
        responsiveXl={true}
      />
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary"
          onClick={() => props.onRepeatOrderButtonClick(props.orderId)}>
          Повторить заказ
        </button>
      </div>
    </div>
  );
}

Items.propTypes = {
  items: PropTypes.array,
  tableName: PropTypes.string,
  onRepeatOrderButtonClick: PropTypes.func,
  orderId: PropTypes.number
};
