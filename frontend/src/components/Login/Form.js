import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../utils/validation/is-empty';
import { Link } from 'react-router-dom';

export default function Form(props) {
  return (
    <form
      className="mt-5 mb-5 offset-sm-2 offset-md-3 offset-lg-4 col-sm-8 col-md-6 col-lg-4 border"
      onChange={props.handleChange}>
      <h3 className="text-center mt-3 mb-3">Вход на сайт</h3>
      <div className="form-group">
        <label htmlFor="email">Ваш E-mail:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Email"
          title="Введите email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Ваш пароль:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          minLength="8"
          placeholder="Пароль"
          title="Введите пароль"
        />
      </div>
      {!isEmpty(props.errors) && (
        <div className="w-100 h-auto p-2 mb-3 bg-white text-danger text-center font-weight-bold border border-danger">
          Неправильный email или пароль
        </div>
      )}
      <button
        type="button"
        className="btn btn-outline-primary col-sm-12 mb-3"
        onClick={props.handleSubmit}>
        Войти на сайт
      </button>
      <div className="mb-3 text-center">
        <Link to="/register">Регистрация</Link>
      </div>
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  errors: PropTypes.object
};
