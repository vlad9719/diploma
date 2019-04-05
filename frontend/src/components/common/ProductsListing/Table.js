import React from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import './index.css';

export default function ProductsTable(props) {
  const rows = props.products.map(product => {
    let row = {
      name: product.name,
      article: product.article,
      order_code: product.order_code
    };

    if (props.isAuthenticated) {
      row['Добавление в корзину'] = (
        <button
          className="btn btn-outline-primary col-sm-12"
          onClick={() => props.onAddToCartButtonClick(product)}>
          Добавить в корзину
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
      label: 'Добавление в корзину',
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
    <div className="offset-sm-1 col-sm-10 my-5">
      <h3 className="text-center my-5">{props.tableName}</h3>
      <MDBDataTable
        striped
        bordered
        small
        data={tableData}
        searchLabel="Поиск"
        entriesLabel="Строк на странице"
        paginationLabel={['Назад', 'Вперёд']}
        infoLabel={['Строки', '-', 'из']}
        responsiveXl={true}
      />
    </div>
  );
}

ProductsTable.propTypes = {
  products: PropTypes.array,
  category: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  tableName: PropTypes.string,
  onAddToCartButtonClick: PropTypes.func
};
