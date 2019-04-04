import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

export default function Table(props) {
  const rows = props.products.map(product => {
    let row = {
      name: product.name,
      article: product.article,
      order_code: product.order_code
    };

    if (props.isAuthenticated) {
      row['Добавление в корзину'] = (
        <button className="btn btn-outline-secondary">
          Добавление в корзину
        </button>
      );
    }

    return row;
  });

  let columns = [
    {
      label: 'Наименование товара',
      field: 'name',
      sort: 'asc',
      width: 300
    },
    {
      label: 'Артикул',
      field: 'article',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Код заказа',
      field: 'order_code',
      sort: 'asc',
      width: 200
    }
  ];

  if (props.isAuthenticated) {
    columns.push({
      label: 'Добавить в корзину',
      field: 'Добавление в корзину',
      sort: 'asc',
      width: 200
    });
  }

  const tableData = {
    columns,
    rows
  };

  return (
    <MDBDataTable
      className="offset-sm-1 col-sm-10"
      striped
      bordered
      small
      data={tableData}
    />
  );
}

Table.propTypes = {
  products: PropTypes.object,
  category: PropTypes.string,
  isAuthenticated: PropTypes.bool
};
