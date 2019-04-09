import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import CartButton from './CartButton';
import './index.css';

export default function ProductsTable(props) {
  const rows = props.products.map(product => {
    let row = {
      name: product.name,
      article: product.article,
      order_code: product.order_code
    };

    if (props.isAuthenticated && !props.isAdmin) {
      row['Добавление в корзину'] = (
        <CartButton
          onAddToCartButtonClick={props.onAddToCartButtonClick}
          productIsInTheCart={props.productIsInTheCart}
          product={product}
        />
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

  if (props.isAuthenticated && !props.isAdmin) {
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
      <h3 className="text-center mt-5">{props.tableName}</h3>
      {!props.isAuthenticated && (
        <div className="text-center my-3">
          Чтобы заказать продукцию, пожалуйста, <Link to="/login">войдите</Link>{' '}
          или <Link to="/register">зарегистрируйтесь</Link>
        </div>
      )}
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
        responsiveSm={true}
        responsiveLg={true}
        responsiveMd={true}
      />
    </div>
  );
}

ProductsTable.propTypes = {
  products: PropTypes.array,
  category: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.number,
  tableName: PropTypes.string,
  onAddToCartButtonClick: PropTypes.func,
  productIsInTheCart: PropTypes.func
};
