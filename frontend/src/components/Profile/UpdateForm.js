import React from 'react';
import PropTypes from 'prop-types';

export default function UpdateForm(props) {
  return (
    <div className="mb-5">
      <h3 className="text-center mt-5">Редактирование профиля</h3>

      <div className="container mt-5 offset-md-4 col-sm-4 border">
        <form>
          <span className="form-text text-muted text-center">
            Введите новые данные
          </span>
          <div className="my-3 form-group row">
            <label htmlFor="name" className="col-sm-3 col-form-label">
              Имя:
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="name"
                onChange={props.handleChange}
                aria-describedby="nameHelp"
              />
            </div>
            <span id="nameHelp" className="col-sm-12 form-text text-muted">
              Без пробелов
            </span>
            {props.errors.name && (
              <span className="col-sm-12 text-danger">{props.errors.name}</span>
            )}
          </div>
          <div className="my-3 form-group row">
            <label htmlFor="email" className="col-sm-3 col-form-label">
              Email:
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={props.handleChange}
                aria-describedby="emailHelp"
              />
            </div>
            <span id="emailHelp" className="col-sm-12 form-text text-muted">
              Введите рабочий email-адрес
            </span>
            {props.errors.email && (
              <span className="col-sm-12 text-danger">
                {props.errors.email}
              </span>
            )}
          </div>
          <div className="my-3 form-group row">
            <label htmlFor="organization" className="col-sm-3 col-form-label">
              Организация:
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="organization"
                onChange={props.handleChange}
              />
            </div>
            {props.errors.organization && (
              <span className="col-sm-12 text-danger">
                {props.errors.organization}
              </span>
            )}
          </div>
          <div className="my-3 form-group row">
            <label htmlFor="phone" className="col-sm-3 col-form-label">
              Телефон:
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="phone"
                onChange={props.handleChange}
                aria-describedby="phoneHelp"
              />
            </div>
            <span id="phoneHelp" className="col-sm-12 form-text text-muted">
              Введите последние 9 цифр Вашего телефона
            </span>
            {props.errors.phone && (
              <span className="col-sm-12 text-danger">
                {props.errors.phone}
              </span>
            )}
          </div>
          <div className="my-3 form-group row">
            <label htmlFor="password" className="col-sm-3 col-form-label">
              Новый пароль:
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={props.handleChange}
                aria-describedby="passwordHelp"
              />
            </div>
            <span id="passwordHelp" className="col-sm-12 form-text text-muted">
              Пароль должен содержать не менее 8 символов без пробелов.
              Допускаются только буквы латинского алфавита, цифры и знаки
            </span>
            {props.errors.password && (
              <span className="col-sm-12 text-danger">
                {props.errors.password}
              </span>
            )}
          </div>
          <button
            type="button"
            className="btn btn-outline-secondary offset-md-3 col-sm-6 mb-3"
            onClick={props.handleSaveButtonClick}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

UpdateForm.propTypes = {
  handleSaveButtonClick: PropTypes.func,
  handleChange: PropTypes.func,
  errors: PropTypes.object
};
