import React from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';

export default function Table(props) {
  const rows = props.users.map(user => {
    const { id, name, organization, phone, created_at } = user;
    return {
      id,
      name,
      organization,
      phone,
      created_at,
      view_orders: (
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-primary col-sm-10">
            Просмотреть заказы
          </button>
        </div>
      )
    };
  });

  let columns = [
    {
      label: 'ID',
      field: 'id',
      sort: 'asc',
      width: 300
    },
    {
      label: 'Имя клиента',
      field: 'name',
      sort: 'asc',
      width: 300
    },
    {
      label: 'Организация',
      field: 'organization',
      sort: 'asc',
      width: 300
    },
    {
      label: 'Телефон',
      field: 'phone',
      sort: 'asc',
      width: 300
    },
    {
      label: 'Дата регистрации',
      field: 'created_at',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Просмотреть заказы от клиента',
      field: 'view_orders',
      sort: 'asc',
      width: 200
    }
  ];

  const tableData = {
    columns,
    rows
  };

  return (
    <div className="offset-sm-2 col-sm-8 my-5">
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

Table.propTypes = {
  users: PropTypes.array,
  tableName: PropTypes.string
};
