import React from 'react';
import UpdateForm from './UpdateForm';
import PropTypes from 'prop-types';

export default function Card(props) {
  const { name, email, organization, phone, isAdmin } = props.userInfo;
  return (
    <div>
      <h3 className="text-center mt-5">Мой профиль</h3>
      <div className="container mt-5 offset-md-4 col-sm-4 border">
        <div className="offset-md-3 row my-3">
          <b>Имя:</b>
          <span>{name}</span>
        </div>
        <div className="offset-md-3 row my-3">
          <b>E-Mail:</b>
          <span>{email}</span>
        </div>
        <div className="offset-md-3 row my-3">
          <b>Организация:</b>
          <span>{organization}</span>
        </div>
        <div className="offset-md-3 row my-3">
          <b>Телефон:</b>
          <span>{phone}</span>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary offset-md-2 col-md-8 mb-3"
          onClick={props.handleEditButtonClick}>
          Редактировать профиль
        </button>
        {!isAdmin && (
          <button
            type="button"
            className="btn btn-outline-secondary offset-md-2 col-md-8 mb-3"
            onClick={props.handleViewOrdersButtonClick}>
            Просмотреть мои заказы
          </button>
        )}
      </div>
      {props.isUpdating && (
        <UpdateForm
          handleSaveButtonClick={props.handleSaveButtonClick}
          handleChange={props.handleChange}
          errors={props.errors}
        />
      )}
    </div>
  );
}

Card.propTypes = {
  isUpdating: PropTypes.bool,
  handleEditButtonClick: PropTypes.func,
  handleSaveButtonClick: PropTypes.func,
  handleViewOrdersButtonClick: PropTypes.func,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
  userInfo: PropTypes.object
};
